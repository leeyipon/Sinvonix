import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStats } from "@/components/about/stats";
import { RegionalPresence } from "@/components/about/regional-presence";
import { Culture } from "@/components/about/culture";
import { EmployeeTestimonials } from "@/components/about/employee-testimonials";
import { Careers } from "@/components/about/careers";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Sinvonix is built by a team with over 50 years of combined experience selling, deploying and supporting enterprise technology across ASEAN's toughest regulated markets.",
  openGraph: {
    title: "About Us · Sinvonix",
    description:
      "Built by operators who understand ASEAN's regulatory landscape — not vendors retrofitting global tools to local markets.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <RegionalPresence />
      <Culture />
      <EmployeeTestimonials />
      <Careers />
    </>
  );
}
