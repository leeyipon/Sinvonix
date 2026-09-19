"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { MainLogo } from "@/components/ui/main-logo";
import { Container } from "@/components/ui/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { site } from "@/lib/site";

type FooterLink = { label: string; href: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Software Development", href: "/services/software-development" },
      { label: "AI Solutions", href: "/services/ai-solutions" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case Studies", href: "/work" },
      { label: "Careers", href: "/about#careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "/work" },
      { label: "Support", href: "/contact" },
      { label: "Book a Call", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const socials = [
  { slug: "x", href: site.socials.twitter, label: "X" },
  { slug: "github", href: site.socials.github, label: "GitHub" },
  { slug: "linkedin", href: site.socials.linkedin, label: "LinkedIn" },
  { slug: "dribbble", href: site.socials.dribbble, label: "Dribbble" },
];

export function Footer() {
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative border-t border-line bg-surface-2">
      <Container className="py-16 sm:py-20">
        <Stagger className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <StaggerItem className="max-w-sm">
            <MainLogo className="h-11 sm:h-12" />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              We design and build custom software, AI systems and growth
              marketing for ambitious teams.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mt-6"
            >
              <label htmlFor="newsletter" className="text-xs font-medium text-faint">
                Get product & growth insights
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="h-11 w-full rounded-full border border-line bg-surface px-4 text-sm text-content outline-none transition-colors placeholder:text-faint focus:border-brand-500"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full bg-[linear-gradient(100deg,var(--color-electric),var(--color-purple))] text-white transition-transform hover:scale-105"
                >
                  {sent ? <Check className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                </button>
              </div>
              {sent && (
                <p className="mt-2 text-xs text-emerald">Thanks — you&apos;re on the list.</p>
              )}
            </form>
          </StaggerItem>

          {/* Link columns */}
          {columns.map((col) => (
            <StaggerItem key={col.title}>
              <h3 className="text-sm font-semibold text-content">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => {
                  const cls =
                    "text-sm text-muted transition-colors hover:text-content";
                  const internal = link.href.startsWith("/");
                  return (
                    <li key={link.label}>
                      {internal ? (
                        <Link href={link.href} className={cls}>
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className={cls}>
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-line pt-8 sm:flex-row">
          <p className="text-sm text-faint">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ slug, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line bg-surface/60 transition-colors hover:border-brand-500/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/icons/${slug}.svg`}
                  alt={`${label} logo`}
                  width={18}
                  height={18}
                  loading="lazy"
                  className="h-[18px] w-[18px] opacity-60 grayscale transition-[opacity,filter] duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
