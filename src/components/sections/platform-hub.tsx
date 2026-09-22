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
import { MainLogo } from "@/components/ui/main-logo";

const EASE = [0.16, 1, 0.3, 1] as const;

type Node = { name: string; icon: LucideIcon; x: number; y: number; delay: number; float: number };

const HUB_X = 380;
const HUB_Y = 220;
const BEND = 24; // px the connector curve bows away from a straight line

/** A control point offset perpendicular to the node→hub line, so every
 *  connector curves — even one whose node shares the hub's exact x or y,
 *  where "just use the midpoint" would degenerate into a straight line. */
function bendControlPoint(x: number, y: number) {
  const dx = HUB_X - x;
  const dy = HUB_Y - y;
  const len = Math.hypot(dx, dy) || 1;
  return {
    x: (x + HUB_X) / 2 - (dy / len) * BEND,
    y: (y + HUB_Y) / 2 + (dx / len) * BEND,
  };
}

// Flat icon tiles in two columns flanking the hub — three left, two right —
// instead of an isometric scatter. Clean, simple, no 3D shading. Every icon
// sits on the same flat Primary color, not a per-node gradient.
const nodes: Node[] = [
  { name: "CORDON", icon: ShieldAlert, x: 110, y: 90, delay: 0.1, float: -8 },
  { name: "AEVIX", icon: Lock, x: 650, y: 150, delay: 0.2, float: 9 },
  { name: "Conversa CI Hub", icon: Headset, x: 110, y: 220, delay: 0.3, float: 8 },
  { name: "Chronicle AI", icon: Workflow, x: 650, y: 290, delay: 0.4, float: -9 },
  { name: "Managed Security", icon: ShieldCheck, x: 110, y: 350, delay: 0.5, float: -7 },
];

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
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand-500)_22%,transparent),transparent)] opacity-90 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand-400)_26%,transparent),transparent)] opacity-90 blur-2xl"
          />

          <svg
            viewBox="0 0 760 440"
            className="relative w-full"
            role="img"
            aria-label="The Sinvonix platform hub, connecting CORDON, AEVIX, Conversa CI Hub, Chronicle AI and Managed Security"
          >
            <defs>
              <linearGradient id="hub-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="var(--color-brand-300)" stopOpacity="0" />
                <stop offset="1" stopColor="var(--color-brand-400)" stopOpacity="0.9" />
              </linearGradient>
              <filter id="soft-shadow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
              <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connectors — curved lines, drawn on from each tile into the hub.
                The control point is offset perpendicular to the node→hub line
                (not just "the midpoint's own y"), so a node that happens to
                share the hub's exact y (Conversa CI Hub) still gets a real
                curve instead of degenerating into a straight line that runs
                invisibly under the opaque hub card. */}
            {nodes.map((n, i) => {
              const { x: ctrlX, y: ctrlY } = bendControlPoint(n.x, n.y);
              const d = `M ${n.x} ${n.y} Q ${ctrlX} ${ctrlY} ${HUB_X} ${HUB_Y}`;
              return (
                <motion.path
                  key={`line-${n.name}`}
                  d={d}
                  fill="none"
                  stroke="url(#hub-line)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.07, ease: EASE }}
                />
              );
            })}

            {/* Traveling pulse per connector */}
            {!reduce &&
              nodes.map((n, i) => {
                const midX = (n.x + HUB_X) / 2;
                return (
                  <motion.circle
                    key={`pulse-${n.name}`}
                    r="3.5"
                    fill="var(--color-brand-400)"
                    filter="url(#glow)"
                    initial={{ opacity: 0 }}
                    animate={{
                      cx: [n.x, midX, HUB_X],
                      cy: [n.y, n.y, HUB_Y],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 1.6,
                      delay: 1 + i * 0.35,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}

            {/* Product tiles — flat white cards, no 3D */}
            {nodes.map((n) => {
              const Icon = n.icon;
              return (
                <motion.g
                  key={n.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: n.delay, ease: EASE }}
                >
                  <motion.g
                    animate={reduce ? undefined : { y: [0, n.float, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: n.delay }}
                  >
                    <ellipse cx={n.x} cy={n.y + 37} rx="26" ry="5" fill="rgba(2,25,32,0.08)" filter="url(#soft-shadow)" />
                    <rect
                      x={n.x - 34}
                      y={n.y - 34}
                      width="68"
                      height="68"
                      rx="18"
                      fill="var(--color-surface, #fff)"
                      stroke="var(--color-line)"
                    />
                    <foreignObject x={n.x - 16} y={n.y - 16} width="32" height="32">
                      <div className="grid h-8 w-8 place-items-center rounded-xl bg-brand-500 text-white">
                        <Icon className="h-4 w-4" />
                      </div>
                    </foreignObject>
                    {/* Name — so the icon's meaning is never a guess */}
                    <foreignObject x={n.x - 60} y={n.y + 44} width="120" height="20">
                      <p className="truncate text-center text-[11px] font-semibold leading-none text-content">
                        {n.name}
                      </p>
                    </foreignObject>
                  </motion.g>
                </motion.g>
              );
            })}

            {/* Hub — the Sinvonix mark itself, so the centre reads unmistakably as "the platform" */}
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <motion.g
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ellipse cx={HUB_X} cy={HUB_Y + 66} rx="90" ry="10" fill="rgba(2,25,32,0.1)" filter="url(#soft-shadow)" />
                <rect
                  x={HUB_X - 110}
                  y={HUB_Y - 44}
                  width="220"
                  height="88"
                  rx="24"
                  fill="var(--color-surface, #fff)"
                  stroke="var(--color-line)"
                  strokeWidth="1.5"
                />
                <foreignObject x={HUB_X - 84} y={HUB_Y - 20} width="168" height="40">
                  <div className="flex h-full items-center justify-center">
                    <MainLogo className="h-9" />
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
