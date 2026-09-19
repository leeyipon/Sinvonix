"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Users2,
  Handshake,
  LifeBuoy,
  Mail,
  CheckSquare,
  type LucideIcon,
} from "lucide-react";
import { timeAgo, type Task, type Activity } from "@/lib/crm";
import { cn } from "@/lib/utils";

type Filter = "all" | "open" | "done";

const priorityStyles: Record<Task["priority"], string> = {
  High: "bg-error-500/12 text-error-500",
  Medium: "bg-warning-500/12 text-warning-500",
  Low: "bg-surface-2 text-faint",
};

const activityIcon: Record<Activity["kind"], LucideIcon> = {
  lead: Users2,
  deal: Handshake,
  ticket: LifeBuoy,
  email: Mail,
  task: CheckSquare,
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [filter, setFilter] = useState<Filter>("open");

  useEffect(() => {
    fetch("/api/admin/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks ?? []))
      .catch(() => setTasks([]));
    fetch("/api/admin/activities")
      .then((res) => res.json())
      .then((data) => setActivities(data.activities ?? []))
      .catch(() => setActivities([]));
  }, []);

  const counts = useMemo(() => {
    const list = tasks ?? [];
    return { open: list.filter((t) => !t.done).length, done: list.filter((t) => t.done).length };
  }, [tasks]);

  const shown = (tasks ?? []).filter((t) =>
    filter === "all" ? true : filter === "open" ? !t.done : t.done
  );

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="font-display text-2xl font-semibold text-content">Tasks &amp; Activity</h1>
      <p className="mt-1 text-sm text-muted">
        {tasks === null
          ? "Loading…"
          : `${counts.open} open · ${counts.done} done — and the latest across the workspace.`}
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Tasks (spans 2) */}
        <section className="rounded-xl border border-line bg-surface p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold text-content">Tasks</h2>
            <div className="inline-flex rounded-lg border border-line bg-surface p-0.5">
              {(["open", "all", "done"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={cn(
                    "cursor-pointer rounded-md px-3 py-1 text-sm font-medium capitalize transition-colors",
                    filter === f ? "bg-brand-500/12 text-accent" : "text-muted hover:text-content"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {tasks === null ? (
            <p className="mt-4 text-sm text-muted">Loading tasks…</p>
          ) : shown.length === 0 ? (
            <p className="mt-6 text-sm text-muted">
              {filter === "done" ? "Nothing completed yet." : "No tasks here — all clear."}
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {shown.map((t) => (
                <li key={t.id} className="flex items-center gap-3 py-3">
                  <span
                    className={cn(
                      "grid h-5 w-5 shrink-0 place-items-center rounded-full",
                      t.done ? "bg-emerald text-[#021920]" : "border border-line"
                    )}
                    aria-hidden
                  >
                    {t.done && <Check className="h-3.5 w-3.5" />}
                  </span>
                  <span
                    className={cn(
                      "min-w-0 flex-1 truncate text-sm",
                      t.done ? "text-faint line-through" : "text-content"
                    )}
                  >
                    {t.title}
                  </span>
                  <span className="shrink-0 text-xs text-faint">{t.due}</span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      priorityStyles[t.priority]
                    )}
                  >
                    {t.priority}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Activity timeline */}
        <section className="rounded-xl border border-line bg-surface p-5">
          <h2 className="font-semibold text-content">Activity</h2>
          {activities === null ? (
            <p className="mt-4 text-sm text-muted">Loading activity…</p>
          ) : activities.length === 0 ? (
            <p className="mt-4 text-sm text-muted">No recent activity.</p>
          ) : (
            <ul className="mt-4 space-y-1">
              {activities.map((a) => {
                const Icon = activityIcon[a.kind];
                return (
                  <li
                    key={a.id}
                    className="flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-surface-2"
                  >
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-surface-2 text-accent">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug text-content">{a.text}</p>
                      <p className="mt-0.5 text-xs text-faint">
                        {a.who} · {timeAgo(a.at)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
