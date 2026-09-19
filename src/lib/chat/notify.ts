import type { Lead } from "./types";

/** Fire-and-forget POST to the real backend notification endpoint. */
export function notifyLead(lead: Lead): void {
  if (typeof window === "undefined") return;
  fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  }).catch((err) => {
    console.error("Failed to notify backend of new lead:", err);
  });
}
