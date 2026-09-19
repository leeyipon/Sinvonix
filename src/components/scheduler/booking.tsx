"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Calendar as CalendarIcon,
  Clock,
  Globe,
  Video,
  Monitor,
  Users,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ---- config ---------------------------------------------------------- */

const DURATIONS = [30, 45, 60] as const;
type Duration = (typeof DURATIONS)[number];

type Meeting = { id: string; label: string; icon: LucideIcon; dot: string };
const MEETING_TYPES: Meeting[] = [
  { id: "meet", label: "Google Meet", icon: Video, dot: "bg-emerald" },
  { id: "zoom", label: "Zoom", icon: Monitor, dot: "bg-electric" },
  { id: "teams", label: "Microsoft Teams", icon: Users, dot: "bg-indigo" },
  { id: "inperson", label: "In-person", icon: MapPin, dot: "bg-purple" },
];

const TIMEZONES = [
  "Pacific/Honolulu",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Africa/Johannesburg",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* ---- helpers --------------------------------------------------------- */

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function tzOffset(tz: string) {
  try {
    return (
      new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "shortOffset" })
        .formatToParts(new Date())
        .find((p) => p.type === "timeZoneName")?.value ?? ""
    );
  } catch {
    return "";
  }
}

function tzLabel(tz: string) {
  const city = tz.split("/").pop()?.replace(/_/g, " ") ?? tz;
  const off = tzOffset(tz);
  return off ? `${city} (${off})` : city;
}

