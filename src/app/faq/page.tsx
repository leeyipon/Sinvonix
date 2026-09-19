import type { Metadata } from "next";
import { FaqPage } from "@/components/faq/faq-page";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to the questions teams usually ask before starting a project with Nimbus — process, pricing, timelines and support.",
  openGraph: {
    title: "FAQs · Nimbus",
    description:
      "Answers to the questions teams usually ask before starting a project with Nimbus.",
  },
};

export default function Faq() {
  return <FaqPage />;
}
