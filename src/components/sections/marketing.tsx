"use client";

import { TrendingUp, Radar, Target, DollarSign } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { AreaChart, BarChart, DonutProgress } from "@/components/ui/charts";
import { Counter } from "@/components/motion/counter";

export function Marketing() {
  return (
    <Section className="bg-bg-subtle/50">
      <Container>
        <SectionHeading
          eyebrow="CORDON in action"
          title="Fraud caught before it settles"
          description="Real-time transaction screening, reported in one live dashboard tied to the risk typologies that matter."
        />

        <Reveal className="mt-14">
          <div className="glass grid gap-4 rounded-3xl p-4 sm:p-6 lg:grid-cols-3">
            {/* Screening volume — large */}
            <div className="rounded-2xl border border-line bg-surface p-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">Transactions Screened · Real-time</p>
                  <p className="font-display text-3xl font-semibold text-content">
                    <Counter to={182} suffix="k" />
                  </p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald/10 px-2.5 py-1 text-xs font-medium text-emerald">
                  <TrendingUp className="h-3.5 w-3.5" /> +118% YoY volume
                </span>
              </div>
              <AreaChart
                data={[18, 24, 22, 33, 40, 38, 52, 64, 60, 78, 92, 110]}
                className="mt-6 h-40 w-full"
              />
            </div>

            {/* Case clearance donut */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-surface p-6 text-center">
              <p className="mb-4 self-start text-sm text-muted">Cases Cleared</p>
              <DonutProgress value={72} label="of queue" size={132} />
              <p className="mt-4 text-xs text-faint">Avg clearance 6.8 min · -2.1 min this quarter</p>
            </div>

            {/* Metric cards */}
            {[
              { icon: Radar, label: "Alerts Triaged", value: 54, suffix: "k", sub: "this quarter" },
              { icon: Target, label: "Cases Escalated", value: 12, suffix: "k", sub: "this quarter" },
              { icon: DollarSign, label: "Fraud Blocked", value: 2.4, suffix: "M", decimals: 1, sub: "month to date" },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="rounded-2xl border border-line bg-surface p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-display text-2xl font-semibold text-content">
                    <Counter to={m.value} suffix={m.suffix} decimals={m.decimals} />
                  </p>
                  <p className="text-sm text-muted">{m.label}</p>
                  <p className="text-xs text-faint">{m.sub}</p>
                </div>
              );
            })}

            {/* Risk typology coverage — spans remaining on large */}
            <div className="rounded-2xl border border-line bg-surface p-6 sm:col-span-1 lg:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted">Risk Typology Coverage</p>
                <p className="text-xs text-faint">APP · ATO · BEC · AML · Mule · KYC</p>
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