function fmtHour(mins: number) {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

/* Deterministic mock availability so a slot is consistently free/booked. */
function isSlotBooked(date: Date, index: number) {
  const seed = date.getDate() + date.getMonth() * 31 + index * 7;
  return seed % 3 === 0;
}

/* ---- widget ---------------------------------------------------------- */

export function BookingWidget() {
  const reduce = useReducedMotion();
  const today = useMemo(() => startOfDay(new Date()), []);

  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [duration, setDuration] = useState<Duration>(30);
  const [meeting, setMeeting] = useState<Meeting>(MEETING_TYPES[0]);
  const [tz, setTz] = useState("America/New_York");
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (detected) setTz(detected);
    } catch {}
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlot(null);
  }, [duration, date]);

  const tzOptions = useMemo(
    () => (TIMEZONES.includes(tz) ? TIMEZONES : [tz, ...TIMEZONES]),
    [tz]
  );

  const cells = useMemo(() => {
    const first = new Date(view.y, view.m, 1);
    const lead = first.getDay();
    const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    const arr: (Date | null)[] = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(new Date(view.y, view.m, d));
    return arr;
  }, [view]);

  const slots = useMemo(() => {
    const out: number[] = [];
    for (let t = 9 * 60; t + duration <= 17 * 60; t += duration) out.push(t);
    return out;
  }, [duration]);

  const canGoPrev = view.y > today.getFullYear() || view.m > today.getMonth();
  function shiftMonth(delta: number) {
    setView((v) => {
      const n = new Date(v.y, v.m + delta, 1);
      return { y: n.getFullYear(), m: n.getMonth() };
    });
  }

  function dayDisabled(d: Date) {
    const wd = d.getDay();
    return d < today || wd === 0 || wd === 6;
  }

  const ready = date && slot !== null;
  const dateLabel = date
    ? date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
    : "—";

  function submitBooking() {
    const nameBad = !name.trim();
    const emailBad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setNameError(nameBad);
    setEmailError(emailBad);
    if (nameBad || emailBad || !ready) return;

    setSubmitting(true);
    setSubmitError(null);
    fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        dateLabel,
        time: fmtHour(slot as number),
        duration,
        meeting: meeting.label,
        timezone: tz,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error || "Request failed");
        }
        setConfirmed(true);
      })
      .catch((err) => setSubmitError(err instanceof Error ? err.message : "Request failed"))
      .finally(() => setSubmitting(false));
  }

  if (confirmed) {
    return (
      <ConfirmedView
        dateLabel={dateLabel}
        time={slot !== null ? fmtHour(slot) : ""}
        tz={tz}
        duration={duration}
        meeting={meeting}
        onReset={() => {
          setConfirmed(false);
          setDate(null);
          setSlot(null);
          setName("");
          setEmail("");
        }}
      />
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1.15fr]">
      {/* ---- left: config ---- */}
      <div className="border-b border-line p-6 sm:p-7 lg:border-b-0 lg:border-r">
        <Field label="Meeting duration" icon={Clock}>
          <div className="flex gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                aria-pressed={duration === d}
                className={cn(
                  "relative flex-1 cursor-pointer rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                  duration === d
                    ? "border-brand-500/50 text-content"
                    : "border-line text-muted hover:text-content"
                )}
              >
                {duration === d && (
                  <motion.span
                    layoutId="dur-pill"
                    className="absolute inset-0 -z-0 rounded-xl bg-brand-500/10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{d} min</span>
              </button>
            ))}
          </div>
        </Field>

        <Field label="Meeting type" icon={Video} className="mt-5">
          <div className="grid grid-cols-2 gap-2">
            {MEETING_TYPES.map((m) => {
              const Icon = m.icon;
              const active = meeting.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMeeting(m)}
                  aria-pressed={active}
                  className={cn(
                    "flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors",
                    active
                      ? "border-brand-500/50 bg-brand-500/[0.06] text-content"
                      : "border-line text-muted hover:text-content"
                  )}
                >
                  <span className="relative grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-2">
                    <Icon className="h-4 w-4" />
                    <span
                      className={cn(
                        "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full ring-2 ring-surface",
                        m.dot
                      )}
                    />
                  </span>
                  <span className="leading-tight">{m.label}</span>
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Time zone" icon={Globe} className="mt-5">
          <div className="relative">
            <select
              value={tz}
              onChange={(e) => setTz(e.target.value)}
              aria-label="Time zone"
              className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-line bg-surface px-3.5 pr-9 text-sm text-content outline-none transition-colors focus:border-brand-500"
            >
              {tzOptions.map((z) => (
                <option key={z} value={z}>
                  {tzLabel(z)}
                </option>
              ))}
            </select>
            <ChevronRight className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-faint" />
          </div>
        </Field>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Field label="Your name">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError(false);
              }}
              placeholder="Jane Cooper"
              className={cn(
                "h-11 w-full rounded-xl border bg-surface px-3.5 text-sm text-content outline-none transition-colors placeholder:text-faint focus:border-brand-500",
                nameError ? "border-error-400/70" : "border-line"
              )}
            />
            {nameError && <p className="mt-1 text-xs text-error">Required</p>}
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(false);
              }}
              placeholder="jane@email.com"
              className={cn(
                "h-11 w-full rounded-xl border bg-surface px-3.5 text-sm text-content outline-none transition-colors placeholder:text-faint focus:border-brand-500",
                emailError ? "border-error-400/70" : "border-line"
              )}
            />
            {emailError && <p className="mt-1 text-xs text-error">Valid email required</p>}
          </Field>
        </div>

        <div className="mt-5 rounded-2xl border border-line bg-surface-2/60 p-4 text-sm">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-faint">
            Your booking
          </p>
          <SummaryRow icon={CalendarIcon} value={dateLabel} />
          <SummaryRow
            icon={Clock}
            value={slot !== null ? `${fmtHour(slot)} · ${duration} min` : "Select a time"}
            muted={slot === null}
          />
          <SummaryRow icon={meeting.icon} value={meeting.label} />
        </div>
      </div>

      {/* ---- right: calendar + slots ---- */}
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <p className="font-display font-semibold text-content">
            {MONTHS[view.m]} {view.y}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => shiftMonth(-1)}
              disabled={!canGoPrev}
              aria-label="Previous month"
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors hover:text-content disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => shiftMonth(1)}
              aria-label="Next month"
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors hover:text-content"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((w) => (
            <span key={w} className="text-xs font-medium text-faint">
              {w}
            </span>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (!d) return <span key={`b${i}`} />;
            const disabled = dayDisabled(d);
            const selected = date?.toDateString() === d.toDateString();
            const isToday = d.toDateString() === today.toDateString();
            return (
              <button
                key={d.toISOString()}
                onClick={() => setDate(d)}
                disabled={disabled}
                aria-pressed={selected}
                aria-label={d.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
                className={cn(
                  "relative grid aspect-square cursor-pointer place-items-center rounded-xl text-sm transition-colors",
                  disabled && "cursor-not-allowed text-faint/40",
                  !disabled && !selected && "text-content hover:bg-surface-2",
                  selected &&
                    "bg-[linear-gradient(100deg,var(--color-electric),var(--color-purple))] font-semibold text-white"
                )}
              >
                {d.getDate()}
                {isToday && !selected && (
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-indigo" />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {date && (
            <motion.div
              key={date.toDateString()}
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5"
            >
              <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-faint">
                <Clock className="h-3.5 w-3.5" /> Available times
              </p>
              <div className="grid max-h-40 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
                {slots.map((t, i) => {
                  const booked = isSlotBooked(date, i);
                  const active = slot === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setSlot(t)}
                      disabled={booked}
                      aria-pressed={active}
                      className={cn(
                        "cursor-pointer rounded-lg border px-2 py-2 text-xs font-medium transition-colors",
                        booked && "cursor-not-allowed text-faint/40 line-through",
                        !booked && !active && "border-line text-content hover:border-brand-500/50",
                        active &&
                          "border-transparent bg-[linear-gradient(100deg,var(--color-electric),var(--color-purple))] text-white"
                      )}
                    >
                      {fmtHour(t)}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6">
          <Button
            onClick={submitBooking}
            disabled={!ready || submitting}
            className={cn(
              "w-full",
              !ready &&
                "bg-surface-2 text-muted opacity-100 shadow-none hover:translate-y-0 hover:bg-surface-2 hover:shadow-none"
            )}
            size="lg"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Booking…
              </>
            ) : (
              <>
                {ready ? "Confirm booking" : "Select a date & time"}
                {ready && <ArrowRight className="h-4 w-4" />}
              </>
            )}
          </Button>
          {submitError && (
            <p className="mt-3 text-sm text-error">
              Something went wrong booking your consultation — please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---- small pieces ---------------------------------------------------- */

function Field({
  label,
  icon: Icon,
  children,
  className,
}: {
  label: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-2.5 flex items-center gap-1.5 text-sm font-medium text-content">
        {Icon && <Icon className="h-4 w-4 text-indigo" />}
        {label}
      </p>
      {children}
    </div>
  );
}

function SummaryRow({
  icon: Icon,
  value,
  muted,
}: {
  icon: LucideIcon;
  value: string;
  muted?: boolean;
}) {
  return (
    <p className={cn("flex items-center gap-2 py-1", muted ? "text-faint" : "text-content")}>
      <Icon className="h-4 w-4 shrink-0 text-faint" />
      {value}
    </p>
  );
}

function ConfirmedView({
  dateLabel,
  time,
  tz,
  duration,
  meeting,
  onReset,
}: {
  dateLabel: string;
  time: string;
  tz: string;
  duration: Duration;
  meeting: Meeting;
  onReset: () => void;
}) {
  const MeetIcon = meeting.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="p-8 text-center sm:p-12"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
        className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald/15 text-emerald"
      >
        <CheckCircle2 className="h-8 w-8" />
      </motion.span>

      <h3 className="mt-6 font-display text-2xl font-semibold text-content">
        You&apos;re booked in!
      </h3>
      <p className="mt-2 text-muted">A calendar invite is on its way. We can&apos;t wait to talk.</p>

      <div className="mx-auto mt-8 max-w-sm space-y-3 rounded-2xl border border-line bg-surface-2/60 p-5 text-left text-sm">
        <Row icon={CalendarIcon} label={dateLabel} />
        <Row icon={Clock} label={`${time} · ${duration} min`} />
        <Row icon={Globe} label={tzLabel(tz)} />
        <Row icon={MeetIcon} label={meeting.label} />
      </div>

      <button
        onClick={onReset}
        className="mt-7 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-indigo transition-colors hover:text-purple"
      >
        <ChevronLeft className="h-4 w-4" /> Book another time
      </button>
    </motion.div>
  );
}

function Row({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <p className="flex items-center gap-2.5 text-content">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface text-indigo">
        <Icon className="h-4 w-4" />
      </span>
      {label}
    </p>
  );
}
