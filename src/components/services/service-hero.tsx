"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, CalendarDays, ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { useScheduler } from "@/components/scheduler/scheduler-provider";
import { getService } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServiceHero({ slug }: { slug: string }) {
  const service = getService(slug);
  const { open } = useScheduler();
  if (!service) return null;
  const Icon = service.icon;

  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      {/* Accent wash */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-br opacity-[0.10] blur-2xl",
          service.accent
        )}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.35]" />

      <Container>
        <Reveal>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-content"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>
        </Reveal>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal delay={0.05}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted backdrop-blur">
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-gradient-to-br",
                    service.accent
                  )}
                />
                {service.title}
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
                {service.tagline}
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                {service.overview}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Button onClick={open} size="lg">
                    <CalendarDays className="h-4 w-4" />
                    Book a Call
                  </Button>
                </Magnetic>
                <Button href="#deliverables" variant="secondary" size="lg">
                  <ArrowDown className="h-4 w-4" />
                  What&apos;s included
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Icon visual */}
          <Reveal delay={0.15} direction="left" className="hidden lg:block">
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <div
                className={cn(
                  "absolute inset-0 rounded-[2rem] bg-gradient-to-br opacity-[0.14] blur-2xl",
                  service.accent
                )}
              />
              <div className="glass relative grid h-full place-items-center rounded-[2rem]">
                <motion.span
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className={cn(
                    "grid h-28 w-28 place-items-center rounded-3xl bg-gradient-to-br text-white shadow-glow",
                    service.accent
                  )}
                >
                  <Icon className="h-14 w-14" />
                </motion.span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
