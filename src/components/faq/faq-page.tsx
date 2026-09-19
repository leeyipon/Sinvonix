"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, CalendarDays, HelpCircle } from "lucide-react";
import { Container, Section } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { useScheduler } from "@/components/scheduler/scheduler-provider";
import { faqs } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { open } = useScheduler();
  const baseId = useId();

  return (
    <>
      <section className="relative flex min-h-[42vh] items-center overflow-hidden pt-36 pb-14 sm:pt-44">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[linear-gradient(120deg,var(--color-electric),var(--color-indigo)_50%,var(--color-purple))] opacity-[0.08] blur-2xl" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.35]" />

        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur"
            >
              <HelpCircle className="h-3.5 w-3.5 text-accent" />
              FAQ
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Frequently asked <span className="text-gradient">questions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
              className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted"
            >
              The things teams usually ask before we start. Anything else — just ask us
              directly.
            </motion.p>
          </div>
        </Container>
      </section>

      <Section className="pt-0">
        <Container>
          <div className="mx-auto max-w-3xl divide-y divide-line overflow-hidden rounded-3xl border border-line bg-surface">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              const panelId = `${baseId}-panel-${i}`;
              const buttonId = `${baseId}-button-${i}`;
              return (
                <div key={faq.q}>
                  <h2>
                    <button
                      type="button"
                      id={buttonId}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-surface-2/60 sm:px-6"
                    >
                      <span className="text-base font-medium text-content">{faq.q}</span>
                      <span
                        aria-hidden
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-300",
                          isOpen && "rotate-45 border-brand-500/40 text-accent"
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h2>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-prose px-5 pb-6 text-sm leading-relaxed text-muted sm:px-6">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-3xl border border-line bg-surface px-6 py-6 text-center sm:flex-row sm:text-left">
              <div>
                <p className="font-semibold text-content">Still have a question?</p>
                <p className="mt-1 text-sm text-muted">
                  Talk to the people who&apos;d actually build it — no sales script.
                </p>
              </div>
              <Button onClick={open} className="shrink-0">
                <CalendarDays className="h-4 w-4" />
                Book a call
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
