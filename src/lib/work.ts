export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  sector: string;
  year: string;
  duration: string;
  tagline: string; // hero headline on the detail page
  summary: string; // card blurb + meta description
  challenge: string; // short card line
  solution: string; // short card line
  result: string; // short punchy result line
  story: {
    challenge: string;
    solution: string;
    outcome: string;
  };
  approach: { title: string; desc: string }[];
  stats: { value: number; suffix: string; label: string }[];
  quote: { text: string; name: string; role: string; initials: string };
  tech: string[];
  serviceSlugs: string[]; // related /services pages
  accent: string; // tailwind gradient stops for washes
  gradient: string; // legacy stops used by the home showcase cards
};

/** Look up a case study by slug (used by the /work/[slug] route). */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

// Sinvonix's Track Record — real deployment categories from the live platform.
// No named clients or invented metrics: these are the same three tracks
// Sinvonix itself lists as proof of production deployment.
export const caseStudies: CaseStudy[] = [
  {
    slug: "managed-detection-response",
    name: "24/7 Threat Monitoring & Endpoint Security",
    category: "Managed Detection & Response",
    sector: "Enterprise Security",
    year: "Live",
    duration: "24/7 · Recurring revenue",
    tagline: "Always-on operations, not a pilot.",
    summary:
      "Continuous threat monitoring, endpoint protection and digital risk protection — deployed as live, recurring operations across multiple ASEAN markets.",
    challenge: "Regulated institutions need continuous coverage, not periodic reviews.",
    solution: "24/7 managed detection and response through Managed Security.",
    result: "Live operations, recurring revenue, across multiple ASEAN markets.",
    story: {
      challenge:
        "Banks, telcos and critical infrastructure operators across ASEAN can't afford a security posture that only gets reviewed quarterly. Threats don't keep office hours, and a pilot program that runs for a few months before a decision doesn't protect anything in the meantime.",
      solution:
        "Managed Security runs as always-on operations from day one — 24/7 detection and response, endpoint protection, and identity and access management, delivered through world-class technology partnerships with Google Cloud, Mandiant, IDEMIA, Trellix and Nutanix. A senior-led team monitors and responds directly, with no layer of account management between the client and the person handling an incident.",
      outcome:
        "The result is live, recurring operations — not a proof of concept sitting in a slide deck. Managed Security protects production infrastructure today across multiple ASEAN markets, with zero-trust access governance already deployed.",
    },
    approach: [
      {
        title: "Assess exposure",
        desc: "Endpoints, identities and existing controls mapped to find where digital risk actually sits.",
      },
      {
        title: "Deploy zero-trust access",
        desc: "Privileged access governance deployed and standing access reduced before monitoring goes live.",
      },
      {
        title: "Go live, not pilot",
        desc: "24/7 detection and response begins in production from day one.",
      },
      {
        title: "Operate continuously",
        desc: "A senior-led team monitors and responds around the clock, backed by world-class technology alliances.",
      },
    ],
    stats: [
      { value: 3, suffix: "", label: "Capabilities in one deployment" },
      { value: 24, suffix: "/7", label: "Live operations" },
      { value: 0, suffix: "", label: "Pilot phase" },
    ],
    quote: {
      text: "This runs as 24/7 live operations, not a pilot — the team monitoring your infrastructure today built the detection logic themselves.",
      name: "Delivery & Compliance",
      role: "Sinvonix",
      initials: "DC",
    },
    tech: ["24/7 SOC", "EDR", "Digital Risk Protection", "Zero-Trust IAM"],
    serviceSlugs: ["managed-security"],
    accent: "from-brand-800 to-brand-950",
    gradient: "from-indigo via-electric to-cyan",
  },
  {
    slug: "omnichannel-contact-centre",
    name: "Omnichannel Customer Operations",
    category: "Contact Centre",
    sector: "Financial Services",
    year: "Live",
    duration: "Multi-client · Cross-sector",
    tagline: "One hub, live across sectors.",
    summary:
      "A multi-client, cross-sector omnichannel contact centre platform — intelligent routing, real-time agent assist and quality management, live today.",
    challenge: "Fragmented channels and inconsistent quality across customer operations.",
    solution: "Conversa CI Hub unifies every channel into one platform.",
    result: "Multi-client platform running live across sectors.",
    story: {
      challenge:
        "Financial institutions run customer operations across voice, chat, email and social — often on disconnected tools with no shared view of quality or intent. Every channel added is another silo, and every silo is another place service quality can slip.",
      solution:
        "Conversa CI Hub unifies every channel into one platform: intelligent routing gets customers to the right agent on the first attempt, real-time agent assist surfaces the right answer mid-conversation, and quality management scores every interaction instead of relying on spot checks.",
      outcome:
        "The platform runs live today as a multi-client, cross-sector deployment — not a single-tenant pilot. Coverage extends across the financial institutions and enterprises that rely on it for day-to-day customer operations.",
    },
    approach: [
      {
        title: "Map every channel",
        desc: "How customers actually make contact today, and where the friction sits between channels.",
      },
      {
        title: "Design the routing logic",
        desc: "Intent-based routing built around the team's structure, not a generic IVR tree.",
      },
      {
        title: "Equip agents in real time",
        desc: "Agent assist grounded in the client's own knowledge base for accurate, consistent answers.",
      },
      {
        title: "Measure and coach",
        desc: "Quality management live from day one, so improvement is continuous rather than quarterly.",
      },
    ],
    stats: [
      { value: 1, suffix: "", label: "Unified omnichannel platform" },
      { value: 3, suffix: "", label: "Routing, assist & QA integrated" },
      { value: 7, suffix: "", label: "ASEAN markets supported" },
    ],
    quote: {
      text: "It's built as a multi-client platform from the ground up — the same hub runs across sectors without losing the compliance bar financial institutions need.",
      name: "Engineering & Product",
      role: "Sinvonix",
      initials: "EP",
    },
    tech: ["Omnichannel", "Intelligent Routing", "Real-Time Agent Assist", "Quality Management"],
    serviceSlugs: ["conversa-ci-hub"],
    accent: "from-brand-600 to-brand-800",
    gradient: "from-purple via-indigo to-cyan",
  },
  {
    slug: "identity-access-governance",
    name: "Privileged Access & Governance",
    category: "Identity & Access Management",
    sector: "Regulated Infrastructure",
    year: "Live",
    duration: "Zero-trust deployed · Recurring revenue",
    tagline: "Zero-trust, already deployed.",
    summary:
      "Zero-trust identity and access governance, reducing standing privileged access across regulated infrastructure — deployed, not proposed.",
    challenge: "Standing privileged access is one of the hardest risks to see and govern.",
    solution: "Zero-trust identity and access governance under Managed Security.",
    result: "Zero-trust deployed, recurring revenue, in production.",
    story: {
      challenge:
        "Privileged access accumulates quietly — service accounts, standing admin rights, credentials nobody remembers granting. For a bank, telco or government agency, that accumulated access is one of the hardest risks to see, let alone govern, and it's exactly where an incident response gets slower than it should.",
      solution:
        "Sinvonix deploys identity and access management under a zero-trust model: privileged access reduced and governed, standing rights replaced with just-in-time access, and every grant traceable. It's delivered as part of Managed Security, backed by the same world-class technology alliances that power 24/7 detection and response.",
      outcome:
        "Zero-trust access governance is already deployed, not sitting in a proposal — running as recurring revenue in production across the infrastructure it protects.",
    },
    approach: [
      {
        title: "Audit standing access",
        desc: "Every privileged account and standing right mapped before anything is changed.",
      },
      {
        title: "Move to zero-trust",
        desc: "Standing access replaced with governed, just-in-time privileged access.",
      },
      {
        title: "Deploy, not propose",
        desc: "Governance goes live in production — this isn't a recommendation report.",
      },
      {
        title: "Govern continuously",
        desc: "Access reviewed and re-certified on an ongoing basis, not a once-a-year audit.",
      },
    ],
    stats: [
      { value: 1, suffix: "", label: "Zero-trust access model" },
      { value: 0, suffix: "", label: "Standing privileged access" },
      { value: 10, suffix: "+", label: "Global technology partners" },
    ],
    quote: {
      text: "Zero-trust deployed means exactly that — deployed. It's running in production, governing real privileged access, not waiting on a roadmap.",
      name: "Enterprise Sales & Partnerships",
      role: "Sinvonix",
      initials: "ES",
    },
    tech: ["Zero-Trust", "PAM", "Identity Governance", "Just-in-Time Access"],
    serviceSlugs: ["managed-security"],
    accent: "from-brand-700 to-brand-900",
    gradient: "from-electric via-purple to-indigo",
  },
];
