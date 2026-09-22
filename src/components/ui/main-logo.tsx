import { cn } from "@/lib/utils";

/**
 * Sinvonix brand lockup: a shield enclosing a network mark, plus the
 * "SINVONIX" wordmark. The icon mark is two-tone brand blue on light and
 * goes solid white on dark (via --logo-shield/--logo-accent, themed in
 * globals.css) so the whole mark reads as one clean shape on dark chrome
 * instead of staying a fixed blue against a fixed blue. The wordmark rides
 * `currentColor` (set via text-*) so it adapts the same way; the "O" keeps
 * the accent token as its brand pop.
 */
export function MainLogo({ className }: { className?: string }) {
  const deep = "var(--logo-shield)";
  const accent = "var(--logo-accent)";
  return (
    <svg
      viewBox="0 0 350 100"
      fill="none"
      role="img"
      aria-label="Sinvonix"
      className={cn("block w-auto text-content", className)}
    >
      {/* Shield */}
      <path
        d="M18 24 Q18 20 22 20 L66 20 Q70 20 70 24 L70 52 Q70 74 44 90 Q18 74 18 52 Z"
        fill="none"
        stroke={deep}
        strokeWidth="4.6"
        strokeLinejoin="round"
      />
      {/* Inner top border accent */}
      <path
        d="M25 27.5 Q25 25.5 27 25.5 L61 25.5 Q63 25.5 63 27.5"
        fill="none"
        stroke={deep}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Network mark: a hub node with two connected satellites — the same
          "one node watching many" shape the product itself is built on. */}
      <path
        d="M56 40 L31 52 L48 68 Z"
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="31" cy="52" r="4" fill={accent} />
      <circle cx="48" cy="68" r="4" fill={accent} />
      <circle cx="56" cy="40" r="6.5" fill={accent} />

      {/* Wordmark */}
      <text
        x="90"
        y="65"
        fill="currentColor"
        style={{ fontFamily: "var(--font-logo-var), \"Space Grotesk\", ui-sans-serif, system-ui, sans-serif" }}
        fontSize="50"
        fontWeight="800"
        letterSpacing="-1.5"
      >
        SINV<tspan fill={accent}>O</tspan>NIX
      </text>
    </svg>
  );
}
