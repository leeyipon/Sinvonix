"use client";

import { TrendingUp, MousePointerClick, Target, DollarSign } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { AreaChart, BarChart, DonutProgress } from "@/components/ui/charts";
import { Counter } from "@/components/motion/counter";

export function Marketing() {
  return (
    <Section className="bg-bg-subtle/50">
      <Container>
        <SectionHeading
          eyebrow="Growth marketing"
          title="Campaigns you can measure to the cent"
          description="SEO, performance and lifecycle marketing — reported in one live dashboard tied to revenue."
        />

        <Reveal className="mt-14">
          <div className="glass grid gap-4 rounded-3xl p-4 sm:p-6 lg:grid-cols-3">
            {/* SEO growth — large */}
            <div className="rounded-2xl border border-line bg-surface p-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">SEO Growth · Organic sessions</p>
                  <p className="font-display text-3xl font-semibold text-content">
                    <Counter to={182} suffix="k" />
                  </p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald/10 px-2.5 py-1 text-xs font-medium text-emerald">
                  <TrendingUp className="h-3.5 w-3.5" /> +118% YoY
                </span>
              </div>
              <AreaChart
                data={[18, 24, 22, 33, 40, 38, 52, 64, 60, 78, 92, 110]}
                className="mt-6 h-40 w-full"
              />
            </div>

            {/* Conversion rate donut */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-6 text-center">
              <p className="mb-4 self-start text-sm text-muted">Conversion Rate</p>
              <DonutProgress value={72} label="of goal" size={132} />
              <p className="mt-4 text-xs text-faint">6.8% avg · +2.1pt this quarter</p>
            </div>

            {/* Metric cards */}
            {[
              { icon: MousePointerClick, label: "Traffic", value: 540, suffix: "k", sub: "monthly visits" },
              { icon: Target, label: "Conversions", value: 12, suffix: "k", sub: "this quarter" },
              { icon: DollarSign, label: "ROI", value: 340, suffix: "%", sub: "blended return" },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="rounded-2xl border border-line bg-surface p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-display text-2xl font-semibold text-content">
                    <Counter to={m.value} suffix={m.suffix} />
                  </p>
                  <p className="text-sm text-muted">{m.label}</p>
                  <p className="text-xs text-faint">{m.sub}</p>
                </div>
              );
            })}

            {/* Campaign performance bars — spans remaining on large */}
            <div className="rounded-2xl border border-line bg-surface p-6 sm:col-span-1 lg:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted">Campaign Performance</p>
                <p className="text-xs text-faint">Search · Social · Email · Display</p>
              </div>
              <BarChart
                data={[62, 80, 45, 90, 70, 96, 58, 84, 72, 100, 66, 88]}
                className="h-28 w-full"
                from="var(--color-brand-600)"
                to="var(--color-brand-400)"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
