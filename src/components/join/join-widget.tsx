"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Send,
  FileText,
  Loader2,
  CheckCircle2,
  ChevronDown,
  Paperclip,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { openings } from "@/lib/team";
import { cn } from "@/lib/utils";

type Step = "choice" | "form" | "sent";

type Form = {
  name: string;
  email: string;
  role: string;
  portfolio: string;
  message: string;
};

const EMPTY: Form = { name: "", email: "", role: "", portfolio: "", message: "" };

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_RESUME_TYPES = ".pdf,.doc,.docx";

function formatBytes(bytes: number): string {
  return bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)}KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function JoinWidget({
  role,
  onDone,
}: {
  role?: string;
  onDone: () => void;
}) {
  const [step, setStep] = useState<Step>("choice");
  const [form, setForm] = useState<Form>({ ...EMPTY, role: role ?? "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: false }));
  }

  function pickResume(file: File | undefined) {
    if (!file) return;
    if (!/\.(pdf|docx?|PDF|DOCX?)$/.test(file.name)) {
      setResumeError("Please attach a PDF, DOC, or DOCX file");
      return;
    }
    if (file.size > MAX_RESUME_BYTES) {
      setResumeError("File must be under 5MB");
      return;
    }
    setResumeError(null);
    setResume(file);
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
    setSubmitting(true);
    setError(null);
    const data = new FormData();
    data.set("name", form.name);
    data.set("email", form.email);
    data.set("role", form.role);
    data.set("portfolio", form.portfolio);
    data.set("message", form.message);
    if (resume) data.set("resume", resume);
    fetch("/api/apply", { method: "POST", body: data })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error || "Request failed");
        }
        setStep("sent");
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Request failed"))
      .finally(() => setSubmitting(false));
  }

  if (step === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center px-6 py-14 text-center sm:px-8"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
          className="grid h-16 w-16 place-items-center rounded-full bg-emerald/15 text-emerald"
        >
          <CheckCircle2 className="h-8 w-8" />
        </motion.span>
        <h2 className="mt-6 font-display text-2xl font-semibold text-content">
          Application sent!
        </h2>
        <p className="mt-2 max-w-sm text-muted">
          Thanks for reaching out — we&apos;ll review your application and get back to you
          within a few business days.
        </p>
        <button
          onClick={onDone}
          className="mt-6 cursor-pointer text-sm font-medium text-accent transition-colors hover:text-accent"
        >
          Close
        </button>
      </motion.div>
    );
  }

  if (step === "form") {
    return (
      <form onSubmit={submit} noValidate className="px-6 py-6 sm:px-8">
        <button
          type="button"
          onClick={() => setStep("choice")}
          className="mb-5 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-content"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h3 className="font-display text-lg font-semibold text-content">
          Tell us about yourself
        </h3>
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
          <Field label="Email" required error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="jane@email.com"
              className={inputCls(errors.email)}
            />
          </Field>
          <Field label="Role you're interested in">
            <Select
              value={form.role}
              onChange={(v) => set("role", v)}
              placeholder="Choose a role"
              options={openings}
            />
          </Field>
          <Field label="Portfolio / LinkedIn">
            <input
              value={form.portfolio}
              onChange={(e) => set("portfolio", e.target.value)}
              placeholder="https://…"
              className={inputCls(false)}
            />
          </Field>
          <Field label="Attach CV / Resume" className="sm:col-span-2">
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_RESUME_TYPES}
              onChange={(e) => pickResume(e.target.files?.[0])}
              className="hidden"
            />
            {resume ? (
              <div className="flex h-11 items-center justify-between rounded-xl border border-line bg-surface px-3.5 text-sm">
                <span className="flex min-w-0 items-center gap-2 text-content">
                  <FileText className="h-4 w-4 shrink-0 text-accent" />
                  <span className="truncate">{resume.name}</span>
                  <span className="shrink-0 text-xs text-faint">
                    {formatBytes(resume.size)}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setResume(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="shrink-0 cursor-pointer text-faint transition-colors hover:text-content"
                  aria-label="Remove attached file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  inputCls(!!resumeError),
                  "flex cursor-pointer items-center gap-2 text-left text-faint hover:border-brand-500/50"
                )}
              >
                <Paperclip className="h-4 w-4 shrink-0" />
                Attach a PDF, DOC, or DOCX — optional, up to 5MB
              </button>
            )}
            {resumeError && <p className="mt-1.5 text-xs text-error">{resumeError}</p>}
          </Field>
          <Field
            label="Why you're a great fit"
            required
            error={errors.message}
            className="sm:col-span-2"
          >
            <textarea
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              rows={5}
              placeholder="Tell us about your experience and why you'd like to join…"
              className={cn(inputCls(errors.message), "h-auto resize-none py-3")}
            />
          </Field>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <Button type="submit" size="lg" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
              </>
            ) : (
              <>
                Submit application
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
        {error && (
          <p className="mt-3 text-sm text-error">
            Something went wrong submitting your application — please try again, or email us
            directly at{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
            .
          </p>
        )}
      </form>
    );
  }

  return (
    <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
      <ActionCard
        icon={Send}
        title="Connect on LinkedIn"
        desc="Message us directly for a quick chat about openings and next steps."
        cta="Open LinkedIn"
        href={site.socials.linkedin}
        onClick={onDone}
      />
      <ActionCard
        icon={FileText}
        title="Submit your application"
        desc="Fill in your details and tell us why you'd be a great fit."
        cta="Fill in details"
        onClick={() => setStep("form")}
      />
    </div>
  );
}

/* ---- pieces ---------------------------------------------------------- */

function ActionCard({
  icon: Icon,
  title,
  desc,
  cta,
  href,
  onClick,
}: {
  icon: typeof Send;
  title: string;
  desc: string;
  cta: string;
  href?: string;
  onClick: () => void;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-surface-2 p-5">
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-base font-semibold text-content">{title}</h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{desc}</p>
      {href ? (
        <Button
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          variant="secondary"
          className="mt-5 w-full"
        >
          {cta}
          <ArrowRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button onClick={onClick} variant="secondary" className="mt-5 w-full">
          {cta}
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

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
