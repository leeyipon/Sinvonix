"use client";

import { usePathname } from "next/navigation";
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
              <main className="flex-1">{children}</main>
              <Footer />
            </SmoothScroll>
            <ChatWidget />
          </ChatProvider>
        </JoinProvider>
      </SchedulerProvider>
    </>
  );
}
