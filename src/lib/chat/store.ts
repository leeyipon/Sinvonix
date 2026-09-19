/**
 * localStorage persistence — a stand-in for a real CRM/backend. Keeps the
 * conversation across refreshes and stores captured leads so they can be
 * inspected. All calls are SSR-safe and swallow quota/serialization errors.
 */

import type { Collected, Lead, Message } from "./types";

const CONV_KEY = "nimbus.chat.v1";
const LEADS_KEY = "nimbus.leads.v1";

export type PersistedConversation = {
  messages: Message[];
  collected: Collected;
  leadScore: number;
  updatedAt: number;
};

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadConversation(): PersistedConversation | null {
  if (typeof window === "undefined") return null;
  const data = safeParse<PersistedConversation>(localStorage.getItem(CONV_KEY));
  if (!data || !Array.isArray(data.messages)) return null;
  // Strip any transient object-URL previews (they don't survive a reload) and
  // clear stale "streaming" flags so restored messages render fully.
  data.messages = data.messages.map((m) => ({
    ...m,
    streaming: false,
    attachments: m.attachments?.map((a) => ({ ...a, previewUrl: undefined })),
  }));
  return data;
}

export function saveConversation(data: PersistedConversation): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONV_KEY, JSON.stringify(data));
  } catch {
    /* quota or serialization — non-fatal */
  }
}

export function clearConversation(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CONV_KEY);
  } catch {
    /* non-fatal */
  }
}

export function loadLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  return safeParse<Lead[]>(localStorage.getItem(LEADS_KEY)) ?? [];
}

/** Append a captured lead (the "save to CRM" step). */
export function saveLead(lead: Lead): void {
  if (typeof window === "undefined") return;
  try {
    const leads = loadLeads();
    leads.push(lead);
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  } catch {
    /* non-fatal */
  }
}
