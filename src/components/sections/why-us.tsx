import { ShieldCheck, Gauge, Users, Sparkles, Plus } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { stats } from "@/lib/site";

const reasons = [
  { icon: Users, title: "Senior-led engagements", desc: "You work directly with the people who built the platform — no layers of account managers." },
  { icon: ShieldCheck, title: "Compliance-first design", desc: "Built from day one for regulators — aligned to FATF, NIST and regional data protection law." },
  { icon: Gauge, title: "Proven in production", desc: "Active recurring contracts across multiple ASEAN markets, protecting live infrastructure today." },
  { icon: Sparkles, title: "Five products, one platform", desc: "Fraud intelligence, payments, contact centre, automation and managed security — standalone or unified." },
];

export function WhyUs() {
  return (
    <Section className="bg-bg-subtle/50">
      <Container>
        <SectionHeading
          eyebrow="Why Sinvonix"
          title="Built for ASEAN's regulated markets"
          description="Over 50 years of combined experience operating where global vendors overlook the details."
        />

        {/* Stat counters */}
        <Stagger className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-brand-500/40">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* corner node accent */}
                <span className="absolute right-5 top-5 grid h-6 w-6 place-items-center rounded-full border border-line bg-surface-2 text-faint transition-colors duration-300 group-hover:border-brand-500/40 group-hover:text-accent">
                  <Plus className="h-3.5 w-3.5" />
                </span>
                <p className="relative font-display text-4xl font-semibold text-accent sm:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="relative mt-2 text-sm text-muted">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Reasons */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={i * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-brand-500/40">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-4 font-semibold text-content">{r.title}</h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-muted">{r.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
