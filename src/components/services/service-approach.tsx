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
              <div className="relative h-full rounded-3xl border border-line bg-surface p-6">
                <span className="text-gradient text-4xl font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-content">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
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
