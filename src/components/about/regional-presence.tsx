"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

const SG_FLAG = "\u{1F1F8}\u{1F1EC}";
const AU_FLAG = "\u{1F1E6}\u{1F1FA}";

const EASE = [0.16, 1, 0.3, 1] as const;
const VB = { w: 1000, h: 560 };

/* ---- dotted map texture ---------------------------------------------
 * Precomputed once (not generated at runtime): a point-in-polygon test run
 * against the real Southeast Asia country boundaries (world-atlas / Natural
 * Earth 50m data, same source as before), sampled on a 7px grid. Flat pairs
 * for compactness; chunked into {x,y} below. Deterministic — safe for SSR. */
const DOT_PAIRS: number[] = [244,338,251,338,251,345,258,338,258,345,258,352,265,338,265,345,265,352,265,359,272,338,272,345,272,352,272,359,279,338,279,345,279,352,279,359,279,366,279,373,286,107,286,114,286,121,286,128,286,345,286,352,286,359,286,366,286,373,286,380,293,100,293,107,293,114,293,121,293,128,293,135,293,177,293,282,293,359,293,366,293,373,293,380,293,387,300,100,300,107,300,114,300,121,300,128,300,135,300,142,300,149,300,163,300,170,300,177,300,184,300,261,300,268,300,275,300,282,300,366,300,373,300,380,300,387,300,394,307,100,307,107,307,114,307,121,307,128,307,135,307,142,307,149,307,156,307,163,307,170,307,177,307,184,307,191,307,198,307,205,307,247,307,254,307,261,307,268,307,275,307,282,307,289,307,296,307,366,307,373,307,380,307,387,307,394,307,401,307,408,307,415,314,93,314,100,314,107,314,114,314,121,314,128,314,135,314,142,314,149,314,156,314,163,314,170,314,177,314,184,314,191,314,198,314,205,314,212,314,219,314,226,314,233,314,275,314,282,314,289,314,296,314,373,314,380,314,387,314,394,314,401,314,408,314,415,321,93,321,100,321,107,321,114,321,121,321,128,321,135,321,142,321,149,321,156,321,163,321,170,321,177,321,184,321,191,321,198,321,205,321,212,321,282,321,289,321,296,321,303,321,310,321,380,321,387,321,394,321,401,321,408,321,415,321,422,321,429,328,86,328,93,328,100,328,107,328,114,328,121,328,128,328,135,328,142,328,149,328,156,328,163,328,170,328,177,328,184,328,191,328,198,328,310,328,317,328,324,328,331,328,387,328,394,328,401,328,408,328,415,328,422,328,429,328,436,335,79,335,86,335,93,335,100,335,107,335,114,335,121,335,128,335,135,335,142,335,149,335,156,335,163,335,170,335,177,335,184,335,191,335,198,335,310,335,317,335,324,335,331,335,338,335,345,335,352,335,359,335,387,335,394,335,401,335,408,335,415,335,422,335,429,335,436,335,443,335,450,342,79,342,86,342,93,342,100,342,107,342,114,342,121,342,128,342,135,342,142,342,149,342,156,342,163,342,170,342,177,342,184,342,191,342,198,342,205,342,212,342,317,342,324,342,331,342,338,342,345,342,352,342,359,342,366,342,394,342,401,342,408,342,415,342,422,342,429,342,436,342,443,342,450,342,457,342,464,349,58,349,79,349,86,349,93,349,100,349,107,349,114,349,121,349,128,349,135,349,142,349,149,349,156,349,163,349,170,349,177,349,184,349,191,349,198,349,205,349,212,349,317,349,324,349,331,349,338,349,345,349,352,349,359,349,366,349,373,349,380,349,401,349,408,349,415,349,422,349,429,349,436,349,443,349,450,349,457,349,464,349,471,356,58,356,65,356,72,356,79,356,86,356,93,356,100,356,107,356,114,356,121,356,128,356,135,356,142,356,149,356,156,356,163,356,170,356,177,356,184,356,191,356,198,356,205,356,212,356,219,356,324,356,331,356,338,356,345,356,352,356,359,356,366,356,373,356,380,356,408,356,415,356,422,356,429,356,436,356,443,356,450,356,457,356,464,356,471,356,478,363,51,363,58,363,65,363,72,363,79,363,86,363,93,363,100,363,107,363,114,363,121,363,128,363,135,363,142,363,149,363,156,363,163,363,170,363,177,363,184,363,191,363,198,363,205,363,212,363,219,363,331,363,338,363,345,363,352,363,359,363,366,363,373,363,380,363,387,363,415,363,422,363,429,363,436,363,443,363,450,363,457,363,464,363,471,363,478,363,485,370,58,370,65,370,72,370,79,370,86,370,93,370,100,370,107,370,114,370,121,370,128,370,135,370,142,370,149,370,156,370,163,370,170,370,177,370,184,370,191,370,198,370,205,370,212,370,219,370,226,370,338,370,345,370,352,370,359,370,366,370,373,370,380,370,387,370,394,370,415,370,422,370,429,370,436,370,443,370,450,370,457,370,464,370,471,370,478,370,485,370,492,377,51,377,58,377,65,377,72,377,79,377,86,377,93,377,100,377,107,377,114,377,121,377,128,377,135,377,142,377,149,377,156,377,163,377,170,377,177,377,184,377,191,377,198,377,205,377,212,377,219,377,226,377,233,377,240,377,345,377,352,377,373,377,380,377,387,377,394,377,422,377,429,377,436,377,443,377,450,377,457,377,464,377,471,377,478,377,485,377,492,377,499,384,58,384,65,384,72,384,79,384,86,384,93,384,100,384,107,384,114,384,121,384,128,384,135,384,142,384,149,384,156,384,163,384,170,384,177,384,184,384,191,384,198,384,205,384,212,384,219,384,226,384,233,384,240,384,247,384,387,384,394,384,443,384,450,384,457,384,464,384,471,384,478,384,485,384,492,384,499,384,506,391,51,391,58,391,65,391,72,391,79,391,86,391,93,391,100,391,107,391,114,391,121,391,128,391,135,391,142,391,149,391,156,391,163,391,170,391,177,391,184,391,191,391,198,391,205,391,212,391,219,391,226,391,233,391,240,391,247,391,443,391,450,391,457,391,464,391,471,391,478,391,485,391,492,391,499,391,506,391,513,398,51,398,58,398,65,398,72,398,79,398,86,398,93,398,100,398,107,398,114,398,121,398,128,398,135,398,142,398,149,398,156,398,163,398,170,398,177,398,184,398,191,398,198,398,205,398,212,398,219,398,226,398,233,398,240,398,247,398,254,398,457,398,464,398,471,398,478,398,485,398,492,398,499,398,506,398,513,405,44,405,51,405,58,405,65,405,72,405,79,405,86,405,93,405,100,405,107,405,114,405,121,405,128,405,135,405,142,405,149,405,156,405,163,405,170,405,177,405,184,405,191,405,198,405,205,405,212,405,219,405,226,405,233,405,240,405,247,405,254,405,261,405,268,405,275,405,464,405,471,405,478,405,485,405,492,405,499,405,506,405,513,412,44,412,51,412,58,412,65,412,72,412,79,412,86,412,93,412,100,412,107,412,114,412,121,412,128,412,135,412,142,412,149,412,156,412,163,412,170,412,177,412,184,412,191,412,198,412,205,412,212,412,219,412,226,412,233,412,240,412,247,412,254,412,261,412,268,412,464,412,471,412,478,412,485,412,492,412,499,412,506,412,513,419,51,419,58,419,65,419,72,419,79,419,86,419,93,419,121,419,128,419,135,419,142,419,149,419,156,419,163,419,170,419,177,419,184,419,191,419,198,419,205,419,212,419,219,419,226,419,233,419,240,419,247,419,254,419,261,419,268,426,51,426,58,426,65,426,72,426,79,426,86,426,128,426,135,426,142,426,149,426,156,426,163,426,170,426,177,426,184,426,191,426,198,426,205,426,212,426,219,426,226,426,233,426,240,426,247,426,254,426,261,433,65,433,72,433,142,433,149,433,156,433,163,433,170,433,177,433,184,433,191,433,198,433,205,433,212,433,219,433,226,433,233,433,240,433,247,440,72,440,149,440,156,440,163,440,170,440,177,440,184,440,191,440,198,440,205,440,212,440,219,440,226,440,233,440,240,440,247,447,72,447,156,447,163,447,170,447,177,447,184,447,191,447,198,447,205,447,212,447,219,447,226,447,233,447,240,447,247,454,163,454,170,454,177,454,184,454,191,454,198,454,205,454,212,454,219,454,226,454,233,454,240,461,170,461,177,461,184,461,191,461,198,461,205,461,212,461,219,461,226,461,233,461,240,468,177,468,184,468,191,468,198,468,205,468,212,468,219,468,226,468,233,475,212,482,394,489,401,496,401,496,408,503,401,510,380,510,387,510,394,510,401,517,380,517,387,517,394,517,401,524,380,524,387,524,394,531,373,531,380,531,387,531,394,538,373,538,380,538,387,538,394,545,366,545,373,545,380,545,387,545,394,545,401,552,352,552,359,552,366,552,373,552,380,552,387,552,394,559,352,559,359,559,366,559,373,559,380,559,387,559,394,566,345,566,352,566,359,566,366,566,373,566,380,573,345,573,352,573,359,573,366,573,373,580,338,580,345,580,352,587,324,587,331,587,338,587,345,594,317,594,324,594,331,594,338,594,345,601,317,601,324,601,331,601,338,601,345,608,282,608,317,608,324,608,331,608,338,608,345,608,352,615,275,615,331,615,338,615,345,615,352,622,268,622,331,622,338,629,261,629,338,636,254,643,247,650,163,650,170,657,128,657,135,657,142,657,149,657,156,657,163,657,170,657,177,657,184,664,121,664,128,664,135,664,142,664,149,664,156,664,163,664,170,664,177,664,191,664,205,664,212,671,121,671,128,671,135,671,142,671,149,671,156,671,163,671,170,671,177,671,184,671,191,671,198,671,205,671,212,671,219,678,128,678,135,678,142,678,149,678,156,678,191,685,128,685,135,685,142,685,149,685,156,685,198,685,233,685,240,685,247,685,296,685,303,692,191,692,233,692,240,692,261,692,296,699,198,699,240,699,247,699,254,699,261,699,268,699,289,699,296,706,198,706,205,706,247,706,282,706,289,706,296,713,296,720,289,720,296,720,303,720,310,720,317,727,219,727,226,727,240,727,289,727,296,727,303,727,310,727,317,727,324,734,219,734,226,734,233,734,254,734,282,734,289,734,296,734,303,734,310,734,317,734,324,741,268,741,275,741,282,741,289,741,296,741,303,741,317,741,324,748,275,748,282,748,289,748,296,748,303,748,310,755,296,755,303];

