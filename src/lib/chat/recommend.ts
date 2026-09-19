/**
 * Turns collected answers into a recommended solution package (the "Step 5"
 * output): a named platform, the modules it includes, a timeline, and the
 * recommended team. Deterministic — same inputs always yield the same result.
 */

import type { Collected, Recommendation, SolutionId } from "./types";
import { buildTeam, timelineFor } from "./estimator";

const BASE_PACKAGE: Record<SolutionId, { title: string; modules: string[] }> = {
  web: {
    title: "Custom Web Platform",
    modules: ["Web application", "Admin dashboard", "Cloud hosting"],
  },
  mobile: {
    title: "Cross-Platform Mobile App",
    modules: ["Mobile app (iOS & Android)", "Backend API", "Admin dashboard"],
  },
  ai: {
    title: "AI Solution",
    modules: ["AI engine", "Knowledge base", "Admin & analytics", "Cloud hosting"],
  },
  system: {
    title: "Business Management Platform",
    modules: ["Core platform", "Admin dashboard", "Reporting & analytics", "Cloud hosting"],
  },
  automation: {
    title: "Workflow Automation Suite",
    modules: ["Automation engine", "Integrations layer", "Monitoring dashboard"],
  },
  design: {
    title: "Product Design Engagement",
    modules: ["UX research", "Product design", "Design system", "Interactive prototype"],
  },
  unsure: {
    title: "Tailored Digital Solution",
    modules: ["Discovery workshop", "Solution blueprint", "Phased build plan"],
  },
};

/** Extra modules that a specific selected feature adds to the package. */
const FEATURE_MODULE: Record<string, string> = {
  "GPS / fleet tracking": "Real-time GPS & fleet tracking",
  "Driver management": "Driver mobile app",
  "Route planning": "AI route optimization",
  "Delivery tracking": "Customer tracking portal",
  "Customer portal": "Customer portal",
  "Warehouse": "Warehouse management",
  "Inventory": "Inventory management",
  "Payments & billing": "Payments & billing",
  "In-app payments": "In-app payments",
  "AI agent": "Autonomous AI agent",
  "AI chatbot": "Conversational AI chatbot",
  "Voice AI": "Voice AI interface",
  "Knowledge base (RAG)": "Retrieval knowledge base",
  "Analytics": "Analytics dashboard",
  "Analytics dashboard": "Analytics dashboard",
  "Analytics & BI": "BI & analytics layer",
  "Multi-tenant / SaaS": "Multi-tenant SaaS architecture",
  "CRM": "CRM module",
  "ERP": "ERP module",
  "POS": "POS module",
};

/**
 * Industry-flavoured platform names, so the recommendation reads bespoke
 * rather than generic (e.g. "Logistics Management Platform").
 */
function titleFor(collected: Collected): string {
  const base = BASE_PACKAGE[collected.solution ?? "unsure"].title;
  const { industry, solution } = collected;
  if (solution === "system" && industry && industry !== "Other") {
    return `${industry} Management Platform`;
  }
  if (industry && industry !== "Other" && solution && solution !== "unsure") {
    return `${industry} ${base}`;
  }
  return base;
}

export function recommend(collected: Collected): Recommendation {
  const solution = collected.solution ?? "unsure";
  const base = BASE_PACKAGE[solution];
  const features = collected.features ?? [];

  // Merge base modules with feature-driven modules, de-duplicated, order-stable.
  const modules: string[] = [...base.modules];
  for (const f of features) {
    const mod = FEATURE_MODULE[f] ?? f;
    if (!modules.some((m) => m.toLowerCase() === mod.toLowerCase())) {
      modules.push(mod);
    }
  }

  const team = buildTeam(collected);
  const timeline = timelineFor(collected);

  const summary = summaryLine(collected, modules.length);

  return { title: titleFor(collected), summary, modules, timeline, team };
}

function summaryLine(collected: Collected, moduleCount: number): string {
  const industry = collected.industry && collected.industry !== "Other"
    ? ` for ${collected.industry.toLowerCase()}`
    : "";
  return `Based on your requirements, here's the solution we'd recommend${industry} — a ${moduleCount}-part build our team can start scoping right away.`;
}
