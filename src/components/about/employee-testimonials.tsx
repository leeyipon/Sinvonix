import { Quote } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { employeeTestimonials } from "@/lib/team";

export function EmployeeTestimonials() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="In their words"
          title="Why the team loves it here"
          description="Straight from the people who build with us every day."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {employeeTestimonials.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="glass relative flex h-full flex-col rounded-3xl p-7">
                <Quote className="absolute right-6 top-6 h-9 w-9 text-accent/10" />
                <blockquote className="flex-1 text-pretty leading-relaxed text-content">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-brand-500),var(--color-brand-700))] text-sm font-semibold text-white">
                    {t.initials}
                  </span>
                  <div>
                    <p className="font-semibold text-content">{t.name}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
