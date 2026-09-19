"use client";

import { Gauge, Clock, Users, Layers, Wallet } from "lucide-react";
import type { Estimate } from "@/lib/chat/types";
import { formatMoney } from "@/lib/chat/estimator";

// Neutral (theme-aware) text with a distinct colored tint, so each badge stays
// readable on both light and dark surfaces.
const COMPLEXITY_TONE: Record<Estimate["complexity"], string> = {
  Starter: "text-content bg-emerald/15",
  Standard: "text-content bg-brand-500/20",
  Advanced: "text-content bg-[#0D9488]/15",
  "Enterprise-grade": "text-content bg-[#8B5CF6]/18",
};

/** Project-estimation result, shown as a set of professional cards. */
export function EstimateCards({ data }: { data: Estimate }) {
  return (
    <div className="mt-2.5 space-y-3">
      {/* Headline: cost + complexity */}
      <div className="overflow-hidden rounded-2xl border border-line bg-surface-2/50 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-faint">
              <Wallet className="h-3 w-3" /> Approx. investment
            </p>
            <p className="font-display text-2xl font-bold text-content">
              {formatMoney(data.costLow)}–{formatMoney(data.costHigh)}
            </p>
            <p className="mt-0.5 text-[11px] text-faint">Ballpark range — refined during discovery</p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${COMPLEXITY_TONE[data.complexity]}`}
          >
            {data.complexity}
          </span>
        </div>
      </div>

      {/* Timeline + team size */}
      <div className="grid grid-cols-2 gap-3">
        <Stat icon={Clock} label="Timeline" value={data.timeline} />
        <Stat icon={Users} label="Team size" value={`${data.teamSize} people`} />
      </div>

      {/* Tech stack */}
      <Card icon={Layers} label="Technology stack">
        <div className="flex flex-wrap gap-1.5">
          {data.stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </Card>

      {/* Phases */}
      <Card icon={Gauge} label="Development phases">
        <ol className="space-y-2">
          {data.phases.map((p, i) => (
            <li key={p.name} className="flex gap-2.5">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[linear-gradient(100deg,var(--color-electric),var(--color-purple))] text-[10px] font-bold text-white">
                {i + 1}
              </span>
              <div className="leading-tight">
                <p className="text-[13px] font-medium text-content">{p.name}</p>
                <p className="text-[11.5px] text-faint">{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface-2/50 p-3.5">
      <p className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-faint">
        <Icon className="h-3 w-3" /> {label}
      </p>
      <p className="text-[13px] font-semibold text-content">{value}</p>
    </div>
  );
}

function Card({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Clock;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface-2/50 p-3.5">
      <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-faint">
        <Icon className="h-3 w-3" /> {label}
      </p>
      {children}
    </div>
  );
}
