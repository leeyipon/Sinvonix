import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project and we'll reply within one business day, or book a free consultation. Get in touch with Nimbus about software, AI, marketing and design.",
  openGraph: {
    title: "Contact · Nimbus",
    description:
      "Start a project or book a free consultation with the Nimbus team — software, AI, marketing and design.",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
    </>
  );
}
