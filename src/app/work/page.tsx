import type { Metadata } from "next";
import { WorkIndex } from "@/components/work/work-index";
import { ServiceCTA } from "@/components/services/service-cta";

export const metadata: Metadata = {
  title: "Track Record",
  description:
    "Sinvonix's track record — three deployment tracks running as recurring, live operations across multiple ASEAN markets, not pilots.",
  openGraph: {
    title: "Track Record · Sinvonix",
    description:
      "Live in production, not in pilot — Sinvonix's managed detection & response, contact centre and identity governance deployments.",
  },
};

export default function WorkPage() {
  return (
    <>
      <WorkIndex />
      <ServiceCTA title="next" />
    </>
  );
}
