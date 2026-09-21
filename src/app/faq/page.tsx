import type { Metadata } from "next";
import { FaqPage } from "@/components/faq/faq-page";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to the questions institutions usually ask before deploying with Sinvonix — regions, compliance, deployment model and support.",
  openGraph: {
    title: "FAQs · Sinvonix",
    description:
      "Answers to the questions institutions usually ask before deploying with Sinvonix.",
  },
};

export default function Faq() {
  return <FaqPage />;
}
