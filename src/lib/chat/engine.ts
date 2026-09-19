/**
 * Scripted implementation of {@link AgentEngine}. It routes the visitor's
 * actions through the guided flow, the knowledge base, the estimator and the
 * escalation paths, returning assistant turns plus an updated context.
 *
 * Everything here is a pure function of (context, action) — no I/O, no React —
 * which is exactly what a future LLM-backed engine would replace.
 */

import type {
  AgentEngine,
  AssistantTurn,
  Collected,
  EngineContext,
  EngineResult,
  FlowStepId,
  Lead,
  QuickActionId,
  SolutionId,
  UserAction,
} from "./types";
import { FEATURES, INDUSTRIES, SIZES, SOLUTIONS, SOLUTION_LABEL } from "./flow";
import { searchKnowledge } from "./knowledge";
import { recommend } from "./recommend";
import { estimate } from "./estimator";
import { scoreFromCollected, scoreLead } from "./leads";
import { saveLead } from "./store";
import { notifyLead } from "./notify";

/* ---- quick actions (also consumed by the UI) ------------------------- */

export const QUICK_ACTIONS: { id: QuickActionId; label: string }[] = [
  { id: "web", label: "Create a Web Application" },
  { id: "mobile", label: "Build a Mobile App" },
  { id: "ai-agent", label: "Develop an AI Agent" },
  { id: "logistics", label: "Logistics Management System" },
  { id: "crm", label: "CRM System" },
  { id: "erp", label: "ERP Solution" },
  { id: "cloud", label: "Cloud Migration" },
  { id: "automation", label: "Automation" },
  { id: "design", label: "UI/UX Design" },
  { id: "transformation", label: "Digital Transformation" },
  { id: "book", label: "Book Consultation" },
  { id: "estimate", label: "Get Project Estimate" },
];

const NEXT_STEP_SUGGESTIONS = [
  "Get a project estimate",
  "Book a consultation",
  "Talk to an expert",
];

/* ---- welcome --------------------------------------------------------- */

const WELCOME = `👋 Hello! I'm your **AI Solutions Consultant**.

I can help you:

- Recommend the best software solution
- Explain our services
- Estimate project costs
- Book a free consultation
- Answer technical questions
- Connect you with our experts

**What would you like to build today?**`;

/* ---- step prompts ---------------------------------------------------- */

const STEP_PROMPT: Record<FlowStepId, string> = {
  solution: "What type of solution are you looking for?",
  industry: "Got it. What industry are you in?",
  size: "And how big is this project?",
  features: "Which features do you need? Pick all that apply, then hit Continue.",
};

function optionsFor(step: FlowStepId, collected: Collected) {
  switch (step) {
    case "solution":
      return SOLUTIONS;
    case "industry":
      return INDUSTRIES;
    case "size":
      return SIZES;
    case "features":
      return FEATURES[collected.solution ?? "unsure"];
  }
}

/** Build the turn that asks a given step. */
function askStep(step: FlowStepId, collected: Collected, prefix?: string): AssistantTurn {
  const options = optionsFor(step, collected);
  const text = prefix ? `${prefix} ${STEP_PROMPT[step]}` : STEP_PROMPT[step];
  return {
    text,
    widget: { kind: "options", step, options, multi: step === "features" },
  };
}

/** The next step still needed, or null when we have enough to recommend. */
function nextStep(collected: Collected): FlowStepId | null {
  if (!collected.solution) return "solution";
  if (!collected.industry) return "industry";
  if (!collected.size) return "size";
  const hasFeatureStep = (FEATURES[collected.solution] ?? []).length > 0;
  if (hasFeatureStep && collected.features === undefined) return "features";
  return null;
}

/* ---- finalize (recommendation) --------------------------------------- */

function finalize(collected: Collected): AssistantTurn[] {
  const rec = recommend(collected);
  return [
    { text: rec.summary, widget: { kind: "recommendation", data: rec } },
    {
      text: "Would you like a detailed **cost & timeline estimate**, or shall I set up a free consultation with our team?",
    },
  ];
}

/* ---- scoring helper -------------------------------------------------- */

function scoreWith(collected: Collected, ctx: EngineContext, bonus = 0): number {
  const base = Math.max(ctx.leadScore, scoreFromCollected(collected));
  return Math.min(100, base + bonus);
}

/* ---- intent detection on free text ----------------------------------- */

function has(text: string, words: string[]): boolean {
  const t = ` ${text.toLowerCase()} `;
  return words.some((w) => t.includes(w));
}

