"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin mint progress line pinned to the very top of the viewport, tracking
 * how far the user has scrolled down the current page. Driven 1:1 by scroll
 * position (like hero.tsx's parallax and process.tsx's timeline), so it's
 * not gated behind prefers-reduced-motion — it only moves when the user
 * physically scrolls.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brand-500"
    />
  );
}
