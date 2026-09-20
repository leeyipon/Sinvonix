"use client";

import { motion, useReducedMotion } from "motion/react";
import { MapPin, Building2 } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

const EASE = [0.16, 1, 0.3, 1] as const;
const VB = { w: 1000, h: 560 };

/* ---- dotted region texture ---------------------------------------------
 * No hand-drawn borders — a deterministic stipple grid clipped to loose
 * landmass ellipses, same idea as a standard "dotted world map" graphic.
 * No Math.random, so it's stable across server/client renders. */

type Ellipse = { cx: number; cy: number; rx: number; ry: number };

const REGIONS: Ellipse[] = [
  { cx: 380, cy: 170, rx: 150, ry: 155 }, // mainland Indochina
  { cx: 250, cy: 420, rx: 55, ry: 100 }, // Malay peninsula + Singapore
  { cx: 700, cy: 335, rx: 115, ry: 70 }, // Borneo
  { cx: 850, cy: 190, rx: 95, ry: 140 }, // Philippine archipelago
  { cx: 140, cy: 505, rx: 95, ry: 50 }, // Sumatra hint
];

function buildDots(step = 16) {
  const dots: { x: number; y: number }[] = [];
  for (let x = 0; x <= VB.w; x += step) {
    for (let y = 0; y <= VB.h; y += step) {
      const inside = REGIONS.some(
        (r) => ((x - r.cx) / r.rx) ** 2 + ((y - r.cy) / r.ry) ** 2 <= 1
      );
      if (inside) dots.push({ x, y });
    }
  }
  return dots;
}

const DOTS = buildDots();

/* ---- markets ------------------------------------------------------------ */

const HQ = { x: 244, y: 465 };

type Market = { name: string; label: string; x: number; y: number; status: "active" | "partner" };

const markets: Market[] = [
  { name: "Laos", label: "Active", x: 372, y: 130, status: "active" },
  { name: "Cambodia", label: "Active", x: 362, y: 262, status: "active" },
  { name: "Brunei", label: "Active", x: 698, y: 312, status: "active" },
  { name: "Malaysia", label: "Partner", x: 232, y: 420, status: "partner" },
  { name: "Philippines", label: "Partner", x: 850, y: 150, status: "partner" },
];

const STATUS_COLOR: Record<Market["status"], string> = {
  active: "var(--color-emerald)",
  partner: "var(--color-warning-400)",
};

/** Quadratic-bezier "flight path" arc, always curving upward. */
function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const curve = Math.min(Math.hypot(x2 - x1, y2 - y1) * 0.24, 130);
  return { d: `M ${x1},${y1} Q ${mx},${my - curve} ${x2},${y2}`, cx: mx, cy: my - curve };
}

/** Point on that same quadratic bezier at t, for sampling pulse keyframes. */
function bezierPoint(t: number, x1: number, y1: number, cx: number, cy: number, x2: number, y2: number) {
  const u = 1 - t;
  return {
    x: u * u * x1 + 2 * u * t * cx + t * t * x2,
    y: u * u * y1 + 2 * u * t * cy + t * t * y2,
  };
}

const SAMPLE_T = [0, 0.2, 0.4, 0.6, 0.8, 1];

/** A clean elevated pill — the same card language used site-wide
 *  (rounded, border-line, bg-surface, shadow), not a one-off style. */
function MapPill({
  x,
  y,
  color,
  icon: Icon,
  title,
  subtitle,
}: {
  x: number;
  y: number;
  color: string;
  icon: typeof MapPin;
  title: string;
  subtitle: string;
}) {
  return (
    <foreignObject x={x - 90} y={y} width="180" height="40">
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-2.5 py-2 shadow-[0_12px_28px_-12px_rgba(2,25,32,0.25)]">
          <span
            className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
            style={{ background: `color-mix(in oklab, ${color} 18%, transparent)`, color }}
          >
            <Icon className="h-3.5 w-3.5" />
          </span>
          <span className="whitespace-nowrap text-left leading-tight">
            <span className="block text-[11px] font-semibold text-content">{title}</span>
            <span className="block text-[10px] text-muted">{subtitle}</span>
          </span>
        </div>
      </div>
    </foreignObject>
  );
}

