import {
  Code2,
  Brain,
  Megaphone,
  PenTool,
  Rocket,
  Search,
  Layout,
  Cog,
  TestTube2,
  CloudUpload,
  LineChart,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "Nimbus",
  url: "https://nimbus.dev",
  tagline: "Building Digital Solutions That Grow Businesses.",
  description:
    "We build custom web applications, AI-powered systems, and marketing strategies that accelerate business growth.",
  email: "hello@nimbus.dev",
  socials: {
    twitter: "https://twitter.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    dribbble: "https://dribbble.com",
    telegram: "https://t.me/nimbus",
  },
};

// "Home" resolves to the hero anchor: on the home page it scrolls back to the
// top (and lights up via scrollspy); on any sub-page it becomes /#top, so it
// doubles as the way back home. "Process" is folded into Work, and "AI" is
// folded into Services (see /services/ai-solutions), which is where those
// stories now live.
export const nav = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About Us", href: "/about" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact", href: "/contact" },
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
    icon: Code2,
    slug: "software-development",
    title: "Software Development",
    blurb:
      "Custom web apps, enterprise systems and SaaS platforms engineered to scale.",
    tagline: "Custom software, engineered to scale.",
    overview:
      "We design and build the systems your business runs on — web applications, internal platforms and SaaS products that stay fast and maintainable long after launch. Typed end to end, tested, and shipped in tight iterations you can actually watch happen.",
    points: [
      "Custom Web Applications",
      "Enterprise Systems",
      "CRM & ERP Solutions",
      "SaaS Platforms",
      "API Development",
      "Cloud & System Integration",
    ],
    accent: "from-[#65A30D] to-[#3F6212]",
    deliverables: [
      {
        title: "Custom Web Applications",
        desc: "Bespoke product experiences built on a modern React/Next.js foundation — no templates, no bloat.",
      },
      {
        title: "Enterprise Systems",
        desc: "Internal platforms, admin tooling and control planes that replace spreadsheets and manual ops.",
      },
      {
        title: "SaaS Platforms",
        desc: "Multi-tenant products with billing, auth, roles and analytics wired in from day one.",
      },
      {
        title: "API Development",
        desc: "Typed, documented REST and realtime APIs designed for the integrations you'll need next year.",
      },
      {
        title: "CRM & ERP Solutions",
        desc: "Systems of record tailored to how your team actually works, not how the software wishes you did.",
      },
      {
        title: "Cloud & Integration",
        desc: "Infrastructure, CI/CD and third-party integrations that deploy with zero downtime.",
      },
    ],
    approach: [
      {
        title: "Architect",
        desc: "We model the domain, define the data and agree the system boundaries before writing code.",
      },
      {
        title: "Build in slices",
        desc: "Vertical, shippable increments — you see working software every week, not a big-bang reveal.",
      },
      {
        title: "Harden",
        desc: "Automated tests, load checks and observability so the system holds up under real traffic.",
      },
      {
        title: "Ship & evolve",
        desc: "Zero-downtime releases, monitoring, and a roadmap for the next iteration.",
      },
    ],
    techSlugs: ["react", "nextdotjs", "typescript", "nodedotjs", "laravel", "postgresql", "docker", "amazonaws"],
    outcome: {
      stats: [
        { value: 42, suffix: "%", label: "Rep productivity" },
        { value: 87, suffix: "%", label: "Faster load time" },
        { value: 200, suffix: "+", label: "Users unified" },
      ],
      result:
        "Atlas CRM: we unified a 200-person sales org and cut page load from 3.1s to 0.4s.",
    },
    faqs: [
      {
        q: "Do you work with our existing codebase?",
        a: "Yes. We regularly pick up existing systems — auditing, stabilising and extending them — as well as building greenfield. We start with a short discovery to map what's there before proposing changes.",
      },
      {
        q: "What stack do you build on?",
        a: "A modern TypeScript foundation: React/Next.js on the front end, Node or Laravel on the back end, Postgres for data, containerised and deployed to AWS. We pick boring-reliable where it matters and cutting-edge where it wins.",
      },
      {
        q: "How do you keep projects on schedule?",
        a: "We ship in weekly vertical slices with a shared board, so scope, progress and trade-offs are visible the whole way through. No surprises at the end.",
      },
      {
        q: "Do you handle hosting and maintenance?",
        a: "We can. Most engagements include deployment, monitoring and a support window; ongoing maintenance and optimisation are available as a retainer.",
      },
    ],
  },
  {
    icon: Brain,
    slug: "ai-solutions",
    title: "AI Solutions",
    blurb:
      "AI agents, automations and intelligence layers wired into your business.",
    tagline: "AI that does real work, not demos.",
    overview:
      "We build AI systems that plug into the way your business already runs — agents that resolve tickets, automations that remove busywork, and intelligence layers that turn your data into decisions. Grounded in your own context, measured on outcomes, not novelty.",
    points: [
      "AI Agents",
      "Workflow Automation",
      "Chatbots",
      "Internal AI Tools",
      "Business Intelligence",
      "AI Integration",
    ],
    accent: "from-[#8B5CF6] to-[#6D28D9]",
    deliverables: [
      {
        title: "AI Agents",
        desc: "Task-completing agents that classify, draft, route and act — with humans in the loop where it counts.",
      },
      {
        title: "Workflow Automation",
        desc: "End-to-end automations that remove repetitive work across support, ops and back office.",
      },
      {
        title: "Chatbots & Assistants",
        desc: "Retrieval-grounded assistants that answer from your docs and data, not the open internet.",
      },
      {
        title: "Internal AI Tools",
        desc: "Purpose-built copilots that make your team faster at the work only they can do.",
      },
      {
        title: "Business Intelligence",
        desc: "Natural-language analytics and summaries over your operational data.",
      },
      {
        title: "AI Integration",
        desc: "Model APIs, vector search and evals wired safely into your existing systems.",
      },
    ],
    approach: [
      {
        title: "Find the leverage",
        desc: "We identify the workflows where AI removes the most cost or delay — and where it shouldn't be used at all.",
      },
      {
        title: "Ground it",
        desc: "We connect the model to your data with retrieval and guardrails so answers are accurate and traceable.",
      },
      {
        title: "Evaluate",
        desc: "We measure accuracy, cost and latency against real cases before anything touches customers.",
      },
      {
        title: "Deploy with a human loop",
        desc: "We roll out with oversight and monitoring, then widen autonomy as the numbers earn it.",
      },
    ],
    techSlugs: ["python", "openai", "nextdotjs", "nodedotjs", "mongodb", "docker", "amazonaws"],
    outcome: {
      stats: [
        { value: 68, suffix: "%", label: "Tickets auto-resolved" },
        { value: 30, suffix: "s", label: "First response" },
        { value: 10, suffix: "k+", label: "Tickets / month" },
      ],
      result:
        "Helix AI: an agent that resolves 68% of 10k+ monthly tickets with sub-30-second first response.",
    },
    faqs: [
      {
        q: "Which models do you use?",
        a: "We're model-agnostic and pick per use case — defaulting to the latest, most capable Claude and OpenAI models, with smaller or open models where cost and latency matter. We design so you can swap providers without a rewrite.",
      },
      {
        q: "How do you stop the AI from making things up?",
        a: "We ground responses in your own data with retrieval, constrain outputs, and add evals plus human review for high-stakes paths. Every answer can be traced back to a source.",
      },
      {
        q: "Is our data used to train models?",
        a: "No. We use enterprise API tiers that don't train on your data, and we can deploy within your own cloud when data residency requires it.",
      },
      {
        q: "How do you prove ROI before we commit?",
        a: "We start with a scoped pilot on a single workflow, measured against your current baseline. You see the accuracy and cost numbers before we scale it.",
      },
    ],
  },
  {
    icon: Megaphone,
    slug: "digital-marketing",
    title: "Digital Marketing",
    blurb:
      "Full-funnel growth — from strategy and SEO to performance campaigns.",
    tagline: "Growth you can measure to the dollar.",
    overview:
      "We run full-funnel growth as one connected system — strategy, SEO, performance media and content that compound instead of competing for budget. Every channel is instrumented, so you always know what a customer costs and what they're worth.",
    points: [
      "Marketing Strategy",
      "SEO",
      "Performance Marketing",
      "Social & Content",
      "Email Marketing",
      "Brand Identity",
    ],
    accent: "from-[#F97316] to-[#C2410C]",
    deliverables: [
      {
        title: "Marketing Strategy",
        desc: "Positioning, ICP and a channel plan tied to revenue targets — not vanity metrics.",
      },
      {
        title: "SEO",
        desc: "Technical, content and authority work that turns organic search into a durable acquisition channel.",
      },
      {
        title: "Performance Marketing",
        desc: "Paid search and social managed to CAC and ROAS, with creative testing built into the cadence.",
      },
      {
        title: "Content & Social",
        desc: "A content engine that earns trust and feeds every other channel.",
      },
      {
        title: "Email & Lifecycle",
        desc: "Automated sequences that convert, onboard and retain across the customer lifecycle.",
      },
      {
        title: "Brand Identity",
        desc: "A coherent brand system that makes every campaign work harder.",
      },
    ],
    approach: [
      {
        title: "Instrument",
        desc: "We set up clean tracking and attribution first, so every decision after is based on real numbers.",
      },
      {
        title: "Find the winners",
        desc: "We test channels and creative fast, then concentrate budget on what's actually converting.",
      },
      {
        title: "Scale",
        desc: "We push spend into proven channels while protecting CAC and unit economics.",
      },
      {
        title: "Compound",
        desc: "SEO, content and lifecycle build assets that keep returning long after the ad spend stops.",
      },
    ],
    techSlugs: ["nextdotjs", "typescript", "python", "postgresql", "amazonaws", "docker"],
    outcome: {
      stats: [
        { value: 27, suffix: "%", label: "Lower CAC" },
        { value: 3, suffix: "x", label: "Return on ad spend" },
        { value: 1, suffix: "qtr", label: "To payback" },
      ],
      result:
        "Pulse Analytics: we cut CAC 27% while scaling spend to 3.4x ROAS in a single quarter.",
    },
    faqs: [
      {
        q: "How soon will we see results?",
        a: "Paid channels can move within weeks once tracking is clean. SEO and content compound over months — we set expectations per channel up front and report against them.",
      },
      {
        q: "Do you require a long contract?",
        a: "No. We work in quarterly engagements with clear targets. Most clients stay because the numbers work, not because they're locked in.",
      },
      {
        q: "Can you work with our in-house team?",
        a: "Absolutely. We often act as the strategy and performance layer on top of an in-house content or design team, and we hand over playbooks as we go.",
      },
      {
        q: "How do you report on performance?",
        a: "A live dashboard tied to revenue — CAC, ROAS, pipeline and payback — plus a plain-English readout every cycle. No screenshots of vanity metrics.",
      },
    ],
  },
  {
    icon: PenTool,
    slug: "ui-ux-design",
    title: "UI/UX Design",
    blurb:
      "Research-led product design and design systems people love to use.",
    tagline: "Interfaces people actually enjoy using.",
    overview:
      "We design products end to end — research, flows, interface and a design system your team can build on. Every decision is grounded in how real users behave, and every screen ships as production-ready specs your engineers can implement without guesswork.",
    points: [
      "Product Design",
      "UX Research",
      "Design Systems",
      "Mobile App Design",
      "Website Design",
      "Prototyping",
    ],
    accent: "from-[#EC4899] to-[#BE185D]",
    deliverables: [
      {
        title: "Product Design",
        desc: "End-to-end design of features and flows, from first sketch to polished, buildable screens.",
      },
      {
        title: "UX Research",
        desc: "Interviews, usability testing and analytics that replace opinions with evidence.",
      },
      {
        title: "Design Systems",
        desc: "Token-driven component libraries that keep your product consistent as it scales.",
      },
      {
        title: "Mobile App Design",
        desc: "Native-feeling iOS and Android experiences designed for touch, speed and clarity.",
      },
      {
        title: "Website Design",
        desc: "Marketing sites that convert — fast, on-brand and accessible by default.",
      },
      {
        title: "Prototyping",
        desc: "Interactive prototypes to validate ideas with users before a line of code is written.",
      },
    ],
    approach: [
      {
        title: "Understand",
        desc: "We research users and goals to define what a great outcome actually looks like.",
      },
      {
        title: "Shape the flows",
        desc: "Information architecture and low-fi flows to get the structure right before the pixels.",
      },
      {
        title: "Design the system",
        desc: "A polished, on-brand interface built from reusable, tokenised components.",
      },
      {
        title: "Validate & hand off",
        desc: "We test with real users and deliver specs engineers can build from directly.",
      },
    ],
    techSlugs: ["react", "nextdotjs", "typescript"],
    outcome: {
      stats: [
        { value: 98, suffix: "", label: "Mobile Lighthouse" },
        { value: 2, suffix: "x", label: "Engagement" },
        { value: 40, suffix: "%", label: "Less drop-off" },
      ],
      result:
        "Nova: a headless redesign that lifted mobile Lighthouse from 45 to 98 — and sales followed.",
    },
    faqs: [
      {
        q: "Do you only design, or do you build too?",
        a: "Both. Design and engineering sit in one team, so what we design is what gets shipped — no lossy hand-off. We're happy to design for your engineers as well.",
      },
      {
        q: "Will we get a reusable design system?",
        a: "Yes. We deliver a tokenised component library (typically in Figma and code) so your team can keep building consistently after we're done.",
      },
      {
        q: "How do you validate designs?",
        a: "With real users — interviews and usability tests on interactive prototypes — before anything expensive gets built.",
      },
      {
        q: "Is accessibility included?",
        a: "Always. We design to WCAG AA by default: colour contrast, keyboard flows, focus states and reduced-motion support are part of the work, not an add-on.",
      },
    ],
  },
];

