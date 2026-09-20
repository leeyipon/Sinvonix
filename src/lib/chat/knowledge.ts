/**
 * The consultant's knowledge base. Each entry carries keywords and a
 * markdown-ish answer; {@link searchKnowledge} scores the visitor's message
 * against every entry and returns the best match (or null, which the engine
 * treats as a cue to offer a human).
 *
 * Answers are grounded in the real company data in `src/lib/site.ts`. There
 * is no pricing entry that quotes a number — Sinvonix doesn't publish
 * self-serve pricing, so pricing questions route to a briefing instead.
 */

import { services } from "@/lib/site";

export type KbEntry = {
  id: string;
  keywords: string[];
  answer: string;
  /** Follow-up chips to surface after this answer. */
  suggestions?: string[];
};

const productsList = services.map((s) => `**${s.title}** — ${s.blurb}`).join("\n");

export const KB: KbEntry[] = [
  {
    id: "products",
    keywords: ["product", "products", "offer", "do you do", "what do you", "capabilities", "help with", "platform"],
    answer:
      `We're a unified security and fintech platform. Our five products:\n\n${productsList}\n\nEach one runs standalone or as part of the unified platform. Want a recommendation for your situation?`,
    suggestions: ["Recommend a product", "Schedule a briefing"],
  },
  {
    id: "company",
    keywords: ["who are you", "about you", "about sinvonix", "your company", "your team", "your background", "tell me about"],
    answer:
      "We're **Sinvonix** — built by a team with over 50 years of combined experience selling, deploying and supporting enterprise technology across ASEAN's toughest regulated markets. Five integrated products, active recurring contracts across multiple ASEAN markets, and senior-led engagements — you work directly with the people who built the platform.",
    suggestions: ["See our track record", "Schedule a briefing"],
  },
  {
    id: "pricing",
    keywords: ["price", "pricing", "cost", "how much", "budget", "expensive", "rate", "quote", "fee"],
    answer:
      "We don't publish self-serve pricing — every deployment is scoped to your institution, regulatory environment and whether you're going standalone or unified. The fastest way to a real number is a briefing with our team.",
    suggestions: ["Schedule a briefing", "Recommend a product"],
  },
  {
    id: "process",
    keywords: ["process", "how do you work", "methodology", "workflow", "steps", "approach", "engagement", "deployment process"],
    answer:
      "Our deployment journey: **Discovery & Risk Assessment → Solution Design → Compliance Alignment → Integration & Deployment → Live Monitoring → Continuous Optimization**. Every configuration is checked against FATF, NIST and your local regulator's requirements before go-live — and detection/response starts live from day one, not as a pilot.",
    suggestions: ["Recommend a product", "Schedule a briefing"],
  },
  {
    id: "timeline",
    keywords: ["how long", "timeline", "duration", "time", "weeks", "months", "fast", "when", "go live"],
    answer:
      "Timelines depend on scope — a single standalone product can be live in a few weeks once scoped; running a few products or the full platform is a phased rollout, typically over a few months. We'll give you an accurate timeline at your briefing, not a guess.",
    suggestions: ["Recommend a product", "Schedule a briefing"],
  },
  {
    id: "compliance",
    keywords: ["compliance", "gdpr", "pdpa", "data protection", "privacy", "encryption", "soc2", "fatf", "nist", "regulation", "regulatory"],
    answer:
      "Our platforms are built **compliance-first**, not retrofitted: aligned to FATF recommendations, regional data protection laws (including PDPA/PDPO), and NIST cryptographic standards. Every configuration is checked against your local regulator's requirements before go-live.",
    suggestions: ["Which industries do you serve?", "Schedule a briefing"],
  },
  {
    id: "chronicle-ai",
    keywords: ["ai", "artificial intelligence", "chatbot", "agent", "llm", "automation ai", "orchestration", "predictive analytics"],
    answer:
      "**Chronicle AI** is our AI orchestration layer — conversational intelligence, automated compliance workflows and predictive analytics. It runs standalone or extends into CORDON, AEVIX, Conversa CI Hub and Managed Security. Every automated decision is logged and explainable — built for institutions that answer to a regulator, not a black box.",
    suggestions: ["Recommend a product", "Schedule a briefing"],
  },
  {
    id: "support",
    keywords: ["maintenance", "maintain", "support", "ongoing", "retainer", "after launch", "updates", "monitoring"],
    answer:
      "Managed Security runs **24/7 managed detection and response** as live, recurring operations — not scheduled reviews. Beyond that, every engagement is senior-led: you work directly with the people who built the platform, not layers of account management.",
    suggestions: ["Schedule a briefing"],
  },
  {
    id: "deployment",
    keywords: ["deploy", "deployment", "standalone", "unified", "single product", "integrate products", "how does it work"],
    answer:
      "Every Sinvonix product runs **standalone or as part of the unified platform** — your call. Most clients start with one product (often CORDON or Managed Security) and expand as the relationship proves out, rather than committing to all five up front.",
    suggestions: ["Recommend a product", "Schedule a briefing"],
  },
  {
    id: "partners",
    keywords: ["partner", "partners", "alliance", "google cloud", "mandiant", "idemia", "trellix", "nutanix", "technology partner"],
    answer:
      "We deliver through **world-class technology alliances** — including Google Cloud, Mandiant, IDEMIA, Trellix, Nutanix, AhnLab, NETAND and FORCS. Global technology, brought to local ASEAN markets with implementation expertise that scales.",
    suggestions: ["Schedule a briefing"],
  },
  {
    id: "integration",
    keywords: ["api", "integration", "integrate", "third party", "core banking", "webhook", "connect", "sync"],
    answer:
      "Our products connect into your existing core banking, telco or infrastructure systems, with zero-downtime cutover as part of the deployment journey. Integration & Deployment is a dedicated step in our process, not an afterthought.",
    suggestions: ["How does your process work?", "Schedule a briefing"],
  },
  {
    id: "track-record",
    keywords: ["track record", "case study", "case studies", "proof", "results", "examples", "deployments", "live"],
    answer:
      "Three deployment tracks run live in production today, not in pilot: **24/7 Threat Monitoring & Endpoint Security** (Managed Security), **Omnichannel Customer Operations** (Conversa CI Hub), and **Privileged Access & Governance** (zero-trust IAM). All recurring revenue, across multiple ASEAN markets.",
    suggestions: ["Schedule a briefing", "Recommend a product"],
  },
  {
    id: "regions",
    keywords: ["region", "regions", "market", "markets", "country", "countries", "where", "asean", "location", "office"],
    answer:
      "Headquartered in **Singapore**, with active deployments in **Brunei, Cambodia and Laos**, partner networks in the **Philippines and Malaysia**, and a subsidiary in **Australia** — seven ASEAN markets served today.",
    suggestions: ["Which industries do you serve?", "Schedule a briefing"],
  },
  {
    id: "industries",
    keywords: ["industry", "industries", "sector", "banking", "finance", "telco", "telecommunications", "government", "critical infrastructure"],
    answer:
      "Primarily **Banking & Finance**, **Telecommunications**, **Payment Networks**, and **Government & Critical Information Infrastructure** — built for institutions with real regulatory exposure, not generic SMB tooling.",
    suggestions: ["Recommend a product", "Schedule a briefing"],
  },
  {
    id: "contact",
    keywords: ["contact", "email", "phone", "reach", "get in touch", "talk", "call", "human", "sales"],
    answer:
      "You can reach the team at **hello@sinvonix.com**, or I can connect you with a solution architect right now. Prefer to pick a time? I can open our booking calendar.",
    suggestions: ["Talk to an expert", "Schedule a briefing"],
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
