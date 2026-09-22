import {
  Code2,
  Brain,
  Rocket,
  Search,
  Layout,
  Cog,
  Activity,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Headset,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "Sinvonix",
  url: "https://sinvonix.com",
  tagline: "Securing the Future of Digital Transformation",
  description:
    "Five integrated products, one unified platform — fraud intelligence, payment security, contact centre, automation and managed security, built for ASEAN's regulated financial and critical infrastructure sectors.",
  email: "hello@sinvonix.com",
  socials: {
    linkedin: "https://www.linkedin.com/company/sinvonix",
  },
};

// "Home" resolves to the hero anchor: on the home page it scrolls back to the
// top (and lights up via scrollspy); on any sub-page it becomes /#top, so it
// doubles as the way back home.
export const nav = [
  { label: "Home", href: "#top" },
  { label: "Platform", href: "/services" },
  { label: "Products", href: "/work" },
  { label: "About Us", href: "/about" },
  { label: "Contacts", href: "/contact" },
];

export type Service = {
  icon: LucideIcon;
  slug: string;
  title: string;
  blurb: string;
  tagline: string; // hero subhead on the detail page
  overview: string; // intro paragraph on the detail page
  points: string[];
  accent: string; // tailwind gradient stops
  deliverables: { title: string; desc: string }[];
  approach: { title: string; desc: string }[];
  techSlugs: string[]; // subset of techStack slugs relevant to this service
  outcome: {
    stats: { value: number; suffix: string; label: string }[];
    result: string;
  };
  faqs: { q: string; a: string }[];
};

