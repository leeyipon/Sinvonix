/**
 * Scripted implementation of {@link AgentEngine}. It routes the visitor's
 * actions through the guided flow, the knowledge base, the product
 * recommendation and the escalation paths, returning assistant turns plus an
 * updated context.
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
import { scoreFromCollected, scoreLead } from "./leads";
import { saveLead } from "./store";
import { notifyLead } from "./notify";

/* ---- quick actions (also consumed by the UI) ------------------------- */

export const QUICK_ACTIONS: { id: QuickActionId; label: string }[] = [
  { id: "cordon", label: "Fraud & AML (CORDON)" },
  { id: "aevix", label: "Payment Security (AEVIX)" },
  { id: "conversa-ci-hub", label: "Contact Centre" },
  { id: "chronicle-ai", label: "AI & Automation" },
  { id: "managed-security", label: "Managed Security" },
  { id: "recommend", label: "Recommend a Product" },
  { id: "book", label: "Schedule a Briefing" },
];

const NEXT_STEP_SUGGESTIONS = [
  "Schedule a briefing",
  "Share my details",
  "Talk to an expert",
];

/* ---- welcome --------------------------------------------------------- */

const WELCOME = `👋 Hello! I'm **Navi**, your Sinvonix platform consultant.

I can help you:

- Recommend the right product for your needs
- Explain CORDON, AEVIX, Conversa CI Hub, Chronicle AI & Managed Security
- Answer questions on compliance, regions & deployment
- Schedule a briefing with our team
- Connect you with a specialist

**What are you looking to solve?**`;

/* ---- step prompts ---------------------------------------------------- */

const STEP_PROMPT: Record<FlowStepId, string> = {
  solution: "What's the primary challenge you're looking to solve?",
  industry: "Got it. Which industry are you in?",
  size: "How would you like to deploy — one product, a few, or the full platform?",
  features: "Which capabilities matter most? Pick all that apply, then hit Continue.",
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
      text: "Want to take the next step? I can schedule a briefing with our team, or capture your details for a tailored follow-up.",
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

/** Infer a product (and sometimes industry) from a free-text message. */
function detectSolution(text: string): { solution?: SolutionId; industry?: string } {
  const t = text.toLowerCase();
  const out: { solution?: SolutionId; industry?: string } = {};

  if (has(t, ["fraud", "aml", "money laundering", "transaction screening", "mule", "kyc", "pep"])) {
    out.solution = "cordon";
  } else if (has(t, ["payment security", "quantum", "pqc", "pos terminal", "cryptography", "encryption", "tls"])) {
    out.solution = "aevix";
  } else if (has(t, ["contact centre", "contact center", "call centre", "call center", "omnichannel", "agent assist"])) {
    out.solution = "conversa-ci-hub";
  } else if (has(t, ["automation", "workflow", "orchestration", "predictive analytics", "compliance workflow"])) {
    out.solution = "chronicle-ai";
  } else if (has(t, ["mdr", "managed detection", "endpoint", "iam", "identity access", "zero trust", "digital risk", "managed security"])) {
    out.solution = "managed-security";
  }

  for (const ind of INDUSTRIES) {
    if (ind.value !== "Other" && t.includes(ind.value.toLowerCase())) {
      out.industry = ind.value;
      break;
    }
  }
  return out;
}

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
  if (id === "recommend") return startRecommendation(ctx.collected, ctx);

  // The remaining quick-action ids are exactly the product slugs.
  const solution = id as SolutionId;
  const collected: Collected = { ...ctx.collected, solution };
  const ack = `Great — a ${SOLUTION_LABEL[solution]}.`;
  return advance(collected, ctx, ack);
}

/** Jump straight to a recommendation if we already have enough, else keep asking. */
function startRecommendation(collected: Collected, ctx: EngineContext): EngineResult {
  if (!collected.solution || !collected.size) {
    return advance(collected, ctx, "Let's find the right fit — a few quick questions.");
  }
  return {
    turns: finalize(collected),
    collected,
    leadScore: scoreWith(collected, ctx, 20),
    suggestions: NEXT_STEP_SUGGESTIONS,
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
        text: `Thanks, ${lead.name.split(" ")[0] || "there"}! ✅ Your details are saved and our team will be in touch within one business day. In the meantime, would you like to schedule a briefing directly?`,
      },
    ],
    collected: ctx.collected,
    leadScore: scored.score ?? ctx.leadScore,
    suggestions: ["Schedule a briefing", "Recommend a product"],
  };
}

function handleIntent(ctx: EngineContext, intent: "estimate" | "booking" | "human" | "restart"): EngineResult {
  switch (intent) {
    // Named "estimate" for backward compatibility with dispatch call sites,
    // but this now always yields a product recommendation, never a price.
    case "estimate":
      return startRecommendation(ctx.collected, ctx);
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
  if (has(text, ["book", "briefing", "schedule", "meeting", "appointment", "call"])) {
    return openScheduler(collected, ctx);
  }
  if (has(text, ["talk to", "human", "expert", "architect", "representative", "sales rep", "someone", "real person"])) {
    return escalate(collected, ctx, true);
  }
  if (has(text, ["share my details", "my details", "proposal", "contact me", "reach me", "email me", "qualify"])) {
    return showLeadForm(collected, ctx);
  }
  if (has(text, ["recommend", "which product", "right fit", "help me choose", "not sure which"])) {
    return startRecommendation(collected, ctx);
  }

  // 2) infer a product from natural language ("we need fraud screening…")
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
    suggestions: ["Recommend a product", "Schedule a briefing"],
  };
}
