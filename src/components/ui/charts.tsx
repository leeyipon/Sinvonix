"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

function toPath(data: number[], w: number, h: number, pad = 4) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  return data.map((d, i) => {
    const x = pad + i * step;
    const y = pad + (h - pad * 2) * (1 - (d - min) / range);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  });
}

/** Animated line + area chart that draws itself in when rendered. */
export function AreaChart({
  data,
  className,
  height = 120,
  width = 320,
  from = "var(--color-electric)",
  to = "var(--color-purple)",
}: {
  data: number[];
  className?: string;
  height?: number;
  width?: number;
  from?: string;
  to?: string;
}) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const pts = toPath(data, width, height);
  const line = pts.join(" ");
  const area = `${line} L${width - 4},${height - 4} L4,${height - 4} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
      role="img"
      aria-label="Trend chart"
    >
      <defs>
        <linearGradient id={`stroke-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} stopOpacity="0.28" />
          <stop offset="1" stopColor={from} stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.path
        d={area}
        fill={`url(#fill-${id})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={`url(#stroke-${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? undefined : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: EASE }}
      />
    </svg>
  );
}

/** Animated vertical bars. */
export function BarChart({
  data,
  className,
  from = "var(--color-electric)",
  to = "var(--color-purple)",
}: {
  data: number[];
  className?: string;
  from?: string;
  to?: string;
}) {
  const max = Math.max(...data);
  return (
    <div className={className}>
      <div className="flex h-full items-end gap-1.5">
        {data.map((d, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${(d / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
            className="flex-1 rounded-t-md"
            style={{ background: `linear-gradient(to top, ${from}, ${to})` }}
          />
        ))}
      </div>
    </div>
  );
}

/** Animated donut progress ring. */
export function DonutProgress({
  value,
  size = 96,
  label,
}: {
  value: number; // 0–100
  size?: number;
  label?: string;
}) {
  const reduce = useReducedMotion();
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const id = useId().replace(/:/g, "");

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`ring-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-electric)" />
            <stop offset="1" stopColor="var(--color-purple)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-surface-2)" strokeWidth="8" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#ring-${id})`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduce ? { strokeDashoffset: c * (1 - value / 100) } : { strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - value / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: EASE }}
        />
      </svg>
      <div className="absolute text-center">
        <span className="font-display text-lg font-semibold text-content">{value}%</span>
        {label && <p className="text-[10px] text-faint">{label}</p>}
      </div>
    </div>
  );
}
