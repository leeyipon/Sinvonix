"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "@/components/chat/chat-provider";
import type { FlowStepId, Option } from "@/lib/chat/types";

/**
 * Renders the option set for a guided-flow step. Single-select steps commit on
 * click; the multi-select "features" step accumulates picks and commits on
 * Continue. `active` is false for historical widgets so old steps can't be
 * re-triggered.
 */
export function OptionChips({
  step,
  options,
  multi,
  active,
}: {
  step: FlowStepId;
  options: Option[];
  multi?: boolean;
  active: boolean;
}) {
  const { sendOption, sendFeatures } = useChat();
  const [selected, setSelected] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const locked = done || !active;

  if (multi) {
    function toggle(value: string) {
      setSelected((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    }
    return (
      <div className="mt-2.5">
        <div className="flex flex-wrap gap-1.5">
          {options.map((opt) => {
            const on = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                disabled={locked}
                onClick={() => toggle(opt.value)}
                className={cn(
                  "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-default",
                  on
                    ? "border-transparent bg-[linear-gradient(100deg,var(--color-electric),var(--color-purple))] text-white"
                    : "border-line text-content hover:border-brand-500/50 disabled:opacity-60"
                )}
              >
                {on && <Check className="mr-1 inline h-3 w-3" />}
                {opt.label}
              </button>
            );
          })}
        </div>
        <button
          disabled={locked}
          onClick={() => {
            setDone(true);
            sendFeatures(selected);
          }}
          className={cn(
            "mt-3 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[linear-gradient(100deg,var(--color-electric),var(--color-indigo),var(--color-purple))] px-4 py-2 text-xs font-semibold text-white transition-opacity disabled:cursor-default disabled:opacity-50",
          )}
        >
          Continue {selected.length > 0 && `(${selected.length})`}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="mt-2.5 flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          disabled={locked}
          title={opt.hint}
          onClick={() => {
            setDone(true);
            sendOption(step, opt.value, opt.label);
          }}
          className={cn(
            "cursor-pointer rounded-full border border-line px-3 py-1.5 text-left text-xs font-medium text-content transition-colors hover:border-brand-500/50 hover:bg-brand-500/[0.06] disabled:cursor-default disabled:opacity-55 disabled:hover:bg-transparent"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
