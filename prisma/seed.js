// One-time seed for local dev — populates the CRM with the same demo content
// that used to be hardcoded in src/lib/crm.ts, now as real rows. Run with:
//   node prisma/seed.js
require("dotenv").config({ path: ".env.local" });
const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const hoursAgo = (h) => new Date(Date.now() - h * 60 * 60 * 1000);
const minsAgo = (m) => new Date(Date.now() - m * 60 * 1000);

const leads = [
  { name: "Priya Nair", email: "priya@novacommerce.io", company: "Nova Commerce", service: "UI/UX Design", budget: "$75k–$150k", source: "Demo request", status: "Qualified", createdAt: hoursAgo(3) },
  { name: "Marcus Reid", email: "marcus@helix.ai", company: "Helix", service: "AI Solutions", budget: "$150k+", source: "Website form", status: "New", createdAt: hoursAgo(8) },
  { name: "Elena Duarte", email: "elena@pulse.io", company: "Pulse Analytics", service: "Digital Marketing", budget: "$25k–$75k", source: "Newsletter", status: "Contacted", createdAt: hoursAgo(26) },
  { name: "Tomas Vidal", email: "tomas@orbit.co", company: "Orbit Ops", service: "Software Development", budget: "$75k–$150k", source: "Referral", status: "Qualified", createdAt: hoursAgo(50) },
  { name: "Sarah Chen", email: "sarah@atlas.com", company: "Atlas", service: "Software Development", budget: "$150k+", source: "Website form", status: "New", createdAt: hoursAgo(71) },
  { name: "James Whitfield", email: "james@northwind.co", company: "Northwind", service: "Not sure yet", budget: "Not sure", source: "Ads", status: "Unqualified", createdAt: hoursAgo(96) },
];

const deals = [
  { name: "Atlas CRM rebuild", company: "Atlas", value: 168000, stage: "Negotiation", owner: "A. Rivera", closeDate: new Date("2026-08-14") },
  { name: "Helix support agent", company: "Helix", value: 92000, stage: "Proposal", owner: "K. Osei", closeDate: new Date("2026-08-02") },
  { name: "Pulse growth retainer", company: "Pulse", value: 48000, stage: "Discovery", owner: "M. Lund", closeDate: new Date("2026-09-01") },
  { name: "Nova headless build", company: "Nova", value: 76000, stage: "Won", owner: "A. Rivera", closeDate: new Date("2026-07-10") },
  { name: "Orbit control plane", company: "Orbit", value: 120000, stage: "Discovery", owner: "K. Osei", closeDate: new Date("2026-09-20") },
  { name: "Beacon SEO sprint", company: "Beacon", value: 18000, stage: "Lost", owner: "M. Lund", closeDate: new Date("2026-06-28") },
];

const activities = [
  { kind: "lead", text: "New website lead — Marcus Reid (Helix)", who: "System", at: minsAgo(12) },
  { kind: "deal", text: "Atlas CRM rebuild moved to Negotiation", who: "A. Rivera", at: minsAgo(55) },
  { kind: "ticket", text: "Ticket #3391 resolved — billing question", who: "K. Osei", at: minsAgo(90) },
  { kind: "email", text: "Campaign “Q3 Product Update” sent to 4,210", who: "M. Lund", at: hoursAgo(4) },
  { kind: "task", text: "Call scheduled with Pulse Analytics", who: "A. Rivera", at: hoursAgo(6) },
];

const tasks = [
  { title: "Send proposal to Helix", due: "Today, 4:00 PM", priority: "High", done: false },
  { title: "Follow up — Nova invoice", due: "Tomorrow", priority: "Medium", done: false },
  { title: "Prep Atlas negotiation deck", due: "Jul 21", priority: "High", done: false },
  { title: "Review new website leads", due: "Jul 21", priority: "Medium", done: true },
  { title: "QA the pricing page copy", due: "Jul 22", priority: "Low", done: false },
];

async function main() {
  const counts = await Promise.all([
    prisma.lead.count(),
    prisma.deal.count(),
    prisma.activity.count(),
    prisma.task.count(),
  ]);
  if (counts.some((c) => c > 0)) {
    console.log("Tables already have data — skipping seed (delete rows first if you want to reseed).");
    return;
  }

  await prisma.lead.createMany({ data: leads });
  await prisma.deal.createMany({ data: deals });
  await prisma.activity.createMany({ data: activities });
  await prisma.task.createMany({ data: tasks });
  console.log("Seeded leads, deals, activities and tasks.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => process.exit(0));