export function RegionalPresence() {
  const reduce = useReducedMotion();

  return (
    <Section className="bg-bg-subtle/50">
      <Container>
        <SectionHeading
          eyebrow="Regional presence"
          title="Headquartered in Singapore, deployed across ASEAN"
          description="On-the-ground operations across Southeast Asia's fastest-growing regulated markets, with an expanding global footprint."
        />

        <Reveal delay={0.15}>
          <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-line bg-surface p-2 shadow-[0_40px_80px_-40px_rgba(2,25,32,0.18)] sm:p-4">
            <svg
              viewBox={`0 0 ${VB.w} ${VB.h}`}
              className="w-full"
              role="img"
              aria-label="Map of Sinvonix's Southeast Asian footprint: headquartered in Singapore, active in Laos, Cambodia and Brunei, with partner networks in Malaysia, the Philippines and Australia"
            >
              <defs>
                <linearGradient id="reg-line" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="var(--color-brand-500)" stopOpacity="0.7" />
                  <stop offset="1" stopColor="var(--color-brand-500)" stopOpacity="0.15" />
                </linearGradient>
              </defs>

              {/* dotted region texture */}
              {DOTS.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r="1.6" fill="var(--color-brand-300)" opacity="0.55" />
              ))}

              {/* curved connector arcs, HQ → each market */}
              {markets.map((m, i) => {
                const arc = arcPath(HQ.x, HQ.y, m.x, m.y);
                return (
                  <motion.path
                    key={`arc-${m.name}`}
                    d={arc.d}
                    fill="none"
                    stroke="url(#reg-line)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: EASE }}
                  />
                );
              })}

              {/* traveling pulses, sampled along each arc */}
              {!reduce &&
                markets.map((m, i) => {
                  const arc = arcPath(HQ.x, HQ.y, m.x, m.y);
                  const pts = SAMPLE_T.map((t) => bezierPoint(t, HQ.x, HQ.y, arc.cx, arc.cy, m.x, m.y));
                  return (
                    <motion.circle
                      key={`pulse-${m.name}`}
                      r="3"
                      fill="var(--color-brand-500)"
                      initial={{ opacity: 0 }}
                      animate={{
                        cx: pts.map((p) => p.x),
                        cy: pts.map((p) => p.y),
                        opacity: [0, 1, 1, 1, 1, 0],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        repeatDelay: 1.8,
                        delay: 1.2 + i * 0.4,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}

              {/* node dots */}
              <circle cx={HQ.x} cy={HQ.y} r="5.5" fill="var(--color-brand-500)" stroke="var(--color-surface)" strokeWidth="2.5" />
              {markets.map((m) => (
                <motion.circle
                  key={`dot-${m.name}`}
                  cx={m.x}
                  cy={m.y}
                  r="4.5"
                  fill={STATUS_COLOR[m.status]}
                  stroke="var(--color-surface)"
                  strokeWidth="2"
                  animate={reduce ? undefined : { opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}

              {/* pill labels */}
              <MapPill x={HQ.x} y={HQ.y - 46} color="var(--color-brand-500)" icon={Building2} title="Singapore" subtitle="Headquarters" />
              {markets.map((m) => (
                <MapPill
                  key={`pill-${m.name}`}
                  x={m.x}
                  y={m.y > 90 ? m.y - 50 : m.y + 16}
                  color={STATUS_COLOR[m.status]}
                  icon={MapPin}
                  title={m.name}
                  subtitle={m.label}
                />
              ))}
            </svg>

            {/* subsidiary footnote */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] font-medium text-muted shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_COLOR.partner }} />
                + Australia — subsidiary
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
