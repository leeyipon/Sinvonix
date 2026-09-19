"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { MainLogo } from "@/components/ui/main-logo";

/**
 * First-load preloader: animated logo + progress counter, then a curtain
 * wipe that reveals the hero. Locks scroll while visible. Skipped entirely
 * for reduced-motion users.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const DURATION = 1400;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      // Guards against an interrupted mount (route change, HMR remount) that
      // unmounts this before `done` flips true — without this, the effect
      // below never runs and the page stays scroll-locked forever.
      document.body.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  // Don't branch on `reduce` here — its first-render client value can already
  // differ from what was known at SSR time, which breaks hydration (mismatched
  // node count) and, via React's mismatch recovery, was resetting the
  // pre-hydration dark-mode class on <html>. `done` starts false identically
  // on server and client, so the shell always hydrates cleanly; the effect
  // above closes it (instantly, once mounted) for reduced-motion users.
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <MainLogo className="h-9 sm:h-10" />
          </motion.div>

          <div className="mt-8 h-px w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-[linear-gradient(90deg,var(--color-electric),var(--color-purple),var(--color-cyan))]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 font-mono text-xs tabular-nums text-faint">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
