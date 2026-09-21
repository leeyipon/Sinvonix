"use client";

import { useReducedMotion, motion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type Shades = { top: string; left: string; right: string };

// Small glass cubes drifting at the far edges of the hero — echoes the
// isometric-product language from the Platform Hub illustration, but
// abstracted (no icons/labels) so it reads as ambient scene, not UI.
const cubes: { x: number; y: number; w: number; h: number; shades: Shades; delay: number; float: number }[] = [
  {
    x: 140,
    y: 190,
    w: 30,
    h: 20,
    shades: { top: "var(--color-brand-200)", left: "var(--color-brand-400)", right: "var(--color-brand-600)" },
    delay: 0.3,
    float: -12,
  },
  {
    x: 1480,
    y: 230,
    w: 24,
    h: 16,
    shades: { top: "var(--color-brand-300)", left: "var(--color-brand-500)", right: "var(--color-brand-700)" },
    delay: 0.55,
    float: 10,
  },
  {
    x: 100,
    y: 690,
    w: 22,
    h: 15,
    shades: { top: "var(--color-brand-400)", left: "var(--color-brand-600)", right: "var(--color-brand-800)" },
    delay: 0.75,
    float: -9,
  },
  {
    x: 1520,
    y: 660,
    w: 32,
    h: 21,
    shades: { top: "var(--color-brand-300)", left: "var(--color-brand-600)", right: "var(--color-brand-900)" },
    delay: 0.45,
    float: 11,
  },
];

// Viewfinder-style corner brackets — a restrained nod to "detect": the
// hero copy sits inside a soft scanning frame instead of empty space.
const brackets: { d: string; delay: number }[] = [
  { d: "M 230 230 L 230 160 L 300 160", delay: 0.2 },
  { d: "M 1370 160 L 1440 160 L 1440 230", delay: 0.35 },
  { d: "M 300 800 L 230 800 L 230 730", delay: 0.5 },
  { d: "M 1440 730 L 1440 800 L 1370 800", delay: 0.65 },
];

// Faint twinkling particles for depth/texture.
const particles: { x: number; y: number; r: number; delay: number }[] = [
  { x: 260, y: 340, r: 2.2, delay: 0 },
  { x: 360, y: 560, r: 1.6, delay: 0.8 },
  { x: 1360, y: 380, r: 2, delay: 1.4 },
  { x: 1260, y: 600, r: 1.8, delay: 0.4 },
  { x: 500, y: 200, r: 1.5, delay: 1.9 },
  { x: 1120, y: 190, r: 1.7, delay: 1.1 },
  { x: 800, y: 810, r: 1.6, delay: 0.6 },
];

function GlassCube({ x, y, w, h, shades, glossId }: { x: number; y: number; w: number; h: number; shades: Shades; glossId: string }) {
  const top = [[x, y - w * 0.5], [x + w, y], [x, y + w * 0.5], [x - w, y]].map((p) => p.join(",")).join(" ");
  const left = [[x - w, y], [x, y + w * 0.5], [x, y + w * 0.5 + h], [x - w, y + h]].map((p) => p.join(",")).join(" ");
  const right = [[x, y + w * 0.5], [x + w, y], [x + w, y + h], [x, y + w * 0.5 + h]].map((p) => p.join(",")).join(" ");

  return (
    <g>
      <polygon points={left} fill={shades.left} />
      <polygon points={right} fill={shades.right} />
      <polygon points={top} fill={shades.top} />
      <polygon points={right} fill={`url(#${glossId})`} opacity="0.5" />
      <polygon points={top} fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1" />
    </g>
  );
}

/**
 * Ambient hero graphic: a scanning viewfinder frame, radar pulses, drifting
 * glass cubes and a scatter of particles — sits behind the copy as a single
 * full-bleed SVG. Pure vector + Motion, so it's crisp at any size and cheap
 * to animate (transform/opacity only, reduced-motion safe).
 */
export function HeroIllustration({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="h-full w-full opacity-80">
        <defs>
          <linearGradient id="hero-gloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0.22" />
            <stop offset="0.4" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hero-radar-fade" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0.7" stopColor="var(--color-brand-400)" stopOpacity="0.5" />
            <stop offset="1" stopColor="var(--color-brand-400)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Radar pulses — soft rings breathing outward behind the copy */}
        <g transform="translate(800 460)">
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              r={0}
              fill="none"
              stroke="url(#hero-radar-fade)"
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              animate={
                reduce
                  ? { opacity: 0.12 }
                  : { r: [0, 420], opacity: [0.32, 0] }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 5, repeat: Infinity, ease: "easeOut", delay: i * 1.6 }
              }
            />
          ))}
        </g>

        {/* Corner scan brackets */}
        {brackets.map((b, i) => (
          <motion.path
            key={i}
            d={b.d}
            fill="none"
            stroke="var(--color-brand-400)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.3 + b.delay, ease: EASE }}
          />
        ))}

        {/* Drifting glass cubes */}
        {cubes.map((c, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ duration: 0.7, delay: c.delay, ease: EASE }}
          >
            <motion.g
              animate={reduce ? undefined : { y: [0, c.float, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
            >
              <GlassCube x={c.x} y={c.y} w={c.w} h={c.h} shades={c.shades} glossId="hero-gloss" />
            </motion.g>
          </motion.g>
        ))}

        {/* Twinkling particles */}
        {!reduce &&
          particles.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="var(--color-brand-400)"
              initial={{ opacity: 0.15 }}
              animate={{ opacity: [0.15, 0.7, 0.15] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            />
          ))}
      </svg>
    </div>
  );
}
