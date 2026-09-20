"use client";

import { motion, useReducedMotion } from "motion/react";
import { MapPin, Building2 } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

const EASE = [0.16, 1, 0.3, 1] as const;
const VB = { w: 1000, h: 560 };

/* ---- real, simplified country boundaries --------------------------------
 * Traced from the public `world-atlas` (Natural Earth, 50m) dataset via an
 * equirectangular projection fit to this viewBox, then lightly simplified —
 * not hand-drawn approximations, so the shapes are actually identifiable.
 * Singapore has no usable outline at this resolution; it's shown as a
 * marker only, which is accurate to its real scale next to its neighbors. */

const CONTEXT_COUNTRIES: Record<string, string> = {
  vietnam:
    "M452.1,70.1L442.8,73.8L438.8,79.3L430.8,78.5L432,82.8L428.2,90.1L419.4,95.9L413.5,111.8L417.9,119.5L427.8,128.6L427.5,132.3L439.1,145.8L452.9,155.1L465.9,170.7L470.3,181.6L473.9,195.7L473.3,205.2L476.2,216.3L472.5,215.6L472.1,230.7L468.7,237.1L440.4,252.5L436.2,248.2L434.5,252.7L427.3,254.1L432.6,257.1L425.9,266.3L421.5,264.3L422.4,268.9L411.5,273.9L405.2,281.5L399.5,282L400.7,265.5L404.8,260.6L393.9,252.2L400.8,250.2L403.6,244.4L415.7,242.8L422.3,245.9L422.4,242.4L417.3,237.7L419.7,230.1L426.4,231.1L426.5,227L442.5,221.9L445.2,217.3L443.8,209.2L446,202.6L441.5,191.3L444.6,181.8L446.8,172.8L439.2,163.2L442.6,159.8L431.8,153.1L427.9,144.9L414.6,132L410.8,125.2L404.7,120.3L405.7,117L398.6,114.5L385.1,105.7L387.4,100.2L395.8,101.3L402.1,94.6L397,88.7L392.9,87.6L396.4,84.3L387.7,79.4L380.9,83.4L372.1,80.3L368,74.1L369.6,67.3L365.5,67.6L356.1,55.8L361,50L370.5,54.6L375.4,49.5L380.6,49.2L385.4,53.2L387.7,49.7L392.9,50.5L399.9,47.1L401,43.4L407.8,40L417.1,46.9L428.5,47.2L432.4,49.3L428.5,55.6L430.6,62.4L436.2,63.8L441.8,68.5L449.2,67.9L452.1,70.1Z",
  thailand:
    "M323.2,89.7L327.3,89.3L330.1,93.4L327.7,98.9L331.5,103.1L341.1,102.3L342.3,111.7L338.5,121L339.5,127.1L336.1,134.5L339.3,136.3L356.5,124.4L365.8,129.5L371.3,127.2L375.1,121L387.7,124.2L400.2,139.2L399.2,149.9L404,157.9L409.9,160.7L413.5,165.5L411.6,171L411.1,184.6L406.3,187.7L399.6,186.3L373.7,187.9L368.9,191.1L363,200.2L359.2,200.9L362.2,215.2L366.4,219.2L366.1,224.7L369.3,231L362.9,224.4L349.5,214.9L344.9,216L335.4,214.4L337,202.7L332,201.2L321.5,204L322.7,209L320.6,214.8L321,223.4L315.1,235L312.8,244.4L307.5,253.7L307.4,263.3L311.3,271.9L316.7,270.2L319.7,273.5L320.6,280.8L325.8,287.4L328.6,301L323.8,296.3L328.2,305.1L337.9,310.5L345.8,310.4L355.7,320.7L351.9,327.5L346.7,326.1L339.5,330.6L337.3,328.4L338.5,320.6L324.1,313.6L323.2,317.4L316.2,310.2L314.6,302.4L310.7,302.1L305.6,293.7L297.9,286.2L293.4,288.1L292.1,282.9L294.5,270.6L299.9,255.9L300.8,248.1L307.9,240.8L314.9,229.8L311.5,217.2L306.6,208.1L307,198L292.4,180L291.5,173.6L297.6,170.3L298.1,159.7L301.8,157.6L296.2,148.5L295.6,144.5L285,132.9L279.9,119.6L284.3,117.5L285.4,103.8L288.6,99L303.4,98.6L305.1,94.2L313,91.8L312.3,88.9L319.4,87.9L323.2,89.7Z",
  indonesia:
    "M263.7,337.3L279.4,337.2L286.9,343L292.4,350.6L293.4,355.9L316.8,370.9L328.7,386L335.8,391.1L334.8,386.3L338.4,386L345.4,395.3L350.5,396.5L356.6,402.4L361.7,410.3L367.9,411.3L371.5,415L366.8,419.1L376,414.7L383.4,422.3L377.4,426.2L377.5,431.9L382.3,437.6L392.7,440.1L395.3,452.9L400.7,457.4L398.9,465.3L403.7,461.8L412.8,464L420.4,474.1L417.1,482.4L417.8,505.3L416.7,516.2L413.4,518.3L409,514.2L404.6,517.4L397.4,513.7L396.7,520L384.1,506.4L362.9,491.2L356.1,482.2L347.1,475.1L335.1,458.3L335.3,454.8L329.2,444.4L326.3,436.7L314.6,421.4L307.4,417.3L301.5,398.6L297.6,391.9L283.5,384.4L281.7,376.4L278.4,374.3L271.5,364.4L262.8,360.5L247.3,345L242.6,336.4L242.9,331.8L249.5,331L257.8,336.2L263.7,337.3Z",
};

