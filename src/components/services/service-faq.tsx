"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/primitives";
import { getService } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ServiceFaq({ slug }: { slug: string }) {
  const service = getService(slug);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  if (!service) return null;

  return (
    <Section className="bg-bg-subtle">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="The things clients usually ask before we start. Something else on your mind? Book a call."
        />

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-line overflow-hidden rounded-3xl border border-line bg-surface">
          {service.faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-surface-2/60"
                >
                  <span className="text-base font-medium text-content">
                    {faq.q}
                  </span>
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-300",
                      isOpen && "rotate-45 text-content"
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