const DOTS: { x: number; y: number }[] = [];
for (let i = 0; i < DOT_PAIRS.length; i += 2) DOTS.push({ x: DOT_PAIRS[i], y: DOT_PAIRS[i + 1] });

/* ---- markets — positioned at each real capital city ---------------------- */

const HQ = { x: 383.9, y: 400.9 }; // Singapore

type Dir = "up" | "down" | "left";
type Market = { name: string; label: string; flag: string; x: number; y: number; dir: Dir };

// `dir` is hand-placed per point so pill labels fall into open space and
// never overlap a neighbor, given the real (crowded, geographically
// accurate) capital coordinates below.
const markets: Market[] = [
  { name: "Laos", label: "Active market", flag: "\u{1F1F1}\u{1F1E6}", x: 363.9, y: 128.2, dir: "up" },
  { name: "Cambodia", label: "Active market", flag: "\u{1F1F0}\u{1F1ED}", x: 401.6, y: 233.6, dir: "up" },
  { name: "Brunei", label: "Active market", flag: "\u{1F1E7}\u{1F1F3}", x: 566.4, y: 342, dir: "up" },
  { name: "Malaysia", label: "Partner network", flag: "\u{1F1F2}\u{1F1FE}", x: 349.1, y: 371.6, dir: "left" },
  { name: "Philippines", label: "Partner network", flag: "\u{1F1F5}\u{1F1ED}", x: 665.5, y: 183.5, dir: "up" },
];