/** Look up a service by slug (used by the /services/[slug] route). */
export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const services: Service[] = [
  {
    icon: ShieldAlert,
    slug: "cordon",
    title: "CORDON",
    blurb:
      "Real-time fraud and AML intelligence — transaction screening across APP, ATO, BEC, AML, mule and KYC risk typologies.",
    tagline: "Fraud intelligence built for ASEAN's regulators.",
    overview:
      "CORDON screens transactions in real time across the risk typologies that matter most to regulated financial institutions — authorised push payment fraud, account takeover, business email compromise, money laundering, mule networks and KYC gaps. Rulesets are FATF-aligned and backed by a live global PEP database, so detection logic stays current with the regulatory landscape it was built for.",
    points: [
      "Real-Time Transaction Screening",
      "APP & ATO Detection",
      "BEC Protection",
      "AML Monitoring",
      "Mule Network Detection",
      "KYC Risk Typologies",
    ],
    accent: "from-brand-400 to-brand-600",
    deliverables: [
      {
        title: "Real-Time Screening",
        desc: "Every transaction screened as it happens, not in a nightly batch — so risk is caught before it settles.",
      },
      {
        title: "FATF-Aligned Rulesets",
        desc: "Detection logic built to FATF recommendations from day one, kept current as guidance evolves.",
      },
      {
        title: "Live Global PEP Database",
        desc: "Politically exposed person screening against a continuously updated global list.",
      },
      {
        title: "APP & ATO Coverage",
        desc: "Purpose-built typologies for authorised push payment fraud and account takeover — ASEAN's fastest-growing fraud vectors.",
      },
      {
        title: "AML & Mule Detection",
        desc: "Pattern detection tuned to the mule-network structures regulators are actively chasing across the region.",
      },
      {
        title: "KYC Risk Signals",
        desc: "Know-your-customer gaps surfaced as risk signals, not buried in a separate onboarding system.",
      },
    ],
    approach: [
      {
        title: "Map your risk typologies",
        desc: "We start with the fraud and AML patterns specific to your institution and market — not a generic template.",
      },
      {
        title: "Configure to your regulator",
        desc: "Rulesets are aligned to FATF recommendations and tuned to the specific requirements of your jurisdiction.",
      },
      {
        title: "Deploy standalone or unified",
        desc: "CORDON runs on its own or plugs directly into the wider Sinvonix platform — your call.",
      },
      {
        title: "Tune with a senior team",
        desc: "The people who built CORDON stay involved post-launch, refining detection as your risk landscape shifts.",
      },
    ],
    techSlugs: [],
    outcome: {
      stats: [
        { value: 6, suffix: "", label: "Risk typologies covered" },
        { value: 7, suffix: "", label: "ASEAN markets" },
        { value: 10, suffix: "+", label: "Global technology partners" },
      ],
      result:
        "CORDON runs on FATF-aligned rulesets with a live global PEP database — built for institutions that need fraud intelligence in production, not in pilot.",
    },
    faqs: [
      {
        q: "Does CORDON replace our existing fraud rules, or work alongside them?",
        a: "Either. CORDON runs standalone with its own rulesets, or alongside your existing controls as an additional screening layer — the deployment model is yours to choose.",
      },
      {
        q: "How current is the PEP database?",
        a: "It's a live global feed, not a periodic import, so politically exposed person screening reflects the current list at the moment a transaction is screened.",
      },
      {
        q: "Is CORDON built for a specific jurisdiction?",
        a: "Rulesets are FATF-aligned as a baseline and then configured to the specific regulatory requirements of your market — we operate across seven ASEAN jurisdictions today.",
      },
      {
        q: "Who configures the detection rules?",
        a: "A senior Sinvonix engineer works directly with your compliance team — there's no layer of account managers between you and the person tuning the model.",
      },
    ],
  },
  {
    icon: Lock,
    slug: "aevix",
    title: "AEVIX",
    blurb:
      "Post-quantum cryptography advisory and payment infrastructure hardening — securing today's rails against tomorrow's threats.",
    tagline: "Payment security, quantum-ready.",
    overview:
      "AEVIX prepares payment infrastructure for the post-quantum era — advisory on cryptographic migration, vulnerability scanning across payment systems, and POS terminal hardening. As quantum computing threatens current encryption standards, AEVIX gets acquirers, processors and card networks ahead of the migration instead of reacting to it.",
    points: [
      "Post-Quantum Cryptography Advisory",
      "PQC Migration Readiness",
      "Vulnerability Scanning",
      "POS Terminal Security",
      "Payment Infrastructure Hardening",
      "TLS Upgrade Planning",
    ],
    accent: "from-brand-500 to-brand-700",
    deliverables: [
      {
        title: "PQC Readiness Assessment",
        desc: "A full audit of where your cryptography stands against post-quantum migration timelines.",
      },
      {
        title: "Migration Advisory",
        desc: "A practical roadmap for moving payment systems to quantum-resistant cryptography without disrupting live rails.",
      },
      {
        title: "Vulnerability Scanning",
        desc: "Continuous scanning across payment infrastructure to surface exposure before it's exploited.",
      },
      {
        title: "POS Terminal Hardening",
        desc: "Security review and hardening for point-of-sale terminals — a favorite target for payment fraud.",
      },
      {
        title: "TLS Upgrade Planning",
        desc: "A staged plan to move payment traffic onto current and future-proof TLS standards.",
      },
      {
        title: "Infrastructure Hardening",
        desc: "End-to-end review of payment infrastructure against NIST cryptographic standards.",
      },
    ],
    approach: [
      {
        title: "Assess current cryptography",
        desc: "We map every place your payment infrastructure relies on cryptography that quantum computing will eventually break.",
      },
      {
        title: "Prioritize by exposure",
        desc: "Migration is sequenced by risk — the systems most exposed to quantum and conventional attack move first.",
      },
      {
        title: "Harden without downtime",
        desc: "POS terminals and payment rails get hardened in place, aligned to NIST standards, with zero disruption to live transactions.",
      },
      {
        title: "Advise, don't just audit",
        desc: "AEVIX stays engaged through the migration — advisory, not a one-off report that sits on a shelf.",
      },
    ],
    techSlugs: [],
    outcome: {
      stats: [
        { value: 10, suffix: "+", label: "Global technology partners" },
        { value: 7, suffix: "", label: "ASEAN markets" },
        { value: 0, suffix: "", label: "Layers to a senior engineer" },
      ],
      result:
        "AEVIX gets payment networks and acquirers ahead of the post-quantum migration — hardened infrastructure and PQC advisory built by people who understand ASEAN's payment landscape.",
    },
    faqs: [
      {
        q: "Why does post-quantum cryptography matter now?",
        a: "Quantum computing will eventually break current encryption standards. Payment systems with long data-retention requirements are exposed today to data harvested now and decrypted later — migration planning needs to start before the threat is live, not after.",
      },
      {
        q: "Will PQC migration disrupt our payment rails?",
        a: "No — migration is sequenced by exposure and staged so live payment traffic is never disrupted. Hardening happens alongside normal operations.",
      },
      {
        q: "Do you assess POS terminals we already have deployed?",
        a: "Yes. AEVIX reviews and hardens existing POS terminal fleets, not just new deployments.",
      },
      {
        q: "Is AEVIX aligned to a specific cryptographic standard?",
        a: "Yes — AEVIX's advisory and hardening work is aligned to NIST post-quantum cryptographic standards.",
      },
    ],
  },
  {
    icon: Headset,
    slug: "conversa-ci-hub",
    title: "Conversa CI Hub",
    blurb:
      "Omnichannel contact centre with intelligent routing, real-time agent assist and quality management — built for financial institutions.",
    tagline: "One hub for every customer conversation.",
    overview:
      "Conversa CI Hub unifies every customer channel — voice, chat, email and social — into a single contact centre platform. Intelligent routing gets customers to the right agent faster, real-time agent assist surfaces the right answer mid-call, and quality management keeps every interaction measurable, built specifically for the demands of regulated financial institutions.",
    points: [
      "Omnichannel Routing",
      "Intelligent Call Routing",
      "Real-Time Agent Assist",
      "Quality Management",
      "Financial Services Ready",
      "Cross-Sector Deployment",
    ],
    accent: "from-brand-600 to-brand-800",
    deliverables: [
      {
        title: "Omnichannel Routing",
        desc: "Voice, chat, email and social unified into one queue, so no channel is a silo.",
      },
      {
        title: "Intelligent Routing",
        desc: "Customers reach the right agent on the first attempt, based on intent and history, not a static phone tree.",
      },
      {
        title: "Real-Time Agent Assist",
        desc: "Agents get the right answer surfaced mid-conversation, grounded in your own knowledge base.",
      },
      {
        title: "Quality Management",
        desc: "Every interaction scored and reviewable, so coaching is based on evidence, not spot checks.",
      },
      {
        title: "Multi-Client Platform",
        desc: "Built to run across sectors and business units from a single platform instance.",
      },
      {
        title: "Financial-Grade Reliability",
        desc: "Engineered for the uptime and compliance expectations of regulated institutions.",
      },
    ],
    approach: [
      {
        title: "Map every channel",
        desc: "We start with how your customers actually contact you — voice, chat, email, social — and where the friction is today.",
      },
      {
        title: "Design the routing logic",
        desc: "Intent-based routing rules built around your team's structure, not a generic IVR tree.",
      },
      {
        title: "Equip agents in real time",
        desc: "Agent assist is grounded in your own knowledge base, so answers are accurate and consistent.",
      },
      {
        title: "Measure and coach",
        desc: "Quality management goes live from day one, so improvement is continuous, not a quarterly audit.",
      },
    ],
    techSlugs: [],
    outcome: {
      stats: [
        { value: 1, suffix: "", label: "Unified omnichannel platform" },
        { value: 7, suffix: "", label: "ASEAN markets" },
        { value: 10, suffix: "+", label: "Global technology partners" },
      ],
      result:
        "Conversa CI Hub runs as a multi-client, cross-sector platform today — live omnichannel operations, not a pilot deployment.",
    },
    faqs: [
      {
        q: "Can Conversa CI Hub integrate with our existing telephony?",
        a: "Yes — Conversa CI Hub is designed to sit across your existing channels and integrate with the telephony and CRM systems you already run.",
      },
      {
        q: "Is agent assist grounded in our own knowledge base?",
        a: "Yes. Real-time agent assist pulls from your own product, policy and compliance documentation — not generic answers.",
      },
      {
        q: "Does it handle multiple business units or clients?",
        a: "Yes — Conversa CI Hub is built as a multi-client platform and already runs across sectors from a single deployment.",
      },
      {
        q: "How is quality measured?",
        a: "Every interaction is scored against configurable quality criteria, giving supervisors evidence-based coaching data instead of spot-check reviews.",
      },
    ],
  },
  {
    icon: Workflow,
    slug: "chronicle-ai",
    title: "Chronicle AI",
    blurb:
      "AI orchestration for conversational intelligence, automated compliance workflows and predictive analytics.",
    tagline: "The AI layer underneath every product.",
    overview:
      "Chronicle AI is the orchestration layer that runs across the Sinvonix platform — conversational intelligence for customer and case interactions, automated workflows for compliance tasks that used to be manual, and predictive analytics that turn operational data into decisions. It can run standalone or power the AI inside CORDON, AEVIX, Conversa CI Hub and Managed Security.",
    points: [
      "AI Orchestration",
      "Conversational Intelligence",
      "Automated Compliance Workflows",
      "Predictive Analytics",
      "Cross-Product Intelligence",
      "Model Governance",
    ],
    accent: "from-brand-700 to-brand-900",
    deliverables: [
      {
        title: "AI Orchestration Layer",
        desc: "A single orchestration layer that coordinates AI across every Sinvonix product, instead of five disconnected models.",
      },
      {
        title: "Conversational Intelligence",
        desc: "Understanding and routing customer and case conversations with context, not keyword matching.",
      },
      {
        title: "Automated Compliance Workflows",
        desc: "Manual compliance checklists turned into automated workflows with a full audit trail.",
      },
      {
        title: "Predictive Analytics",
        desc: "Operational data turned into forward-looking risk and performance signals, not just historical dashboards.",
      },
      {
        title: "Cross-Product Intelligence",
        desc: "The same AI layer that powers Chronicle AI also strengthens detection in CORDON and routing in Conversa CI Hub.",
      },
      {
        title: "Model Governance",
        desc: "Every model decision is traceable — built for institutions that have to explain automated decisions to a regulator.",
      },
    ],
    approach: [
      {
        title: "Identify the manual work",
        desc: "We find the compliance and operational workflows still run by hand, and the cost each one carries.",
      },
      {
        title: "Ground the models",
        desc: "Automation is grounded in your own data and workflows — not a generic model bolted onto your systems.",
      },
      {
        title: "Automate with an audit trail",
        desc: "Every automated decision is logged and explainable, built for institutions that answer to a regulator.",
      },
      {
        title: "Extend across the platform",
        desc: "Chronicle AI can stay standalone, or extend its orchestration layer into CORDON, AEVIX, Conversa CI Hub and Managed Security.",
      },
    ],
    techSlugs: [],
    outcome: {
      stats: [
        { value: 5, suffix: "", label: "Products it can power" },
        { value: 7, suffix: "", label: "ASEAN markets" },
        { value: 10, suffix: "+", label: "Global technology partners" },
      ],
      result:
        "Chronicle AI runs as the orchestration layer across the Sinvonix platform — automated compliance workflows and predictive analytics built for regulated institutions, not generic AI demos.",
    },
    faqs: [
      {
        q: "Does Chronicle AI only work with other Sinvonix products?",
        a: "No — it runs standalone. It's also the orchestration layer that can extend into CORDON, AEVIX, Conversa CI Hub and Managed Security if you run more than one product.",
      },
      {
        q: "Can automated decisions be explained to a regulator?",
        a: "Yes — model governance and an audit trail are built in, so every automated decision is traceable, not a black box.",
      },
      {
        q: "Is our data used to train shared models?",
        a: "No. Automation is grounded in your own data and workflows; it isn't pooled into a shared model across clients.",
      },
      {
        q: "What kind of compliance workflows can it automate?",
        a: "Workflows that are currently manual checklist work — KYC documentation checks, case escalation routing, regulatory reporting prep — become automated, auditable processes.",
      },
    ],
  },
  {
    icon: ShieldCheck,
    slug: "managed-security",
    title: "Managed Security",
    blurb:
      "24/7 managed detection and response, endpoint protection and identity access management.",
    tagline: "24/7 protection, senior-led.",
    overview:
      "Managed Security is Sinvonix's always-on layer — 24/7 managed detection and response, endpoint protection, and identity and access management, delivered through world-class technology partnerships including Google Cloud, Mandiant, IDEMIA, Trellix and Nutanix. It's live in production across our markets today, not a pilot program.",
    points: [
      "24/7 Managed Detection & Response",
      "Endpoint Protection",
      "Identity & Access Management",
      "Digital Risk Protection",
      "Zero-Trust Architecture",
      "World-Class Alliances",
    ],
    accent: "from-brand-800 to-brand-950",
    deliverables: [
      {
        title: "24/7 Managed Detection & Response",
        desc: "Live threat monitoring and response around the clock — recurring operations, not scheduled reviews.",
      },
      {
        title: "Endpoint Protection",
        desc: "Endpoints monitored and protected through our partnership with world-class security technology vendors.",
      },
      {
        title: "Identity & Access Management",
        desc: "Zero-trust access governance, deployed and managed on your behalf.",
      },
      {
        title: "Digital Risk Protection",
        desc: "Monitoring for exposure beyond your perimeter — brand, credentials and data appearing where they shouldn't.",
      },
      {
        title: "Privileged Access Governance",
        desc: "Standing privileged access reduced and governed under a zero-trust model.",
      },
      {
        title: "World-Class Alliances",
        desc: "Delivered through strategic partnerships with Google Cloud, Mandiant, IDEMIA, Trellix and Nutanix.",
      },
    ],
    approach: [
      {
        title: "Assess your exposure",
        desc: "We map endpoints, identities and existing controls to find where digital risk actually sits.",
      },
      {
        title: "Deploy zero-trust access",
        desc: "Privileged access governance is deployed and standing access reduced before monitoring goes live.",
      },
      {
        title: "Go live, not pilot",
        desc: "24/7 detection and response begins in production from day one — Managed Security doesn't run as a trial.",
      },
      {
        title: "Operate as an extension of your team",
        desc: "A senior-led team monitors and responds around the clock, backed by world-class technology partnerships.",
      },
    ],
    techSlugs: [],
    outcome: {
      stats: [
        { value: 24, suffix: "/7", label: "Live monitoring & response" },
        { value: 5, suffix: "+", label: "Technology alliance partners" },
        { value: 7, suffix: "", label: "ASEAN markets" },
      ],
      result:
        "Managed Security runs 24/7 in production across multiple ASEAN markets — zero-trust access deployed, recurring detection and response live today.",
    },
    faqs: [
      {
        q: "Is Managed Security a pilot or a live service?",
        a: "Live. It runs as 24/7 operations in production across our markets — there's no pilot phase.",
      },
      {
        q: "Which technology partners power Managed Security?",
        a: "Delivered through strategic alliances including Google Cloud, Mandiant, IDEMIA, Trellix and Nutanix.",
      },
      {
        q: "Does this replace our existing IAM setup, or govern it?",
        a: "Managed Security deploys a zero-trust access model and governs privileged access — it can replace a legacy IAM setup or sit alongside one during migration.",
      },
      {
        q: "Who responds when a threat is detected?",
        a: "A senior Sinvonix security team, directly — engagements are senior-led, so you're never routed through layers of account management during an incident.",
      },
    ],
  },
];

