"use client";

import { X, RefreshCw } from "lucide-react";
import { useChat } from "./chat-provider";
import { MessageList } from "./message-list";
import { Composer } from "./composer";
import { QuickActions } from "./quick-actions";
import { NimbusMascot } from "./mascot";

/** The chat surface: gradient header, transcript, quick actions, composer. */
export function ChatPanel() {
  const { close, reset, isFresh } = useChat();

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="relative shrink-0 overflow-hidden bg-[linear-gradient(120deg,var(--color-electric),var(--color-indigo)_55%,var(--color-purple))] px-4 py-3.5 text-white">
        <div className="relative flex items-center gap-3">
          <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur">
            <NimbusMascot animate className="h-8 w-8" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-success-400" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-semibold leading-tight">AI Solutions Consultant</p>
            <p className="flex items-center gap-1 text-[11px] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-success-300" /> Online · replies instantly
            </p>
          </div>
          <div className="flex items-center gap-0.5">
            <button
              onClick={reset}
              aria-label="Start over"
              title="Start over"
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={close}
              aria-label="Close chat"
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Transcript */}
      <MessageList />

      {/* Quick actions only while the conversation is fresh */}
      {isFresh && <QuickActions />}

      {/* Composer */}
      <Composer />
    </div>
  );
}
