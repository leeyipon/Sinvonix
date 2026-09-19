import {
  LayoutDashboard,
  BarChart3,
  Users2,
  KanbanSquare,
  Handshake,
  UserRound,
  Building2,
  Contact,
  CheckSquare,
  Mail,
  LifeBuoy,
  Megaphone,
  FileText,
  Package,
  ShieldCheck,
  Settings,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Navigation — every module, grouped. Routes not yet built render a shared   */
/*  placeholder via app/admin/[module]/page.tsx, so the whole portal is         */
/*  navigable while modules land in batches.                                    */
/* -------------------------------------------------------------------------- */

export type NavItem = { label: string; href: string; icon: LucideIcon; badge?: "leads" };

export const adminNav: { group: string; items: NavItem[] }[] = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
    ],
  },
  {
    group: "Sales",
    items: [
      { label: "Leads", href: "/admin/leads", icon: Users2, badge: "leads" },
      { label: "Pipeline", href: "/admin/pipeline", icon: KanbanSquare },
      { label: "Deals", href: "/admin/deals", icon: Handshake },
      { label: "Customers", href: "/admin/customers", icon: UserRound },
      { label: "Companies", href: "/admin/companies", icon: Building2 },
      { label: "Contacts", href: "/admin/contacts", icon: Contact },
    ],
  },
  {
    group: "Engagement",
    items: [
      { label: "Tasks & Activity", href: "/admin/tasks", icon: CheckSquare },
      { label: "Email & Notifications", href: "/admin/inbox", icon: Mail },
      { label: "Support Tickets", href: "/admin/tickets", icon: LifeBuoy },
      { label: "Campaigns", href: "/admin/campaigns", icon: Megaphone },
    ],
  },
  {
    group: "Content",
    items: [
      { label: "Website CMS", href: "/admin/cms", icon: FileText },
      { label: "Products & Services", href: "/admin/products", icon: Package },
    ],
  },
  {
    group: "System",
    items: [
      { label: "Users & Roles", href: "/admin/users", icon: ShieldCheck },
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "Audit Logs", href: "/admin/audit", icon: ScrollText },
    ],
  },
];

/** Flat lookup used by the placeholder route to title an unknown module. */
export function findNavItem(href: string): NavItem | undefined {
  for (const g of adminNav) {
    const hit = g.items.find((i) => i.href === href);
    if (hit) return hit;
  }
  return undefined;
}

/* -------------------------------------------------------------------------- */
/*  Domain types — rows now live in the database (prisma/schema.prisma) and    */
/*  are fetched from /api/admin/* routes. These types describe the JSON shape  */
/*  those routes return (dates arrive as ISO strings; see timeAgo() below).    */
/* -------------------------------------------------------------------------- */

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Unqualified";
export type LeadSource = "Website form" | "Newsletter" | "Demo request" | "Referral" | "Ads";

export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string;
  service?: string | null;
  budget?: string | null;
  message?: string | null;
  source: LeadSource;
  status: LeadStatus;
  createdAt: string;
};

export type PipelineStage = "Discovery" | "Proposal" | "Negotiation" | "Won" | "Lost";

export type Deal = {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: PipelineStage;
  owner: string;
  closeDate: string;
};

export type Activity = {
  id: string;
  kind: "lead" | "deal" | "ticket" | "email" | "task";
  text: string;
  who: string;
  at: string;
};

export type Task = {
  id: string;
  title: string;
  due: string;
  priority: "High" | "Medium" | "Low";
  done: boolean;
};

/* Formatting helpers */
export function currency(n: number): string {
  return n >= 1000 ? `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `$${n}`;
}

export function timeAgo(at: number | string): string {
  const ms = typeof at === "string" ? new Date(at).getTime() : at;
  const s = Math.floor((Date.now() - ms) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export const pipelineStages: PipelineStage[] = ["Discovery", "Proposal", "Negotiation", "Won", "Lost"];
