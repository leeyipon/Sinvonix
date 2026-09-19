"use client";

import { Menu, Search, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function AdminTopbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-line bg-surface/80 px-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open menu"
        className="grid h-10 w-10 cursor-pointer place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-content lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="relative flex-1 sm:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
        <input
          type="search"
          placeholder="Search leads, deals, customers…"
          aria-label="Search"
          className="h-10 w-full rounded-lg border border-line bg-surface-2 pl-9 pr-3 text-sm text-content outline-none transition-colors placeholder:text-faint focus:border-brand-500/50"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid h-10 w-10 cursor-pointer place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-content"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-surface" />
        </button>
        <ThemeToggle />
        <button
          type="button"
          className="ml-1 flex items-center gap-2.5 rounded-lg p-1 pr-2.5 text-left transition-colors hover:bg-surface-2"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(135deg,var(--color-brand-500),var(--color-brand-700))] text-xs font-semibold text-white">
            AR
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-xs font-semibold text-content">Alex Rivera</span>
            <span className="block text-[11px] text-faint">Admin</span>
          </span>
        </button>
      </div>
    </header>
  );
}
