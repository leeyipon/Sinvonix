import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectArt } from "@/components/work/project-art";
import { caseStudies, type CaseStudy } from "@/lib/work";
import { cn } from "@/lib/utils";

export function WorkIndex() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.35]" />

      <Container>
        <Reveal>
          <Eyebrow>Track record</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
            Live in production, <span className="text-accent">not in pilot</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            Three deployment tracks running as recurring operations across ASEAN — what
            each one solves, how it&apos;s delivered, and where it stands today.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <StaggerItem key={cs.slug}>
              <CaseStudyCard cs={cs} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/work/${cs.slug}`}
      className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="relative overflow-hidden rounded-xl">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-[0.08]",
            cs.accent
          )}
        />
        <ProjectArt
          project={cs}
          className="overflow-hidden rounded-xl border border-line bg-white"
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          <span className={cn("h-1.5 w-1.5 rounded-full bg-gradient-to-br", cs.accent)} />
          {cs.category}
        </span>
        <span className="text-xs text-faint">{cs.year}</span>
      </div>

      <h2 className="mt-2 text-xl font-semibold text-content">{cs.name}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{cs.summary}</p>

      <div className="mt-auto pt-5">
        <p className="text-sm font-semibold text-content">{cs.result}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <div className="flex flex-wrap gap-1.5">
            {cs.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-muted"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-[border-color,color] duration-300 group-hover:border-brand-500/50 group-hover:text-content">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
