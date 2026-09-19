"use client";

import { motion } from "motion/react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { getService, techStack } from "@/lib/site";

export function ServiceTech({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) return null;

  const stack = techStack.filter((t) => service.techSlugs.includes(t.slug));
  if (stack.length === 0) return null;

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Technology"
          title="Built on a proven stack"
          description="The tools we reach for on this kind of work — reliable where it matters, modern where it wins."
        />

        <Stagger className="mt-14 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {stack.map((tech) => (
            <StaggerItem key={tech.name}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="group flex aspect-square cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-brand-500/40"
              >
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-white shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/icons/${tech.slug}.svg`}
                    alt={`${tech.name} logo`}
                    width={30}
                    height={30}
                    loading="lazy"
                    className="h-[30px] w-[30px] grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                  />
                </span>
                <span className="text-center text-xs font-medium text-muted transition-colors group-hover:text-content">
                  {tech.name}
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
