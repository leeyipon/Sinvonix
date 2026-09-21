import {
  Sparkles,
  Users,
  Handshake,
  Target,
  Globe,
  Scale,
  type LucideIcon,
} from "lucide-react";

export const companyStats: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}[] = [
  { value: 50, suffix: "+", label: "Years Combined Experience" },
  { value: 7, suffix: "", label: "ASEAN Markets" },
  { value: 5, suffix: "", label: "Integrated Products" },
  { value: 10, suffix: "+", label: "Global Tech Partners" },
  { value: 4, suffix: "", label: "Industries Served" },
  { value: 6, suffix: "", label: "Core Platform Pillars" },
];

// "Why Sinvonix" — the six pillars Sinvonix itself leads with.
export const culture: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Globe, title: "ASEAN-Native Expertise", desc: "Over 50 years of combined experience operating across ASEAN's regulated markets — the regulatory landscape, procurement cycles and compliance requirements global vendors overlook." },
  { icon: Target, title: "Proven Revenue Base", desc: "Active recurring contracts across multiple ASEAN markets. Our platforms protect live banking networks and enterprise infrastructure in production today, not in pilot." },
  { icon: Sparkles, title: "Five Integrated Products", desc: "Fraud intelligence, quantum-readiness, contact centres, AI automation and managed security in a unified platform — cross-sell and expand within every client relationship." },
  { icon: Users, title: "World-Class Alliances", desc: "Strategic partnerships with Google Cloud, Mandiant, IDEMIA, Trellix, Nutanix and more — global technology brought to local markets with implementation expertise that scales." },
  { icon: Scale, title: "Compliance-First Design", desc: "Our platforms align with FATF recommendations, regional data protection laws and NIST cryptographic standards — built from day one for regulators, not retrofitted." },
  { icon: Handshake, title: "Senior-Led Engagements", desc: "When you work with Sinvonix, you work directly with the people who built the platform. No layers of account managers between you and the team that can actually solve your problem." },
];

// Attributed to Sinvonix's functional teams rather than named individuals —
// the real site describes the org by function, not headshots and bylines.
export const employeeTestimonials = [
  {
    quote:
      "Clients don't get routed through account management layers here — you talk to the person who can actually solve the problem.",
    name: "Enterprise Sales & Partnerships",
    role: "Sinvonix",
    initials: "ES",
  },
  {
    quote:
      "We build for ASEAN's regulatory landscape first, not retrofit a global product after the fact.",
    name: "Engineering & Product",
    role: "Sinvonix",
    initials: "EP",
  },
  {
    quote:
      "Every deployment is checked against FATF and NIST before it goes live — compliance isn't a phase two.",
    name: "Delivery & Compliance",
    role: "Sinvonix",
    initials: "DC",
  },
];

export const openings = [
  "Senior Security Engineer — Singapore / Remote",
  "Enterprise Account Executive — Singapore",
  "AI/ML Engineer — Singapore / Remote",
  "Solutions Architect — Singapore / Australia",
];

export const benefits = [
  "Competitive Salary",
  "Hybrid & Remote Work",
  "Annual Performance Bonus",
  "Health Insurance",
  "Learning Budget",
  "Modern Equipment",
  "Team Retreats",
  "Flexible Working Hours",
];