const MARKET_SHAPES: Record<string, string> = {
  Laos:
    "M356.1,55.8L365.5,67.6L369.6,67.3L368,74.1L372.1,80.3L380.9,83.4L387.7,79.4L396.4,84.3L392.9,87.6L397,88.7L402.1,94.6L395.8,101.3L387.4,100.2L385.1,105.7L398.6,114.5L405.7,117L404.7,120.3L410.8,125.2L414.6,132L427.9,144.9L431.8,153.1L442.6,159.8L439.2,163.2L446.8,172.8L444.6,181.8L433.1,188.2L427.9,183.9L419.3,187.7L421.7,192.6L418.1,194.6L406.3,187.7L411.1,184.6L411.6,171L413.5,165.5L409.9,160.7L404,157.9L399.2,149.9L400.2,139.2L387.7,124.2L375.1,121L371.3,127.2L365.8,129.5L356.5,124.4L339.3,136.3L336.1,134.5L339.5,127.1L338.5,121L342.3,111.7L341.1,102.3L331.5,103.1L327.7,98.9L330.1,93.4L327.3,89.3L323.2,89.7L325.3,82.9L329.8,79.8L333.6,73.4L339.9,69.2L341.3,74.8L349.6,75.9L349.7,64.9L346.2,57.9L348.6,54.5L356.1,55.8Z",
  Cambodia:
    "M444.6,181.8L441.5,191.3L446,202.6L443.8,209.2L445.2,217.3L442.5,221.9L426.5,227L426.4,231.1L419.7,230.1L417.3,237.7L422.4,242.4L422.3,245.9L415.7,242.8L403.6,244.4L400.8,250.2L393.9,252.2L385.8,249.4L379.2,249.1L382.3,244.4L379.2,240.2L373,244L372.5,235L369.3,231L366.1,224.7L366.4,219.2L362.2,215.2L359.2,200.9L363,200.2L368.9,191.1L373.7,187.9L399.6,186.3L406.3,187.7L418.1,194.6L421.7,192.6L419.3,187.7L427.9,183.9L433.1,188.2L444.6,181.8Z",
  Brunei:
    "M567.8,342.7L563.2,345.7L564.7,351L560.9,357L552,347.7L555.9,347.5L564.7,341.9L567.8,342.7Z",
  Malaysia:
    "M609.6,354.7L601.8,351.9L582.1,351.7L576.7,358.4L574.8,373.3L568.8,376.5L569.9,382.2L563.8,386.2L564.6,390.6L559.9,399L549.4,399.6L544.8,402.8L534.6,399.6L533.6,397.4L521.2,399.5L519.4,404.3L514.3,406.7L500.7,406.4L493.6,409L479.6,396.6L479.2,389.8L485,394.9L491,394.9L503.3,400.1L506.1,388L505.7,383.1L513.7,376.2L530.2,372.7L535.2,370.5L549.7,353.5L552,347.7L560.9,357L564.7,351L563.2,345.7L567.8,342.7L569.1,351L572.7,351.2L569.7,342.7L576.5,339.5L574.2,334.3L580.4,332.2L586,322.5L591.9,316.1L596.1,308.6L596.7,314.7L602.3,308.7L605,313.5L610.8,316.8L610.3,325.6L616.6,323.7L618.5,326.9L626.3,331.3L636.7,334.3L635.1,339.4L627.6,341.6L620.8,341.2L619.6,343.9L626.3,349.9L609.6,354.7Z M323.2,317.4L324.1,313.6L338.5,320.6L337.3,328.4L339.5,330.6L346.7,326.1L351.9,327.5L355.7,320.7L370.1,332.4L377.3,343.5L378.2,351L376.4,361.2L377.6,375L383.8,380.7L390.4,394.8L391.4,399.9L381.8,399.3L378.3,401.3L376.3,397.7L366,392.6L342.5,375.7L342.5,369.7L333,358L331.3,346.8L327,331.4L326.8,324.9L323.2,317.4Z",
  Philippines:
    "M667.5,117.6L679.7,122.9L687.1,121.1L684.7,133.2L690.7,142.1L684.5,157.5L675.6,161.6L675.8,165.9L672.2,171.6L677.2,181.2L678.4,190.6L683.5,194.2L690.3,188.1L696.3,189.2L702.4,197.5L703.9,192.3L712.7,196.6L707.6,199.2L711.5,207.9L717.4,209.2L716,216.9L713.7,210.7L703.7,209L701.3,202.5L692,194.9L689.9,195.2L693.3,205.6L683.4,196.8L678.6,194.4L669.2,199.2L663.2,195.2L659.8,196.5L659.5,190.3L664.9,182.8L659,178.9L659.1,185.4L656.6,185.9L650.7,179.4L646.6,155.2L652,159.7L655.8,156.9L654.4,151.8L656.1,144.8L655.3,133.6L659.2,119.4L667.5,117.6Z M748,270.1L751.1,270.9L753.1,277.9L750.2,281.5L753.9,283.9L757.4,304.1L751.1,310.6L751,319.6L745,302.7L738.1,311.6L741.1,317L742.4,325L736.2,330.7L735.9,324.1L732,326.8L718.6,320.8L714.8,310.5L718.4,301.7L714.5,297.3L706.7,295L705,301.5L700.2,296.7L690.4,297.2L684.6,309L681.6,308.7L684.4,294.9L687.8,291.4L697.2,289.2L705.8,280.3L712.6,284.7L711,290.9L718.3,288L722.5,281.9L727.1,282.6L729.3,275.9L733.8,277.6L739.6,275.2L738.2,264.4L740,262.9L748,270.1Z M735.4,217.5L740.2,223L739.5,232.8L743,239.9L735.3,240.2L729.5,229.8L722.3,223.7L719.9,216.8L735.4,217.5Z M700.8,274.3L691.4,267.5L690,259.6L696.3,257.6L695.6,250.7L698.4,244.4L702.8,242.7L707.9,246.2L701.3,261.2L703.9,270.9L700.8,274.3Z M690.4,232.5L701.2,233.8L699.9,239.4L694.9,245.5L682,251.5L681.6,244.7L683.9,232L681.6,227.9L690.4,232.5Z M605.3,284.6L605.9,280.1L617,271L633.4,253.2L636.7,251.2L637.3,245.1L641.2,236.9L644.2,249.9L636.1,258L629.4,260.4L623.7,271.2L616.4,277.4L605.3,284.6Z M661,201.9L669.2,202.7L674.4,207.6L674.7,215.7L669.7,222.6L665.2,218.8L662,210.2L656,201.3L661,201.9Z M724.5,236.9L730.3,236.5L731.7,246.1L735.6,254.7L731.3,253L731.9,258.4L727.8,256.2L728.1,247.8L725.9,243.2L722.3,243.8L720.4,233.8L724.5,236.9Z",
};

