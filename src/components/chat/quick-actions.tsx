"use client";

import { Sparkles } from "lucide-react";
import { QUICK_ACTIONS } from "@/lib/chat/engine";
import { useChat } from "./chat-provider";

/** The suggested quick-action chips shown at the start of a conversation. */
export function QuickActions() {
  const { sendQuick } = useChat();
  return (
    <div className="px-4 pb-1">
      <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-faint">
        <Sparkles className="h-3 w-3" /> Try one of these
      </p>
      <div className="flex flex-wrap gap-1.5">
        {QUICK_ACTIONS.map((qa) => (
          <button
            key={qa.id}
            onClick={() => sendQuick(qa.id, qa.label)}
            className="cursor-pointer rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-content transition-colors hover:border-brand-500/50 hover:bg-brand-500/[0.06]"
          >
            {qa.label}
          </button>
        ))}
      </div>
    </div>
  );
}
