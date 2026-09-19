import { cn } from "@/lib/utils";

/**
 * Animated gradient-mesh background: soft aurora blobs behind content.
 * Pure CSS animation (GPU transform/opacity) → cheap + reduced-motion safe.
 */
export function GradientMesh({
  className,
  intensity = "medium",
}: {
  className?: string;
  intensity?: "soft" | "medium" | "strong";
}) {
  const opacity =
    intensity === "strong" ? "opacity-70" : intensity === "soft" ? "opacity-30" : "opacity-50";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        opacity,
        className
      )}
    >
      <div className="absolute -left-[10%] -top-[15%] h-[45rem] w-[45rem] rounded-full bg-electric/[0.14] blur-[130px] animate-aurora" />
      <div className="absolute right-[-8%] top-[5%] h-[38rem] w-[38rem] rounded-full bg-purple/[0.14] blur-[130px] animate-aurora [animation-delay:-6s]" />
      <div className="absolute bottom-[-20%] left-[25%] h-[40rem] w-[40rem] rounded-full bg-cyan/[0.10] blur-[140px] animate-aurora [animation-delay:-12s]" />
    </div>
  );
}
