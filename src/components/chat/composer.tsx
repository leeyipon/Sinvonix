"use client";

import { useEffect, useRef, useState } from "react";
import { Paperclip, ArrowUp, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "./chat-provider";
import { FOCUS_COMPOSER_EVENT } from "./widgets/escalation-card";
import type { Attachment } from "@/lib/chat/types";

function uid() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Input row: suggestions, pending attachments, textarea, attach + send. */
export function Composer() {
  const { sendText, suggestions, isTyping } = useChat();
  const [value, setValue] = useState("");
  const [pending, setPending] = useState<Attachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Auto-grow the textarea up to a max height.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  // Live-chat escalation focuses the composer.
  useEffect(() => {
    const focus = () => textareaRef.current?.focus();
    window.addEventListener(FOCUS_COMPOSER_EVENT, focus);
    return () => window.removeEventListener(FOCUS_COMPOSER_EVENT, focus);
  }, []);

  // Revoke object URLs when previews are dropped/unmounted.
  useEffect(() => {
    return () => pending.forEach((a) => a.previewUrl && URL.revokeObjectURL(a.previewUrl));
  }, [pending]);

  function submit() {
    if ((!value.trim() && pending.length === 0) || isTyping) return;
    sendText(value, pending.length ? pending : undefined);
    setValue("");
    setPending([]);
  }

  function onFiles(files: FileList | null) {
    if (!files) return;
    const next: Attachment[] = Array.from(files)
      .slice(0, 4)
      .map((f) => ({
        id: uid(),
        name: f.name,
        size: f.size,
        type: f.type,
        previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
      }));
    setPending((prev) => [...prev, ...next].slice(0, 4));
    if (fileRef.current) fileRef.current.value = "";
  }

  function removePending(id: string) {
    setPending((prev) => {
      const gone = prev.find((a) => a.id === id);
      if (gone?.previewUrl) URL.revokeObjectURL(gone.previewUrl);
      return prev.filter((a) => a.id !== id);
    });
  }

  return (
    <div className="border-t border-line px-3 pb-3 pt-2.5">
      {/* Suggested follow-ups */}
      {suggestions.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendText(s)}
              className="cursor-pointer rounded-full border border-brand-500/40 bg-brand-500/[0.06] px-2.5 py-1 text-[11.5px] font-medium text-content transition-colors hover:bg-brand-500/[0.12]"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Pending attachments */}
      {pending.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {pending.map((a) => (
            <span
              key={a.id}
              className="group relative flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 py-1 pl-1.5 pr-6 text-[11px] text-muted"
            >
              {a.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.previewUrl} alt={a.name} className="h-5 w-5 rounded object-cover" />
              ) : (
                <FileText className="h-3.5 w-3.5" />
              )}
              <span className="max-w-[120px] truncate">{a.name}</span>
              <button
                onClick={() => removePending(a.id)}
                aria-label={`Remove ${a.name}`}
                className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer text-faint hover:text-content"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-end gap-1.5 rounded-2xl border border-line bg-surface px-2 py-1.5 focus-within:border-brand-500/60">
        <button
          onClick={() => fileRef.current?.click()}
          aria-label="Attach a file"
          className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full text-faint transition-colors hover:bg-surface-2 hover:text-content"
        >
          <Paperclip className="h-4 w-4" />
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
          onChange={(e) => onFiles(e.target.files)}
          className="hidden"
        />

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={1}
          placeholder="Ask anything, or describe your project…"
          className="max-h-[120px] flex-1 resize-none bg-transparent py-1.5 text-[13.5px] text-content outline-none placeholder:text-faint"
        />

        <button
          onClick={submit}
          disabled={(!value.trim() && pending.length === 0) || isTyping}
          aria-label="Send message"
          className={cn(
            "grid h-8 w-8 shrink-0 place-items-center rounded-full text-white transition-[background-color,opacity,transform]",
            (!value.trim() && pending.length === 0) || isTyping
              ? "cursor-default bg-surface-2 text-faint"
              : "cursor-pointer bg-[linear-gradient(100deg,var(--color-electric),var(--color-purple))] hover:scale-105"
          )}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