export const stats = [
  { value: 100, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 24, suffix: "/7", label: "Support & Monitoring" },
];

export type Step = { icon: LucideIcon; title: string; desc: string };

export const process: Step[] = [
  { icon: Search, title: "Discovery", desc: "We map goals, users and constraints to define what winning looks like." },
  { icon: LineChart, title: "Strategy", desc: "Architecture, roadmap and success metrics agreed before a line of code." },
  { icon: Layout, title: "UX/UI Design", desc: "Research-led flows and a polished, on-brand interface." },
  { icon: Code2, title: "Development", desc: "Clean, typed, testable code shipped in tight iterations." },
  { icon: TestTube2, title: "Testing", desc: "Automated + manual QA across devices, load and edge cases." },
  { icon: CloudUpload, title: "Deployment", desc: "Zero-downtime releases with monitoring baked in." },
  { icon: Cog, title: "Optimization", desc: "Continuous performance, conversion and reliability tuning." },
];

// Trusted-by wordmarks (kept as styled text to avoid fake brand logos)
export const clients = [
  "Northwind",
  "Vertex",
  "Lumina",
  "Quanta",
  "Everest",
  "Momentum",
  "Cobalt",
  "Aperture",
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

/** Company-level FAQs shown on the home page (services have their own set). */
export const faqs: { q: string; a: string }[] = [
  {
    q: "How quickly can we get started?",
    a: "Discovery usually begins within a week of the first call. We scope in days, not months — most engagements have working software in front of you inside the first two weeks.",
  },
  {
    q: "How do you price engagements?",
    a: "Fixed-scope projects are quoted up front after a short discovery; longer partnerships run as a monthly retainer. Either way you get the number before we start, and we don't bill surprises.",
  },
  {
    q: "Can you work with our existing team and codebase?",
    a: "Yes — a good share of our work is picking up systems someone else built. We start by auditing what's there, stabilise it, then extend. We're just as happy embedding alongside your in-house engineers.",
  },
  {
    q: "What happens after launch?",
    a: "Every build ships with monitoring, documentation and a support window. Most clients continue on a retainer for ongoing optimisation, but you're never locked in — the code and infrastructure are yours.",
  },
  {
    q: "How do you handle security and confidentiality?",
    a: "We sign NDAs as standard and work to SOC 2 practices: least-privilege access, encrypted data in transit and at rest, and no client data used to train models. We can deploy inside your own cloud where residency demands it.",
  },
  {
    q: "Which industries do you work in?",
    a: "We're industry-agnostic but deepest in B2B SaaS, fintech, logistics and e-commerce. What matters more than the sector is whether the problem is worth solving well.",
  },
];

export const heroHighlights: { icon: LucideIcon; label: string }[] = [
  { icon: Rocket, label: "Ship in weeks" },
  { icon: Brain, label: "AI-native" },
  { icon: LineChart, label: "Growth-focused" },
];
