"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { NimbusMascot } from "./mascot";
import { Markdown } from "./markdown";
import { OptionChips } from "./widgets/option-chips";
import { RecommendationCard } from "./widgets/recommendation-card";
import { LeadForm } from "./widgets/lead-form";
import { EscalationCard } from "./widgets/escalation-card";
import type { Attachment, Message, Widget } from "@/lib/chat/types";

/** Progressively reveal `text` while `enabled`; show it whole otherwise. */
function useTypewriter(text: string, enabled: boolean): string {
  const [count, setCount] = useState(enabled ? 0 : text.length);

  useEffect(() => {
    if (!enabled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(text.length);
      return;
    }
    setCount(0);
    const dur = Math.min(text.length * 14, 1200);
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setCount(Math.floor(p * text.length));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, enabled]);

  return text.slice(0, count);
}

export function MessageBubble({ message, active }: { message: Message; active: boolean }) {
  const reduce = useReducedMotion();
  const isUser = message.role === "user";
  const streaming = !!message.streaming && !reduce && !!message.text;
  const shown = useTypewriter(message.text ?? "", streaming);

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex gap-2", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-electric),var(--color-purple))]">
          <NimbusMascot className="h-6 w-6" />
        </span>
      )}

      <div className={cn("min-w-0 max-w-[85%]", isUser && "flex flex-col items-end")}>
        {(message.text || streaming) && (
          <div
            className={cn(
              "rounded-2xl px-3.5 py-2.5",
              isUser
                ? "rounded-br-md bg-[linear-gradient(100deg,var(--color-electric),var(--color-indigo),var(--color-purple))] text-white"
                : "rounded-bl-md glass text-content"
            )}
          >
            {streaming ? (
              <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed">
                {shown}
                <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-current align-middle" />
              </p>
            ) : isUser ? (
              <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed">{message.text}</p>
            ) : (
              <Markdown text={message.text ?? ""} />
            )}
          </div>
        )}

        {message.attachments && message.attachments.length > 0 && (
          <div className={cn("mt-1.5 flex flex-wrap gap-1.5", isUser && "justify-end")}>
            {message.attachments.map((a) => (
              <AttachmentPreview key={a.id} attachment={a} />
            ))}
          </div>
        )}

        {/* Inline widget appears once the text has finished streaming. */}
        {message.widget && !streaming && (
          <WidgetView widget={message.widget} active={active} />
        )}
      </div>
    </motion.div>
  );
}

function WidgetView({ widget, active }: { widget: Widget; active: boolean }) {
  switch (widget.kind) {
    case "options":
      return (
        <OptionChips
          step={widget.step}
          options={widget.options}
          multi={widget.multi}
          active={active}
        />
      );
    case "recommendation":
      return <RecommendationCard data={widget.data} />;
    case "lead-form":
      return <LeadForm active={active} />;
    case "escalation":
      return <EscalationCard />;
  }
}

function AttachmentPreview({ attachment }: { attachment: Attachment }) {
  const isImage = attachment.type.startsWith("image/") && attachment.previewUrl;
  if (isImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={attachment.previewUrl}
        alt={attachment.name}
        className="h-20 w-20 rounded-xl border border-line object-cover"
      />
    );
  }
  return (
    <span className="flex items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-2.5 py-1.5 text-[11px] text-muted">
      <FileText className="h-3.5 w-3.5 shrink-0" />
      <span className="max-w-[140px] truncate">{attachment.name}</span>
    </span>
  );
}
