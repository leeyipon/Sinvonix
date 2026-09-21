/**
 * Static definitions for the guided qualification flow:
 * need → industry → deployment scope → capabilities.
 *
 * The engine consumes these to build `options` widgets and to interpret the
 * visitor's selections. Feature sets are pulled directly from each product's
 * real capability list in `@/lib/site`, so this stays in sync automatically.
 */

import type { Option, SolutionId, SizeId } from "./types";
import { getService } from "@/lib/site";

export const SOLUTIONS: (Option & { value: SolutionId })[] = [
  { value: "cordon", label: "Fraud & AML Risk", hint: "Real-time transaction screening" },
  { value: "aevix", label: "Payment & Infrastructure Security", hint: "Post-quantum readiness, POS hardening" },
  { value: "conversa-ci-hub", label: "Contact Centre Operations", hint: "Omnichannel routing & agent assist" },
  { value: "chronicle-ai", label: "Compliance & Automation", hint: "AI orchestration, predictive analytics" },
  { value: "managed-security", label: "Managed Detection & Response", hint: "24/7 MDR, endpoint, IAM" },
  { value: "unsure", label: "Not sure yet", hint: "Help me figure it out" },
];

export const INDUSTRIES: Option[] = [
  { value: "Banking & Finance", label: "Banking & Finance" },
  { value: "Telecommunications", label: "Telecommunications" },
  { value: "Payment Networks", label: "Payment Networks" },
  { value: "Government & CII", label: "Government & CII" },
  { value: "Other", label: "Other / general" },
];

export const SIZES: (Option & { value: SizeId })[] = [
  { value: "standalone", label: "One Product", hint: "A single product, standalone" },
  { value: "multi", label: "A Few Products", hint: "Two or three, integrated" },
  { value: "platform", label: "Full Platform", hint: "All five, unified" },
  { value: "evaluating", label: "Still Evaluating", hint: "Help me scope it" },
];

/** Feature options offered at step 4, keyed by chosen product — sourced
 *  directly from that product's real capability list. */
export const FEATURES: Record<SolutionId, Option[]> = {
  cordon: pointsFor("cordon"),
  aevix: pointsFor("aevix"),
  "conversa-ci-hub": pointsFor("conversa-ci-hub"),
  "chronicle-ai": pointsFor("chronicle-ai"),
  "managed-security": pointsFor("managed-security"),
  unsure: [],
};

function pointsFor(slug: string): Option[] {
  const service = getService(slug);
  return (service?.points ?? []).map((p) => ({ value: p, label: p }));
}

export const SOLUTION_LABEL: Record<SolutionId, string> = {
  cordon: "fraud & AML solution",
  aevix: "payment security solution",
  "conversa-ci-hub": "contact centre solution",
  "chronicle-ai": "automation solution",
  "managed-security": "managed security solution",
  unsure: "solution",
};

export const SIZE_LABEL: Record<SizeId, string> = {
  standalone: "a single product",
  multi: "a few integrated products",
  platform: "the full unified platform",
  evaluating: "still evaluating",
};
