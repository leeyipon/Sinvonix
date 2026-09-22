"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Activity, Building2, Handshake, type LucideIcon } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { WORLD_LAND_PATH } from "@/lib/world-map-path";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
// Canvas matches the projection used to generate WORLD_LAND_PATH (Natural
// Earth projection, fit to the world's land extent).
const VB = { w: 1000, h: 520 };

const HQ = { x: 791.9, y: 251.6 }; // Singapore, true projected position

type Market = {
  name: string;
  label: string;
  icon: LucideIcon;
  color: string;
  x: number; // display position — see note below
  y: number;
};

// A flat icon per status — at a glance, not a legend lookup: Activity for
// live markets, Handshake for partner networks, Building2 for the
// subsidiary. Same three icons used in the pin on the map and the card
// below it, so the two stay obviously linked.
const STATUS_ICON: Record<Market["label"], LucideIcon> = {
  "Active market": Activity,
  "Partner network": Handshake,
  Subsidiary: Building2,
};

// Singapore, Laos, Cambodia, Brunei, Malaysia and the Philippines are all
// genuinely this close together in real life — at world-map scale their
// true projected points are only 8–70 units apart on a 1000-wide canvas,
// which reads as one illegible blob of overlapping pins. Fanned each one
// out from the true HQ point by hand (same technique — and same honesty
// trade-off — the previous version used for its label pills) so every pin
// is readable; Australia is naturally far enough away to sit at its real
// position untouched.
const markets: Market[] = [
  { name: "Laos", label: "Active market", icon: STATUS_ICON["Active market"], color: "var(--color-brand-400)", x: 742, y: 195 },
  { name: "Cambodia", label: "Active market", icon: STATUS_ICON["Active market"], color: "var(--color-brand-500)", x: 800, y: 165 },
  { name: "Brunei", label: "Active market", icon: STATUS_ICON["Active market"], color: "var(--color-brand-600)", x: 868, y: 210 },
  { name: "Malaysia", label: "Partner network", icon: STATUS_ICON["Partner network"], color: "var(--color-brand-700)", x: 715, y: 270 },
  { name: "Philippines", label: "Partner network", icon: STATUS_ICON["Partner network"], color: "var(--color-brand-800)", x: 862, y: 145 },
  { name: "Australia", label: "Subsidiary", icon: STATUS_ICON.Subsidiary, color: "var(--color-brand-900)", x: 902, y: 366.5 },
];

export function RegionalPresence() {
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);

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
              aria-label="World map of Sinvonix's footprint: headquartered in Singapore, active in Laos, Cambodia and Brunei, with partner networks in Malaysia and the Philippines, and a subsidiary in Australia"
            >
              {/* Real world coastlines — Natural Earth data, not a decorative sketch */}
              <path d={WORLD_LAND_PATH} fill="var(--color-brand-200)" fillOpacity="0.9" />

              {/* Hub-and-spoke routes — Singapore out to every market, drawn on */}
              {markets.map((m, i) => (
                <motion.path
                  key={`route-${m.name}`}
                  d={`M ${HQ.x} ${HQ.y} L ${m.x} ${m.y}`}
                  fill="none"
                  stroke="var(--color-brand-500)"
                  strokeWidth="1.5"
                  strokeDasharray="1 6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: EASE }}
                />
              ))}

              {/* Selection ring — grows around whichever market the legend below points at */}
              {markets.map(
                (m) =>
                  m.name === selected && (
                    <motion.circle
                      key={`select-${m.name}`}
                      cx={m.x}
                      cy={m.y}
                      r="15"
                      fill="none"
                      stroke="var(--color-brand-500)"
                      strokeWidth="2"
                      initial={{ opacity: 0, scale: 1 }}
                      animate={{ opacity: [0.9, 0.3, 0.9], scale: reduce ? 1 : [1, 1.7, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )
              )}

              {/* Market pins — a flat status icon, not a number to look up */}
              {markets.map((m, i) => {
                const isSelected = m.name === selected;
                const Icon = m.icon;
                const r = isSelected ? 16 : 14;
                return (
                  <motion.g
                    key={m.name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: EASE }}
                  >
                    <circle
                      cx={m.x}
                      cy={m.y}
                      r={r}
                      fill={m.color}
                      stroke="var(--color-surface)"
                      strokeWidth="3"
                      style={{ transition: "r 0.3s cubic-bezier(0.16,1,0.3,1)" }}
                    />
                    <foreignObject x={m.x - 8} y={m.y - 8} width="16" height="16">
                      <div className="grid h-4 w-4 place-items-center text-white">
                        <Icon className="h-3 w-3" strokeWidth={2.5} />
                      </div>
                    </foreignObject>
                  </motion.g>
                );
              })}

              {/* HQ marker — larger, distinct */}
              <motion.g
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <circle cx={HQ.x} cy={HQ.y} r="19" fill="var(--color-brand-950)" opacity="0.15" />
                <circle
                  cx={HQ.x}
                  cy={HQ.y}
                  r="11"
                  fill="var(--color-brand-950)"
                  stroke="var(--color-surface)"
                  strokeWidth="3"
                />
              </motion.g>
              {!reduce && (
                <motion.circle
                  cx={HQ.x}
                  cy={HQ.y}
                  r="11"
                  fill="none"
                  stroke="var(--color-brand-950)"
                  strokeWidth="1.5"
                  initial={{ opacity: 0.6, scale: 1 }}
                  animate={{ opacity: 0, scale: 2.2 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              )}

              {/* HQ callout */}
              <foreignObject x={HQ.x - 150} y={HQ.y + 38} width="170" height="60">
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2.5 rounded-2xl border border-line bg-surface px-3 py-2.5 shadow-[0_16px_36px_-14px_rgba(2,25,32,0.3)]">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-950 text-[10px] font-extrabold text-white">
                      HQ
                    </span>
                    <span className="text-left leading-tight">
                      <span className="block text-[12px] font-bold uppercase tracking-wide text-content">
                        Singapore
                      </span>
                      <span className="block text-[11px] text-muted">Headquarters</span>
                    </span>
                  </div>
                </div>
              </foreignObject>
            </svg>
          </div>
        </Reveal>

        {/* Legend — bigger, clickable cards; picking one rings its pin on the map above */}
        <Reveal delay={0.2}>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {markets.map((m) => {
              const isSelected = m.name === selected;
              const Icon = m.icon;
              return (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => setSelected(isSelected ? null : m.name)}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex cursor-pointer flex-col items-center gap-2 rounded-2xl border bg-surface px-3 py-4 text-center transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1",
                    isSelected
                      ? "border-brand-500/50 shadow-glow"
                      : "border-line hover:border-brand-500/40"
                  )}
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white"
                    style={{ background: m.color }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <span className="text-sm font-semibold text-content">{m.name}</span>
                  <span className="text-xs text-faint">{m.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
