"use client";

import { motion } from "motion/react";
import { ArrowRight, Users } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { GradientMesh } from "@/components/effects/gradient-mesh";
import { useJoin } from "@/components/join/join-provider";

const EASE = [0.16, 1, 0.3, 1] as const;

const shapes = [
  { c: "left-[10%] top-[22%]", s: "h-16 w-16 rounded-2xl", d: 0 },
  { c: "right-[14%] top-[28%]", s: "h-10 w-10 rounded-full", d: 1.4 },
  { c: "left-[18%] bottom-[20%]", s: "h-12 w-12 rounded-xl rotate-12", d: 0.8 },
  { c: "right-[20%] bottom-[26%]", s: "h-8 w-8 rounded-lg", d: 2.1 },
];

export function AboutHero() {
  const join = useJoin();

  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden pt-36 pb-16 sm:pt-40">
      <GradientMesh intensity="strong" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />

      {/* Network connection lines */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="netline" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-electric)" stopOpacity="0.5" />
            <stop offset="1" stopColor="var(--color-cyan)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          "M100,120 L340,260 L560,180",
          "M1200,160 L980,300 L760,240",
          "M180,540 L420,420 L680,520",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#netline)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.4 + i * 0.3, ease: EASE }}
          />
        ))}
      </svg>

      {/* Floating geometric shapes */}
      {shapes.map((sh, i) => (
        <motion.span
          key={i}
          aria-hidden
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: sh.d }}
          className={`pointer-events-none absolute -z-10 border border-white/10 bg-white/5 backdrop-blur-sm ${sh.c} ${sh.s}`}
        />
      ))}

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur"
          >
            <Users className="h-3.5 w-3.5 text-accent" />
            About Nimbus
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Meet the People Building{" "}
            <span className="text-gradient">Tomorrow&apos;s Technology</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted"
          >
            Our diverse team of engineers, designers, QA specialists, marketers, and project
            leaders work together to create scalable digital products that help businesses grow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: EASE }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Magnetic>
              <Button href="#team" size="lg">
                Meet Our Experts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Magnetic>
            <Button onClick={() => join.open()} variant="secondary" size="lg">
              Join Our Team
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
