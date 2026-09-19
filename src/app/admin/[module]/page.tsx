import Link from "next/link";
import { Construction } from "lucide-react";
import { findNavItem } from "@/lib/crm";

/**
 * Shared placeholder for CRM modules not yet built. Real module pages (e.g.
 * app/admin/leads/page.tsx) take precedence over this catch-all as they land,
 * so the whole portal is navigable in the meantime.
 */
export default async function AdminModulePlaceholder({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const item = findNavItem(`/admin/${module}`);
  const title = item?.label ?? module.replace(/-/g, " ");

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="font-display text-2xl font-semibold capitalize text-content">{title}</h1>
      <p className="mt-1 text-sm text-muted">Module workspace</p>

      <div className="mt-8 grid place-items-center rounded-2xl border border-dashed border-line bg-surface px-6 py-20 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-500/12 text-accent">
          <Construction className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-lg font-semibold text-content">“{title}” is on the way</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          The shell, navigation and dashboard are live. This module is scheduled for an
          upcoming build batch — the layout, data model and design system it will use are
          already in place.
        </p>
        <Link
          href="/admin"
          className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-4 py-2 text-sm font-medium text-content transition-colors hover:border-brand-500/40"
        >
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}
