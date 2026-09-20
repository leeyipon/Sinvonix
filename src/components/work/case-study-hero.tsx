"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { useScheduler } from "@/components/scheduler/scheduler-provider";
import { ProjectArt } from "@/components/work/project-art";
import { getCaseStudy } from "@/lib/work";
import { getService } from "@/lib/site";
import { cn } from "@/lib/utils";

export function CaseStudyHero({ slug }: { slug: string }) {
  const cs = getCaseStudy(slug);
  const { open } = useScheduler();
  if (!cs) return null;

  const meta = [
    { label: "Sector", value: cs.sector },
    { label: "Status", value: cs.year },
    { label: "Operations", value: cs.duration },
  ];

  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      {/* Accent wash */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-br opacity-[0.10] blur-2xl",
          cs.accent
        )}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.35]" />

      <Container>
        <Reveal>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-content"
          >
            <ArrowLeft className="h-4 w-4" />
            All case studies
          </Link>
        </Reveal>

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal delay={0.05}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-xs font-medium tracking-wide text-muted backdrop-blur">
                <span className={cn("h-1.5 w-1.5 rounded-full bg-gradient-to-br", cs.accent)} />
                {cs.category}
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl">
                {cs.name}: {cs.tagline}
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
                {cs.summary}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-8 grid max-w-xl grid-cols-3 gap-4">
                {meta.map((m) => (
                  <div key={m.label} className="rounded-2xl border border-line bg-surface/60 px-4 py-3">
                    <dt className="text-[11px] font-medium uppercase tracking-wider text-faint">
                      {m.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-content">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-faint">
                  Products
                </span>
                {cs.serviceSlugs.map((s) => {
                  const service = getService(s);
                  if (!service) return null;
                  return (
                    <Link
                      key={s}
                      href={`/services/${s}`}
                      className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-brand-500/40 hover:text-content"
                    >
                      {service.title}
                    </Link>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-9">
                <Magnetic>
                  <Button onClick={open} size="lg">
                    <CalendarDays className="h-4 w-4" />
                    Book a briefing
                  </Button>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Project visual */}
          <Reveal delay={0.15} direction="left" className="hidden lg:block">
            <div className="relative">
              <div
                className={cn(
                  "absolute -inset-6 rounded-[2rem] bg-gradient-to-br opacity-[0.12] blur-2xl",
                  cs.accent
                )}
              />
              <div className="glass relative rounded-[2rem] p-6">
                <ProjectArt
                  project={cs}
                  className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_20px_50px_-24px_rgba(0,0,0,.4)]"
                />
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {cs.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
