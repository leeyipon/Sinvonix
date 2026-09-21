"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { BackgroundFX } from "@/components/effects/background-fx";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { Preloader } from "@/components/effects/preloader";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SchedulerProvider } from "@/components/scheduler/scheduler-provider";
import { JoinProvider } from "@/components/join/join-provider";
import { ChatProvider } from "@/components/chat/chat-provider";
import { ChatWidget } from "@/components/chat/chat-widget";

/**
 * Wraps the marketing site in its full chrome (nav, footer, preloader, Lenis
 * smooth-scroll, chat). The admin portal (/admin/*) renders its own shell and
 * opts out of all of it — no marketing nav, no smooth-scroll hijack, no chat.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      <BackgroundFX />
      <SchedulerProvider>
        <JoinProvider>
          <ChatProvider>
            <SmoothScroll>
              <Navbar />
              {/* Route-change transition — first paint is skipped (the
                  preloader already owns that moment); only navigations
                  between pages cross-fade. */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.main
                  key={pathname}
                  className="flex-1"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {children}
                </motion.main>
              </AnimatePresence>
              <Footer />
            </SmoothScroll>
            <ChatWidget />
          </ChatProvider>
        </JoinProvider>
      </SchedulerProvider>
    </>
  );
}
