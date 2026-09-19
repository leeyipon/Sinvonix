/**
 * The consultant's knowledge base. Each entry carries keywords and a
 * markdown-ish answer; {@link searchKnowledge} scores the visitor's message
 * against every entry and returns the best match (or null, which the engine
 * treats as a cue to offer a human).
 *
 * Answers are grounded in the real company data in `src/lib/site.ts`.
 */

import { services } from "@/lib/site";

export type KbEntry = {
  id: string;
  keywords: string[];
  answer: string;
  /** Follow-up chips to surface after this answer. */
  suggestions?: string[];
};

const servicesList = services.map((s) => `**${s.title}** — ${s.blurb}`).join("\n");

export const KB: KbEntry[] = [
  {
    id: "services",
    keywords: ["service", "services", "offer", "do you do", "what do you", "capabilities", "help with"],
    answer:
      `We're a full-stack digital partner. Our core services:\n\n${servicesList}\n\nWant me to recommend the right fit for your project?`,
    suggestions: ["Recommend a solution", "Get a project estimate"],
  },
  {
    id: "company",
    keywords: ["who are you", "about you", "about nimbus", "your company", "your team", "your background", "tell me about"],
    answer:
      "We're **Nimbus** — a product studio building web apps, AI systems and growth marketing for ambitious teams. 100+ projects delivered, 98% client satisfaction, and 24/7 support & monitoring. Design, engineering and strategy sit in one team, so what we design is what ships.",
    suggestions: ["See your work", "Book a consultation"],
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "how much", "budget", "expensive", "rate", "quote", "fee"],
    answer:
      "Every project is scoped to what you actually need, so pricing depends on complexity, team and timeline. As a rough guide: **startup MVPs start around $15–40k**, mid-size builds land **$60–150k**, and enterprise platforms go higher. I can generate a tailored estimate in under a minute — want one?",
    suggestions: ["Get a project estimate", "Book a consultation"],
  },
  {
    id: "process",
    keywords: ["process", "how do you work", "methodology", "workflow", "steps", "approach", "engagement"],
    answer:
      "We work in tight, visible iterations: **Discovery → Strategy → Design → Development → Testing → Deployment → Optimization**. You see working software every week in vertical slices — no big-bang reveal at the end.",
    suggestions: ["Get a project estimate", "Talk to an expert"],
  },
  {
    id: "timeline",
    keywords: ["how long", "timeline", "duration", "time", "weeks", "months", "fast", "when"],
    answer:
      "Timelines depend on scope. A **startup MVP** is typically **6–10 weeks**; a **mid-size product** runs **4–6 months**; enterprise platforms are longer. We ship in weekly increments so value lands early. Tell me a bit about your project and I'll estimate it.",
    suggestions: ["Get a project estimate", "Recommend a solution"],
  },
  {
    id: "tech",
    keywords: ["tech", "stack", "technology", "framework", "language", "react", "next", "node", "python", "build with"],
    answer:
      "A modern, boring-reliable-where-it-matters stack: **React / Next.js + TypeScript** on the front end, **Node or Python** on the back end, **PostgreSQL / MongoDB** for data, containerised with **Docker** and deployed to **AWS**. For AI we're model-agnostic (Claude, OpenAI, open models).",
    suggestions: ["What services do you offer?"],
  },
  {
    id: "ai",
    keywords: ["ai", "artificial intelligence", "chatbot", "agent", "llm", "gpt", "machine learning", "automation ai", "rag"],
    answer:
      "We build **AI that does real work** — agents that resolve tickets, retrieval-grounded chatbots, workflow automation and voice AI. We're model-agnostic, ground responses in your own data, and add evals plus human-in-the-loop for high-stakes paths. One client's agent auto-resolves **68% of 10k+ monthly tickets**.",
    suggestions: ["Develop an AI Agent", "Get a project estimate"],
  },
  {
    id: "maintenance",
    keywords: ["maintenance", "maintain", "support", "ongoing", "retainer", "after launch", "updates", "bug"],
    answer:
      "Yes — most engagements include deployment, monitoring and a support window. Beyond that, ongoing maintenance, optimization and new features are available as a monthly retainer, with **24/7 monitoring** on production systems.",
    suggestions: ["Book a consultation"],
  },
  {
    id: "hosting",
    keywords: ["host", "hosting", "server", "infrastructure", "deploy", "deployment", "devops", "ci/cd", "cloud host"],
    answer:
      "We handle the whole path to production: infrastructure, **CI/CD, zero-downtime deploys** and monitoring — typically on **AWS, Azure or Google Cloud**. We can deploy into your own cloud account so you own the infrastructure.",
    suggestions: ["Cloud Migration", "Talk to an expert"],
  },
  {
    id: "cloud",
    keywords: ["cloud", "aws", "azure", "gcp", "google cloud", "migration", "migrate", "scalab", "kubernetes"],
    answer:
      "We design and run cloud infrastructure on **AWS, Azure and Google Cloud** — migrations, DevOps, CI/CD, autoscaling and cost optimization. Whether you're moving off legacy servers or scaling a fast-growing product, we've got it covered.",
    suggestions: ["Get a project estimate", "Book a consultation"],
  },
  {
    id: "security",
    keywords: ["security", "secure", "gdpr", "compliance", "data protection", "privacy", "encryption", "soc2", "hipaa"],
    answer:
      "Security is built in, not bolted on: encrypted data in transit and at rest, role-based access, audited dependencies and secure deployment pipelines. For AI, we use enterprise tiers that **don't train on your data** and can deploy in-region for residency. We work with GDPR/HIPAA-sensitive teams.",
    suggestions: ["Talk to an expert"],
  },
  {
    id: "api",
    keywords: ["api", "integration", "integrate", "third party", "webhook", "connect", "sync", "erp integration"],
    answer:
      "We build **typed, documented REST and realtime APIs**, and integrate with the tools you already run — payment providers, CRMs, ERPs, messaging, analytics and more. Clean integration is usually where the real leverage is.",
    suggestions: ["Get a project estimate"],
  },
  {
    id: "case-studies",
    keywords: ["case study", "case studies", "portfolio", "examples", "clients", "work", "results", "proof", "success"],
    answer:
      "A few results we're proud of:\n\n- **Atlas CRM** — unified a 200-person sales org, +42% productivity, 3.1s → 0.4s load.\n- **Helix AI** — an agent resolving 68% of 10k+ monthly tickets, <30s first response.\n- **Pulse Analytics** — −27% CAC while scaling to 3.4x ROAS in one quarter.",
    suggestions: ["Book a consultation", "Get a project estimate"],
  },
  {
    id: "mobile",
    keywords: ["mobile", "ios", "android", "flutter", "react native", "app store", "phone app"],
    answer:
      "We build **native-feeling iOS and Android apps** with React Native or Flutter, backed by a solid API and admin dashboard. Push notifications, offline mode, in-app payments, maps — whatever the product needs.",
    suggestions: ["Build a Mobile App", "Get a project estimate"],
  },
  {
    id: "design",
    keywords: ["design", "ui", "ux", "figma", "prototype", "user research", "wireframe", "design system"],
    answer:
      "Research-led **product design and design systems** people love to use — UX research, flows, polished UI and token-driven component libraries, delivered as production-ready specs your engineers can build from directly. Accessibility (WCAG AA) is included by default.",
    suggestions: ["UI/UX Design", "Book a consultation"],
  },
  {
    id: "contact",
    keywords: ["contact", "email", "phone", "reach", "get in touch", "talk", "call", "human", "sales"],
    answer:
      "You can reach the team at **hello@nimbus.dev**, or I can connect you with a solution architect right now. Prefer to pick a time? I can open our booking calendar.",
    suggestions: ["Talk to an expert", "Book a consultation"],
  },
];

/** Normalize text for keyword matching. */
function norm(s: string): string {
  return ` ${s.toLowerCase().replace(/[^a-z0-9\s/]/g, " ").replace(/\s+/g, " ")} `;
}

/**
 * Score each KB entry by keyword hits (longer phrase matches weigh more) and
 * return the best entry above a small threshold, else null.
 */
export function searchKnowledge(query: string): KbEntry | null {
  const q = norm(query);
  let best: KbEntry | null = null;
  let bestScore = 0;

  for (const entry of KB) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(` ${kw} `) || q.includes(`${kw} `) || q.includes(` ${kw}`)) {
        // Weight multi-word keywords more heavily than single tokens.
        score += kw.includes(" ") ? 3 : 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 1 ? best : null;
}
