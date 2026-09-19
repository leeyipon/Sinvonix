import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export type LegalSection = { heading: string; body: string[] };

/** Shared prose layout for the Privacy and Terms pages. */
export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[360px] bg-[linear-gradient(120deg,var(--color-electric),var(--color-indigo)_50%,var(--color-purple))] opacity-[0.06] blur-2xl" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.3]" />

      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-wider text-faint">
              Last updated {updated}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {intro}
            </p>
          </Reveal>

          <div className="mt-14 flex flex-col gap-12">
            {sections.map((section, i) => (
              <Reveal key={section.heading} delay={0.05 * Math.min(i, 3)}>
                <div>
                  <h2 className="text-xl font-semibold text-content sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 flex flex-col gap-4">
                    {section.body.map((para, j) => (
                      <p key={j} className="text-pretty leading-relaxed text-muted">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-14 border-t border-line pt-8 text-sm leading-relaxed text-faint">
              This page is provided for general informational purposes and does not
              constitute legal advice. Questions? Email{" "}
              <a
                href="mailto:hello@nimbus.dev"
                className="font-medium text-content underline decoration-line underline-offset-4 transition-colors hover:decoration-brand-500"
              >
                hello@nimbus.dev
              </a>
              .
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
