import type { Metadata } from "next";
import { ServicesIndex } from "@/components/services/services-index";
import { ServiceCTA } from "@/components/services/service-cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Software development, AI solutions, digital marketing and UI/UX design — four tightly integrated capabilities from one team. Explore what Nimbus can build for you.",
  openGraph: {
    title: "Services · Nimbus",
    description:
      "Software development, AI solutions, digital marketing and UI/UX design — four tightly integrated capabilities from one team.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesIndex />
      <ServiceCTA title="next" />
    </>
  );
}
