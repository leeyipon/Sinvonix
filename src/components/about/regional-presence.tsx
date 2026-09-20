"use client";

import { motion, useReducedMotion } from "motion/react";
import { Building2 } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

const EASE = [0.16, 1, 0.3, 1] as const;
const VB = { w: 1000, h: 620 };

/* ---- dotted region texture ---------------------------------------------
 * Same pattern as the "dotted world map" reference: no hand-drawn borders,
 * just a stipple grid clipped to loose landmass ellipses. Deterministic
 * (no Math.random) so it's stable across server/client renders. */

type Ellipse = { cx: number; cy: number; rx: number; ry: number };

const REGIONS: Ellipse[] = [
  { cx: 380, cy: 190, rx: 150, ry: 170 }, // mainland Indochina
  { cx: 250, cy: 460, rx: 55, ry: 110 }, // Malay peninsula + Singapore
  { cx: 700, cy: 370, rx: 115, ry: 75 }, // Borneo
  { cx: 850, cy: 210, rx: 95, ry: 150 }, // Philippine archipelago
  { cx: 140, cy: 560, rx: 95, ry: 55 }, // Sumatra hint
];

function buildDots(step = 15) {
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

const HQ = { x: 244, y: 520 };

type Market = { name: string; x: number; y: number; status: "active" | "partner" };

const markets: Market[] = [
  { name: "Laos", x: 372, y: 145, status: "active" },
  { name: "Cambodia", x: 362, y: 292, status: "active" },
  { name: "Brunei", x: 698, y: 347, status: "active" },
  { name: "Malaysia", x: 232, y: 470, status: "partner" },
  { name: "Philippines", x: 850, y: 165, status: "partner" },
];

const STATUS_DOT: Record<Market["status"], string> = {
  active: "var(--color-emerald)",
  partner: "var(--color-warning-400)",
};

/** Quadratic-bezier "flight path" arc, always curving upward. */
function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const curve = Math.min(Math.hypot(x2 - x1, y2 - y1) * 0.28, 150);
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

export function RegionalPresence() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#070a12] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand-500)_25%,transparent),transparent)] blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-brand-400)]">
            <span aria-hidden className="h-px w-6 bg-[color:var(--color-brand-400)]" />
            Regional presence
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Headquartered in Singapore.
            <br />
            Deployed Across ASEAN.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            On-the-ground operations across Southeast Asia&apos;s fastest-growing regulated
            markets, with an expanding global footprint.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1120] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
            {/* Header — same mono-label + live-pulse pattern as the Process section's board */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-8">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                {"// Regional operations map"}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,var(--color-emerald)_16%,transparent)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-emerald)]">
                <span className="relative flex h-1.5 w-1.5">
                  {!reduce && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-emerald)] opacity-70" />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-emerald)]" />
                </span>
                Live monitoring
              </span>
            </div>

            {/* Map */}
            <div className="relative px-2 pb-16 pt-6 sm:px-4">
              <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full" role="img" aria-label="Map of Sinvonix's Southeast Asian footprint: headquartered in Singapore, active in Laos, Cambodia and Brunei, with partner networks in Malaysia, the Philippines and Australia">
                {/* dotted region texture */}
                {DOTS.map((d, i) => (
                  <circle key={i} cx={d.x} cy={d.y} r="1.4" fill="rgba(255,255,255,0.14)" />
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
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: EASE }}
                    />
                  );
                })}
                <defs>
                  <linearGradient id="reg-line" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="var(--color-brand-400)" stopOpacity="0.95" />
                    <stop offset="1" stopColor="var(--color-brand-400)" stopOpacity="0.15" />
                  </linearGradient>
                </defs>

                {/* traveling pulses, sampled along each arc */}
                {!reduce &&
                  markets.map((m, i) => {
                    const arc = arcPath(HQ.x, HQ.y, m.x, m.y);
                    const pts = SAMPLE_T.map((t) => bezierPoint(t, HQ.x, HQ.y, arc.cx, arc.cy, m.x, m.y));
                    return (
                      <motion.circle
                        key={`pulse-${m.name}`}
                        r="3.5"
                        fill="white"
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

                {/* HQ marker */}
                <motion.g
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <circle cx={HQ.x} cy={HQ.y} r="16" fill="color-mix(in oklab, var(--color-brand-400) 22%, transparent)" />
                  <circle cx={HQ.x} cy={HQ.y} r="5.5" fill="var(--color-brand-400)" stroke="#0b1120" strokeWidth="2.5" />
                  <foreignObject x={HQ.x - 85} y={HQ.y + 12} width="170" height="34">
                    <div className="flex justify-center">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-white backdrop-blur">
                        <Building2 className="h-3 w-3 text-[color:var(--color-brand-300)]" />
                        Singapore · HQ
                      </span>
                    </div>
                  </foreignObject>
                </motion.g>

                {/* market markers + pill labels */}
                {markets.map((m, i) => {
                  const above = m.y > 90;
                  const labelY = above ? m.y - 44 : m.y + 12;
                  return (
                    <motion.g
                      key={m.name}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: EASE }}
                    >
                      <motion.circle
                        cx={m.x}
                        cy={m.y}
                        r="5"
                        fill={STATUS_DOT[m.status]}
                        stroke="#0b1120"
                        strokeWidth="2"
                        animate={reduce ? undefined : { opacity: [1, 0.55, 1] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                      />
                      <foreignObject x={m.x - 85} y={labelY} width="170" height="32">
                        <div className="flex justify-center">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-medium tracking-wide text-white/90 backdrop-blur">
                            <span
                              className="h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: STATUS_DOT[m.status] }}
                            />
                            {m.name}
                          </span>
                        </div>
                      </foreignObject>
                    </motion.g>
                  );
                })}
              </svg>

              {/* subsidiary footnote — Australia sits outside the ASEAN frame */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/55 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_DOT.partner }} />
                  + Australia — subsidiary
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 px-6 py-4 text-xs text-white/60 sm:px-8">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: STATUS_DOT.active }} /> Active markets — Brunei, Cambodia, Laos
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: STATUS_DOT.partner }} /> Partner networks &amp; subsidiary — Malaysia, Philippines, Australia
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
