import { Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { getService } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServiceDeliverables({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) return null;

  return (
    <Section id="deliverables">
      <Container>
        <SectionHeading
          eyebrow="What's included"
          title="Everything you get"
          description="A complete engagement — not a checklist of features, but the work that actually moves the needle."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {service.deliverables.map((item) => (
            <StaggerItem key={item.title}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-brand-500/40">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span
                  className={cn(
                    "relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm",
                    service.accent
                  )}
                >
                  <Check className="h-5 w-5" />
                </span>
                <h3 className="relative mt-5 text-lg font-semibold text-content">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