export const stats = [
  { value: 50, suffix: "+", label: "Years Combined Experience" },
  { value: 7, suffix: "", label: "ASEAN Markets Served" },
  { value: 5, suffix: "", label: "Integrated Products" },
  { value: 10, suffix: "+", label: "Global Tech Partners" },
];

export type Step = { icon: LucideIcon; title: string; desc: string };

export const process: Step[] = [
  { icon: Search, title: "Discovery & Risk Assessment", desc: "We map your regulatory environment, existing stack and risk exposure before recommending a single product." },
  { icon: Layout, title: "Solution Design", desc: "A senior architect — not an account manager — designs the deployment: standalone product or unified platform." },
  { icon: ShieldCheck, title: "Compliance Alignment", desc: "Every configuration is checked against FATF, NIST and your local regulator's requirements before go-live." },
  { icon: Code2, title: "Integration & Deployment", desc: "Connected into your existing core banking, telco or infrastructure systems with zero-downtime cutover." },
  { icon: Activity, title: "Live Monitoring", desc: "24/7 monitoring begins from day one — MDR, fraud screening and contact centre operations run live, not in pilot." },
  { icon: Cog, title: "Continuous Optimization", desc: "Senior engineers tune detection models, routing rules and compliance mappings as your risk landscape evolves." },
];

