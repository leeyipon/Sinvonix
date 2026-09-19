import { cn } from "@/lib/utils";

/**
 * Sinvonix brand lockup: a shield enclosing a network mark, plus the
 * "SINVONIX" wordmark. The shield/mark use the brand blue in both themes,
 * while the wordmark rides `currentColor` (set via text-*) so it stays legible
 * on the dark chrome and adapts on light surfaces — the signature blue "O" is
 * preserved as the brand accent.
 */
export function MainLogo({ className }: { className?: string }) {
  const blue = "#0152A5";
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
        stroke={blue}
        strokeWidth="4.6"
        strokeLinejoin="round"
      />
      {/* Inner top border accent */}
      <path
        d="M25 27.5 Q25 25.5 27 25.5 L61 25.5 Q63 25.5 63 27.5"
        fill="none"
        stroke={blue}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Network mark: three nodes in a triangle */}
      <path
        d="M55 41 L31 51 L49 67 Z"
        fill="none"
        stroke={blue}
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      <circle cx="55" cy="41" r="5.4" fill={blue} />
      <circle cx="31" cy="51" r="5.4" fill={blue} />
      <circle cx="49" cy="67" r="5.4" fill={blue} />

      {/* Wordmark */}
      <text
        x="90"
        y="65"
        fill="currentColor"
        className="font-display"
        fontSize="50"
        fontWeight="800"
        letterSpacing="-1.5"
      >
        SINV<tspan fill={blue}>O</tspan>NIX
      </text>
    </svg>
  );
}
