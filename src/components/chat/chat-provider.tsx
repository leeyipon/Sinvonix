"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useScheduler } from "@/components/scheduler/scheduler-provider";
import { scriptedAgent } from "@/lib/chat/engine";
import {
  loadConversation,
  saveConversation,
  clearConversation,
} from "@/lib/chat/store";
import type {
  AssistantTurn,
  Attachment,
  Collected,
  FlowStepId,
  Lead,
  Message,
  QuickActionId,
  UserAction,
} from "@/lib/chat/types";

/* ---- context shape --------------------------------------------------- */

type ChatContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  messages: Message[];
  isTyping: boolean;
  suggestions: string[];
  unread: number;
  /** True until at least one non-welcome message exists. */
  isFresh: boolean;
  sendText: (text: string, attachments?: Attachment[]) => void;
  sendOption: (step: FlowStepId, value: string, label: string) => void;
  sendFeatures: (values: string[]) => void;
  sendQuick: (id: QuickActionId, label: string) => void;
  sendLead: (lead: Lead) => void;
  reset: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within <ChatProvider>");
  return ctx;
}

/* ---- helpers --------------------------------------------------------- */

function uid(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** "Thinking" delay before a turn appears, scaled to its length. */
function typingDelay(text?: string): number {
  if (prefersReducedMotion()) return 120;
  const len = text?.length ?? 0;
  return 420 + Math.min(len * 6, 1100);
}

/** How long the typewriter reveal runs for a turn. */
function revealDuration(text?: string): number {
  if (prefersReducedMotion() || !text) return 0;
  return Math.min(text.length * 14, 1200);
}

/* ---- provider -------------------------------------------------------- */

export function ChatProvider({ children }: { children: ReactNode }) {
  const scheduler = useScheduler();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [unread, setUnread] = useState(0);

  // Engine context mirrored in refs so async sends never read stale state.
  const collectedRef = useRef<Collected>({});
  const scoreRef = useRef(0);
  const openRef = useRef(false);
  const hydratedRef = useRef(false);

  useEffect(() => {
    openRef.current = isOpen;
  }, [isOpen]);

  /* ---- hydrate once ---- */
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;

    const saved = loadConversation();
    if (saved && saved.messages.length > 0) {
      collectedRef.current = saved.collected ?? {};
      scoreRef.current = saved.leadScore ?? 0;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages(saved.messages);
      return;
    }
    // Fresh session → seed the welcome turn(s).
    const welcome = scriptedAgent.welcome().map((t) => turnToMessage(t));
    setMessages(welcome);
    setUnread(welcome.length);
  }, []);

  /* ---- persist on change ---- */
  useEffect(() => {
    if (!hydratedRef.current || messages.length === 0) return;
    saveConversation({
      messages,
      collected: collectedRef.current,
      leadScore: scoreRef.current,
      updatedAt: Date.now(),
    });
  }, [messages]);

  /* ---- message helpers ---- */

  const addMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg]);
    if (msg.role === "assistant" && !openRef.current) {
      setUnread((u) => u + 1);
    }
  }, []);

  const clearStreaming = useCallback((id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, streaming: false } : m))
    );
  }, []);

  /* ---- core send loop ---- */

  const run = useCallback(
    async (action: UserAction, userMessage?: Message) => {
      if (userMessage) addMessage(userMessage);

      const result = scriptedAgent.respond(
        { collected: collectedRef.current, leadScore: scoreRef.current },
        action
      );
      collectedRef.current = result.collected;
      scoreRef.current = result.leadScore;
      setSuggestions([]);

      for (const turn of result.turns) {
        setIsTyping(true);
        await sleep(typingDelay(turn.text));
        setIsTyping(false);

        const msg = turnToMessage(turn, revealDuration(turn.text) > 0);
        addMessage(msg);

        if (msg.streaming) {
          await sleep(revealDuration(turn.text));
          clearStreaming(msg.id);
        }
      }

      setSuggestions(result.suggestions ?? []);
      if (result.effect === "open-scheduler") {
        // Give the closing message a beat to land before the modal opens.
        await sleep(500);
        scheduler.open();
      }
    },
    [addMessage, clearStreaming, scheduler]
  );

  /* ---- public send helpers ---- */

  const sendText = useCallback(
    (text: string, attachments?: Attachment[]) => {
      const trimmed = text.trim();
      if (!trimmed && !attachments?.length) return;
      const userMsg: Message = {
        id: uid(),
        role: "user",
        text: trimmed || undefined,
        attachments,
        createdAt: Date.now(),
      };
      run({ type: "text", text: trimmed, attachments }, userMsg);
    },
    [run]
  );

  const sendOption = useCallback(
    (step: FlowStepId, value: string, label: string) => {
      run(
        { type: "option", step, value, label },
        { id: uid(), role: "user", text: label, createdAt: Date.now() }
      );
    },
    [run]
  );

  const sendFeatures = useCallback(
    (values: string[]) => {
      const label = values.length ? values.join(", ") : "No specific features yet";
      run(
        { type: "features", values },
        { id: uid(), role: "user", text: label, createdAt: Date.now() }
      );
    },
    [run]
  );

  const sendQuick = useCallback(
    (id: QuickActionId, label: string) => {
      run(
        { type: "quick", action: id },
        { id: uid(), role: "user", text: label, createdAt: Date.now() }
      );
    },
    [run]
  );

  const sendLead = useCallback(
    (lead: Lead) => {
      run(
        { type: "lead", lead },
        { id: uid(), role: "user", text: "Shared my contact details ✅", createdAt: Date.now() }
      );
    },
    [run]
  );

  const reset = useCallback(() => {
    clearConversation();
    collectedRef.current = {};
    scoreRef.current = 0;
    setSuggestions([]);
    const welcome = scriptedAgent.welcome().map((t) => turnToMessage(t));
    setMessages(welcome);
  }, []);

  /* ---- open/close ---- */

  const open = useCallback(() => {
    setIsOpen(true);
    setUnread(0);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => {
    setIsOpen((v) => {
      if (!v) setUnread(0);
      return !v;
    });
  }, []);

  const isFresh = useMemo(
    () => messages.filter((m) => m.role === "user").length === 0,
    [messages]
  );

  const value: ChatContextValue = {
    isOpen,
    open,
    close,
    toggle,
    messages,
    isTyping,
    suggestions,
    unread,
    isFresh,
    sendText,
    sendOption,
    sendFeatures,
    sendQuick,
    sendLead,
    reset,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

/* ---- turn → message -------------------------------------------------- */

function turnToMessage(turn: AssistantTurn, streaming = false): Message {
  return {
    id: uid(),
    role: "assistant",
    text: turn.text,
    widget: turn.widget,
    createdAt: Date.now(),
    streaming: streaming && !!turn.text,
  };
}
