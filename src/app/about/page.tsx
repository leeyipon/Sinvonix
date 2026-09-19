import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { TeamGrid } from "@/components/about/team-grid";
import { AboutStats } from "@/components/about/stats";
import { Culture } from "@/components/about/culture";
import { TeamGallery } from "@/components/about/team-gallery";
import { EmployeeTestimonials } from "@/components/about/employee-testimonials";
import { Careers } from "@/components/about/careers";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the people building tomorrow's technology. Nimbus is a diverse team of engineers, designers, QA specialists, marketers, and project leaders creating scalable digital products.",
  openGraph: {
    title: "About Us · Nimbus",
    description:
      "Meet the diverse team of engineers, designers and strategists building scalable digital products at Nimbus.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <TeamGrid />
      <AboutStats />
      <Culture />
      <TeamGallery />
      <EmployeeTestimonials />
      <Careers />
    </>
  );
}
