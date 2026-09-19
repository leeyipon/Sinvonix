import { Container, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { getService } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServiceOutcomes({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) return null;

  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-14 sm:px-14">
          <div
            className={cn(
              "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-[0.06]",
              service.accent
            )}
          />

          <Reveal>
            <p className="text-xs font-medium uppercase tracking-wider text-faint">
              Proof it works
            </p>
          </Reveal>

          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {service.outcome.stats.map((stat) => (
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

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-content">
              {service.outcome.result}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
