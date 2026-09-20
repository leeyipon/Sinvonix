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

const SITE = "https://sinvonix.com";
const NAME = "Sinvonix — Securing the Future of Digital Transformation";
const DESC =
  "Five integrated products, one unified platform — fraud intelligence, payment security, contact centre, automation and managed security, built for ASEAN's regulated financial and critical infrastructure sectors.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: NAME,
    template: "%s · Sinvonix",
  },
  description: DESC,
  keywords: [
    "fraud detection",
    "AML compliance",
    "payment security",
    "post-quantum cryptography",
    "contact centre software",
    "managed detection and response",
    "identity and access management",
    "ASEAN fintech security",
  ],
  authors: [{ name: "Sinvonix" }],
  openGraph: {
    type: "website",
    url: SITE,
    title: NAME,
    description: DESC,
    siteName: "Sinvonix",
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
