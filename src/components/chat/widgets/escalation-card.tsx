"use client";

import { MessageSquare, Mail, CalendarDays, type LucideIcon } from "lucide-react";
import { useScheduler } from "@/components/scheduler/scheduler-provider";
import { site } from "@/lib/site";

/** Focus the composer input — Live Chat just keeps the conversation here. */
export const FOCUS_COMPOSER_EVENT = "nimbus-chat-focus";

/** Human-handoff options shown when the agent escalates. */
export function EscalationCard() {
  const scheduler = useScheduler();

  const items: {
    icon?: LucideIcon;
    iconImg?: string;
    label: string;
    hint: string;
    onClick?: () => void;
    href?: string;
  }[] = [
    {
      icon: MessageSquare,
      label: "Live chat",
      hint: "Keep chatting here",
      onClick: () => window.dispatchEvent(new Event(FOCUS_COMPOSER_EVENT)),
    },
    { icon: Mail, label: "Email", hint: site.email, href: `mailto:${site.email}` },
    {
      iconImg: "/icons/linkedin.svg",
      label: "LinkedIn",
      hint: "Connect with us",
      href: site.socials.linkedin,
    },
    {
      icon: CalendarDays,
      label: "Schedule meeting",
      hint: "Book a free slot",
      onClick: () => scheduler.open(),
    },
  ];

  return (
    <div className="mt-2.5 grid grid-cols-2 gap-2">
      {items.map((item) => {
        const Icon = item.icon;
        const content = (
          <>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[linear-gradient(135deg,var(--color-electric),var(--color-purple))] text-white">
              {Icon ? (
                <Icon className="h-4 w-4" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.iconImg} alt="" width={16} height={16} className="h-4 w-4 invert" />
              )}
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-[12.5px] font-semibold text-content">{item.label}</span>
              <span className="block truncate text-[11px] text-faint">{item.hint}</span>
            </span>
          </>
        );
        const cls =
          "flex cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-surface p-2.5 text-left transition-colors hover:border-brand-500/50 hover:bg-brand-500/[0.05]";
        return item.href ? (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={cls}
          >
            {content}
          </a>
        ) : (
          <button key={item.label} onClick={item.onClick} className={cls}>
            {content}
          </button>
        );
      })}
    </div>
  );
}
