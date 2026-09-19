"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { MainLogo } from "@/components/ui/main-logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useScheduler } from "@/components/scheduler/scheduler-provider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { open: openScheduler } = useScheduler();
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 12);
    const prev = lastY.current;
    // Hide when scrolling down past the hero, reveal when scrolling up
    setHidden(y > prev && y > 320 && !open);
    lastY.current = y;
  });

  // Scrollspy: highlight the nav link for the section in view (home only)
  useEffect(() => {
    if (!onHome) return;
    const ids = nav.filter((n) => n.href.startsWith("#")).map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  // Resolve a nav href: route links pass through; section hashes go home-relative
  // when we're on a sub-page so they navigate back to the section.
  function hrefFor(href: string) {
    if (href.startsWith("/")) return href;
    return onHome ? href : `/${href}`;
  }
  function isActive(href: string) {
    if (href.startsWith("/")) return pathname === href;
    return onHome && active === href.slice(1);
  }

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? "-140%" : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-4"
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2.5 pl-5 transition-[background-color,border-color,box-shadow] duration-500 ease-out",
          scrolled
            ? "border border-line bg-surface-2 shadow-[0_16px_50px_-18px_rgba(2,25,32,0.28),0_0_0_1px_color-mix(in_oklab,var(--color-brand-500)_7%,transparent)]"
            : "border border-transparent"
        )}
      >
        {onHome ? (
          <a href="#top" aria-label="Nimbus home" className="shrink-0">
            <MainLogo className="h-9 sm:h-10" />
          </a>
        ) : (
          <Link href="/" aria-label="Nimbus home" className="shrink-0">
            <MainLogo className="h-9 sm:h-10" />
          </Link>
        )}

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const activeItem = isActive(item.href);
            const cls = cn(
              "relative rounded-full px-4 py-2 text-sm transition-colors duration-200",
              activeItem
                ? "text-content"
                : "text-muted hover:text-content hover:bg-[color-mix(in_oklab,var(--color-content)_6%,transparent)]"
            );
            const inner = (
              <>
                {activeItem && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-0 rounded-full border border-[var(--glass-border)] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-brand-500)_22%,transparent),color-mix(in_oklab,var(--color-brand-500)_7%,transparent))] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </>
            );
            const useAnchor = onHome && item.href.startsWith("#");
            return (
              <li key={item.href}>
                {useAnchor ? (
                  <a href={item.href} className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link href={hrefFor(item.href)} className={cls}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button onClick={openScheduler} size="sm" className="hidden sm:inline-flex">
            Get Started
          </Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line bg-surface/60 text-content md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-line bg-surface-2 p-2 shadow-[0_16px_50px_-18px_rgba(2,25,32,0.3)] md:hidden"
          >
            <ul className="flex flex-col">
              {nav.map((item) => {
                const cls =
                  "block rounded-2xl px-4 py-3 text-base text-muted transition-colors hover:bg-surface-2 hover:text-content";
                const useAnchor = onHome && item.href.startsWith("#");
                return (
                  <li key={item.href}>
                    {useAnchor ? (
                      <a href={item.href} onClick={() => setOpen(false)} className={cls}>
                        {item.label}
                      </a>
                    ) : (
                      <Link href={hrefFor(item.href)} onClick={() => setOpen(false)} className={cls}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
              <li className="p-2">
                <Button
                  className="w-full"
                  onClick={() => {
                    setOpen(false);
                    openScheduler();
                  }}
                >
                  Get Started
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
