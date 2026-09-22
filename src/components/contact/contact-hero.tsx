"use client";

import { motion } from "motion/react";
import { MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { GradientMesh } from "@/components/effects/gradient-mesh";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ContactHero() {
  return (
    <section className="relative flex min-h-[52vh] items-center overflow-hidden pt-36 pb-14 sm:pt-40">
      <GradientMesh intensity="strong" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_72%)]" />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur"
          >
            <MessageSquare className="h-3.5 w-3.5 text-accent" />
            Contacts
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Let&apos;s build something{" "}
            <span className="text-gradient">worth talking about</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted"
          >
            Tell us about your project and we&apos;ll get back to you within one business
            day — or book a free consultation and talk to us directly.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
