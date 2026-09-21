"use client";

import { motion } from "motion/react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { culture } from "@/lib/team";

export function Culture() {
  return (
    <Section id="culture">
      <Container>
        <SectionHeading
          eyebrow="Why Sinvonix"
          title="Built by operators, not vendors"
          description="Six reasons regulated institutions across ASEAN choose to work with us."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {culture.map((c) => {
            const Icon = c.icon;
            return (
              <StaggerItem key={c.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-brand-500/40"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--color-brand-500),var(--color-brand-700))] text-white shadow-lg">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="relative mt-5 text-lg font-semibold text-content">{c.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
