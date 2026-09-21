import { ShieldCheck, Lock, FileCheck2, Activity } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Marquee } from "@/components/effects/marquee";
import { Reveal } from "@/components/motion/reveal";
import { clients } from "@/lib/site";

const compliance = [
  { icon: ShieldCheck, label: "FATF-Aligned" },
  { icon: FileCheck2, label: "NIST Cryptographic Standards" },
  { icon: Lock, label: "Regional Data Protection" },
  { icon: Activity, label: "24/7 MDR Coverage" },
];

export function TrustedBy() {
  return (
    <section className="border-y border-line bg-bg-subtle/60 py-14 sm:py-16">
      <Container>
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-faint">
          Backed by world-class technology alliances
        </p>
      </Container>

      <div className="mt-9">
        <Marquee>
          {clients.map((name) => (
            <span
              key={name}
              className="font-display text-2xl font-semibold text-faint/70 transition-colors duration-300 hover:text-content"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Enterprise credibility — security, compliance and reliability signals */}
      <Container>
        <Reveal>
          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {compliance.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:border-brand-500/40 hover:text-content"
              >
                <Icon className="h-4 w-4 text-accent" aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
