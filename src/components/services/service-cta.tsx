"use client";

import { motion } from "motion/react";
import { CalendarDays, Rocket } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { useScheduler } from "@/components/scheduler/scheduler-provider";

export function ServiceCTA({ title }: { title: string }) {
  const { open } = useScheduler();
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-16 sm:py-24">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,var(--color-electric),var(--color-indigo)_45%,var(--color-purple))]" />
          <div className="absolute inset-0 -z-10 bg-grid opacity-20 mix-blend-overlay" />

          {[
            { c: "left-[8%] top-[18%]", s: "h-24 w-24", d: 0 },
            { c: "right-[10%] top-[24%]", s: "h-16 w-16", d: 1.5 },
            { c: "left-[18%] bottom-[16%]", s: "h-20 w-20", d: 0.8 },
            { c: "right-[16%] bottom-[20%]", s: "h-12 w-12", d: 2.2 },
          ].map((o, i) => (
            <motion.span
              key={i}
              aria-hidden
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: o.d }}
              className={`pointer-events-none absolute ${o.c} ${o.s} rounded-full bg-white/15 blur-md`}
            />
          ))}

          <Reveal>
            <h2 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-5xl">
              Ready to start your {title} project?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-white/85">
              Tell us about your goals and timeline. We&apos;ll come back with a plan —
              usually within a day.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <Button
                  onClick={open}
                  size="lg"
                  variant="secondary"
                  className="!bg-white text-brand-700 hover:!bg-white"
                >
                  <CalendarDays className="h-4 w-4" />
                  Book a Call
                </Button>
              </Magnetic>
              <Button
                onClick={open}
                size="lg"
                className="bg-white/10 text-white ring-1 ring-inset ring-white/30 backdrop-blur hover:bg-white/20"
              >
                <Rocket className="h-4 w-4" />
                Start Your Project
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
