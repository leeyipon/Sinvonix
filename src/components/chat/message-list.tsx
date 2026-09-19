"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";
import { NimbusMascot } from "./mascot";
import { useChat } from "./chat-provider";

/** Scrolling transcript. The newest assistant message is the only "active" one
 *  (its widget stays interactive); older widgets are locked. */
export function MessageList() {
  const { messages, isTyping } = useChat();
  const endRef = useRef<HTMLDivElement>(null);

  const lastAssistantId = [...messages].reverse().find((m) => m.role === "assistant")?.id;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4">
      {messages.map((m) => (
        <MessageBubble
          key={m.id}
          message={m}
          active={m.id === lastAssistantId && !isTyping}
        />
      ))}

      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-2"
          >
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-electric),var(--color-purple))]">
              <NimbusMascot className="h-6 w-6" />
            </span>
            <div className="glass rounded-2xl rounded-bl-md px-2 py-1">
              <TypingIndicator />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={endRef} />
    </div>
  );
}
