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

const HUB: Shades = { top: "#93C5FD", left: "#3B82F6", right: "#1D4ED8" };

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
    shades: { top: "#FCA5A5", left: "#DC2626", right: "#991B1B" },
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
    shades: { top: "#7DD3FC", left: "#0EA5E9", right: "#0369A1" },
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
    shades: { top: "#A5B4FC", left: "#4F46E5", right: "#3730A3" },
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
    shades: { top: "#6EE7B7", left: "#059669", right: "#047857" },
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
    shades: { top: "#60A5FA", left: "#1E3A8A", right: "#0F172A" },
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

/** Isometric cube: a rhombus top face plus two shaded side faces. */
function IsoCube({ x, y, w, h, shades }: { x: number; y: number; w: number; h: number; shades: Shades }) {
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

  return (
    <g>
      <polygon points={left} fill={shades.left} />
      <polygon points={right} fill={shades.right} />
      <polygon points={top} fill={shades.top} />
      <polygon points={top} fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1" />
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
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand-500)_30%,transparent),transparent)] opacity-70 blur-3xl"
          />

          <svg viewBox="0 0 900 560" className="relative w-full" role="img" aria-label="The Sinvonix platform hub, connecting CORDON, AEVIX, Conversa CI Hub, Chronicle AI and Managed Security">
            <defs>
              <linearGradient id="hub-line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--color-brand-400)" stopOpacity="0.9" />
                <stop offset="1" stopColor="var(--color-brand-600)" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Connector lines — same draw-on technique as the About hero's network lines */}
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

            {/* Traveling pulse per connector */}
            {!reduce &&
              nodes.map((n, i) => (
                <motion.circle
                  key={`pulse-${n.name}`}
                  r="4"
                  fill="var(--color-brand-400)"
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
                    <IsoCube x={n.x} y={n.y} w={n.w} h={n.h} shades={n.shades} />
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

            {/* Hub — largest cube, always on top */}
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
                <circle cx={HUB_X} cy={HUB_Y} r="86" fill="var(--color-brand-500)" opacity="0.14" />
                <IsoCube x={HUB_X} y={HUB_Y} w={70} h={46} shades={HUB} />
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
