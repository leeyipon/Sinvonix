import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you need. Our team typically responds within one business day — get in touch with Sinvonix about fraud intelligence, payment security, contact centre, automation or managed security.",
  openGraph: {
    title: "Contact · Sinvonix",
    description:
      "Tell us what you need, or schedule a briefing with the Sinvonix team.",
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
