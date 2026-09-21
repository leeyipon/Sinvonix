"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CalendarDays,
  Send,
  Loader2,
  CheckCircle2,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { Container, Section } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { useScheduler } from "@/components/scheduler/scheduler-provider";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const PHONE = "+1 (415) 555-0132";

const SERVICES = [
  "Software Development",
  "AI Solutions",
  "Digital Marketing",
  "UI/UX Design",
  "Not sure yet",
];
const BUDGETS = ["< $25k", "$25k–$75k", "$75k–$150k", "$150k+", "Not sure"];

type Status = "idle" | "submitting" | "sent" | "error";

type Form = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

const EMPTY: Form = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};

export function ContactForm() {
  const scheduler = useScheduler();
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: false }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Partial<Record<keyof Form, boolean>> = {
      name: !form.name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
      message: form.message.trim().length < 10,
    };
    if (next.name || next.email || next.message) {
      setErrors(next);
      return;
    }
    setStatus("submitting");
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        setStatus("sent");
      })
      .catch(() => setStatus("error"));
  }

  return (
    <Section className="pt-0">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* ---- form ---- */}
          <div className="glass rounded-3xl p-6 sm:p-8">
            {status === "sent" ? (
              <SentState onReset={() => { setForm(EMPTY); setStatus("idle"); }} />
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 className="font-display text-xl font-semibold text-content">
                  Send us a message
                </h2>
                <p className="mt-1 text-sm text-muted">
                  Fields marked <span className="text-content">*</span> are required.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" required error={errors.name}>
                    <input
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Jane Cooper"
                      className={inputCls(errors.name)}
                    />
                  </Field>
                  <Field label="Work email" required error={errors.email}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="jane@company.com"
                      className={inputCls(errors.email)}
                    />
                  </Field>
                  <Field label="Company">
                    <input
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                      placeholder="Acme Inc."
                      className={inputCls(false)}
                    />
                  </Field>
                  <Field label="Service">
                    <Select
                      value={form.service}
                      onChange={(v) => set("service", v)}
                      placeholder="What do you need?"
                      options={SERVICES}
                    />
                  </Field>
                  <Field label="Budget" className="sm:col-span-2">
                    <Select
                      value={form.budget}
                      onChange={(v) => set("budget", v)}
                      placeholder="Estimated budget"
                      options={BUDGETS}
                    />
                  </Field>
                  <Field
                    label="Project details"
                    required
                    error={errors.message}
                    className="sm:col-span-2"
                  >
                    <textarea
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      rows={5}
                      placeholder="Tell us what you're building, your goals and timeline…"
                      className={cn(inputCls(errors.message), "h-auto resize-none py-3")}
                    />
                  </Field>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <Button type="submit" size="lg" disabled={status === "submitting"}>
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send message
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-faint">
                    We reply within <span className="text-muted">1 business day</span>.
                  </p>
                </div>
                {status === "error" && (
                  <p className="mt-3 text-sm text-error">
                    Something went wrong sending your message — please try again, or email us
                    directly at{" "}
                    <a href={`mailto:${site.email}`} className="underline">
                      {site.email}
                    </a>
                    .
                  </p>
                )}
              </form>
            )}
          </div>

          {/* ---- info panel ---- */}
          <div className="flex flex-col gap-4">
            <div className="glass rounded-3xl p-6">
              <h3 className="font-display text-base font-semibold text-content">
                Talk to us directly
              </h3>
              <div className="mt-4 space-y-3">
                <InfoRow icon={Mail} label="Email" value={site.email} href={`mailto:${site.email}`} />
                <InfoRow
                  icon={Phone}
                  label="Phone"
                  value={PHONE}
                  href={`tel:${PHONE.replace(/[^\d+]/g, "")}`}
                />
                <InfoRow icon={MapPin} label="Studio" value="Remote-first · San Francisco, CA" />
                <InfoRow icon={Clock} label="Hours" value="Mon–Fri · 9am–6pm PT" />
              </div>
            </div>

            {/* Book a call */}
            <div className="glass relative overflow-hidden rounded-3xl p-6">
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-indigo)_45%,transparent),transparent_70%)] blur-xl" />
              <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--color-brand-500),var(--color-brand-700))] text-white">
                <CalendarDays className="h-5 w-5" />
              </span>
              <h3 className="relative mt-4 font-display text-base font-semibold text-content">
                Prefer to talk it through?
              </h3>
              <p className="relative mt-1 text-sm text-muted">
                Grab a free 30-minute consultation at a time that suits you.
              </p>
              <Button
                onClick={() => scheduler.open()}
                variant="secondary"
                className="relative mt-4 w-full"
              >
                Book a consultation
                <CalendarDays className="h-4 w-4" />
              </Button>
            </div>

            {/* Socials */}
            <div className="glass rounded-3xl p-6">
              <h3 className="font-display text-base font-semibold text-content">Follow along</h3>
              <div className="mt-4 flex items-center gap-2">
                {[
                  { slug: "linkedin", href: site.socials.linkedin, label: "LinkedIn" },
                ].map(({ slug, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line bg-surface/60 transition-colors hover:border-brand-500/40"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/icons/${slug}.svg`}
                      alt={`${label} logo`}
                      width={18}
                      height={18}
                      loading="lazy"
                      className="h-[18px] w-[18px] opacity-60 grayscale transition-[opacity,filter] duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ---- pieces ---------------------------------------------------------- */

function inputCls(error?: boolean) {
  return cn(
    "h-11 w-full rounded-xl border bg-surface px-3.5 text-sm text-content outline-none transition-colors placeholder:text-faint focus:border-brand-500",
    error ? "border-error-400/70" : "border-line"
  );
}

function Field({
  label,
  required,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-xs font-medium text-muted">
        {label}
        {required && <span className="text-content"> *</span>}
        {error && <span className="ml-2 text-error">Required</span>}
      </span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          inputCls(false),
          "cursor-pointer appearance-none pr-9",
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
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] uppercase tracking-wide text-faint">{label}</span>
        <span className="block truncate text-sm font-medium text-content">{value}</span>
      </span>
    </>
  );
  const cls = "flex items-center gap-3";
  return href ? (
    <a href={href} className={cn(cls, "group transition-opacity hover:opacity-80")}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function SentState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center py-10 text-center"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
        className="grid h-16 w-16 place-items-center rounded-full bg-emerald/15 text-emerald"
      >
        <CheckCircle2 className="h-8 w-8" />
      </motion.span>
      <h2 className="mt-6 font-display text-2xl font-semibold text-content">Message sent!</h2>
      <p className="mt-2 max-w-sm text-muted">
        Thanks for reaching out — we&apos;ll get back to you within one business day.
      </p>
      <button
        onClick={onReset}
        className="mt-6 cursor-pointer text-sm font-medium text-accent transition-colors hover:text-accent"
      >
        Send another message
      </button>
    </motion.div>
  );
}
