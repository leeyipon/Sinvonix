/**
 * Lead scoring. As the visitor reveals intent (picks a product, a deployment
 * scope, requests a recommendation, submits their details, books a briefing)
 * the score climbs. The engine uses the band to decide when to proactively
 * offer a human.
 */

import type { Collected, Lead, LeadBand } from "./types";

export const SCORE = {
  solution: 10,
  industry: 5,
  perFeature: 2,
  featureCap: 12,
  scopeStandalone: 10,
  scopeMulti: 15,
  scopePlatform: 25,
  scopeEvaluating: 5,
  recommend: 20,
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
      standalone: SCORE.scopeStandalone,
      multi: SCORE.scopeMulti,
      platform: SCORE.scopePlatform,
      evaluating: SCORE.scopeEvaluating,
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
