import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiCard({
  icon: Icon,
  label,
  value,
  delta,
  spark,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: number; // percentage change
  spark?: number[];
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-[0_1px_2px_rgba(0,0,0,.04)] transition-colors duration-200 hover:border-brand-500/30">
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500/12 text-accent">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
              up ? "bg-success-500/12 text-success-500" : "bg-error-500/12 text-error-500"
            )}
          >
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-2xl font-semibold text-content">{value}</p>
      <p className="text-xs text-muted">{label}</p>

      {spark && (
        <div className="mt-3 flex h-8 items-end gap-0.5">
          {spark.map((h, i) => {
            const max = Math.max(...spark);
            return (
              <span
                key={i}
                style={{ height: `${(h / max) * 100}%` }}
                className="flex-1 rounded-sm bg-brand-500/25"
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