/** Infer a solution (and sometimes industry) from a free-text message. */
function detectSolution(text: string): { solution?: SolutionId; industry?: string } {
  const t = text.toLowerCase();
  const out: { solution?: SolutionId; industry?: string } = {};

  if (has(t, ["logistics", "delivery", "fleet", "warehouse", "inventory", "crm", "erp", "pos", "management system"])) {
    out.solution = "system";
  } else if (has(t, ["chatbot", "ai agent", " ai ", "artificial intelligence", "llm", "voice ai", "rag"])) {
    out.solution = "ai";
  } else if (has(t, ["mobile app", "ios", "android", "flutter", "react native"])) {
    out.solution = "mobile";
  } else if (has(t, ["automation", "automate", "workflow"])) {
    out.solution = "automation";
  } else if (has(t, ["ui", "ux", "design", "prototype", "wireframe"])) {
    out.solution = "design";
  } else if (has(t, ["web app", "website", "web application", "saas", "portal", "platform", "dashboard"])) {
    out.solution = "web";
  }

  for (const ind of INDUSTRIES) {
    if (ind.value !== "Other" && t.includes(ind.value.toLowerCase())) {
      out.industry = ind.value;
      break;
    }
  }
  return out;
}

/* ---- quick action mapping -------------------------------------------- */

const QUICK_SOLUTION: Partial<Record<QuickActionId, SolutionId>> = {
  web: "web",
  mobile: "mobile",
  "ai-agent": "ai",
  logistics: "system",
  crm: "system",
  erp: "system",
  automation: "automation",
  design: "design",
  transformation: "unsure",
};

const QUICK_INDUSTRY: Partial<Record<QuickActionId, string>> = {
  logistics: "Logistics",
};

/* ---- the engine ------------------------------------------------------ */

export const scriptedAgent: AgentEngine = {
  welcome(): AssistantTurn[] {
    return [{ text: WELCOME }];
  },

  respond(ctx: EngineContext, action: UserAction): EngineResult {
    switch (action.type) {
      case "option":
        return handleOption(ctx, action.step, action.value);
      case "features":
        return handleFeatures(ctx, action.values);
      case "quick":
        return handleQuick(ctx, action.action);
      case "lead":
        return handleLead(ctx, action.lead);
      case "intent":
        return handleIntent(ctx, action.intent);
      case "text":
        return handleText(ctx, action.text);
    }
  },
};

/* ---- handlers -------------------------------------------------------- */

function handleOption(ctx: EngineContext, step: FlowStepId, value: string): EngineResult {
  const collected: Collected = { ...ctx.collected };
  if (step === "solution") collected.solution = value as SolutionId;
  else if (step === "industry") collected.industry = value;
  else if (step === "size") collected.size = value as Collected["size"];

  return advance(collected, ctx);
}

function handleFeatures(ctx: EngineContext, values: string[]): EngineResult {
  const collected: Collected = { ...ctx.collected, features: values };
  return advance(collected, ctx);
}

/** Move the guided flow forward: ask the next step, or finalize. */
function advance(collected: Collected, ctx: EngineContext, prefix?: string): EngineResult {
  const step = nextStep(collected);
  if (step) {
    return {
      turns: [askStep(step, collected, prefix)],
      collected,
      leadScore: scoreWith(collected, ctx),
    };
  }
  return {
    turns: finalize(collected),
    collected,
    leadScore: scoreWith(collected, ctx),
    suggestions: NEXT_STEP_SUGGESTIONS,
  };
}

function handleQuick(ctx: EngineContext, id: QuickActionId): EngineResult {
  if (id === "book") return openScheduler(ctx.collected, ctx);
  if (id === "estimate") return startEstimate(ctx.collected, ctx);
  if (id === "cloud") {
    return {
      turns: [
        {
          text: "**Cloud Migration** — we move you to AWS, Azure or Google Cloud with zero-downtime deploys, CI/CD and cost optimization, and can deploy into your own account so you own the infrastructure.",
        },
      ],
      collected: ctx.collected,
      leadScore: scoreWith(ctx.collected, ctx),
      suggestions: ["Get a project estimate", "Book a consultation", "Talk to an expert"],
    };
  }

  const solution = QUICK_SOLUTION[id];
  if (!solution) return handleText(ctx, id);

  const collected: Collected = { ...ctx.collected, solution };
  const industry = QUICK_INDUSTRY[id];
  if (industry) collected.industry = industry;

  const ack = `Great — a ${SOLUTION_LABEL[solution]}.`;
  return advance(collected, ctx, ack);
}

function startEstimate(collected: Collected, ctx: EngineContext): EngineResult {
  // Need at least a solution + size to estimate; otherwise gather via the flow.
  if (!collected.solution || !collected.size) {
    return advance(collected, ctx, "To estimate accurately I need a few quick details.");
  }
  return produceEstimate(collected, ctx);
}

