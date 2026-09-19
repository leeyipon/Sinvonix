"use client";

import { useEffect, useMemo, useState } from "react";
import { KanbanSquare, Table2 } from "lucide-react";
import {
  currency,
  pipelineStages,
  type Deal,
  type PipelineStage,
} from "@/lib/crm";
import { cn } from "@/lib/utils";

type View = "kanban" | "table";

/** Per-stage accent: dot, subtle column tint, and table badge. */
const stageStyles: Record<PipelineStage, { dot: string; badge: string }> = {
  Discovery: { dot: "bg-brand-400", badge: "bg-brand-400/12 text-brand-400" },
  Proposal: { dot: "bg-warning-400", badge: "bg-warning-500/12 text-warning-500" },
  Negotiation: { dot: "bg-brand-500", badge: "bg-brand-500/12 text-accent" },
  Won: { dot: "bg-success-500", badge: "bg-success-500/12 text-success-500" },
  Lost: { dot: "bg-error-400", badge: "bg-error-500/12 text-error-500" },
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[] | null>(null);
  const [view, setView] = useState<View>("kanban");

  useEffect(() => {
    fetch("/api/admin/deals")
      .then((res) => res.json())
      .then((data) => setDeals(data.deals ?? []))
      .catch(() => setDeals([]));
  }, []);

  const { byStage, openValue } = useMemo(() => {
    const map = Object.fromEntries(pipelineStages.map((s) => [s, [] as Deal[]])) as Record<
      PipelineStage,
      Deal[]
    >;
    let open = 0;
    for (const d of deals ?? []) {
      (map[d.stage] ??= []).push(d);
      if (d.stage !== "Won" && d.stage !== "Lost") open += d.value;
    }
    return { byStage: map, openValue: open };
  }, [deals]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-content">Pipeline</h1>
          <p className="mt-1 text-sm text-muted">
            {deals === null
              ? "Loading deals…"
              : `${deals.length} deals · ${currency(openValue)} in open pipeline`}
          </p>
        </div>

        {/* View toggle */}
        <div className="inline-flex rounded-lg border border-line bg-surface p-0.5">
          {(
            [
              { id: "kanban", label: "Kanban", icon: KanbanSquare },
              { id: "table", label: "Table", icon: Table2 },
            ] as const
          ).map((t) => {
            const active = view === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setView(t.id)}
                aria-pressed={active}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active ? "bg-brand-500/12 text-accent" : "text-muted hover:text-content"
                )}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {deals === null ? (
        <p className="mt-8 text-sm text-muted">Loading pipeline…</p>
      ) : deals.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-line bg-surface px-6 py-16 text-center text-sm text-muted">
          No deals in the pipeline yet.
        </div>
      ) : view === "kanban" ? (
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {pipelineStages.map((stage) => {
            const items = byStage[stage];
            const total = items.reduce((s, d) => s + d.value, 0);
            return (
              <section key={stage} className="flex w-72 shrink-0 flex-col">
                <div className="mb-3 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full", stageStyles[stage].dot)} />
                    <h2 className="text-sm font-semibold text-content">{stage}</h2>
                    <span className="rounded-full bg-surface-2 px-1.5 text-xs font-medium text-faint">
                      {items.length}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-muted">{currency(total)}</span>
                </div>

                <div className="flex flex-col gap-2.5 rounded-xl bg-surface-2/40 p-2">
                  {items.length === 0 ? (
                    <p className="px-2 py-6 text-center text-xs text-faint">No deals</p>
                  ) : (
                    items.map((d) => (
                      <article
                        key={d.id}
                        className="cursor-pointer rounded-lg border border-line bg-surface p-3 shadow-[0_1px_2px_rgba(0,0,0,.04)] transition-colors duration-200 hover:border-brand-500/40"
                      >
                        <p className="font-medium text-content">{d.name}</p>
                        <p className="mt-0.5 text-xs text-muted">{d.company}</p>
                        <p className="mt-2 font-display text-lg font-semibold text-accent">
                          {currency(d.value)}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-xs text-muted">
                            <span className="grid h-5 w-5 place-items-center rounded-full bg-surface-2 text-[10px] font-semibold text-content">
                              {initials(d.owner)}
                            </span>
                            {d.owner}
                          </span>
                          <span className="text-xs text-faint">{fmtDate(d.closeDate)}</span>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <section className="mt-6 rounded-xl border border-line bg-surface p-5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
                  <th className="pb-2 pr-4 font-medium">Deal</th>
                  <th className="pb-2 pr-4 font-medium">Company</th>
                  <th className="pb-2 pr-4 font-medium">Stage</th>
                  <th className="pb-2 pr-4 font-medium">Value</th>
                  <th className="pb-2 pr-4 font-medium">Owner</th>
                  <th className="pb-2 pr-4 font-medium">Close date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {[...deals]
                  .sort((a, b) => b.value - a.value)
                  .map((d) => (
                    <tr key={d.id}>
                      <td className="py-3 pr-4 font-medium text-content">{d.name}</td>
                      <td className="py-3 pr-4 text-muted">{d.company}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            stageStyles[d.stage].badge
                          )}
                        >
                          {d.stage}
                        </span>
                      </td>
                      <td className="py-3 pr-4 font-medium text-content">{currency(d.value)}</td>
                      <td className="py-3 pr-4 text-muted">{d.owner}</td>
                      <td className="py-3 pr-4 text-xs text-faint">{fmtDate(d.closeDate)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
