import type { Metadata } from "next";
import { WorkIndex } from "@/components/work/work-index";
import { ServiceCTA } from "@/components/services/service-cta";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Selected work from Nimbus — software, AI, growth and design engagements, with the challenge each client faced and the measurable results we delivered.",
  openGraph: {
    title: "Case Studies · Nimbus",
    description:
      "Selected work from Nimbus — the challenge each client faced and the measurable results we delivered.",
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
