"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type WheelEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const getStep = () => {
    const card = trackRef.current?.querySelector<HTMLElement>("[data-card]");
    return (card?.offsetWidth ?? 670) + 16; // card width + gap-4
  };

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: getStep() * dir, behavior: "smooth" });
  };

  // Lets a plain vertical mouse wheel drive the horizontal track — trackpads
  // and touch already scroll natively, this is for mouse-wheel users.
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.currentTarget.scrollLeft += e.deltaY;
  };

  return (
    <Section id="services">
      <Container>
        <SectionHeading
          eyebrow="The platform"
          title={
            <>
              Five products, <span className="text-accent">one unified platform</span>
            </>
          }
          description="Fraud intelligence, payment security, contact centre, automation and managed security — tightly integrated so nothing falls out of sync."
        />

        <div className="relative mt-14">
          {/* Edge fades hint there's more to scroll */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-bg to-transparent transition-opacity duration-300 sm:w-20",
              atStart ? "opacity-0" : "opacity-100"
            )}
          />
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-bg to-transparent transition-opacity duration-300 sm:w-20",
              atEnd ? "opacity-0" : "opacity-100"
            )}
          />

          {/* Prev/next controls — desktop only; touch/trackpad users just swipe */}
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Scroll to previous product"
            className="absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 text-content shadow-[0_8px_24px_-12px_rgba(0,0,0,.3)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:border-brand-500/40 hover:-translate-x-0.5 hover:-translate-y-1/2 disabled:pointer-events-none disabled:opacity-0 sm:grid"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Scroll to next product"
            className="absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 text-content shadow-[0_8px_24px_-12px_rgba(0,0,0,.3)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:border-brand-500/40 hover:translate-x-0.5 hover:-translate-y-1/2 disabled:pointer-events-none disabled:opacity-0 sm:grid"
          >
            <ArrowRight className="h-4 w-4" />
          </button>

          <Stagger
            ref={trackRef}
            onWheel={handleWheel}
            tabIndex={0}
            role="region"
            aria-label="Sinvonix products"
            className="flex snap-x snap-proximity gap-4 overflow-x-auto scroll-smooth pb-4 pt-1 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
          >
            {services.map((service) => (
              <StaggerItem
                key={service.slug}
                data-card
                className="w-[86vw] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
              >
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const Icon = service.icon;
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -8, scale: 1.015 }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.6 }}
      className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-brand-500/40 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,.4)]"
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
          <ArrowUpRight className="h-5 w-5 text-faint transition-[transform,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-content" />
        </div>

        <div className="relative mt-5 flex flex-1 flex-col justify-center">
          <h3 className="text-xl font-semibold text-content">{service.title}</h3>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">{service.blurb}</p>

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
        </div>
      </Link>
    </motion.article>
  );
}
