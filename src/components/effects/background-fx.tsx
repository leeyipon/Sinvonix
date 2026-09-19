/**
 * Fixed, full-viewport ambient background. Kept deliberately clean and flat
 * (Odoo-style): a mostly-white canvas with only the faintest static pastel
 * wash in the corners — no particles, no grain. Sits behind all content (-z).
 */
export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute -left-[12%] -top-[12%] h-[38rem] w-[38rem] rounded-full bg-electric/[0.07] blur-[150px]" />
      <div className="absolute right-[-10%] top-[14%] h-[32rem] w-[32rem] rounded-full bg-purple/[0.06] blur-[150px]" />
      <div className="absolute bottom-[-18%] left-[38%] h-[34rem] w-[34rem] rounded-full bg-cyan/[0.05] blur-[160px]" />
    </div>
  );
}
