"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { adminNav } from "@/lib/crm";
import { cn } from "@/lib/utils";

export function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [leadCount, setLeadCount] = useState(0);

  // Live count of website leads for the nav badge.
  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => setLeadCount((data.leads ?? []).length))
      .catch(() => {});
  }, [pathname]);

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-surface transition-transform duration-300 ease-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-line px-5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[linear-gradient(150deg,var(--color-brand-500),var(--color-brand-700))] text-white">
              <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden>
                <path d="M9 22V10l7 8 7-8v12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="font-display text-sm font-semibold text-content">
              Nimbus <span className="text-muted">CRM</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-content lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {adminNav.map((group) => (
            <div key={group.group} className="mb-5">
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
                {group.group}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
                          active
                            ? "bg-brand-500/12 text-accent"
                            : "text-muted hover:bg-surface-2 hover:text-content"
                        )}
                      >
                        <Icon className={cn("h-[18px] w-[18px] shrink-0", active ? "text-accent" : "text-faint group-hover:text-content")} />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge === "leads" && leadCount > 0 && (
                          <span className="grid min-w-5 place-items-center rounded-full bg-brand-500 px-1.5 text-[11px] font-semibold text-white">
                            {leadCount}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Back to site */}
        <div className="shrink-0 border-t border-line p-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-content"
          >
            ← Back to website
          </Link>
        </div>
      </aside>
    </>
  );
}
