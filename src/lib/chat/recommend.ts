/**
 * Turns collected answers into a product recommendation (the "Step 5"
 * output): which Sinvonix product(s) fit, the capabilities included, an
 * honest qualitative timeline, and the deployment scope the visitor chose.
 * Deterministic — same inputs always yield the same result. There is no
 * dollar figure here: Sinvonix doesn't publish self-serve pricing, so every
 * path ends in a recommendation to schedule a briefing, not a quote.
 */

import type { Collected, Recommendation, SizeId } from "./types";
import { getService, services } from "@/lib/site";

const DEPLOYMENT_LABEL: Record<SizeId, string> = {
  standalone: "Standalone product",
  multi: "A few integrated products",
  platform: "Unified platform",
  evaluating: "To be scoped together",
};

const TIMELINE_BY_SCOPE: Record<SizeId, string> = {
  standalone: "Live in a few weeks once scoped",
  multi: "Phased rollout, typically a few months",
  platform: "Phased rollout across the platform — timeline set at your briefing",
  evaluating: "We'll scope timeline together once priorities are clear",
};

const HIGHLIGHTS = ["Senior-led engagement", "Compliance-first design", "Standalone or unified"];

// All five real products, named — not vague capability phrases. Sourced
// directly from `services` so it stays in sync if a product's tagline changes.
const DEFAULT_MODULES = services.map((s) => `${s.title} — ${s.tagline.replace(/\.$/, "")}`);

function titleFor(collected: Collected): string {
  const industry = collected.industry && collected.industry !== "Other" ? collected.industry : undefined;

  if (collected.size === "platform") {
    return industry ? `The Unified Platform for ${industry}` : "The Unified Sinvonix Platform";
  }

  const solution = collected.solution ?? "unsure";
  const service = solution !== "unsure" ? getService(solution) : undefined;
  const base = service ? service.title : "The right fit";
  return industry ? `${base} for ${industry}` : base;
}

function summaryLine(collected: Collected, serviceTitle?: string): string {
  const industry = collected.industry && collected.industry !== "Other"
    ? ` for ${collected.industry.toLowerCase()}`
    : "";

  if (collected.size === "platform") {
    return `Based on what you've shared, the full unified platform looks like the right fit${industry} — here's what's included.`;
  }
  if (!serviceTitle) {
    return `Based on what you've shared, here's where Sinvonix can help${industry} — let's confirm the right fit on a briefing.`;
  }
  return `Based on what you've shared, ${serviceTitle}${industry} looks like the right starting point — here's what's included.`;
}

export function recommend(collected: Collected): Recommendation {
  const solution = collected.solution ?? "unsure";
  const size = collected.size ?? "evaluating";
  const service = solution !== "unsure" ? getService(solution) : undefined;
  const features = collected.features ?? [];

  const modules =
    features.length > 0
      ? features
      : collected.size === "platform"
        ? DEFAULT_MODULES
        : (service?.points.slice(0, 4) ?? DEFAULT_MODULES);

  return {
    title: titleFor(collected),
    summary: summaryLine(collected, service?.title),
    modules,
    timeline: TIMELINE_BY_SCOPE[size],
    deployment: DEPLOYMENT_LABEL[size],
    team: HIGHLIGHTS,
  };
}
