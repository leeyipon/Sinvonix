"use client";

import { useState } from "react";
import { Section, Container } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { HighlightMark } from "@/components/effects/doodles";
import { Lightbox } from "@/components/ui/lightbox";
import { galleryShots } from "@/lib/team";
import { cn } from "@/lib/utils";

/** Per-photo tilt + aspect so the board reads as a hand-arranged collage. */
const TILT = [-4, 3, -2.5, 4.5, -3.5, 2.5, -5, 3.5];
const ASPECT = [
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/3]",
  "aspect-[4/3]",
];

export function TeamGallery() {
  const [active, setActive] = useState<{ src: string; alt: string } | null>(null);

  return (
    <Section className="bg-bg-subtle/50">
      <Container>
        {/* ---- wooden clipboard ---- */}
        <div
          className="relative mx-auto max-w-4xl rounded-[20px] p-4 pt-10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)] sm:p-6 sm:pt-12"
          style={{
            background:
              "linear-gradient(160deg,#CB9A62,#A9743F 55%,#8A5A2E)",
            boxShadow:
              "0 40px 80px -30px rgba(0,0,0,.55), inset 0 0 0 2px rgba(0,0,0,.12), inset 0 2px 0 rgba(255,255,255,.18)",
          }}
        >
          {/* wood grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[20px] opacity-40 mix-blend-soft-light"
            style={{
              background:
                "repeating-linear-gradient(93deg,rgba(0,0,0,.05) 0 1px,transparent 1px 8px)",
            }}
          />

          {/* metal clip */}
          <div aria-hidden className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
            <div
              className="flex h-14 w-28 items-start justify-center rounded-[8px] pt-2"
              style={{
                background:
                  "linear-gradient(180deg,#eef1f5,#c2c7cf 42%,#e4e8ee 58%,#9ba1aa)",
                boxShadow:
                  "0 6px 12px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.85), inset 0 -2px 3px rgba(0,0,0,.25)",
              }}
            >
              <div
                className="h-7 w-7 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 38% 32%,#ffffff,#b4b9c0 58%,#7c828b)",
                  boxShadow: "inset 0 1px 2px rgba(255,255,255,.7), 0 1px 2px rgba(0,0,0,.4)",
                }}
              />
            </div>
          </div>

          {/* ---- paper ---- */}
          <div className="relative overflow-hidden rounded-[6px] bg-[#FBF9F1] px-5 pb-12 pt-14 shadow-[inset_0_1px_0_rgba(255,255,255,.9),0_2px_10px_rgba(0,0,0,.15)] sm:px-9 sm:pb-14 sm:pt-16">
            {/* handwritten heading */}
            <div className="relative z-10 text-center">
              <p className="font-hand text-2xl text-[#5b5346] sm:text-3xl">
                life at Nimbus — recap
              </p>
              <h2 className="mt-1 inline-block">
                <span className="relative inline-block">
                  <HighlightMark color="#FDE047" className="-inset-x-3 inset-y-1 -z-10" />
                  <span className="relative font-hand text-5xl font-bold text-[#26332C] sm:text-6xl">
                    Behind the work
                  </span>
                </span>
              </h2>
              <p className="mt-2 font-hand text-xl text-[#7a7160] sm:text-2xl">
                with the whole crew ✨
              </p>
            </div>

            {/* photo collage */}
            <Stagger className="relative mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-9">
              {galleryShots.map((shot, i) => {
                const rot = TILT[i % TILT.length];
                return (
                  <StaggerItem key={shot.label}>
                    <button
                      type="button"
                      aria-label={shot.image ? `View ${shot.label}` : shot.label}
                      onClick={() =>
                        shot.image && setActive({ src: shot.image, alt: shot.label })
                      }
                      style={{ transform: `rotate(${rot}deg)` }}
                      className={cn(
                        "group relative block w-[9.5rem] rounded-[3px] bg-white p-2 pb-8 shadow-[0_10px_22px_-8px_rgba(30,20,10,0.5)] transition-transform duration-300 ease-out will-change-transform sm:w-[12.5rem]",
                        shot.image && "cursor-zoom-in",
                        "motion-safe:hover:z-10 motion-safe:hover:!rotate-0 motion-safe:hover:scale-[1.05]"
                      )}
                    >
                      <div
                        className={cn(
                          "relative overflow-hidden bg-[linear-gradient(135deg,#d7dbde,#b7bec3)]",
                          ASPECT[i % ASPECT.length]
                        )}
                      >
                        {shot.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={encodeURI(shot.image)}
                            alt={shot.label}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div
                            className={cn(
                              "h-full w-full bg-gradient-to-br opacity-80",
                              shot.gradient
                            )}
                          />
                        )}
                      </div>
                      <p className="mt-2 text-center font-hand text-[15px] leading-tight text-[#4b463d] sm:text-lg">
                        {shot.label}
                      </p>
                    </button>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </Container>

      <Lightbox
        open={!!active}
        src={active?.src ?? ""}
        alt={active?.alt ?? ""}
        onClose={() => setActive(null)}
      />
    </Section>
  );
}
