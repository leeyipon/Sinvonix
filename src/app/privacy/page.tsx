import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sinvonix collects, uses and protects the personal information you share with us.",
  openGraph: {
    title: "Privacy Policy · Sinvonix",
    description:
      "How Sinvonix collects, uses and protects the personal information you share with us.",
  },
};

const sections: LegalSection[] = [
  {
    heading: "Information we collect",
    body: [
      "When you contact us, book a call or subscribe to our newsletter, we collect the details you choose to give us — typically your name, email address, company and a description of your project.",
      "We also collect a limited amount of technical information automatically, such as your browser type, device and the pages you visit, using privacy-respecting analytics. We do not use this to build advertising profiles.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "We use the information you provide to respond to enquiries, schedule and prepare for calls, deliver the services you engage us for, and send occasional product and growth insights if you have opted in.",
      "We use aggregated, anonymised technical data to understand how the site is used and to improve it.",
    ],
  },
  {
    heading: "How we share information",
    body: [
      "We do not sell your personal information. We share it only with the service providers that help us operate — for example email, scheduling and hosting platforms — and only to the extent needed to provide those services.",
      "We may disclose information where required by law, or to protect the rights, safety and property of Sinvonix, our clients or others.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We keep personal information only for as long as needed to fulfil the purposes described here, to comply with our legal obligations, and to resolve disputes. You can ask us to delete your information at any time.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Depending on where you live, you may have the right to access, correct, export or delete the personal information we hold about you, and to object to or restrict certain processing.",
      "To exercise any of these rights, email us at hello@sinvonix.com and we will respond within a reasonable timeframe.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "We use a small number of essential cookies to make the site work, and optional analytics cookies to understand usage. You can control cookies through your browser settings.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy from time to time. When we do, we will revise the “last updated” date at the top of this page. Material changes will be highlighted where appropriate.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 2026"
      intro="Your privacy matters to us. This policy explains what information we collect, why we collect it, and the choices you have. It applies to sinvonix.com and the services we provide through it."
      sections={sections}
    />
  );
}