// Trusted-by wordmarks (kept as styled text — real technology alliance partners)
export const clients = [
  "Google Cloud",
  "Mandiant",
  "IDEMIA",
  "Trellix",
  "Nutanix",
  "AhnLab",
  "NETAND",
  "FORCS",
];

// Simple Icons slugs for the tech stack (rendered via CDN svg)
export const techStack = [
  { name: "React", slug: "react", color: "#61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "#ffffff" },
  { name: "TypeScript", slug: "typescript", color: "#3178C6" },
  { name: "Node.js", slug: "nodedotjs", color: "#5FA04E" },
  { name: "Laravel", slug: "laravel", color: "#FF2D20" },
  { name: "Python", slug: "python", color: "#3776AB" },
  { name: "Amazon AWS", slug: "amazonaws", color: "#FF9900" },
  { name: "Docker", slug: "docker", color: "#2496ED" },
  { name: "PostgreSQL", slug: "postgresql", color: "#4169E1" },
  { name: "MongoDB", slug: "mongodb", color: "#47A248" },
  { name: "OpenAI", slug: "openai", color: "#412991" },
  { name: "Firebase", slug: "firebase", color: "#DD2C00" },
];

/** Company-level FAQs shown on the home page (products have their own set). */
export const faqs: { q: string; a: string }[] = [
  {
    q: "Can we deploy a single product, or does it have to be the full platform?",
    a: "Every Sinvonix product — CORDON, AEVIX, Conversa CI Hub, Chronicle AI and Managed Security — runs standalone or as part of the unified platform. Most clients start with one product and expand as the relationship proves out.",
  },
  {
    q: "Which markets do you operate in?",
    a: "We're headquartered in Singapore with active deployments in Brunei, Cambodia and Laos, partner networks in the Philippines and Malaysia, and a subsidiary in Australia.",
  },
  {
    q: "How do you handle regional compliance?",
    a: "Our platforms are built compliance-first — aligned to FATF recommendations, regional data protection laws, and NIST cryptographic standards — not retrofitted after the fact.",
  },
  {
    q: "Who do we actually work with day to day?",
    a: "Directly with the people who built the platform. Sinvonix engagements are senior-led — no layers of account managers between you and the team that can solve your problem.",
  },
  {
    q: "What industries do you serve?",
    a: "Primarily banking and finance, telecommunications, payment networks, and government and critical information infrastructure across ASEAN.",
  },
  {
    q: "How quickly can we expect a response?",
    a: "Tell us what you need — our team typically responds within one business day.",
  },
];

export const heroHighlights: { icon: LucideIcon; label: string }[] = [
  { icon: Rocket, label: "Live in weeks" },
  { icon: ShieldCheck, label: "Bank-grade security" },
  { icon: Brain, label: "AI-native detection" },
];
