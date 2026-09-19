"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, Users } from "lucide-react";
import { JoinWidget } from "@/components/join/join-widget";

type JoinCtx = { open: (role?: string) => void; close: () => void };
const Ctx = createContext<JoinCtx | null>(null);

/** Trigger the "Join Our Team" popup from any client component. */
export function useJoin() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useJoin must be used within <JoinProvider>");
  return ctx;
}

export function JoinProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState<string | undefined>(undefined);

  const open = useCallback((r?: string) => {
    setRole(r);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      <JoinDialog open={isOpen} role={role} onClose={close} />
    </Ctx.Provider>
  );
}

function JoinDialog({
  open,
  role,
  onClose,
}: {
  open: boolean;
  role?: string;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="join-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
        >
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Join our team"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[101] flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-2xl sm:m-4 sm:rounded-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--color-electric),var(--color-purple))] text-white">
                  <Users className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-base font-semibold leading-tight text-content">
                    Join our team
                  </h2>
                  <p className="text-xs text-muted">
                    Chat with us on Telegram, or send in your application.
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors hover:text-content"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto">
              <JoinWidget role={role} onDone={onClose} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
