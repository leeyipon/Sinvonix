"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { team, departments, type Member, type Dept } from "@/lib/team";
import { cn } from "@/lib/utils";

const filters: (Dept | "All")[] = ["All", ...departments];

export function TeamGrid() {
  const [active, setActive] = useState<Dept | "All">("All");
  const reduce = useReducedMotion();
  // Cap the grid at a 3x3 block.
  const shown = team.filter((m) => active === "All" || m.dept === active).slice(0, 9);

  return (
    <Section id="team">
      <Container>
        <SectionHeading
          eyebrow="The team"
          title={
            <>
              Experts across every <span className="text-gradient">discipline</span>
            </>
          }
          description="Engineers, designers, QA specialists and strategists — filter by department to explore."
        />

        {/* Department filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => {
            const on = active === f;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                aria-pressed={on}
                className={cn(
                  "relative cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  on ? "text-white" : "text-muted hover:text-content"
                )}
              >
                {on && (
                  <motion.span
                    layoutId="team-filter"
                    className="absolute inset-0 -z-0 rounded-full bg-[linear-gradient(100deg,var(--color-brand-500),var(--color-brand-700))]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            );
          })}
        </div>

        {/* Grid. Cards animate on mount rather than on scroll: the filter needs
            AnimatePresence/layout here, and a scroll reveal would gate the
            whole roster behind an observer firing. `animate` can't leave the
            section blank, which matters more than revealing on scroll. */}
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((m, i) => (
              <motion.div
                key={m.name}
                layout
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{
                  duration: reduce ? 0 : 0.45,
                  ease: [0.16, 1, 0.3, 1],
                  // stagger across the row, not the whole grid — keeps it snappy
                  delay: reduce ? 0 : (i % 3) * 0.06,
                }}
              >
                <TeamCard m={m} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}

function TeamCard({ m }: { m: Member }) {
  const reduce = useReducedMotion();
  // Fall back to initials if the photo is missing or fails to load, so the card
  // looks intentional whether or not the headshot file has been added yet.
  const [imgFailed, setImgFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const showPhoto = !!m.photo && !imgFailed;

  // The server-rendered <img> can 404 before React hydrates and attaches
  // onError, so re-check the loaded state once after mount.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setImgFailed(true);
  }, []);

  // Motion owns the lift (spring); CSS keeps only the colour change, so the two
  // never fight over the same property.
  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-2.5 transition-[background-color,border-color] duration-300 ease-out hover:border-transparent hover:bg-brand-500"
    >
      {/* Portrait — monochrome by default, colour on hover */}
      <div className="relative overflow-hidden rounded-xl bg-surface-2">
        {showPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src={m.photo}
            alt={m.name}
            onError={() => setImgFailed(true)}
            style={{ objectPosition: m.focus ?? "center top" }}
            className="aspect-[4/5] w-full object-cover grayscale transition-[filter,transform] duration-500 ease-out will-change-transform group-hover:grayscale-0 motion-safe:group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex aspect-[4/5] w-full items-center justify-center bg-[linear-gradient(160deg,#6b7280,#454b56)]">
            <span className="font-display text-5xl font-bold text-white/85">{m.initials}</span>
          </div>
        )}
      </div>

      {/* Name + role */}
      <div className="px-2.5 pb-1.5 pt-3.5">
        {/* Dark ink on the mint hover: white would sit at ~1.3:1 and vanish. */}
        <h3 className="truncate text-[0.95rem] font-semibold leading-tight text-content transition-colors duration-300 group-hover:text-white">
          {m.name}
        </h3>
        <p className="mt-1 truncate text-xs text-muted transition-colors duration-300 group-hover:text-white/75">
          {m.role}
        </p>
      </div>
    </motion.article>
  );
}