const PILL_W = 176;
const PILL_H = 34;

function pillOrigin(x: number, y: number, dir: Dir) {
  if (dir === "up") return { px: x - PILL_W / 2, py: y - 16 - PILL_H };
  if (dir === "left") return { px: x - PILL_W - 14, py: y - PILL_H / 2 };
  return { px: x - PILL_W / 2, py: y + 16 };
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
              {/* dotted map texture — traced from real country boundaries */}
              {DOTS.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r="2" fill="var(--color-brand-300)" opacity="0.5" />
              ))}

              {/* market markers — solid, high-contrast against the muted texture */}
              {markets.map((m, i) => (
                <motion.circle
                  key={m.name}
                  cx={m.x}
                  cy={m.y}
                  r="7"
                  fill="var(--color-brand-500)"
                  stroke="var(--color-surface)"
                  strokeWidth="2.5"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: EASE }}
                />
              ))}
              {!reduce &&
                markets.map((m, i) => (
                  <motion.circle
                    key={`pulse-${m.name}`}
                    cx={m.x}
                    cy={m.y}
                    r="7"
                    fill="none"
                    stroke="var(--color-brand-500)"
                    strokeWidth="1.5"
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 2.4 }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                  />
                ))}

              {/* every market gets its own compact pill, hand-placed to stay clear of its neighbors */}
              {markets.map((m, i) => {
                const { px, py } = pillOrigin(m.x, m.y, m.dir);
                return (
                  <motion.foreignObject
                    key={`pill-${m.name}`}
                    x={px}
                    y={py}
                    width={PILL_W}
                    height={PILL_H}
                    initial={{ opacity: 0, y: py + 6 }}
                    whileInView={{ opacity: 1, y: py }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: EASE }}
                  >
                    <div className="flex h-full items-center">
                      <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-3 shadow-[0_10px_24px_-10px_rgba(2,25,32,0.28)]">
                        <span className="grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-2 text-[13px] leading-none ring-1 ring-inset ring-line">
                          {m.flag}
                        </span>
                        <span className="whitespace-nowrap text-xs font-semibold text-content">{m.name}</span>
                      </div>
                    </div>
                  </motion.foreignObject>
                );
              })}

              {/* HQ marker — larger, distinct */}
              <motion.circle
                cx={HQ.x}
                cy={HQ.y}
                r="9"
                fill="var(--color-brand-700)"
                stroke="var(--color-surface)"
                strokeWidth="3"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, ease: EASE }}
              />

              {/* One featured callout — Singapore HQ */}
              <foreignObject x={HQ.x - 100} y={HQ.y + 16} width="200" height="70">
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-3 rounded-2xl border border-line bg-surface px-3.5 py-3 shadow-[0_16px_36px_-14px_rgba(2,25,32,0.3)]">
                    <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-2 text-xl leading-none ring-1 ring-inset ring-line">
                      {SG_FLAG}
                    </span>
                    <span className="text-left leading-tight">
                      <span className="block text-[13px] font-bold uppercase tracking-wide text-content">Singapore</span>
                      <span className="block text-xs text-muted">Headquarters</span>
                    </span>
                  </div>
                </div>
              </foreignObject>
            </svg>
          </div>
        </Reveal>

        {/* Legend — kept as plain, readable HTML instead of crowding the map with pills */}
        <Reveal delay={0.2}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {markets.map((m) => (
              <span
                key={m.name}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-3.5 text-xs font-medium text-muted"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-2 text-[11px] leading-none ring-1 ring-inset ring-line">
                  {m.flag}
                </span>
                <span className="text-content">{m.name}</span>
                <span className="text-faint">· {m.label}</span>
              </span>
            ))}
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-3.5 text-xs font-medium text-muted">
              <span className="grid h-5 w-5 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-2 text-[11px] leading-none ring-1 ring-inset ring-line">
                {AU_FLAG}
              </span>
              <span className="text-content">Australia</span>
              <span className="text-faint">· Subsidiary</span>
            </span>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
