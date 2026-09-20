"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import {
  ArrowRight,
  Play,
  Sparkles,
  TrendingUp,
  Bot,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Headset,
  Workflow,
  Landmark,
  Truck,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { GradientMesh } from "@/components/effects/gradient-mesh";
import { useScheduler } from "@/components/scheduler/scheduler-provider";
import { heroHighlights } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { stiffness: 110, damping: 20, mass: 0.6 } as const;

const complianceBadges = ["SOC 2", "PCI DSS", "ISO 27001", "GDPR", "AML/KYC", "24/7 MDR"];

// The five Sinvonix products — each stands alone or plugs into the unified platform.
const products: { name: string; tag: string; icon: LucideIcon; accent: string }[] = [
  { name: "CORDON", tag: "Fraud & AML", icon: ShieldAlert, accent: "from-[#DC2626] to-[#991B1B]" },
  { name: "AEVIX", tag: "Payment & Quantum Security", icon: Lock, accent: "from-[#0EA5E9] to-[#0369A1]" },
  { name: "Conversa CI Hub", tag: "Contact Centre", icon: Headset, accent: "from-[#4F46E5] to-[#3730A3]" },
  { name: "Chronicle AI", tag: "Intelligent Automation", icon: Workflow, accent: "from-[#059669] to-[#047857]" },
  { name: "Managed Security", tag: "MDR & Digital Risk", icon: ShieldCheck, accent: "from-[#1E3A8A] to-[#0F172A]" },
];

// Industry ranges the Sinvonix platform serves.
const industries = [
  {
    title: "Financial Services",
    icon: Landmark,
    blurb: "Banking, investment, insurance and advisory — for individuals and businesses.",
  },
  {
    title: "Logistics",
    icon: Truck,
    blurb: "Transportation, warehousing, inventory and supply chain — start to finish.",
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
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Cursor position across the hero, normalized to -0.5..0.5 for parallax depth
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section
      id="top"
      ref={heroRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-[94vh] items-center overflow-hidden pt-32 pb-20 sm:pt-36"
    >
      {/* Background (zooms + parallaxes on scroll) */}
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0 -z-10">
        <GradientMesh intensity="strong" />
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_28%,transparent_70%)]" />
      </motion.div>

      <Container className="relative">
        {/* Floating card cluster — drifts with the cursor at layered depths (xl only) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
          {/* top-left: pinned sticky note (pinboard motif) */}
          <FloatCard mx={mx} my={my} depth={30} rotate={-5} delay={0.5} float={-11} reduce={reduce} className="left-0 top-[6%]">
            <StickyNote />
          </FloatCard>

          {/* top-right: AI agent working */}
          <FloatCard mx={mx} my={my} depth={38} rotate={3} delay={0.58} float={12} reduce={reduce} className="right-0 top-[7%]">
            <AgentCard />
          </FloatCard>

          {/* mid-left: live uptime */}
          <FloatCard mx={mx} my={my} depth={54} rotate={-2} delay={0.66} float={9} reduce={reduce} className="left-[3%] top-[47%]">
            <UptimeBadge />
          </FloatCard>

          {/* upper-right: integrations (kept clear of the bottom-right chat widget) */}
          <FloatCard mx={mx} my={my} depth={30} rotate={-3} delay={0.7} float={10} reduce={reduce} className="right-0 top-[31%]">
            <IntegrationsCard />
          </FloatCard>

          {/* bottom-left: revenue analytics */}
          <FloatCard mx={mx} my={my} depth={34} rotate={2} delay={0.62} float={13} reduce={reduce} className="-left-2 bottom-[6%]">
            <RevenueCard />
          </FloatCard>
        </div>

        {/* Centered copy */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
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
            <Button href="#work" variant="secondary" size="lg">
              <Play className="h-4 w-4" />
              View Our Work
            </Button>
          </motion.div>

          {/* Product strip — identity + category only; full descriptions live on their own pages */}
          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.74, ease: EASE }}
            className="mt-10 flex w-full flex-wrap items-stretch justify-center gap-2.5"
          >
            {products.map(({ name, tag, icon: Icon, accent }) => (
              <li
                key={name}
                className="flex items-center gap-2.5 rounded-2xl border border-line bg-surface/50 py-2.5 pl-2.5 pr-4 text-left backdrop-blur"
              >
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-white",
                    accent
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-none text-content">{name}</p>
                  <p className="mt-1 text-[11px] leading-none text-faint">{tag}</p>
                </div>
              </li>
            ))}
          </motion.ul>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.86 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            {heroHighlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-muted">
                <Icon className="h-4 w-4 text-accent" />
                {label}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.96, ease: EASE }}
            className="mt-10 grid w-full max-w-2xl gap-4 text-left sm:grid-cols-2"
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
                  <h3 className="text-sm font-semibold text-content">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{blurb}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
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

