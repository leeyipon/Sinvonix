"use client";

import { useReducedMotion, motion } from "motion/react";
import {
  ShieldAlert,
  Lock,
  Headset,
  Workflow,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

type Shades = { top: string; left: string; right: string };

const HUB: Shades = {
  top: "var(--color-brand-300)",
  left: "var(--color-brand-500)",
  right: "var(--color-brand-700)",
};

type Node = {
  name: string;
  tag: string;
  icon: LucideIcon;
  shades: Shades;
  x: number;
  y: number;
  w: number;
  h: number;
  delay: number;
  float: number;
};

// Pentagon layout around the hub (450,270), computed on a 250×130 isometric
// ellipse so the scatter reads as "orbiting a hub" rather than a plain circle.
const nodes: Node[] = [
  {
    name: "CORDON",
    tag: "Fraud & AML",
    icon: ShieldAlert,
    shades: { top: "var(--color-brand-200)", left: "var(--color-brand-400)", right: "var(--color-brand-600)" },
    x: 450,
    y: 140,
    w: 46,
    h: 30,
    delay: 0.1,
    float: -9,
  },
  {
    name: "AEVIX",
    tag: "Payment & Quantum Security",
    icon: Lock,
    shades: { top: "var(--color-brand-300)", left: "var(--color-brand-500)", right: "var(--color-brand-700)" },
    x: 688,
    y: 230,
    w: 48,
    h: 32,
    delay: 0.2,
    float: 11,
  },
  {
    name: "Conversa CI Hub",
    tag: "Contact Centre",
    icon: Headset,
    shades: { top: "var(--color-brand-400)", left: "var(--color-brand-600)", right: "var(--color-brand-800)" },
    x: 597,
    y: 375,
    w: 44,
    h: 29,
    delay: 0.3,
    float: -12,
  },
  {
    name: "Chronicle AI",
    tag: "Intelligent Automation",
    icon: Workflow,
    shades: { top: "var(--color-brand-500)", left: "var(--color-brand-700)", right: "var(--color-brand-900)" },
    x: 303,
    y: 375,
    w: 50,
    h: 33,
    delay: 0.4,
    float: 10,
  },
  {
    name: "Managed Security",
    tag: "MDR & Digital Risk",
    icon: ShieldCheck,
    shades: { top: "var(--color-brand-600)", left: "var(--color-brand-800)", right: "var(--color-brand-950)" },
    x: 212,
    y: 230,
    w: 47,
    h: 31,
    delay: 0.5,
    float: -10,
  },
];

const HUB_X = 450;
const HUB_Y = 270;

// The isometric diamond the circuit-board base plate is drawn on.
const BOARD = {
  top: [HUB_X, HUB_Y - 150] as [number, number],
  right: [HUB_X + 230, HUB_Y - 20] as [number, number],
  bottom: [HUB_X, HUB_Y + 110] as [number, number],
  left: [HUB_X - 230, HUB_Y - 20] as [number, number],
};
const GRID_T = [0.2, 0.4, 0.6, 0.8];

/** A line between the same t-fraction along two opposite edges of the
 *  diamond (a→b and c→d), which stays parallel to the a-c/b-d edges and
 *  fully inside the shape — used to draw the PCB crosshatch. */
function lerpEdge(a: [number, number], b: [number, number], c: [number, number], d: [number, number], t: number) {
  const p1x = a[0] + (b[0] - a[0]) * t;
  const p1y = a[1] + (b[1] - a[1]) * t;
  const p2x = c[0] + (d[0] - c[0]) * t;
  const p2y = c[1] + (d[1] - c[1]) * t;
  return { x1: p1x, y1: p1y, x2: p2x, y2: p2y };
}

/** Isometric cube: shaded faces + a glossy sheen highlight + a grounding shadow. */
function IsoCube({
  x,
  y,
  w,
  h,
  shades,
  glossId,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  shades: Shades;
  glossId: string;
}) {
  const top = [
    [x, y - w * 0.5],
    [x + w, y],
    [x, y + w * 0.5],
    [x - w, y],
  ]
    .map((p) => p.join(","))
    .join(" ");

  const left = [
    [x - w, y],
    [x, y + w * 0.5],
    [x, y + w * 0.5 + h],
    [x - w, y + h],
  ]
    .map((p) => p.join(","))
    .join(" ");

  const right = [
    [x, y + w * 0.5],
    [x + w, y],
    [x + w, y + h],
    [x, y + w * 0.5 + h],
  ]
    .map((p) => p.join(","))
    .join(" ");

  // Diagonal sheen streak across the top face — the glossy "plastic" highlight.
  const sheen = [
    [x - w * 0.5, y - w * 0.1],
    [x - w * 0.05, y - w * 0.42],
    [x + w * 0.2, y - w * 0.28],
    [x - w * 0.25, y + w * 0.14],
  ]
    .map((p) => p.join(","))
    .join(" ");

  return (
    <g>
      {/* contact shadow */}
      <ellipse cx={x} cy={y + h + w * 0.5 + 3} rx={w * 0.72} ry={w * 0.16} fill="rgba(2,20,45,0.18)" filter="url(#soft-blur)" />

      <polygon points={left} fill={shades.left} />
      <polygon points={right} fill={shades.right} />
      <polygon points={top} fill={shades.top} />
      {/* subtle vertical sheen on the right (darkest) face for glassy depth */}
      <polygon points={right} fill={`url(#${glossId})`} opacity="0.55" />
      <polygon points={sheen} fill="white" opacity="0.35" />
      <polygon points={top} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1" />
    </g>
  );
}

export function PlatformHub() {
  const reduce = useReducedMotion();

  return (
    <Section className="overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="The Sinvonix platform"
          title="Five products, one connected hub"
          description="CORDON, AEVIX, Conversa CI Hub, Chronicle AI and Managed Security plug into a single platform — each one visible, monitored and orchestrated from the centre."
        />

        <div className="relative mx-auto mt-14 max-w-4xl">
          {/* Ambient glow behind the hub */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand-500)_32%,transparent),transparent)] opacity-80 blur-3xl"
          />

          <svg viewBox="0 0 900 560" className="relative w-full" role="img" aria-label="The Sinvonix platform hub, connecting CORDON, AEVIX, Conversa CI Hub, Chronicle AI and Managed Security">
            <defs>
              <linearGradient id="hub-line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--color-brand-400)" stopOpacity="0.95" />
                <stop offset="1" stopColor="var(--color-brand-600)" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="face-gloss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="white" stopOpacity="0.22" />
                <stop offset="0.4" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="board-fade" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="var(--color-brand-400)" stopOpacity="0.35" />
                <stop offset="1" stopColor="var(--color-brand-400)" stopOpacity="0" />
              </radialGradient>
              <filter id="soft-blur" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
              <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Circuit-board base plate under the hub — same isometric diamond, faint PCB crosshatch.
                Diamond corners: top/right/bottom/left. Grid lines are drawn between matching
                t-fractions of opposite edge pairs, which keeps every line parallel to a diamond
                edge and fully inside it — the standard way to grid an isometric rhombus. */}
            <g opacity="0.8">
              <polygon points={`${BOARD.top.join(",")} ${BOARD.right.join(",")} ${BOARD.bottom.join(",")} ${BOARD.left.join(",")}`} fill="url(#board-fade)" />
              {GRID_T.map((t) => (
                <line key={`grid-a-${t}`} {...lerpEdge(BOARD.top, BOARD.left, BOARD.right, BOARD.bottom, t)} stroke="var(--color-brand-300)" strokeWidth="0.75" opacity="0.28" />
              ))}
              {GRID_T.map((t) => (
                <line key={`grid-b-${t}`} {...lerpEdge(BOARD.top, BOARD.right, BOARD.left, BOARD.bottom, t)} stroke="var(--color-brand-300)" strokeWidth="0.75" opacity="0.28" />
              ))}
            </g>

            {/* Connector lines — glow layer + crisp core, same draw-on technique as the About hero's network lines */}
            {nodes.map((n, i) => (
              <motion.line
                key={`glow-${n.name}`}
                x1={HUB_X}
                y1={HUB_Y}
                x2={n.x}
                y2={n.y}
                stroke="var(--color-brand-400)"
                strokeWidth="5"
                strokeLinecap="round"
                opacity="0.25"
                filter="url(#soft-blur)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.25 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.08, ease: EASE }}
              />
            ))}
            {nodes.map((n, i) => (
              <motion.line
                key={`line-${n.name}`}
                x1={HUB_X}
                y1={HUB_Y}
                x2={n.x}
                y2={n.y}
                stroke="url(#hub-line)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.08, ease: EASE }}
              />
            ))}

            {/* Traveling pulse per connector — glowing */}
            {!reduce &&
              nodes.map((n, i) => (
                <motion.circle
                  key={`pulse-${n.name}`}
                  r="4.5"
                  fill="var(--color-brand-300)"
                  filter="url(#glow)"
                  initial={{ cx: HUB_X, cy: HUB_Y, opacity: 0 }}
                  animate={{ cx: [HUB_X, n.x], cy: [HUB_Y, n.y], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 1.4,
                    delay: 1.2 + i * 0.35,
                    ease: "easeInOut",
                  }}
                />
              ))}

            {/* Satellite nodes */}
            {nodes.map((n) => {
              const Icon = n.icon;
              return (
                <motion.g
                  key={n.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: n.delay, ease: EASE }}
                >
                  <motion.g
                    animate={reduce ? undefined : { y: [0, n.float, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: n.delay }}
                  >
                    <IsoCube x={n.x} y={n.y} w={n.w} h={n.h} shades={n.shades} glossId="face-gloss" />
                    <foreignObject x={n.x - 16} y={n.y - n.w * 0.28 - 16} width="32" height="32">
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/90 text-[#1c1c1e] shadow-[0_4px_10px_rgba(0,0,0,.25)]">
                        <Icon className="h-4 w-4" />
                      </div>
                    </foreignObject>
                    <foreignObject x={n.x - 78} y={n.y + n.w * 0.5 + n.h + 8} width="156" height="46">
                      <div className="flex flex-col items-center text-center">
                        <span className="rounded-full border border-line bg-surface/90 px-2.5 py-1 text-[11px] font-semibold leading-none text-content backdrop-blur">
                          {n.name}
                        </span>
                        <span className="mt-1 text-[10px] leading-none text-muted">{n.tag}</span>
                      </div>
                    </foreignObject>
                  </motion.g>
                </motion.g>
              );
            })}

            {/* Hub — largest cube, always on top, with a soft halo ring */}
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <motion.g
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <circle cx={HUB_X} cy={HUB_Y} r="100" fill="var(--color-brand-500)" opacity="0.12" />
                <circle cx={HUB_X} cy={HUB_Y} r="78" fill="none" stroke="var(--color-brand-400)" strokeWidth="1" opacity="0.4" />
                <IsoCube x={HUB_X} y={HUB_Y} w={70} h={46} shades={HUB} glossId="face-gloss" />
                <foreignObject x={HUB_X - 100} y={HUB_Y - 20} width="200" height="26">
                  <div className="text-center font-display text-sm font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,.5)]">
                    Sinvonix
                  </div>
                </foreignObject>
              </motion.g>
            </motion.g>
          </svg>
        </div>
      </Container>
    </Section>
  );
}
