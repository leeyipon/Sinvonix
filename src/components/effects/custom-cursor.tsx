"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";

/**
 * Custom cursor: a tight dot that tracks closely plus a springy ring that
 * trails, grows and brightens over interactive elements, and squishes on
 * press. Both use GPU-accelerated transforms (scale/opacity). Mounts only on
 * fine pointers when motion is allowed; otherwise the native cursor is used.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Ring trails with a softer spring; dot tracks tightly — the small offset
  // between them reads as fluid, layered motion.
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.4 });
  const dotX = useSpring(x, { stiffness: 700, damping: 40, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 700, damping: 40, mass: 0.2 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        'a, button, [role="button"], input, select, textarea, [data-cursor="hover"]'
      );
      setHovering(!!el);
    };
    const down = (e: MouseEvent) => {
      setPressed(true);
      const id = Date.now() + Math.random();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 700);
    };
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.body.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Ring — grows + brightens on hover, squishes on press */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[150] hidden h-7 w-7 rounded-full border border-white/70 mix-blend-difference md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{
          scale: (hovering ? 1.9 : 1) * (pressed ? 0.82 : 1),
          opacity: hovering ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 26, mass: 0.4 }}
      />
      {/* Dot — tracks tightly, fades out when the ring takes over on hover */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[150] hidden h-1.5 w-1.5 rounded-full bg-white mix-blend-difference md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
        }}
        animate={{ opacity: hovering ? 0 : 1, scale: pressed ? 0.6 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="pointer-events-none fixed z-[150] hidden rounded-full border border-brand-400/70 md:block"
            style={{ left: r.x, top: r.y, translateX: "-50%", translateY: "-50%" }}
            initial={{ width: 8, height: 8, opacity: 0.7 }}
            animate={{ width: 70, height: 70, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
