import { cn } from "@/lib/utils";

/** Wordmark + geometric mark for Sinvonix. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-display", className)}>
      <span className="relative grid h-8 w-8 place-items-center">
        <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
          <defs>
            <linearGradient id="nimbus-mark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--color-electric)" />
              <stop offset="0.55" stopColor="var(--color-indigo)" />
              <stop offset="1" stopColor="var(--color-purple)" />
            </linearGradient>
          </defs>
          <rect x="1" y="1" width="30" height="30" rx="9" fill="url(#nimbus-mark)" />
          <path
            d="M9 22V10l7 8 7-8v12"
            fill="none"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight text-content">
        Sinvonix
      </span>
    </span>
  );
}
