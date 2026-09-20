"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServicesIndex() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-6 sm:pt-44">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[linear-gradient(120deg,var(--color-electric),var(--color-indigo)_50%,var(--color-purple))] opacity-[0.08] blur-2xl" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-[0.35]" />
        <Container>
          <SectionHeading
            eyebrow="Platform"
            title={
              <>
                Five products, <span className="text-gradient">one unified platform</span>
              </>
            }
            description="Fraud intelligence, payment security, contact centre, automation and managed security — run standalone or together. Explore each below."
          />
        </Container>
      </section>

      <Section className="pt-10">
        <Container>
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <StaggerItem key={service.slug}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full"
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-brand-500/40"
                    >
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-[0.07]",
                          service.accent
                        )}
                      />

                      <div className="relative flex items-start justify-between">
                        <span
                          className={cn(
                            "grid h-13 w-13 place-items-center rounded-2xl bg-gradient-to-br p-3 text-white shadow-lg",
                            service.accent
                          )}
                        >
                          <Icon className="h-6 w-6" />
                        </span>
                        <ArrowUpRight className="h-5 w-5 text-faint transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-content" />
                      </div>

                      <h3 className="relative mt-6 text-xl font-semibold text-content">
                        {service.title}
                      </h3>
                      <p className="relative mt-2 text-sm leading-relaxed text-muted">
                        {service.blurb}
                      </p>

                      <ul className="relative mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {service.points.slice(0, 4).map((point) => (
                          <li key={point} className="flex items-center gap-2 text-sm text-muted">
                            <Check className="h-3.5 w-3.5 shrink-0 text-emerald" />
                            {point}
                          </li>
                        ))}
                      </ul>

                      <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-content">
                        Explore {service.title}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>
    </>
  );
}
