import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { caseStudies, getCaseStudy } from "@/lib/work";
import { cn } from "@/lib/utils";

export function CaseStudyBody({ slug }: { slug: string }) {
  const cs = getCaseStudy(slug);
  if (!cs) return null;

  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(idx + 1) % caseStudies.length];

  const story = [
    { label: "The challenge", body: cs.story.challenge },
    { label: "What we built", body: cs.story.solution },
    { label: "The outcome", body: cs.story.outcome },
  ];

  return (
    <>
      {/* Narrative */}
      <Section className="pt-4">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-12 sm:gap-16">
            {story.map((block, i) => (
              <Reveal key={block.label} delay={i * 0.05}>
                <div className="grid gap-4 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-10">
                  <p className="text-gradient text-sm font-semibold uppercase tracking-[0.14em]">
                    {block.label}
                  </p>
                  <p className="text-pretty text-lg leading-relaxed text-content sm:text-xl">
                    {block.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stats band */}
      <Section className="py-16 sm:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-12 sm:px-14 sm:py-14">
            <div
              className={cn(
                "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-[0.06]",
                cs.accent
              )}
            />
            <div className="grid gap-8 sm:grid-cols-3">
              {cs.stats.map((stat) => (
                <Reveal key={stat.label} delay={0.05}>
                  <div>
                    <div className="text-gradient text-4xl font-semibold sm:text-5xl">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="mt-2 text-sm text-muted">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Approach */}
      <Section className="bg-bg-subtle">
        <Container>
          <SectionHeading
            eyebrow="How we worked"
            title="The path we took"
            description="The moves that mattered on this engagement — in the order they happened."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cs.approach.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="relative h-full rounded-3xl border border-line bg-surface p-6">
                  <span className="text-gradient text-4xl font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-content">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Client quote */}
      <Section>
        <Container>
          <Reveal>
            <figure className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-12 text-center sm:px-14 sm:py-16">
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-[0.05]",
                  cs.accent
                )}
              />
              <Quote className="mx-auto h-8 w-8 text-accent" />
              <blockquote className="mt-6 text-balance text-xl font-medium leading-relaxed text-content sm:text-2xl">
                &ldquo;{cs.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-center gap-3">
                <span
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br text-sm font-semibold text-white",
                    cs.accent
                  )}
                >
                  {cs.quote.initials}
                </span>
                <span className="text-left">
                  <span className="block text-sm font-semibold text-content">
                    {cs.quote.name}
                  </span>
                  <span className="block text-sm text-muted">{cs.quote.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* Prev / next */}
      <Section className="border-t border-line py-14">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            <CaseStudyNavLink cs={prev} direction="prev" />
            <CaseStudyNavLink cs={next} direction="next" />
          </div>
        </Container>
      </Section>
    </>
  );
}

function CaseStudyNavLink({
  cs,
  direction,
}: {
  cs: (typeof caseStudies)[number];
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/work/${cs.slug}`}
      className={cn(
        "group flex items-center gap-4 rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-brand-500/40",
        isNext && "sm:flex-row-reverse sm:text-right"
      )}
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-brand-500/50 group-hover:text-content">
        {isNext ? <ArrowRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
      </span>
      <span className={cn(isNext && "sm:ml-auto")}>
        <span className="block text-[11px] font-medium uppercase tracking-wider text-faint">
          {isNext ? "Next case study" : "Previous case study"}
        </span>
        <span className="mt-1 block text-lg font-semibold text-content">{cs.name}</span>
      </span>
    </Link>
  );
}
