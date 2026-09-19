/**
 * Lead scoring. As the visitor reveals intent (picks a solution, an enterprise
 * size, requests an estimate, submits their details, books a call) the score
 * climbs. The engine uses the band to decide when to proactively offer a human.
 */

import type { Collected, Lead, LeadBand } from "./types";

export const SCORE = {
  solution: 10,
  industry: 5,
  perFeature: 2,
  featureCap: 12,
  sizeStartup: 5,
  sizeSmall: 10,
  sizeMedium: 15,
  sizeEnterprise: 25,
  estimate: 20,
  booking: 30,
  leadSubmitted: 40,
  budgetProvided: 15,
} as const;

export function bandFor(score: number): LeadBand {
  if (score >= 60) return "hot";
  if (score >= 30) return "warm";
  return "cold";
}

/** Recompute a score purely from what's been collected (idempotent). */
export function scoreFromCollected(collected: Collected): number {
  let s = 0;
  if (collected.solution && collected.solution !== "unsure") s += SCORE.solution;
  if (collected.industry) s += SCORE.industry;
  if (collected.size) {
    s += {
      startup: SCORE.sizeStartup,
      small: SCORE.sizeSmall,
      medium: SCORE.sizeMedium,
      enterprise: SCORE.sizeEnterprise,
    }[collected.size];
  }
  s += Math.min((collected.features?.length ?? 0) * SCORE.perFeature, SCORE.featureCap);
  return s;
}

/** Attach a computed score + band to a submitted lead. */
export function scoreLead(lead: Lead, baseScore: number): Lead {
  let score = baseScore + SCORE.leadSubmitted;
  if (lead.budget && lead.budget !== "Not sure") score += SCORE.budgetProvided;
  return { ...lead, score, band: bandFor(score), createdAt: Date.now() };
}