/* ---- Floating card wrapper -------------------------------------------- */
/* Three composed layers: cursor parallax → entrance + hover → idle float. */

function FloatCard({
  mx,
  my,
  depth,
  rotate,
  delay,
  float,
  reduce,
  className,
  children,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  rotate: number;
  delay: number;
  float: number;
  reduce: boolean | null;
  className?: string;
  children: ReactNode;
}) {
  const x = useSpring(useTransform(mx, [-0.5, 0.5], [-depth, depth]), SPRING);
  const y = useSpring(useTransform(my, [-0.5, 0.5], [-depth, depth]), SPRING);

  return (
    <motion.div className={cn("absolute", className)} style={reduce ? undefined : { x, y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: EASE }}
        whileHover={reduce ? undefined : { scale: 1.05, y: -5 }}
        style={{ rotate }}
        className="pointer-events-auto cursor-default"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, float, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ---- Individual floating cards ---------------------------------------- */

function StickyNote() {
  return (
    <div
      className="relative w-52 rounded-[3px] bg-[#FCEEA8] p-4 pt-5 text-[#5b5320] shadow-[0_18px_34px_-16px_rgba(40,36,10,.5)]"
      style={{ borderRadius: "3px 3px 14px 3px" }}
    >
      <span
        aria-hidden
        className="absolute -top-2.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle at 34% 28%,#ff8f8f 0 10%,#e23b3b 46%,#9c1f1f 100%)",
          boxShadow: "0 5px 7px rgba(0,0,0,.35), inset -1.5px -1.5px 3px rgba(0,0,0,.3), inset 1.5px 1.5px 3px rgba(255,255,255,.55)",
        }}
      />
      <p className="font-hand text-2xl font-bold leading-tight">
        Live in weeks,
        <br />
        not quarters.
      </p>
      <p className="mt-1.5 font-hand text-lg leading-tight text-[#8a7f37]">
        — standalone or unified
      </p>
    </div>
  );
}

function AgentCard() {
  return (
    <div className="glass w-56 rounded-2xl p-4">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--color-brand-500),var(--color-brand-700))] text-white">
          <Bot className="h-[18px] w-[18px]" />
        </span>
        <div>
          <p className="text-xs font-semibold text-content">Chronicle AI</p>
          <p className="text-[11px] text-faint">Triaging fraud case…</p>
        </div>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <motion.div
          initial={{ width: "12%" }}
          animate={{ width: ["12%", "82%", "58%", "95%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-brand-700),var(--color-brand-500))]"
        />
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-accent">
        <Check className="h-3.5 w-3.5" /> 82% auto-resolved
      </div>
    </div>
  );
}

function RevenueCard() {
  return (
    <div className="glass w-64 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-error-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-500/80" />
        </div>
        <span className="text-[11px] font-medium text-faint">cordon.sinvonix.io</span>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-faint">Fraud Blocked (MTD)</p>
          <p className="font-display text-2xl font-semibold text-content">$2.4M</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-brand-500/15 px-2 py-1 text-xs font-medium text-accent">
          <TrendingUp className="h-3 w-3" /> +34%
        </span>
      </div>
      <div className="mt-5 flex h-20 items-end gap-1.5">
        {[40, 62, 48, 78, 56, 88, 70, 96].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.7, delay: 0.9 + i * 0.07, ease: EASE }}
            className="flex-1 rounded-md bg-[linear-gradient(to_top,var(--color-brand-600),var(--color-brand-300))]"
          />
        ))}
      </div>
    </div>
  );
}

function IntegrationsCard() {
  return (
    <div className="glass w-56 rounded-2xl p-4">
      <p className="text-xs font-semibold text-content">Compliance &amp; standards</p>
      <p className="mt-0.5 text-[11px] text-faint">Built to certified controls</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {complianceBadges.map((label) => (
          <span
            key={label}
            className="rounded-full border border-line bg-surface/60 px-2.5 py-1 text-[11px] font-medium text-muted"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function UptimeBadge() {
  return (
    <div className="glass w-44 rounded-2xl p-4">
      <div className="flex items-center gap-2 text-accent">
        <ShieldCheck className="h-4 w-4" />
        <span className="text-xs font-semibold">99.98% uptime</span>
      </div>
      <div className="mt-3 flex items-end gap-1">
        {[6, 10, 7, 12, 9, 14, 11, 15, 12, 16].map((h, i) => (
          <span
            key={i}
            style={{ height: h }}
            className="w-1.5 rounded-full bg-[linear-gradient(to_top,var(--color-brand-600),var(--color-brand-300))]"
          />
        ))}
      </div>
    </div>
  );
}
