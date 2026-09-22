"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * App-wide smooth scrolling via Lenis, synced with GSAP ScrollTrigger and
 * (through the native scroll it drives) Motion's useScroll. Disabled for
 * users who prefer reduced motion — native scroll is used instead.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis' virtual scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker for a single, jank-free RAF loop
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links → smooth scroll through Lenis
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    // Backgrounded tabs get their rAF loop throttled or paused entirely; the
    // first frame after the tab is visible again can carry a huge elapsed-
    // time delta. Re-measuring here keeps Lenis' scroll limits honest
    // instead of letting a stale/oversized delta leave anything stuck.
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        lenis.resize();
        ScrollTrigger.refresh();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Client-side route changes swap the page content without a full reload,
  // but Lenis caches its scroll limit from whatever height the DOM had when
  // it last measured — so navigating to a taller page left it stuck at the
  // previous (shorter) page's max scroll. Re-measure after the new page has
  // actually painted (double rAF: one for the DOM swap, one for layout).
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        lenisRef.current?.resize();
        ScrollTrigger.refresh();
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  return <>{children}</>;
}
