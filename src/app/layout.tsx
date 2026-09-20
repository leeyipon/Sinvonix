import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Caveat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";

const display = Space_Grotesk({
  variable: "--font-display-var",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans-var",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-var",
  subsets: ["latin"],
  display: "swap",
});

const hand = Caveat({
  variable: "--font-hand-var",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const SITE = "https://nimbus.dev";
const NAME = "Nimbus — Digital Solutions, AI Systems & Growth Marketing";
const DESC =
  "We build custom web applications, AI-powered systems, and marketing strategies that accelerate business growth. Premium software, AI, and design for ambitious teams.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: NAME,
    template: "%s · Nimbus",
  },
  description: DESC,
  keywords: [
    "software development",
    "custom web applications",
    "AI solutions",
    "AI agents",
    "workflow automation",
    "digital marketing",
    "UI/UX design",
    "SaaS platforms",
  ],
  authors: [{ name: "Nimbus" }],
  openGraph: {
    type: "website",
    url: SITE,
    title: NAME,
    description: DESC,
    siteName: "Nimbus",
  },
  twitter: {
    card: "summary_large_image",
    title: NAME,
    description: DESC,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EFF5F6" },
    { media: "(prefers-color-scheme: dark)", color: "#021920" },
  ],
  width: "device-width",
  initialScale: 1,
};

/* Set theme before paint to avoid flash of wrong theme */
const themeScript = `
(function () {
  try {
    // Dark by default (Aurora's native look); only light if the user opted in.
    if (localStorage.getItem('theme') !== 'light') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} ${hand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-content">
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
