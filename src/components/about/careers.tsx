"use client";

import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { openings, benefits } from "@/lib/team";
import { useJoin } from "@/components/join/join-provider";

export function Careers() {
  const join = useJoin();

  return (
    <Section id="careers">
      <Container>
        <SectionHeading
          eyebrow="Careers"
          title="Join our team"
          description="We're looking for people who want to solve hard problems at the intersection of cybersecurity, AI, and regulated industries. If you thrive in ambiguity and care about impact over titles, we should talk."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Openings */}
          <Reveal direction="right">
            <div className="h-full rounded-3xl border border-line bg-surface p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-faint">
                Current Openings
              </h3>
              <Stagger className="mt-5 flex flex-col divide-y divide-line">
                {openings.map((role) => (
                  <StaggerItem key={role}>
                    <button
                      type="button"
                      onClick={() => join.open(role)}
                      className="group flex w-full cursor-pointer items-center justify-between py-4 text-left transition-colors"
                    >
                      <span className="font-medium text-content group-hover:text-accent">
                        {role}
                      </span>
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-[transform,border-color,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-brand-500/50 group-hover:text-content">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </button>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>

          {/* Benefits */}
          <Reveal direction="left">
            <div className="h-full rounded-3xl border border-line bg-surface p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-faint">Benefits</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-muted">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500/15 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal className="mt-8">
          <div className="relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:py-14">
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,var(--color-electric),var(--color-indigo)_45%,var(--color-purple))]" />
            <div className="absolute inset-0 -z-10 bg-grid opacity-20 mix-blend-overlay" />
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                aria-hidden
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                className="pointer-events-none absolute h-16 w-16 rounded-full bg-white/10 blur-md"
                style={{ left: `${12 + i * 22}%`, top: `${i % 2 ? 20 : 55}%` }}
              />
            ))}
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">
              Ready to build the future with us?
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-white/85">
              Explore open roles and find where you fit on the team.
            </p>
            <div className="mt-7 flex justify-center">
              <Magnetic>
                <Button
                  onClick={() => join.open()}
                  size="lg"
                  variant="secondary"
                  className="!bg-white text-brand-700 hover:!bg-white"
                >
                  View Open Positions
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