function produceEstimate(collected: Collected, ctx: EngineContext): EngineResult {
  return {
    turns: [
      {
        text: "Here's a ballpark based on what you've shared — every figure is a range, and we'll refine it together.",
        widget: { kind: "estimate", data: estimate(collected) },
      },
      {
        text: "Want the next step? I can capture your details for a tailored proposal, or set up a call.",
      },
    ],
    collected,
    leadScore: scoreWith(collected, ctx, 20),
    suggestions: ["Share my details", "Book a consultation", "Talk to an expert"],
  };
}

function openScheduler(collected: Collected, ctx: EngineContext): EngineResult {
  return {
    turns: [
      {
        text: "Opening our booking calendar now — pick any time that works and you'll get an instant confirmation. 📅",
      },
    ],
    collected,
    leadScore: scoreWith(collected, ctx, 30),
    effect: "open-scheduler",
  };
}

function showLeadForm(collected: Collected, ctx: EngineContext): EngineResult {
  return {
    turns: [
      {
        text: "Perfect. Pop your details in below and one of our solution architects will follow up within one business day.",
        widget: { kind: "lead-form" },
      },
    ],
    collected,
    leadScore: scoreWith(collected, ctx),
  };
}

function escalate(collected: Collected, ctx: EngineContext, lead = false): EngineResult {
  const text = lead
    ? "I'd like to connect you with one of our solution architects. Here's how to reach a human right now:"
    : "Happy to bring in a human. Here's how to reach our team:";
  return {
    turns: [{ text, widget: { kind: "escalation" } }],
    collected,
    leadScore: scoreWith(collected, ctx),
  };
}

function handleLead(ctx: EngineContext, lead: Lead): EngineResult {
  const scored = scoreLead({ ...lead, collected: ctx.collected }, ctx.leadScore);
  saveLead(scored); // persist to the localStorage "CRM"
  notifyLead(scored); // email the team via the real backend
  return {
    turns: [
      {
        text: `Thanks, ${lead.name.split(" ")[0] || "there"}! ✅ Your details are saved and our team will be in touch within one business day. In the meantime, would you like to book a time directly?`,
      },
    ],
    collected: ctx.collected,
    leadScore: scored.score ?? ctx.leadScore,
    suggestions: ["Book a consultation", "Get a project estimate"],
  };
}

function handleIntent(ctx: EngineContext, intent: "estimate" | "booking" | "human" | "restart"): EngineResult {
  switch (intent) {
    case "estimate":
      return startEstimate(ctx.collected, ctx);
    case "booking":
      return openScheduler(ctx.collected, ctx);
    case "human":
      return escalate(ctx.collected, ctx, true);
    case "restart":
      return {
        turns: [{ text: "No problem — let's start fresh. " + STEP_PROMPT.solution, widget: { kind: "options", step: "solution", options: SOLUTIONS } }],
        collected: {},
        leadScore: 0,
      };
  }
}

function handleText(ctx: EngineContext, raw: string): EngineResult {
  const text = raw.trim();
  const collected = ctx.collected;

  // 1) explicit intents
  if (has(text, ["start over", "restart", "reset"])) return handleIntent(ctx, "restart");
  if (has(text, ["book", "consultation", "schedule", "meeting", "appointment", "call"])) {
    return openScheduler(collected, ctx);
  }
  if (has(text, ["talk to", "human", "expert", "architect", "representative", "sales rep", "someone", "real person"])) {
    return escalate(collected, ctx, true);
  }
  if (has(text, ["share my details", "my details", "proposal", "contact me", "reach me", "email me", "qualify"])) {
    return showLeadForm(collected, ctx);
  }
  if (has(text, ["estimate", "cost", "price", "how much", "quote", "budget", "pricing"])) {
    return startEstimate(collected, ctx);
  }

  // 2) infer a solution from natural language ("I need a logistics system…")
  if (!collected.solution) {
    const detected = detectSolution(text);
    if (detected.solution) {
      const merged: Collected = { ...collected, solution: detected.solution };
      if (detected.industry) merged.industry = detected.industry;
      return advance(merged, ctx, `Great — a ${SOLUTION_LABEL[detected.solution]}, I can absolutely help with that.`);
    }
  }

  // 3) knowledge base
  const hit = searchKnowledge(text);
  if (hit) {
    return {
      turns: [{ text: hit.answer }],
      collected,
      leadScore: scoreWith(collected, ctx),
      suggestions: hit.suggestions,
    };
  }

  // 4) fallback → offer a human
  return {
    turns: [
      {
        text: "That's a great question — I want to make sure you get an accurate answer, so let me connect you with a specialist.",
        widget: { kind: "escalation" },
      },
    ],
    collected,
    leadScore: scoreWith(collected, ctx),
    suggestions: ["Recommend a solution", "Get a project estimate"],
  };
}
