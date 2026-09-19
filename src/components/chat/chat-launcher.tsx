"use client";

import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useChat } from "./chat-provider";
import { NimbusMascot } from "./mascot";

/** Floating action button that opens/closes the chat. */
export function ChatLauncher() {
  const { toggle, isOpen, unread } = useChat();
  const reduce = useReducedMotion();

  return (
    <motion.button
      onClick={toggle}
      aria-label={isOpen ? "Close chat" : "Open AI consultant chat"}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.4 }}
      whileHover={reduce ? undefined : { scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="pointer-events-auto relative grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-electric),var(--color-indigo),var(--color-purple))] text-white shadow-[0_12px_36px_-8px_color-mix(in_oklab,var(--color-indigo)_70%,transparent)]"
    >
      {/* Pulse ring while closed */}
      {!isOpen && !reduce && (
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[color:var(--color-indigo)]" />
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isOpen ? "close" : "open"}
          initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
          transition={{ duration: 0.18 }}
          className="relative"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <NimbusMascot animate className="h-9 w-9 drop-shadow-[0_2px_6px_rgba(4,10,40,0.35)]" />
          )}
        </motion.span>
      </AnimatePresence>

      {/* Unread badge */}
      {!isOpen && unread > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full border-2 border-bg bg-error-500 px-1 text-[10px] font-bold text-white">
          {unread}
        </span>
      )}
    </motion.button>
  );
}
