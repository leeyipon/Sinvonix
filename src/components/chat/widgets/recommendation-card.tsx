"use client";

import { Boxes, Clock, Network, ShieldCheck, Sparkles } from "lucide-react";
import type { Recommendation } from "@/lib/chat/types";

/** The Step-5 product recommendation — capabilities and fit, never a price. */
export function RecommendationCard({ data }: { data: Recommendation }) {
  return (
    <div className="mt-2.5 overflow-hidden rounded-2xl border border-line bg-surface-2/50">
      <div className="flex items-center gap-2 bg-[linear-gradient(100deg,var(--color-electric),var(--color-purple))] px-4 py-2.5 text-white">
        <Sparkles className="h-4 w-4" />
        <p className="font-display text-sm font-semibold leading-tight">{data.title}</p>
      </div>

      <div className="space-y-3.5 p-4">
        <Section icon={Boxes} label="What's included">
          <ul className="space-y-1">
            {data.modules.map((m) => (
              <li key={m} className="flex items-start gap-2 text-[13px] text-content">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-electric)]" />
                {m}
              </li>
            ))}
          </ul>
        </Section>

        <div className="grid grid-cols-2 gap-3">
          <Section icon={Clock} label="Timeline">
            <p className="text-[13px] font-medium text-content">{data.timeline}</p>
          </Section>
          <Section icon={Network} label="Deployment">
            <p className="text-[13px] font-medium text-content">{data.deployment}</p>
          </Section>
        </div>

        <Section icon={ShieldCheck} label="Why Sinvonix">
          <div className="flex flex-wrap gap-1.5">
            {data.team.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] text-muted"
              >
                {highlight}
              </span>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Boxes;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-faint">
        <Icon className="h-3 w-3" /> {label}
      </p>
      {children}
    </div>
  );
}
