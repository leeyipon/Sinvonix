"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, FileText } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { caseStudies, type CaseStudy } from "@/lib/work";
import { ProjectArt } from "@/components/work/project-art";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* Paper-collage palette (a deliberate pinboard world within the light site). */
const BOARD =
  "linear-gradient(155deg,#23a88e 0%,#1E9E86 42%,#0F6E5B 100%)";
const ROTATE = [-1.7, 1.4, -1, 1.8, -1.3, 1.1];
const PIN_X = ["50%", "38%", "62%", "44%", "56%", "50%"];

export function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const distance = () => track.scrollWidth - window.innerWidth + 96;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        const cards = gsap.utils.toArray<HTMLElement>(".showcase-card");
        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 60,
            scale: 0.94,
            ease: "power4.out",
            duration: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 92%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden py-24 text-white sm:py-28"
      style={{ background: BOARD }}
    >
      {/* silk sheen + faint pinboard grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            "repeating-linear-gradient(115deg,rgba(255,255,255,.05) 0 2px,transparent 2px 26px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />

      <Container className="relative mb-14">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/85 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C7E85A]" />
          Featured work
        </span>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-5xl">
          Live in production, not in pilot
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
          Recent deployments, pinned to the board — the challenge, what went live, and where it
          stands today.
        </p>
        <Link
          href="/work"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C7E85A] transition-colors hover:text-white"
        >
          Browse the track record <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Container>

      {/* Track — GSAP translates this on desktop; native scroll on mobile */}
      <div className="relative overflow-x-auto pb-6 lg:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none]">
        <div ref={trackRef} className="flex w-max gap-8 px-5 pt-4 sm:px-8 lg:px-[6vw]">
          {caseStudies.map((p, i) => (
            <PaperCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- pinned paper card ------------------------------------------------ */

function Pushpin({ left }: { left: string }) {
  return (
    <span
      aria-hidden
      className="absolute -top-3 z-20 block h-[19px] w-[19px] -translate-x-1/2 rounded-full"
      style={{
        left,
        background:
          "radial-gradient(circle at 34% 28%,#ff8f8f 0 10%,#e23b3b 46%,#9c1f1f 100%)",
        boxShadow:
          "0 6px 8px rgba(0,0,0,.35), inset -2px -2px 3px rgba(0,0,0,.3), inset 2px 2px 3px rgba(255,255,255,.55)",
      }}
    />
  );
}

function PaperCard({ project, index }: { project: CaseStudy; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const rot = ROTATE[index % ROTATE.length];
  return (
    <article
      className="showcase-card group relative flex h-[35rem] w-[80vw] max-w-[25rem] shrink-0 flex-col rounded-[10px] bg-[#F4F0E5] p-7 text-[#23322c] shadow-[0_28px_48px_-20px_rgba(6,40,32,.55)] transition-transform duration-300 ease-out will-change-transform motion-safe:hover:-translate-y-1.5 sm:w-[24rem]"
      style={{ transform: `rotate(${rot}deg)`, borderRadius: "8px 12px 8px 30px" }}
    >
      <Pushpin left={PIN_X[index % PIN_X.length]} />
      {/* curled bottom-right corner */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-px -right-px h-[16%] w-[20%]"
        style={{
          background:
            "linear-gradient(135deg,transparent 46%,#e5dfce 47%,#cbc4b1 100%)",
          clipPath: "polygon(100% 0,100% 100%,0 100%)",
          borderBottomRightRadius: "8px",
          boxShadow: "-.4em -.4em .7em rgba(0,0,0,.10)",
        }}
      />

      <div className="flex items-start justify-between">
        <span className="rounded-full bg-[#0e7a66]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0e7a66]">
          {project.category}
        </span>
        <span className="font-display text-4xl font-bold leading-none text-[#23322c]/10">
          {num}
        </span>
      </div>

      <h3 className="mt-4 font-display text-[2rem] font-bold leading-[1.03] tracking-tight text-[#0e7a66]">
        {project.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#5c6b63]">{project.challenge}</p>

      <ProjectArt project={project} />

      <div className="mt-auto">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a978f]">
          <ArrowUpRight className="h-3.5 w-3.5 text-[#2aa96e]" /> Result
        </p>
        <p className="mt-1 font-display text-xl font-bold leading-tight text-[#23322c]">
          {project.result}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#ded8c6] bg-[#fbf9f1] px-2.5 py-1 text-[11px] font-medium text-[#5c6b63]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{ background: "linear-gradient(100deg,#0e7a66,#2aa96e)" }}
          >
            <FileText className="h-3.5 w-3.5" /> Read the case study
          </Link>
        </div>
      </div>
    </article>
  );
}
