import { Container, Section } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { companyStats } from "@/lib/team";

export function AboutStats() {
  return (
    <Section className="bg-bg-subtle/50">
      <Container>
        <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {companyStats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-6 text-center transition-colors duration-300 hover:border-brand-500/40">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <p className="relative font-display text-3xl font-semibold text-gradient sm:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="relative mt-2 text-sm text-muted">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
