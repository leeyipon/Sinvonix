import { ShieldCheck, Gauge, Users, Sparkles, Plus } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { stats } from "@/lib/site";

const reasons = [
  { icon: Gauge, title: "Senior-only team", desc: "No juniors learning on your budget — every contributor is battle-tested." },
  { icon: ShieldCheck, title: "Ship fast, safely", desc: "Typed, tested code with monitoring and zero-downtime releases." },
  { icon: Users, title: "One integrated team", desc: "Design, engineering and growth in the same room, aligned on outcomes." },
  { icon: Sparkles, title: "AI where it counts", desc: "We add intelligence that measurably moves the metric — not gimmicks." },
];

export function WhyUs() {
  return (
    <Section className="bg-bg-subtle/50">
      <Container>
        <SectionHeading
          eyebrow="Why choose us"
          title="Results teams actually feel"
          description="A track record built on shipping outcomes, not deliverables."
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
                <div className="h-full rounded-3xl border border-line bg-surface p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-content">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
