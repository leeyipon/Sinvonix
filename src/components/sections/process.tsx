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

type RowState = "done" | "active" | "queued";

function rowState(i: number, active: number): RowState {
  if (i < active) return "done";
  if (i === active) return "active";
  return "queued";
}

const stateLabel: Record<RowState, string> = {
  done: "Done",
  active: "In progress",
  queued: "Queued",
};

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
  const activeStep = process[active];
  const progress = (active / (TOTAL - 1)) * 100;

  return (
    <Section id="process">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A process built for momentum"
          description="Seven deliberate steps that take an idea from discovery to continuous optimization — and a shared board so you can watch every one of them move."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* ------------------------------------------------------------ */}
          {/* Left: on-brand delivery board that mirrors the active step   */}
          {/* ------------------------------------------------------------ */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="glass relative rounded-3xl p-5 sm:p-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-brand-500)_26%,transparent),transparent)] opacity-60 blur-2xl"
                />

                {/* Board header */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-content">
                      Your delivery board
                    </p>
                    <p className="text-xs text-muted">Live, shared, always current</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-500/12 px-2.5 py-1 text-xs font-medium text-accent">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-70 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
                    </span>
                    Live
                  </span>
                </div>

                {/* Progress meter — reflects how far the active step has moved */}
                <div className="mt-5">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-medium text-content">
                      Phase {active + 1}
                      <span className="text-muted"> of {TOTAL}</span>
                    </span>
                    <motion.span
                      key={activeStep.title}
                      initial={reduce ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="font-medium text-accent"
                    >
                      {activeStep.title}
                    </motion.span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-brand-600),var(--color-brand-400))] transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Board rows — one per phase, status synced to `active` */}
                <ul className="mt-5 space-y-0.5">
                  {process.map((step, i) => {
                    const s = rowState(i, active);
                    const isActive = s === "active";
                    return (
                      <li key={step.title} className="relative">
                        {isActive &&
                          (reduce ? (
                            <div className="absolute inset-0 rounded-xl bg-brand-500/10 ring-1 ring-inset ring-brand-500/30" />
                          ) : (
                            <motion.div
                              layoutId="board-active"
                              className="absolute inset-0 rounded-xl bg-brand-500/10 ring-1 ring-inset ring-brand-500/30"
                              transition={{ type: "spring", stiffness: 420, damping: 34 }}
                            />
                          ))}
                        <div className="relative flex items-center gap-3 rounded-xl px-3 py-2.5">
                          {/* Status marker */}
                          <span
                            className={cn(
                              "grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors duration-300",
                              s === "done" && "bg-brand-500 text-white",
                              s === "active" &&
                                "bg-surface text-accent ring-2 ring-brand-500",
                              s === "queued" && "border border-line text-transparent"
                            )}
                          >
                            {s === "done" && <Check className="h-3 w-3" strokeWidth={3} />}
                            {s === "active" && (
                              <span className="h-1.5 w-1.5 rounded-full bg-brand-500 motion-safe:animate-pulse" />
                            )}
                          </span>

                          <span
                            className={cn(
                              "flex-1 truncate text-sm transition-colors duration-300",
                              s === "queued"
                                ? "text-muted"
                                : "font-medium text-content"
                            )}
                          >
                            {step.title}
                          </span>

                          <span
                            className={cn(
                              "shrink-0 text-[11px] font-medium tabular-nums transition-colors duration-300",
                              s === "done" && "text-faint",
                              s === "active" && "text-accent",
                              s === "queued" && "text-faint"
                            )}
                          >
                            {stateLabel[s]}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* Right: interactive step timeline — the control surface       */}
          {/* ------------------------------------------------------------ */}
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
