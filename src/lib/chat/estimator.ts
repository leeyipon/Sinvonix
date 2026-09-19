/**
 * Deterministic project estimator. Given the collected answers it derives a
 * complexity band, recommended team, timeline, tech stack, phased plan and an
 * approximate cost range. All ballpark figures are clearly presented as ranges
 * in the UI — this is a guide, not a quote.
 */

import type { Collected, Estimate, SizeId, SolutionId } from "./types";

/* ---- team ------------------------------------------------------------ */

/** Recommended team composition, derived from solution + size + features. */
export function buildTeam(collected: Collected): string[] {
  const { solution = "unsure", size = "small", features = [] } = collected;
  const team: string[] = ["Project Manager"];

  if (solution !== "automation") team.push("UI/UX Designer");
  if (solution !== "design") {
    team.push("Frontend Developer");
    team.push("Backend Developer");
  }

  const wantsMobile =
    solution === "mobile" ||
    features.includes("Driver management") ||
    features.includes("iOS") ||
    features.includes("Android");
  if (wantsMobile) team.push("Mobile Developer");

  const wantsAI =
    solution === "ai" ||
    features.some((f) => f.toLowerCase().includes("ai") || f.includes("Route planning"));
  if (wantsAI) team.push("AI / ML Engineer");

  if (solution !== "design") team.push("QA Engineer");

  if (size === "medium" || size === "enterprise") team.push("DevOps Engineer");
  if (size === "enterprise") team.push("Solution Architect");

  // De-duplicate while preserving order.
  return team.filter((role, i) => team.indexOf(role) === i);
}

/* ---- timeline -------------------------------------------------------- */

const TIMELINE_BY_SIZE: Record<SizeId, [number, number]> = {
  startup: [6, 10], // weeks
  small: [10, 16],
  medium: [16, 26],
  enterprise: [26, 52],
};

/** Human timeline string, widened slightly by feature count. */
export function timelineFor(collected: Collected): string {
  const size = collected.size ?? "small";
  const [lowW, highW] = TIMELINE_BY_SIZE[size];
  const extra = Math.min((collected.features?.length ?? 0), 8) * 0.5; // up to +4 weeks
  const low = Math.round(lowW);
  const high = Math.round(highW + extra);

  // Prefer months once we're past ~8 weeks for readability.
  if (low >= 8) {
    const loM = Math.max(2, Math.round(low / 4.3));
    const hiM = Math.round(high / 4.3);
    return `${loM}–${hiM} months`;
  }
  return `${low}–${high} weeks`;
}

/* ---- tech stack ------------------------------------------------------ */

const STACK_BY_SOLUTION: Record<SolutionId, string[]> = {
  web: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
  mobile: ["React Native", "TypeScript", "Node.js", "PostgreSQL", "Firebase"],
  ai: ["Python", "Next.js", "OpenAI / Claude", "Vector DB", "AWS"],
  system: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
  automation: ["Python", "Node.js", "PostgreSQL", "Docker"],
  design: ["Figma", "Design tokens", "Prototyping"],
  unsure: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
};

/* ---- complexity + cost ----------------------------------------------- */

const SIZE_BASE: Record<SizeId, number> = {
  startup: 25_000,
  small: 55_000,
  medium: 115_000,
  enterprise: 260_000,
};

const SOLUTION_MULT: Record<SolutionId, number> = {
  web: 1,
  mobile: 1.15,
  ai: 1.25,
  system: 1.3,
  automation: 0.9,
  design: 0.6,
  unsure: 1,
};

function complexityFor(collected: Collected): Estimate["complexity"] {
  const size = collected.size ?? "small";
  const featureCount = collected.features?.length ?? 0;
  const score =
    { startup: 0, small: 1, medium: 2, enterprise: 3 }[size] +
    (featureCount >= 8 ? 2 : featureCount >= 4 ? 1 : 0);
  if (score >= 5) return "Enterprise-grade";
  if (score >= 3) return "Advanced";
  if (score >= 1) return "Standard";
  return "Starter";
}

/** Round to the nearest $5k for a clean-looking range. */
function round5k(n: number): number {
  return Math.round(n / 5_000) * 5_000;
}

const PHASES = [
  { name: "Discovery", desc: "Requirements, architecture & success metrics" },
  { name: "Design", desc: "UX flows, UI design & prototype" },
  { name: "Build", desc: "Iterative development in weekly slices" },
  { name: "QA & hardening", desc: "Automated + manual testing, load & security" },
  { name: "Launch & support", desc: "Deployment, monitoring & handover" },
];

export function estimate(collected: Collected): Estimate {
  const solution = collected.solution ?? "unsure";
  const size = collected.size ?? "small";
  const featureCount = collected.features?.length ?? 0;

  const base = SIZE_BASE[size] * SOLUTION_MULT[solution];
  const withFeatures = base * (1 + 0.08 * Math.min(featureCount, 10));
  const costLow = round5k(withFeatures * 0.8);
  const costHigh = round5k(withFeatures * 1.2);

  const team = buildTeam(collected);
  // Design-only engagements skip the QA/launch-heavy phases.
  const phases = solution === "design" ? PHASES.slice(0, 3) : PHASES;

  return {
    complexity: complexityFor(collected),
    teamSize: team.length,
    team,
    timeline: timelineFor(collected),
    stack: STACK_BY_SOLUTION[solution],
    phases,
    costLow,
    costHigh,
  };
}

/** Formats a cost as e.g. "$45k". */
export function formatMoney(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return `$${Math.round(n / 1000)}k`;
}
