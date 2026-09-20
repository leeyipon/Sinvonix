"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, Sparkles, CalendarDays, ShieldAlert, ShieldCheck, type LucideIcon } from "lucide-react";
import { useChat } from "./chat-provider";
import { NimbusMascot } from "./mascot";
import type { QuickActionId } from "@/lib/chat/types";

/**
 * A small quick-action card anchored above the sticky launcher. It lets
 * visitors fire the most common actions (or open the full chat) from any
 * screen, without opening the panel first. Dismissible per session.
 */

const DISMISS_KEY = "nimbus.teaser.dismissed";

const SHORTCUTS: { id: QuickActionId; label: string; icon: LucideIcon }[] = [
  { id: "recommend", label: "Recommend a product", icon: Sparkles },
  { id: "cordon", label: "Fraud & AML", icon: ShieldAlert },
  { id: "managed-security", label: "Managed Security", icon: ShieldCheck },
  { id: "book", label: "Schedule a briefing", icon: CalendarDays },
];

export function ChatTeaser() {
  const { isOpen, open, sendQuick } = useChat();
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  // Reveal shortly after load, unless dismissed this session or chat is open.
  useEffect(() => {
    if (isOpen) return;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {}
    if (dismissed) return;
    const t = setTimeout(() => setShow(true), 3200);
    return () => clearTimeout(t);
  }, [isOpen]);

  function dismiss() {
    setShow(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  }

  function fire(id: QuickActionId, label: string) {
    dismiss();
    open();
    sendQuick(id, label);
  }

  // Never show alongside the open panel.
  const visible = show && !isOpen;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "bottom right" }}
          className="glass pointer-events-auto absolute bottom-24 right-4 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-[20px] sm:right-6"
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 bg-[linear-gradient(120deg,var(--color-electric),var(--color-indigo)_55%,var(--color-purple))] px-3.5 py-2.5 text-white">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur">
              <NimbusMascot animate className="h-7 w-7" />
            </span>
            <p className="min-w-0 flex-1 text-[13px] font-semibold leading-tight">
              Hi, I&apos;m Navi 👋 How can I help?
            </p>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Shortcuts */}
          <div className="grid grid-cols-2 gap-1.5 p-2.5">
            {SHORTCUTS.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => fire(s.id, s.label)}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-surface px-2.5 py-2 text-left text-[12px] font-medium text-content transition-colors hover:border-brand-500/50 hover:bg-brand-500/[0.06]"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-[linear-gradient(135deg,var(--color-electric),var(--color-purple))] text-white">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 leading-tight">{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Open full chat */}
          <button
            onClick={() => {
              dismiss();
              open();
            }}
            className="w-full cursor-pointer border-t border-line px-3.5 py-2.5 text-[12px] font-semibold text-[color:var(--accent-ink)] transition-colors hover:bg-brand-500/[0.06]"
          >
            Or ask me anything →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
