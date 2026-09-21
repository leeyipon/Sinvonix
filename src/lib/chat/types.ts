/**
 * Core types for the AI Solutions Consultant chat.
 *
 * The agent lives behind the {@link AgentEngine} interface (see engine.ts):
 * the scripted engine implements it today, and a real LLM-backed engine can
 * implement the same shape later without touching the UI.
 */

/* ---- guided flow vocabulary ------------------------------------------ */

/** Which Sinvonix product the visitor's need points to. */
export type SolutionId =
  | "cordon"
  | "aevix"
  | "conversa-ci-hub"
  | "chronicle-ai"
  | "managed-security"
  | "unsure";

/** Deployment scope (field/type name kept as `size` for minimal churn). */
export type SizeId = "standalone" | "multi" | "platform" | "evaluating";

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
  | { kind: "lead-form" }
  | { kind: "escalation" };

/* ---- recommendation payload -------------------------------------------
 * Sinvonix doesn't publish self-serve pricing, so there's no dollar
 * "Estimate" type here — every guided flow ends in a product recommendation
 * and a call to schedule a briefing, never a fabricated cost range. */

export type Recommendation = {
  title: string;
  summary: string;
  /** Capabilities included in the recommended product(s). */
  modules: string[];
  timeline: string;
  /** How the visitor said they want to deploy (standalone / multi / platform). */
  deployment: string;
  /** Short "why it fits" highlight tags. */
  team: string[];
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
  | "cordon"
  | "aevix"
  | "conversa-ci-hub"
  | "chronicle-ai"
  | "managed-security"
  | "recommend"
  | "book";
