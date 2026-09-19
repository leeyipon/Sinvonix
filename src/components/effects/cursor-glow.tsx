"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A soft brand-colored glow that follows the cursor across the whole page.
 * Only mounts on fine pointers (desktop) and respects reduced motion.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    // Enable only after feature-detecting a fine pointer on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-indigo) 16%, transparent), transparent 65%)",
          filter: "blur(20px)",
        }}
      />
    </motion.div>
  );
}
