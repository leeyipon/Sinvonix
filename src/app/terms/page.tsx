import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Sinvonix website and the services we provide.",
  openGraph: {
    title: "Terms of Service · Sinvonix",
    description:
      "The terms that govern your use of the Sinvonix website and the services we provide.",
  },
};

const sections: LegalSection[] = [
  {
    heading: "Acceptance of these terms",
    body: [
      "By accessing or using the Sinvonix website, you agree to these terms. If you do not agree, please do not use the site. These terms cover use of the site itself; the specific services we deliver to clients are governed by a separate signed agreement.",
    ],
  },
  {
    heading: "Use of the site",
    body: [
      "You may use this site for lawful purposes only. You agree not to attempt to disrupt or compromise the site, access it through automated means that place unreasonable load on our systems, or use it to infringe the rights of others.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The content on this site — including text, design, graphics, illustrations and code — is owned by Sinvonix or its licensors and is protected by intellectual property laws. You may not reproduce, distribute or create derivative works from it without our written permission.",
      "Trademarks, logos and brand names shown on the site are the property of their respective owners.",
    ],
  },
  {
    heading: "Services and engagements",
    body: [
      "Descriptions of our services on this site are for general information and do not constitute an offer or a binding commitment. Any engagement begins only once both parties sign a written statement of work setting out scope, timeline, fees and deliverables.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      "The site is provided on an “as is” and “as available” basis. While we work to keep it accurate and available, we make no warranties that it will be uninterrupted, error-free, or that the information on it is complete or current.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, Sinvonix will not be liable for any indirect, incidental or consequential damages arising from your use of, or inability to use, this site.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws applicable in the jurisdiction in which Sinvonix is established, without regard to conflict-of-law principles.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms from time to time. Continued use of the site after changes take effect constitutes acceptance of the revised terms. The “last updated” date at the top of this page reflects the most recent revision.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 2026"
      intro="These terms govern your use of the Sinvonix website. Please read them carefully — they set out the rules for using the site and the basis on which we make its content available."
      sections={sections}
    />
  );
}
