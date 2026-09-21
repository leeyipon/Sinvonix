import { cn } from "@/lib/utils";

/**
 * Navi — the Sinvonix AI consultant mascot.
 *
 * A self-contained SVG droid: a glossy light head, a dark visor with two
 * glowing eyes, a bobbing antenna and a twinkling spark. It reads well on the
 * brand gradient (launcher, avatars) and on glass surfaces.
 *
 * `animate` drives a subtle idle float + blink + twinkle — use it only on the
 * one or two prominent instances (launcher, header, teaser). In the scrolling
 * transcript, render it `static` so many avatars don't animate at once.
 * All motion is gated on `prefers-reduced-motion` and uses transform/opacity.
 */
export function NimbusMascot({
  className,
  animate = false,
  title = "Navi, the Sinvonix AI consultant",
}: {
  className?: string;
  animate?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={cn("nm-root", animate && "nm-anim", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nm-head" x1="32" y1="12" x2="32" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dbe3ff" />
        </linearGradient>
        <linearGradient id="nm-visor" x1="18" y1="25" x2="46" y2="43" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#18294e" />
          <stop offset="1" stopColor="#0a1428" />
        </linearGradient>
        <radialGradient id="nm-eye" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#7fe9ff" />
          <stop offset="1" stopColor="#06b6d4" />
        </radialGradient>
      </defs>

      {/* everything floats together */}
      <g className="nm-float">
        {/* antenna */}
        <g className="nm-antenna">
          <line x1="32" y1="15" x2="32" y2="10" stroke="#c3ccff" strokeWidth="2" strokeLinecap="round" />
          <circle className="nm-orb" cx="32" cy="8.4" r="2.2" fill="var(--color-electric)" />
        </g>

        {/* ears / side bolts */}
        <rect x="9.4" y="29" width="3.8" height="7" rx="1.9" fill="var(--color-indigo)" />
        <rect x="50.8" y="29" width="3.8" height="7" rx="1.9" fill="var(--color-indigo)" />

        {/* head */}
        <rect x="12" y="15" width="40" height="34" rx="13" fill="url(#nm-head)" stroke="#c7d0f5" strokeWidth="0.6" />
        {/* top gloss */}
        <rect x="18" y="18" width="28" height="8" rx="5" fill="#ffffff" opacity="0.5" />

        {/* visor */}
        <rect x="16.5" y="25" width="31" height="18" rx="9" fill="url(#nm-visor)" />
        {/* faint visor sheen */}
        <rect x="19.5" y="27" width="25" height="4" rx="2" fill="#ffffff" opacity="0.08" />

        {/* eyes (blink) */}
        <g className="nm-eyes">
          <circle cx="26" cy="33" r="3.7" fill="#06b6d4" opacity="0.35" />
          <circle cx="38" cy="33" r="3.7" fill="#06b6d4" opacity="0.35" />
          <circle cx="26" cy="33" r="2.3" fill="url(#nm-eye)" />
          <circle cx="38" cy="33" r="2.3" fill="url(#nm-eye)" />
          <circle cx="25.3" cy="32.3" r="0.7" fill="#ffffff" />
          <circle cx="37.3" cy="32.3" r="0.7" fill="#ffffff" />
        </g>

        {/* smile */}
        <path
          d="M28 39 Q32 41.6 36 39"
          fill="none"
          stroke="#7fe9ff"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* spark */}
        <path
          className="nm-spark"
          d="M50 12.4 Q50.5 15.5 53.6 16 Q50.5 16.5 50 19.6 Q49.5 16.5 46.4 16 Q49.5 15.5 50 12.4 Z"
          fill="#a9f0ff"
        />
      </g>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .nm-anim .nm-float { animation: nm-float 4.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .nm-anim .nm-eyes { animation: nm-blink 5.6s infinite; transform-box: fill-box; transform-origin: center; }
          .nm-anim .nm-spark { animation: nm-twinkle 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .nm-anim .nm-antenna { animation: nm-bob 4.2s ease-in-out infinite; }
          .nm-anim .nm-orb { animation: nm-pulse 2.4s ease-in-out infinite; }
        }
        @keyframes nm-float { 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-1.3px); } }
        @keyframes nm-bob { 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-0.8px); } }
        @keyframes nm-blink { 0%,90%,100%{ transform: scaleY(1); } 94%{ transform: scaleY(0.12); } }
        @keyframes nm-twinkle { 0%,100%{ opacity: 0.55; transform: scale(0.8); } 50%{ opacity: 1; transform: scale(1.1); } }
        @keyframes nm-pulse { 0%,100%{ opacity: 0.85; } 50%{ opacity: 1; } }
      `}</style>
    </svg>
  );
}
