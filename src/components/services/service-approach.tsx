import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { getService } from "@/lib/site";

export function ServiceApproach({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) return null;

  return (
    <Section className="bg-bg-subtle">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A clear path from idea to impact"
          description="A focused, four-step approach tailored to this service — so you always know what's happening and why."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {service.approach.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-brand-500/40">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative text-gradient text-4xl font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative mt-4 text-lg font-semibold text-content">
                  {step.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted">
                  {step.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
