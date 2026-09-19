"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Hand-drawn "marker" doodles — a highlighter swipe, a scribbled underline, a
 * curved arrow and a small sparkle — in the spirit of playful marketing sites
 * (e.g. Odoo). Each draws itself in; pass `inView` to trigger on scroll (for
 * sections below the fold) instead of on mount. All motion is disabled under
 * prefers-reduced-motion.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-70px" } as const;

/** Choose animate-on-mount vs animate-on-scroll props. */
function play(inView: boolean, target: TargetAndTransition) {
  return inView
    ? { whileInView: target, viewport: VIEWPORT }
    : { animate: target };
}

/** A translucent marker highlight that swipes in behind a word. */
export function HighlightMark({
  className,
  color = "#2A8CEF",
  delay = 0,
  inView = false,
}: {
  className?: string;
  color?: string;
  delay?: number;
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      initial={reduce ? { opacity: 0.9 } : { scaleX: 0 }}
      {...play(inView, reduce ? { opacity: 0.9 } : { scaleX: 1 })}
      transition={{ duration: 0.55, delay, ease: EASE }}
      style={{ originX: 0 }}
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <svg viewBox="0 0 320 96" preserveAspectRatio="none" className="h-full w-full">
        <path
          d="M7,30 C 82,17 240,17 314,25 C 319,45 319,60 311,80 C 238,89 80,89 8,77 C 1,60 1,44 7,30 Z"
          fill={color}
          opacity="0.5"
        />
      </svg>
    </motion.span>
  );
}

/** A sketchy underline stroke that draws left→right beneath a word. */
export function UnderlineDoodle({
  className,
  color = "var(--color-emerald)",
  delay = 0,
  inView = false,
}: {
  className?: string;
  color?: string;
  delay?: number;
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 22"
      fill="none"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute", className)}
    >
      <motion.path
        d="M5 13 C 60 5, 118 5, 176 11 S 258 19, 295 8"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        {...play(inView, { pathLength: 1 })}
        transition={{ duration: 0.7, delay, ease: EASE }}
      />
    </svg>
  );
}

/** A curved hand-drawn arrow (points down-left by default) with an arrowhead. */
export function ArrowDoodle({
  className,
  color = "var(--color-purple)",
  delay = 0,
  inView = false,
}: {
  className?: string;
  color?: string;
  delay?: number;
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  const stroke = (d: string, extraDelay: number) => (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
      {...play(inView, { pathLength: 1 })}
      transition={{ duration: 0.6, delay: delay + extraDelay, ease: EASE }}
    />
  );
  return (
    <svg
      aria-hidden
      viewBox="0 0 110 84"
      fill="none"
      className={cn("pointer-events-none absolute", className)}
    >
      {stroke("M96 10 C 70 6, 30 14, 20 54", 0)}
      {stroke("M9 40 L 19 58 L 38 52", 0.45)}
    </svg>
  );
}

/** A small hand-drawn four-point sparkle. */
export function SparkleDoodle({
  className,
  color = "var(--color-emerald)",
  delay = 0,
  inView = false,
}: {
  className?: string;
  color?: string;
  delay?: number;
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 40 40"
      fill="none"
      initial={reduce ? { opacity: 0 } : { scale: 0.9, rotate: -30, opacity: 0 }}
      {...play(inView, reduce ? { opacity: 1 } : { scale: 1, rotate: 0, opacity: 1 })}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className={cn("pointer-events-none absolute", className)}
    >
      <path
        d="M20 3 C 21 14, 26 19, 37 20 C 26 21, 21 26, 20 37 C 19 26, 14 21, 3 20 C 14 19, 19 14, 20 3 Z"
        fill={color}
      />
    </motion.svg>
  );
}
