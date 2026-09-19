"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useChat } from "./chat-provider";
import { ChatPanel } from "./chat-panel";
import { ChatLauncher } from "./chat-launcher";
import { ChatTeaser } from "./chat-teaser";

/**
 * Mounts the floating launcher and the animated chat panel via a portal so the
 * widget floats above the page regardless of layout/stacking context.
 */
export function ChatWidget() {
  const { isOpen } = useChat();
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[90]">
      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="glass pointer-events-auto fixed bottom-24 right-4 z-[91] flex h-[min(640px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-[20px] sm:right-6"
          >
            <ChatPanel />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick-action teaser (only while the panel is closed) */}
      <ChatTeaser />

      {/* Launcher */}
      <div className="fixed bottom-6 right-4 z-[92] sm:right-6">
        <ChatLauncher />
      </div>
    </div>,
    document.body
  );
}