/* ---- markets — positioned at each real capital city ---------------------- */

const HQ = { x: 383.9, y: 400.9 }; // Singapore

type Market = { name: string; label: string; x: number; y: number; status: "active" | "partner" };

const markets: Market[] = [
  { name: "Laos", label: "Active", x: 363.9, y: 128.2, status: "active" },
  { name: "Cambodia", label: "Active", x: 401.6, y: 233.6, status: "active" },
  { name: "Brunei", label: "Active", x: 566.4, y: 342, status: "active" },
  { name: "Malaysia", label: "Partner", x: 349.1, y: 371.6, status: "partner" },
  { name: "Philippines", label: "Partner", x: 665.5, y: 183.5, status: "partner" },
];

const STATUS_COLOR: Record<Market["status"], string> = {
  active: "var(--color-emerald)",
  partner: "var(--color-warning-400)",
};

/** Quadratic-bezier "flight path" arc, always curving upward. */
function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const curve = Math.min(Math.hypot(x2 - x1, y2 - y1) * 0.22, 120);
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

              {/* neighboring countries — unlabeled, for geographic context only */}
              {Object.entries(CONTEXT_COUNTRIES).map(([name, d]) => (
                <path key={name} d={d} fill="var(--color-surface-2)" stroke="var(--color-line)" strokeWidth="1" />
              ))}

              {/* highlighted markets — real, identifiable country shapes */}
              {markets.map((m) => (
                <path
                  key={`shape-${m.name}`}
                  d={MARKET_SHAPES[m.name]}
                  fill={`color-mix(in oklab, ${STATUS_COLOR[m.status]} 14%, transparent)`}
                  stroke={STATUS_COLOR[m.status]}
                  strokeWidth="1.5"
                />
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
                  y={m.y - 50}
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
