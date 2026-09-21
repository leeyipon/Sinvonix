"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "@/components/chat/chat-provider";
import type { Lead } from "@/lib/chat/types";

const BUDGETS = ["Evaluating options", "Planned this fiscal year", "Approved & ready to move", "Not sure"];
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "6+ months", "Flexible"];

const EMPTY: Lead = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  industry: "",
  budget: "",
  timeline: "",
  description: "",
};

/** Inline lead-qualification form. Persists to the localStorage "CRM". */
export function LeadForm({ active }: { active: boolean }) {
  const { sendLead } = useChat();
  const [form, setForm] = useState<Lead>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Lead, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof Lead>(key: K, value: Lead[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: false }));
  }

  function submit() {
    const nextErrors: Partial<Record<keyof Lead, boolean>> = {
      name: !form.name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    };
    if (nextErrors.name || nextErrors.email) {
      setErrors(nextErrors);
      return;
    }
    setSubmitted(true);
    sendLead(form);
  }

  if (submitted) {
    return (
      <div className="mt-2.5 flex items-center gap-2.5 rounded-2xl border border-emerald/30 bg-emerald/[0.06] p-4">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald" />
        <p className="text-[13px] text-content">
          Thanks, {form.name.split(" ")[0]}! Your details are saved — we&apos;ll be in touch shortly.
        </p>
      </div>
    );
  }

  const locked = !active;

  return (
    <div className="mt-2.5 space-y-2 rounded-2xl border border-line bg-surface-2/50 p-3.5">
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="Full name *" value={form.name} onChange={(v) => set("name", v)} error={errors.name} disabled={locked} />
        <Input placeholder="Company" value={form.company} onChange={(v) => set("company", v)} disabled={locked} />
        <Input placeholder="Email *" type="email" value={form.email} onChange={(v) => set("email", v)} error={errors.email} disabled={locked} />
        <Input placeholder="Phone" type="tel" value={form.phone} onChange={(v) => set("phone", v)} disabled={locked} />
        <Input placeholder="Country" value={form.country} onChange={(v) => set("country", v)} disabled={locked} />
        <Input placeholder="Industry" value={form.industry} onChange={(v) => set("industry", v)} disabled={locked} />
        <Select placeholder="Buying stage" value={form.budget} options={BUDGETS} onChange={(v) => set("budget", v)} disabled={locked} />
        <Select placeholder="Timeline" value={form.timeline} options={TIMELINES} onChange={(v) => set("timeline", v)} disabled={locked} />
      </div>
      <textarea
        placeholder="Briefly, what are you looking to solve?"
        value={form.description}
        disabled={locked}
        onChange={(e) => set("description", e.target.value)}
        rows={2}
        className="w-full resize-none rounded-lg border border-line bg-surface px-2.5 py-2 text-[13px] text-content outline-none transition-colors placeholder:text-faint focus:border-brand-500 disabled:opacity-60"
      />
      <button
        onClick={submit}
        disabled={locked}
        className="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[linear-gradient(100deg,var(--color-electric),var(--color-indigo),var(--color-purple))] px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-95 disabled:cursor-default disabled:opacity-50"
      >
        <Send className="h-3.5 w-3.5" /> Send my details
      </button>
      <p className="text-center text-[10.5px] text-faint">
        Stored securely · we&apos;ll never share your information.
      </p>
    </div>
  );
}

function Input({
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  disabled,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: boolean;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "h-9 w-full rounded-lg border bg-surface px-2.5 text-[13px] text-content outline-none transition-colors placeholder:text-faint focus:border-brand-500 disabled:opacity-60",
        error ? "border-error-400/70" : "border-line"
      )}
    />
  );
}

function Select({
  placeholder,
  value,
  options,
  onChange,
  disabled,
}: {
  placeholder: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "h-9 w-full cursor-pointer rounded-lg border border-line bg-surface px-2 text-[13px] outline-none transition-colors focus:border-brand-500 disabled:opacity-60",
        value ? "text-content" : "text-faint"
      )}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o} className="text-content">
          {o}
        </option>
      ))}
    </select>
  );
}
