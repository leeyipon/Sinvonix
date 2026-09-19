/**
 * Core types for the AI Solutions Consultant chat.
 *
 * The agent lives behind the {@link AgentEngine} interface (see engine.ts):
 * the scripted engine implements it today, and a real LLM-backed engine can
 * implement the same shape later without touching the UI.
 */

/* ---- guided flow vocabulary ------------------------------------------ */

export type SolutionId =
  | "web"
  | "mobile"
  | "ai"
  | "system"
  | "automation"
  | "design"
  | "unsure";

export type SizeId = "startup" | "small" | "medium" | "enterprise";

/** The steps of the guided qualification flow, in order. */
export type FlowStepId = "solution" | "industry" | "size" | "features";

/** What the agent has collected about the visitor's project so far. */
export type Collected = {
  solution?: SolutionId;
  industry?: string;
  size?: SizeId;
  features?: string[];
};

/* ---- messages -------------------------------------------------------- */

export type Attachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  /** Object URL for image previews; undefined for non-images. */
  previewUrl?: string;
};

export type Role = "user" | "assistant";

export type Message = {
  id: string;
  role: Role;
  /** Markdown-ish text (bold, lists, links, inline code, code fences). */
  text?: string;
  attachments?: Attachment[];
  /** An interactive card rendered beneath the bubble. */
  widget?: Widget;
  createdAt: number;
  /** True while the assistant text is still "typing" in. */
  streaming?: boolean;
};

/* ---- inline widgets (returned by the engine) ------------------------- */

export type Option = { value: string; label: string; hint?: string };

export type Widget =
  | { kind: "options"; step: FlowStepId; options: Option[]; multi?: boolean }
  | { kind: "recommendation"; data: Recommendation }
  | { kind: "estimate"; data: Estimate }
  | { kind: "lead-form" }
  | { kind: "escalation" };

/* ---- recommendation + estimate payloads ------------------------------ */

export type Recommendation = {
  title: string;
  summary: string;
  modules: string[];
  timeline: string;
  team: string[];
};

export type Estimate = {
  complexity: "Starter" | "Standard" | "Advanced" | "Enterprise-grade";
  teamSize: number;
  team: string[];
  timeline: string;
  stack: string[];
  phases: { name: string; desc: string }[];
  costLow: number;
  costHigh: number;
};

/* ---- leads ----------------------------------------------------------- */

export type Lead = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  industry: string;
  budget: string;
  timeline: string;
  description: string;
  /** Snapshot of what the guided flow collected, for context. */
  collected?: Collected;
  score?: number;
  band?: LeadBand;
  createdAt?: number;
};

export type LeadBand = "cold" | "warm" | "hot";

/* ---- engine contract ------------------------------------------------- */

/** One assistant "turn": a bubble of text and/or an inline widget. */
export type AssistantTurn = { text?: string; widget?: Widget };

/** A structured action the UI hands to the engine. */
export type UserAction =
  | { type: "text"; text: string; attachments?: Attachment[] }
  | { type: "option"; step: FlowStepId; value: string; label: string }
  | { type: "features"; values: string[] }
  | { type: "quick"; action: QuickActionId }
  | { type: "lead"; lead: Lead }
  | { type: "intent"; intent: "estimate" | "booking" | "human" | "restart" };

export type EngineContext = { collected: Collected; leadScore: number };

export type EngineResult = {
  turns: AssistantTurn[];
  collected: Collected;
  leadScore: number;
  /** A side-effect the provider must run (e.g. open the booking modal). */
  effect?: "open-scheduler";
  /** Suggested follow-up prompts shown as chips under the composer. */
  suggestions?: string[];
};

export interface AgentEngine {
  /** The opening assistant turn(s) shown when the chat first mounts. */
  welcome(): AssistantTurn[];
  /** Produce the next assistant turn(s) for a user action. Pure function. */
  respond(ctx: EngineContext, action: UserAction): EngineResult;
}

/* ---- quick actions --------------------------------------------------- */

export type QuickActionId =
  | "web"
  | "mobile"
  | "ai-agent"
  | "logistics"
  | "crm"
  | "erp"
  | "cloud"
  | "automation"
  | "design"
  | "transformation"
  | "book"
  | "estimate";
