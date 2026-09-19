"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type Cat = "web" | "ai" | "marketing" | "design";

type Item = {
  title: string;
  tag: string;
  cat: Cat;
  gradient: string;
  h: string; // height class → masonry variety
};

const items: Item[] = [
  { title: "Atlas CRM", tag: "Enterprise SaaS", cat: "web", gradient: "from-electric via-indigo to-purple", h: "h-72" },
  { title: "Helix AI", tag: "AI Platform", cat: "ai", gradient: "from-indigo via-purple to-cyan", h: "h-56" },
  { title: "Pulse Analytics", tag: "Marketing", cat: "marketing", gradient: "from-cyan via-emerald to-electric", h: "h-80" },
  { title: "Aperture Design", tag: "Design System", cat: "design", gradient: "from-purple via-electric to-cyan", h: "h-60" },
  { title: "Nova Commerce", tag: "Headless E-com", cat: "web", gradient: "from-purple via-electric to-cyan", h: "h-64" },
  { title: "Orbit Agents", tag: "AI Automation", cat: "ai", gradient: "from-emerald via-cyan to-indigo", h: "h-72" },
  { title: "Beacon SEO", tag: "Growth", cat: "marketing", gradient: "from-electric via-cyan to-emerald", h: "h-56" },
  { title: "Lumen App", tag: "Mobile Design", cat: "design", gradient: "from-indigo via-purple to-electric", h: "h-80" },
  { title: "Vertex Cloud", tag: "Infrastructure", cat: "web", gradient: "from-cyan via-indigo to-purple", h: "h-60" },
];

const filters: { id: Cat | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "ai", label: "AI" },
  { id: "marketing", label: "Marketing" },
  { id: "design", label: "Design" },
];

export function Gallery() {
  const [active, setActive] = useState<Cat | "all">("all");
  const shown = items.filter((i) => active === "all" || i.cat === active);

  return (
    <Section id="gallery">
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="A closer look at the work"
          description="Filter by discipline — every build ships design, engineering and measurable outcomes."
        />

        {/* Filter bar */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => {
            const on = active === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                aria-pressed={on}
                className={cn(
                  "relative cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  on ? "text-white" : "text-muted hover:text-content"
                )}
              >
                {on && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 -z-0 rounded-full bg-[linear-gradient(100deg,var(--color-brand-500),var(--color-brand-700))]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Masonry */}
        <div className="mt-10 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {shown.map((item) => (
              <motion.article
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="group mb-5 block break-inside-avoid"
              >
                <div className={cn("relative w-full overflow-hidden rounded-2xl border border-line", item.h)}>
                  {/* "Image" — mask-reveal via slide-up (container clips overflow) */}
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br",
                      item.gradient
                    )}
                  >
                    <div className="absolute inset-0 bg-grid opacity-30 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  </motion.div>

                  {/* Overlay */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    <div>
                      <p className="text-xs font-medium text-white/70">{item.tag}</p>
                      <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <span className="grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-[transform,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
