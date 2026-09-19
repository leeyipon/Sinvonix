"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";

// Wider cards get more breathing room and surface their full capability
// list; the grid still varies in rhythm without leaning on illustration.
const layout: Record<string, { featured: boolean }> = {
  "software-development": { featured: true },
  "ai-solutions": { featured: false },
  "digital-marketing": { featured: false },
  "ui-ux-design": { featured: true },
};

export function Services() {
  return (
    <Section id="services">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              One partner for <span className="text-accent">software, AI &amp; growth</span>
            </>
          }
          description="Four tightly integrated capabilities so strategy, build and marketing never fall out of sync."
        />

        <Stagger className="mt-14 grid gap-4 lg:grid-cols-3">
          {services.map((service) => {
            const cfg = layout[service.slug] ?? { featured: false };
            return (
              <StaggerItem
                key={service.slug}
                className={cfg.featured ? "lg:col-span-2" : "lg:col-span-1"}
              >
                <ServiceCard service={service} featured={cfg.featured} />
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}

function ServiceCard({
  service,
  featured,
}: {
  service: (typeof services)[number];
  featured: boolean;
}) {
  const Icon = service.icon;
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-brand-500/40 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,.4)]"
    >
      <Link
        href={`/services/${service.slug}`}
        aria-label={`Explore ${service.title}`}
        className="relative flex h-full flex-col p-6 sm:p-7"
      >
        {/* hover gradient wash */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-[0.07]",
            service.accent
          )}
        />

        <div className="relative flex items-start justify-between">
          <span
            className={cn(
              "grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br p-3 text-white shadow-lg transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6 group-hover:scale-110",
              service.accent
            )}
          >
            <Icon className="h-6 w-6" />
          </span>
          <ArrowUpRight className="h-5 w-5 text-faint transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-content" />
        </div>

        <div className="relative mt-5 flex flex-1 flex-col justify-center">
          <h3 className="text-xl font-semibold text-content">{service.title}</h3>
          <p className={cn("mt-2 text-sm leading-relaxed text-muted", featured ? "max-w-md" : "max-w-sm")}>
            {service.blurb}
          </p>

          {featured && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {service.points.slice(0, 6).map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted transition-colors duration-300 group-hover:border-brand-500/20"
                >
                  <Check className="h-3 w-3 shrink-0 text-accent" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
