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

export const caseStudies: CaseStudy[] = [
  {
    slug: "atlas-crm",
    name: "Atlas CRM",
    category: "Enterprise SaaS",
    sector: "B2B Sales",
    year: "2025",
    duration: "14 weeks",
    tagline: "One CRM for a 200-person sales org.",
    summary:
      "We replaced five fragmented sales tools with a single custom CRM — real-time pipeline, role-based automation and sub-second page loads.",
    challenge: "Fragmented sales tooling slowing a 200-person team.",
    solution: "Unified CRM with real-time pipeline and role-based automation.",
    result: "+42% rep productivity, 3.1s → 0.4s load time.",
    story: {
      challenge:
        "Atlas's sales organisation had grown to 200 reps across three regions — and its tooling hadn't kept up. Deals lived in one system, activity in another, reporting in a third, and the gaps were filled with spreadsheets. Reps spent hours a week re-keying data, managers couldn't trust the pipeline numbers, and the legacy CRM's 3-second page loads made every task feel heavier than it was.",
      solution:
        "We built a single system of record around how Atlas actually sells. A real-time pipeline replaced the nightly-sync reports, role-based automation took over the re-keying — assignment, follow-ups, stage hygiene — and an activity timeline gave managers the full story of every deal without asking for it. The front end was rebuilt on a modern React foundation with aggressive caching, taking page loads from 3.1s to 0.4s.",
      outcome:
        "Within a quarter, rep productivity was up 42% and pipeline reviews ran off live data instead of exported decks. The spreadsheets are gone — and so is the Sunday-night data cleanup that used to precede every Monday forecast call.",
    },
    approach: [
      {
        title: "Shadow the reps",
        desc: "Two weeks embedded with sales to map the real workflow — not the org chart version of it.",
      },
      {
        title: "Model the pipeline",
        desc: "A single deal model with stage rules the whole org agreed on before we wrote code.",
      },
      {
        title: "Migrate without downtime",
        desc: "Five systems consolidated with dual-running syncs, so no rep lost a deal in the cutover.",
      },
      {
        title: "Automate the busywork",
        desc: "Role-based automation for assignment, follow-ups and hygiene — shipped last, once trust was earned.",
      },
    ],
    stats: [
      { value: 42, suffix: "%", label: "Rep productivity" },
      { value: 87, suffix: "%", label: "Faster page loads" },
      { value: 200, suffix: "+", label: "Users unified" },
    ],
    quote: {
      text: "Nimbus rebuilt our platform in weeks, not months. The quality bar is genuinely the highest we've worked with.",
      name: "Sarah Chen",
      role: "VP Product, Atlas",
      initials: "SC",
    },
    tech: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
    serviceSlugs: ["software-development", "ui-ux-design"],
    accent: "from-[#65A30D] to-[#3F6212]",
    gradient: "from-electric via-indigo to-purple",
  },
  {
    slug: "helix-ai",
    name: "Helix AI",
    category: "AI Platform",
    sector: "Customer Support",
    year: "2025",
    duration: "10 weeks",
    tagline: "An AI agent that clears the support queue.",
    summary:
      "We built a retrieval-grounded support agent that classifies, drafts and resolves tickets — 68% handled end-to-end with sub-30-second first response.",
    challenge: "Manual triage of 10k+ support tickets per month.",
    solution: "AI agent that classifies, drafts and routes tickets instantly.",
    result: "68% auto-resolved, first response < 30s.",
    story: {
      challenge:
        "Helix's support team was drowning: 10,000+ tickets a month, every one manually read, tagged and routed before an agent even started on an answer. First response times stretched past four hours at peak, and the team's best people spent their days on triage instead of the hard problems only they could solve.",
      solution:
        "We built an AI agent grounded in Helix's own docs, product data and resolved-ticket history. It classifies every incoming ticket, drafts a sourced answer, and either resolves it directly or routes it to the right specialist with full context attached. High-stakes paths — billing, security, cancellations — always keep a human in the loop, and every automated answer traces back to the source it came from.",
      outcome:
        "The agent now resolves 68% of tickets end-to-end with a first response under 30 seconds. Escalations arrive pre-triaged with a drafted reply, and the support team's headcount conversation turned into a coverage conversation — same team, three times the throughput.",
    },
    approach: [
      {
        title: "Mine the history",
        desc: "50k resolved tickets analysed to find what's automatable — and what should never be.",
      },
      {
        title: "Ground the model",
        desc: "Retrieval over docs, product data and past resolutions, so answers cite sources instead of guessing.",
      },
      {
        title: "Evaluate before exposure",
        desc: "An eval suite of real tickets gated every release; customers only saw answers that cleared the bar.",
      },
      {
        title: "Widen autonomy gradually",
        desc: "Draft-only at launch, then auto-resolve category by category as accuracy numbers earned it.",
      },
    ],
    stats: [
      { value: 68, suffix: "%", label: "Tickets auto-resolved" },
      { value: 30, suffix: "s", label: "First response" },
      { value: 10, suffix: "k+", label: "Tickets / month" },
    ],
    quote: {
      text: "Their AI agents now handle the majority of our support. Customers are happier and our team finally sleeps.",
      name: "Marcus Reid",
      role: "COO, Helix",
      initials: "MR",
    },
    tech: ["React", "Python", "OpenAI", "MongoDB"],
    serviceSlugs: ["ai-solutions", "software-development"],
    accent: "from-[#8B5CF6] to-[#6D28D9]",
    gradient: "from-indigo via-purple to-cyan",
  },
  {
    slug: "pulse-analytics",
    name: "Pulse Analytics",
    category: "Marketing Intelligence",
    sector: "AdTech",
    year: "2024",
    duration: "12 weeks",
    tagline: "Every ad dollar, one dashboard.",
    summary:
      "We unified multi-channel ad data into a live performance dashboard with predictive spend recommendations — cutting CAC 27% while scaling to 3.4x ROAS.",
    challenge: "No single view of multi-channel ad performance.",
    solution: "Unified dashboard with predictive spend recommendations.",
    result: "-27% CAC, +3.4x ROAS in one quarter.",
    story: {
      challenge:
        "Pulse was spending six figures a month across search, social and display — and reporting on it with a patchwork of platform dashboards and weekly exports. Attribution disagreed between tools, budget decisions lagged performance by a week or more, and nobody could answer the only question that mattered: what does a customer actually cost, per channel, today?",
      solution:
        "We built a single intelligence layer over all of it. Channel data lands in BigQuery hourly, a unified attribution model reconciles the platforms' competing claims, and a live dashboard ties every campaign to CAC, ROAS and payback. On top of that we added predictive spend recommendations — the system flags where the next dollar should go, and where spend is past the point of diminishing returns.",
      outcome:
        "Budget reallocation went from a weekly meeting to a daily habit. In the first quarter Pulse cut CAC 27% while scaling total spend, landing at 3.4x blended ROAS — numbers that had never moved in the same direction before.",
    },
    approach: [
      {
        title: "Instrument first",
        desc: "Clean, consistent tracking across every channel before a single chart was drawn.",
      },
      {
        title: "Reconcile attribution",
        desc: "One model that adjudicates the platforms' competing conversion claims into a single truth.",
      },
      {
        title: "Make it live",
        desc: "Hourly pipelines into BigQuery, so decisions run on today's numbers, not last week's export.",
      },
      {
        title: "Recommend, don't just report",
        desc: "Predictive spend guidance turned the dashboard from a scoreboard into a copilot.",
      },
    ],
    stats: [
      { value: 27, suffix: "%", label: "Lower CAC" },
      { value: 3, suffix: "x", label: "Return on ad spend" },
      { value: 1, suffix: "qtr", label: "To payback" },
    ],
    quote: {
      text: "The marketing dashboard paid for itself in a month. We cut CAC while scaling spend — that never happens.",
      name: "Elena Duarte",
      role: "Head of Growth, Pulse",
      initials: "ED",
    },
    tech: ["Next.js", "Node.js", "BigQuery", "Docker"],
    serviceSlugs: ["digital-marketing", "software-development"],
    accent: "from-[#F97316] to-[#C2410C]",
    gradient: "from-cyan via-emerald to-electric",
  },
  {
    slug: "nova-commerce",
    name: "Nova Commerce",
    category: "Headless E-commerce",
    sector: "Retail",
    year: "2024",
    duration: "8 weeks",
    tagline: "From Lighthouse 45 to 98 — and sales followed.",
    summary:
      "A headless rebuild of a legacy storefront with edge rendering and a design refresh — mobile Lighthouse from 45 to 98 and +23% mobile conversion.",
    challenge: "A legacy storefront capped at 45 on mobile Lighthouse.",
    solution: "Headless rebuild with edge rendering and image optimization.",
    result: "98 Lighthouse, +23% mobile conversion.",
    story: {
      challenge:
        "Nova's storefront was built on a monolithic platform that had accumulated a decade of plugins and workarounds. Mobile pages took over six seconds to become interactive, Lighthouse scored it 45, and every design improvement the team wanted was blocked by the platform underneath. Meanwhile 70% of their traffic — and their worst conversion rate — was on mobile.",
      solution:
        "We went headless: the commerce engine stayed, everything customer-facing was rebuilt on Next.js with edge rendering, streaming and aggressive image optimization. Alongside the rebuild we redesigned the purchase flow around mobile thumbs — fewer steps, clearer state, instant feedback — and shipped a tokenised design system so Nova's team could keep iterating without breaking consistency.",
      outcome:
        "Mobile Lighthouse went from 45 to 98. More importantly, mobile conversion rose 23% and the design team ships storefront changes in days instead of quarters. The platform migration everyone feared took eight weeks with zero downtime.",
    },
    approach: [
      {
        title: "Decouple the storefront",
        desc: "Kept the proven commerce engine, replaced everything the customer touches.",
      },
      {
        title: "Design for thumbs",
        desc: "The purchase flow rebuilt around real mobile behaviour, validated on prototypes first.",
      },
      {
        title: "Render at the edge",
        desc: "Streaming, edge caching and optimized images to make speed a feature, not a tuning pass.",
      },
      {
        title: "Hand over the system",
        desc: "A tokenised component library so Nova's team owns the storefront after launch.",
      },
    ],
    stats: [
      { value: 98, suffix: "", label: "Mobile Lighthouse" },
      { value: 23, suffix: "%", label: "Mobile conversion" },
      { value: 0, suffix: "", label: "Downtime in cutover" },
    ],
    quote: {
      text: "They shipped a headless rebuild that took our mobile Lighthouse from 45 to 98. Sales followed.",
      name: "Priya Nair",
      role: "CTO, Nova",
      initials: "PN",
    },
    tech: ["Next.js", "TypeScript", "Stripe", "Vercel"],
    serviceSlugs: ["software-development", "ui-ux-design"],
    accent: "from-[#EC4899] to-[#BE185D]",
    gradient: "from-purple via-electric to-cyan",
  },
  {
    slug: "orbit-ops",
    name: "Orbit Ops",
    category: "Internal Platform",
    sector: "Logistics",
    year: "2024",
    duration: "9 weeks",
    tagline: "Five tools and a spreadsheet, replaced by one control plane.",
    summary:
      "We consolidated a logistics ops stack into a single internal control plane with role-based automation — saving each operator 11 hours a week.",
    challenge: "Ops team stitching five tools with spreadsheets.",
    solution: "Unified control plane with role-based automation.",
    result: "11 hrs/week saved per operator.",
    story: {
      challenge:
        "Orbit's operations team ran the business out of five disconnected tools glued together with spreadsheets and tribal knowledge. Every shipment touched all five; every status update was copied by hand. Onboarding a new operator took two months, errors crept in at every seam, and the team's capacity ceiling was set by copy-paste speed.",
      solution:
        "We built a single control plane over the whole stack. The five tools became integrations behind one interface: live status boards, exception queues that surface only what needs a human, and role-based automation for the updates that used to be re-keyed by hand. An audit trail replaced the tribal knowledge — every action, every change, visible and searchable.",
      outcome:
        "Each operator got 11 hours a week back, exceptions get handled in minutes instead of surfacing days later, and new hires are productive in their first week. The spreadsheet layer is gone entirely — and with it, the class of errors it created.",
    },
    approach: [
      {
        title: "Map the seams",
        desc: "We documented every handoff between tools — that's where the hours and the errors lived.",
      },
      {
        title: "One interface, five integrations",
        desc: "The existing tools stayed as systems of record; operators stopped having to visit them.",
      },
      {
        title: "Exceptions over dashboards",
        desc: "The platform surfaces what needs a decision and automates the rest.",
      },
      {
        title: "Earn the audit trail",
        desc: "Every automated action logged and reversible, so trust in the system compounds.",
      },
    ],
    stats: [
      { value: 11, suffix: "hrs", label: "Saved / operator / week" },
      { value: 5, suffix: "", label: "Tools consolidated" },
      { value: 1, suffix: "wk", label: "To onboard new hires" },
    ],
    quote: {
      text: "The internal control plane they built saves each operator over ten hours a week. Game changing.",
      name: "Tomas Vidal",
      role: "Head of Ops, Orbit",
      initials: "TV",
    },
    tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    serviceSlugs: ["software-development", "ai-solutions"],
    accent: "from-[#0D9488] to-[#115E59]",
    gradient: "from-emerald via-cyan to-indigo",
  },
];
