"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---- stylized regional map data ---------------------------------------
 * Simplified, illustrative country outlines (not survey-grade cartography)
 * in a 1000×620 viewBox, oriented roughly like a real map of mainland +
 * maritime Southeast Asia. Unlabeled neighbors (Vietnam, Thailand, Borneo,
 * Sumatra) are drawn as faint context shapes; only Sinvonix's real markets
 * are labeled and colored. */

const HQ = { x: 244, y: 520 }; // Singapore

type Market = { code: string; name: string; x: number; y: number; status: "active" | "partner" };

const markets: Market[] = [
  { code: "LA", name: "Laos", x: 372, y: 145, status: "active" },
  { code: "KH", name: "Cambodia", x: 362, y: 292, status: "active" },
  { code: "BN", name: "Brunei", x: 698, y: 347, status: "active" },
  { code: "MY", name: "Malaysia", x: 232, y: 470, status: "partner" },
  { code: "PH", name: "Philippines", x: 850, y: 165, status: "partner" },
];

const CONTEXT_SHAPES = [
  // Vietnam — thin coastal crescent east of Laos/Cambodia
  "M420,58 L460,78 L476,150 L460,220 L442,268 L452,330 L430,346 L410,300 L416,240 L400,180 L410,110 Z",
  // Thailand — west of Laos/Cambodia, tapering into the peninsula
  "M260,78 L302,68 L312,120 L296,170 L312,212 L296,262 L270,322 L255,382 L245,428 L218,382 L208,300 L214,220 L230,150 Z",
  // East Malaysia / Borneo — landmass hosting Brunei
  "M618,340 L700,318 L762,330 L792,362 L770,402 L698,412 L638,392 L608,364 Z",
  // Sumatra hint — bottom-left corner
  "M140,540 L182,560 L160,612 L98,616 L70,580 L92,544 Z",
];

const MALAYSIA_PENINSULA =
  "M246,430 L262,440 L272,472 L260,502 L240,522 L214,506 L204,470 L216,440 Z";
const PHILIPPINES_ISLANDS = [
  "M830,70 L862,80 L876,122 L864,172 L840,192 L810,172 L800,120 L810,86 Z", // Luzon
  "M828,210 L850,214 L846,236 L820,232 L814,216 Z", // Visayas
  "M850,260 L892,254 L912,292 L896,332 L854,336 L834,300 L840,270 Z", // Mindanao
];

const STATUS_COLOR: Record<Market["status"], { stroke: string; fill: string; dot: string }> = {
  active: { stroke: "#4ADE80", fill: "rgba(74,222,128,0.12)", dot: "#4ADE80" },
  partner: { stroke: "#FBBF24", fill: "rgba(251,191,36,0.10)", dot: "#FBBF24" },
};

export function RegionalPresence() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#070a12] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12]" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.18),transparent)] blur-3xl"
      />

      <Container className="relative">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#60A5FA]">
            <span aria-hidden className="h-px w-6 bg-[#60A5FA]" />
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
            {/* Console header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-8">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7DD3FC]">
                {"// Regional operations map"}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4ADE80]">
                <span className="relative flex h-1.5 w-1.5">
                  {!reduce && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-70" />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
                </span>
                Live monitoring
              </span>
            </div>

            {/* Map */}
            <div className="relative">
              <svg viewBox="0 0 1000 620" className="w-full" role="img" aria-label="Map of Sinvonix's Southeast Asian footprint: headquartered in Singapore, active in Laos, Cambodia and Brunei, with partner networks in Malaysia and the Philippines">
                <defs>
                  <linearGradient id="reg-line" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#60A5FA" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#60A5FA" stopOpacity="0.15" />
                  </linearGradient>
                </defs>

                {/* faint unlabeled context landmasses */}
                {CONTEXT_SHAPES.map((d, i) => (
                  <path key={i} d={d} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                ))}

                {/* connector lines from HQ to every labeled market */}
                {markets.map((m, i) => (
                  <motion.line
                    key={`line-${m.code}`}
                    x1={HQ.x}
                    y1={HQ.y}
                    x2={m.x}
                    y2={m.y}
                    stroke="url(#reg-line)"
                    strokeWidth="1.5"
                    strokeDasharray="3 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: EASE }}
                  />
                ))}

                {/* traveling pulses */}
                {!reduce &&
                  markets.map((m, i) => (
                    <motion.circle
                      key={`pulse-${m.code}`}
                      r="3"
                      fill="#93C5FD"
                      initial={{ cx: HQ.x, cy: HQ.y, opacity: 0 }}
                      animate={{ cx: [HQ.x, m.x], cy: [HQ.y, m.y], opacity: [0, 1, 1, 0] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        repeatDelay: 1.6,
                        delay: 1 + i * 0.4,
                        ease: "easeInOut",
                      }}
                    />
                  ))}

                {/* Malaysia peninsula + Philippine islands — shaped fills for the two multi-part markets */}
                <path d={MALAYSIA_PENINSULA} fill={STATUS_COLOR.partner.fill} stroke={STATUS_COLOR.partner.stroke} strokeWidth="1.5" />
                {PHILIPPINES_ISLANDS.map((d, i) => (
                  <path key={i} d={d} fill={STATUS_COLOR.partner.fill} stroke={STATUS_COLOR.partner.stroke} strokeWidth="1.5" />
                ))}

                {/* HQ marker */}
                <motion.g
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <circle cx={HQ.x} cy={HQ.y} r="14" fill="rgba(96,165,250,0.18)" />
                  <circle cx={HQ.x} cy={HQ.y} r="5" fill="#60A5FA" stroke="#0b1120" strokeWidth="2" />
                  <text x={HQ.x + 12} y={HQ.y + 4} fill="#DBEAFE" fontSize="13" fontWeight="700" fontFamily="var(--font-display-var), sans-serif">
                    SG · HQ
                  </text>
                </motion.g>

                {/* market markers */}
                {markets.map((m, i) => {
                  const c = STATUS_COLOR[m.status];
                  return (
                    <motion.g
                      key={m.code}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: EASE }}
                    >
                      <motion.circle
                        cx={m.x}
                        cy={m.y}
                        r="5"
                        fill={c.dot}
                        stroke="#0b1120"
                        strokeWidth="2"
                        animate={reduce ? undefined : { opacity: [1, 0.55, 1] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                      />
                      <text x={m.x + 10} y={m.y + 4} fill="#E5E7EB" fontSize="12" fontWeight="600" fontFamily="ui-monospace, monospace">
                        {m.code}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>

              {/* subsidiary footnote — Australia sits outside the ASEAN frame */}
              <div className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/60 backdrop-blur sm:bottom-6 sm:right-6">
                + Australia — subsidiary
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 px-6 py-4 text-xs text-white/60 sm:px-8">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#4ADE80]" /> Active markets — Brunei, Cambodia, Laos
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FBBF24]" /> Partner networks &amp; subsidiary — Malaysia, Philippines, Australia
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
