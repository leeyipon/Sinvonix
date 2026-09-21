"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { process } from "@/lib/site";
import { cn } from "@/lib/utils";

const TOTAL = process.length;

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 65%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // The board is driven by whichever step the reader is engaging with:
  // an explicit hover/focus wins; otherwise it auto-advances with scroll.
  const [scrollIndex, setScrollIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(TOTAL - 1, Math.max(0, Math.round(v * (TOTAL - 1))));
    setScrollIndex(idx);
  });

  const active = hoverIndex ?? scrollIndex;

  return (
    <Section id="process">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A process built for momentum"
          description="A deliberate sequence from discovery to continuous optimization."
        />

        <div className="mx-auto mt-16 max-w-2xl">
          <div ref={ref} className="relative">
            {/* Track + scroll-driven fill (aligned to node centers at left-7) */}
            <div className="absolute left-7 top-7 bottom-7 w-px -translate-x-1/2 bg-line" />
            <motion.div
              style={{ scaleY }}
              className="absolute left-7 top-7 bottom-7 w-px origin-top -translate-x-1/2 bg-[linear-gradient(to_bottom,var(--color-brand-400),var(--color-brand-600))]"
            />

            <ul className="space-y-3">
              {process.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === active;
                const isDone = i < active;
                return (
                  <li key={step.title} className="relative flex items-stretch gap-5">
                    {/* Node — an opaque backdrop (clipped to its own inner
                        wrapper, not the node itself) so the track line
                        behind it can never show through a tinted
                        (semi-transparent) state. The corner badge stays on
                        the outer, unclipped span so it can still hang half
                        outside the rounded square as designed. */}
                    <span
                      className={cn(
                        "relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border bg-surface transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isActive
                          ? "border-transparent text-white shadow-[0_12px_28px_-10px_rgba(1,82,165,0.7)]"
                          : isDone
                            ? "border-brand-500/30 text-accent"
                            : "border-line text-muted"
                      )}
                    >
                      <span aria-hidden className="absolute inset-0 overflow-hidden rounded-2xl">
                        {isActive && (
                          <motion.span
                            layoutId="process-node-active-fill"
                            className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-brand-500),var(--color-brand-700))]"
                            transition={
                              reduce
                                ? { duration: 0 }
                                : { type: "spring", stiffness: 380, damping: 32 }
                            }
                          />
                        )}
                        {isDone && <span className="absolute inset-0 bg-brand-500/10" />}
                      </span>
                      <Icon className="relative h-5 w-5" />
                      <span
                        className={cn(
                          "absolute -right-1.5 -top-1.5 z-10 grid h-5 w-5 place-items-center overflow-hidden rounded-full text-[10px] font-bold transition-colors duration-300",
                          isActive
                            ? "bg-white text-brand-700"
                            : "bg-[linear-gradient(120deg,var(--color-brand-500),var(--color-brand-700))] text-white"
                        )}
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                          {isDone ? (
                            <motion.span
                              key="check"
                              className="grid place-items-center"
                              initial={reduce ? false : { scale: 0.4, opacity: 0, rotate: -45 }}
                              animate={{ scale: 1, opacity: 1, rotate: 0 }}
                              exit={reduce ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
                              transition={{ duration: reduce ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
                            >
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </motion.span>
                          ) : (
                            <motion.span
                              key="index"
                              className="grid place-items-center"
                              initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={reduce ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
                              transition={{ duration: reduce ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
                            >
                              {i + 1}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </span>

                    {/* Card — the interactive control */}
                    <Reveal direction="left" delay={i * 0.04} className="flex-1">
                      <button
                        type="button"
                        onMouseEnter={() => setHoverIndex(i)}
                        onMouseLeave={() => setHoverIndex(null)}
                        onFocus={() => setHoverIndex(i)}
                        onBlur={() => setHoverIndex(null)}
                        aria-pressed={isActive}
                        className={cn(
                          "w-full rounded-2xl border bg-surface p-5 text-left transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none",
                          "focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                          isActive
                            ? "-translate-y-0.5 border-brand-500/40 shadow-[0_20px_50px_-24px_rgba(1,82,165,0.6)] ring-1 ring-brand-500/25"
                            : "border-line hover:border-brand-500/40 hover:bg-surface-2"
                        )}
                      >
                        <div className="flex min-h-5 items-center justify-between gap-3">
                          <h3 className="font-semibold text-content">{step.title}</h3>
                          {isActive && (
                            <span className="shrink-0 text-[11px] font-medium uppercase tracking-wide text-accent">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {step.desc}
                        </p>
                      </button>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
