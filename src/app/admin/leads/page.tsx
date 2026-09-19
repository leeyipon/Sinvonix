"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Paperclip } from "lucide-react";
import { timeAgo, type Lead, type LeadStatus } from "@/lib/crm";
import { cn } from "@/lib/utils";

type Application = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  portfolio: string | null;
  message: string;
  resumeName: string | null;
  createdAt: string;
};

const statusStyles: Record<LeadStatus, string> = {
  New: "bg-brand-500/12 text-accent",
  Contacted: "bg-warning-500/12 text-warning-500",
  Qualified: "bg-success-500/12 text-success-500",
  Unqualified: "bg-surface-2 text-faint",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [applications, setApplications] = useState<Application[] | null>(null);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => setLeads(data.leads ?? []))
      .catch(() => setLeads([]));
    fetch("/api/admin/applications")
      .then((res) => res.json())
      .then((data) => setApplications(data.applications ?? []))
      .catch(() => setApplications([]));
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="font-display text-2xl font-semibold text-content">Leads</h1>
      <p className="mt-1 text-sm text-muted">
        Sales leads from the contact form, and candidates from the Join Our Team dialog.
      </p>

      {/* Job applications */}
      <section className="mt-6 rounded-xl border border-line bg-surface p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-content">Job applications</h2>
          <span className="text-xs text-faint">
            {applications === null ? "Loading…" : `${applications.length} total`}
          </span>
        </div>

        {applications === null ? (
          <p className="mt-4 text-sm text-muted">Loading applications…</p>
        ) : applications.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            No applications yet — they&apos;ll show up here as soon as someone submits the
            &quot;Join Our Team&quot; form on the website.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
                  <th className="pb-2 pr-4 font-medium">Name</th>
                  <th className="pb-2 pr-4 font-medium">Role</th>
                  <th className="pb-2 pr-4 font-medium">Contact</th>
                  <th className="pb-2 pr-4 font-medium">Message</th>
                  <th className="pb-2 pr-4 font-medium">Resume</th>
                  <th className="pb-2 pr-4 font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {applications.map((a) => (
                  <tr key={a.id}>
                    <td className="py-3 pr-4 font-medium text-content">{a.name}</td>
                    <td className="py-3 pr-4 text-muted">{a.role || "—"}</td>
                    <td className="py-3 pr-4">
                      <a
                        href={`mailto:${a.email}`}
                        className="text-accent transition-colors hover:underline"
                      >
                        {a.email}
                      </a>
                      {a.portfolio && (
                        <a
                          href={a.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 flex items-center gap-1 text-xs text-faint transition-colors hover:text-content"
                        >
                          Portfolio <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </td>
                    <td className="max-w-xs truncate py-3 pr-4 text-muted" title={a.message}>
                      {a.message}
                    </td>
                    <td className="py-3 pr-4">
                      {a.resumeName ? (
                        <a
                          href={`/api/admin/applications/${a.id}/resume`}
                          className="flex items-center gap-1 text-xs text-accent transition-colors hover:underline"
                        >
                          <Paperclip className="h-3 w-3 shrink-0" />
                          <span className="max-w-[10ch] truncate">{a.resumeName}</span>
                        </a>
                      ) : (
                        <span className="text-xs text-faint">—</span>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-xs text-faint">
                      {timeAgo(new Date(a.createdAt).getTime())}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Website & sales leads */}
      <section className="mt-4 rounded-xl border border-line bg-surface p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-content">Website & sales leads</h2>
          <span className="text-xs text-faint">
            {leads === null ? "Loading…" : `${leads.length} total`}
          </span>
        </div>

        {leads === null ? (
          <p className="mt-4 text-sm text-muted">Loading leads…</p>
        ) : leads.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No leads yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-faint">
                  <th className="pb-2 pr-4 font-medium">Name</th>
                  <th className="pb-2 pr-4 font-medium">Company</th>
                  <th className="pb-2 pr-4 font-medium">Service</th>
                  <th className="pb-2 pr-4 font-medium">Source</th>
                  <th className="pb-2 pr-4 font-medium">Status</th>
                  <th className="pb-2 pr-4 font-medium">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {leads.map((l) => (
                  <tr key={l.id}>
                    <td className="py-3 pr-4 font-medium text-content">{l.name}</td>
                    <td className="py-3 pr-4 text-muted">{l.company}</td>
                    <td className="py-3 pr-4 text-muted">{l.service || "—"}</td>
                    <td className="py-3 pr-4 text-muted">{l.source}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          statusStyles[l.status]
                        )}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-xs text-faint">{timeAgo(l.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
