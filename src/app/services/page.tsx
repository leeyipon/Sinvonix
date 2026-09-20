import type { Metadata } from "next";
import { ServicesIndex } from "@/components/services/services-index";
import { ServiceCTA } from "@/components/services/service-cta";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "CORDON, AEVIX, Conversa CI Hub, Chronicle AI and Managed Security — five integrated products, one unified Sinvonix platform. Explore each below.",
  openGraph: {
    title: "Platform · Sinvonix",
    description:
      "Fraud intelligence, payment security, contact centre, automation and managed security — five products, one unified platform.",
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
