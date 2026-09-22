"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  ArrowRight,
  Play,
  Sparkles,
  Landmark,
  Truck,
} from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { GradientMesh } from "@/components/effects/gradient-mesh";
import { HeroIllustration } from "@/components/effects/hero-illustration";
import { useScheduler } from "@/components/scheduler/scheduler-provider";
import { heroHighlights } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

// Industry ranges the Sinvonix platform serves.
const industries = [
  {
    title: "Financial Services",
    icon: Landmark,
    blurb:
      "Banking, investment, insurance and advisory — for individuals and businesses.",
  },
  {
    title: "Logistics",
    icon: Truck,
    blurb:
      "Transportation, warehousing, inventory and supply chain — start to finish.",
  },
];

export function Hero() {
  const reduce = useReducedMotion();
  const { open } = useScheduler();
  const heroRef = useRef<HTMLElement>(null);

  // Scroll-driven background zoom + gentle lift of the whole composition
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.28]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative flex min-h-[94vh] items-center overflow-hidden pt-32 pb-20 sm:pt-36"
    >
      {/* Background (zooms + parallaxes on scroll) */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 -z-10"
      >
        <GradientMesh intensity="medium" />
        <HeroIllustration />
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_28%,transparent_70%)]" />
      </motion.div>

      <Container className="relative">
        {/* xl+: industry cards flank the hero copy instead of stacking beneath it */}
        <div className="xl:grid xl:grid-cols-[200px_minmax(0,1fr)_200px] xl:items-center xl:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.96, ease: EASE }}
            className="hidden rounded-2xl border border-line bg-surface/50 p-5 text-left backdrop-blur xl:block"
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500/15 text-accent">
                <Landmark className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold text-content">
                {industries[0].title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {industries[0].blurb}
            </p>
          </motion.div>

          {/* Centered copy */}
          <motion.div
            style={{ y: contentY }}
            className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              One platform &middot; Five products
            </motion.div>

            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl xl:text-7xl">
              <motion.span
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
                className="block"
              >
                Detect, secure &amp; automate
              </motion.span>
              <motion.span
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
                className="block text-muted"
              >
                all on <span className="text-accent">one platform.</span>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted"
            >
              Sinvonix unifies fraud intelligence, payment security, contact
              centre, automation and managed security into five products you can
              run standalone — or together as one platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.62, ease: EASE }}
              className="mt-9 flex flex-wrap items-center justify-center gap-3"
            >
              <Magnetic>
                <Button onClick={open} size="lg">
                  Book a Consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Magnetic>
              <Button href="/work" variant="secondary" size="lg">
                <Play className="h-4 w-4" />
                View Our Products
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.74 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            >
              {heroHighlights.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  {label}
                </li>
              ))}
            </motion.ul>

            {/* Below xl there's no room to flank the copy, so the industry cards stack here instead. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.96, ease: EASE }}
              className="mt-10 grid w-full max-w-2xl gap-4 text-left sm:grid-cols-2 xl:hidden"
            >
              {industries.map(({ title, icon: Icon, blurb }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-line bg-surface/50 p-5 backdrop-blur"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500/15 text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="text-sm font-semibold text-content">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {blurb}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.96, ease: EASE }}
            className="hidden rounded-2xl border border-line bg-surface/50 p-5 text-left backdrop-blur xl:block"
          >
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500/15 text-accent">
                <Truck className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold text-content">
                {industries[1].title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {industries[1].blurb}
            </p>
          </motion.div>
        </div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-line p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-brand-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
