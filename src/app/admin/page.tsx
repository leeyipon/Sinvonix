"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users2,
  UserRound,
  DollarSign,
  Target,
  Globe,
  ArrowUpRight,
  CircleDot,
  Handshake,
  LifeBuoy,
  Mail,
  CheckSquare,
} from "lucide-react";
import { KpiCard } from "@/components/admin/kpi-card";
import { AreaChart } from "@/components/ui/charts";
import {
  pipelineStages,
  timeAgo,
  currency,
  type Activity,
  type Deal,
  type Task,
} from "@/lib/crm";
import { cn } from "@/lib/utils";

const MINT = "var(--color-brand-500)";
const MINT_DEEP = "var(--color-brand-700)";

const activityIcon: Record<Activity["kind"], typeof Handshake> = {
  lead: Users2,
  deal: Handshake,
  ticket: LifeBuoy,
  email: Mail,
  task: CheckSquare,
};

export default function AdminDashboard() {
  const [leadCount, setLeadCount] = useState<number | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => setLeadCount((data.leads ?? []).length))
      .catch(() => setLeadCount(0));
    fetch("/api/admin/deals")
      .then((res) => res.json())
      .then((data) => setDeals(data.deals ?? []));
    fetch("/api/admin/activities")
      .then((res) => res.json())
      .then((data) => setActivities(data.activities ?? []));
    fetch("/api/admin/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks ?? []));
  }, []);

  const pipelineValue = deals
    .filter((d) => d.stage !== "Lost")
    .reduce((s, d) => s + d.value, 0);

  const kpis = [
    { icon: Users2, label: "New leads (30d)", value: leadCount === null ? "—" : String(leadCount), delta: 12, spark: [4, 6, 5, 8, 7, 9, 11] },
    { icon: UserRound, label: "Active customers", value: "184", delta: 4, spark: [160, 168, 171, 176, 180, 182, 184] },
    { icon: DollarSign, label: "Sales revenue (MTD)", value: "$284k", delta: 18, spark: [180, 210, 195, 240, 260, 270, 284] },
    { icon: Target, label: "Conversion rate", value: "6.8%", delta: 2, spark: [5, 5.4, 5.9, 6.1, 6.4, 6.6, 6.8] },
    { icon: Globe, label: "Website visitors (7d)", value: "12.4k", delta: 9, spark: [1.4, 1.6, 1.5, 1.9, 1.7, 2.1, 2.2] },
    { icon: Handshake, label: "Open pipeline", value: currency(pipelineValue), delta: 6, spark: [3, 4, 3.5, 5, 4.6, 5.4, 5.8] },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-content">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            Welcome back, Alex — here&apos;s what&apos;s moving today.
          </p>
        </div>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-3.5 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
        >
          Review new leads <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* KPI grid */}
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      {/* Main columns */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {/* Sales performance chart (spans 2) */}
        <section className="rounded-xl border border-line bg-surface p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-content">Sales performance</h2>
              <p className="text-xs text-muted">Revenue, last 12 weeks</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald/12 px-2 py-0.5 text-xs font-medium text-emerald">
              <ArrowUpRight className="h-3 w-3" /> +18% vs last period
            </span>
          </div>
          <AreaChart
            data={[42, 55, 48, 61, 58, 72, 66, 80, 74, 88, 92, 104]}
            className="mt-5 h-44 w-full"
            from={MINT}
            to={MINT_DEEP}
          />
        </section>

        {/* Pipeline snapshot */}
        <section className="rounded-xl border border-line bg-surface p-5">
          <h2 className="font-semibold text-content">Pipeline by stage</h2>
          <p className="text-xs text-muted">Open deals</p>
          <ul className="mt-4 space-y-3">
            {pipelineStages.map((stage) => {
              const inStage = deals.filter((d) => d.stage === stage);
              const val = inStage.reduce((s, d) => s + d.value, 0);
              const pct = Math.round((val / (pipelineValue || 1)) * 100);
              return (
                <li key={stage}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">{stage}</span>
                    <span className="font-medium text-content">{currency(val)}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        stage === "Lost" ? "bg-error-500/50" : "bg-brand-500"
                      )}
                      style={{ width: `${Math.max(pct, 4)}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* Activity + tasks */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {/* Recent activity (spans 2) */}
        <section className="rounded-xl border border-line bg-surface p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-content">Recent activity</h2>
            <Link href="/admin/tasks" className="text-xs font-medium text-accent hover:underline">
              View all
            </Link>
          </div>
          <ul className="mt-4 space-y-1">
            {activities.map((a) => {
              const Icon = activityIcon[a.kind];
              return (
                <li key={a.id} className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-surface-2">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="min-w-0 flex-1 truncate text-sm text-content">{a.text}</p>
                  <span className="shrink-0 text-xs text-faint">{timeAgo(a.at)}</span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Upcoming tasks */}
        <section className="rounded-xl border border-line bg-surface p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-content">Upcoming tasks</h2>
            <span className="text-xs text-faint">{tasks.filter((t) => !t.done).length} open</span>
          </div>
          <ul className="mt-4 space-y-1">
            {tasks.map((t) => (
              <li key={t.id} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-surface-2">
                <CircleDot className={cn("h-4 w-4 shrink-0", t.done ? "text-emerald" : "text-faint")} />
                <span className={cn("min-w-0 flex-1 truncate text-sm", t.done ? "text-faint line-through" : "text-content")}>
                  {t.title}
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                    t.priority === "High"
                      ? "bg-error-500/12 text-error-500"
                      : t.priority === "Medium"
                        ? "bg-warning-500/12 text-warning-500"
                        : "bg-surface-2 text-faint"
                  )}
                >
                  {t.due}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
