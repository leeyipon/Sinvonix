import { Resend } from "resend";

const FROM = "Sinvonix Website <onboarding@resend.dev>";
const NOTIFY_TO = process.env.LEAD_NOTIFY_EMAIL || "leeyipon02@gmail.com";

/**
 * Sends a notification email via Resend. Using the shared `onboarding@resend.dev`
 * sender means no domain verification is required, but Resend will only deliver
 * it if NOTIFY_TO is the same address the RESEND_API_KEY account was created
 * with (their sandbox restriction) — verify a domain to lift that.
 */
export async function sendNotificationEmail(opts: {
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set — skipping email notification.");
    return { skipped: true as const };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    subject: opts.subject,
    html: opts.html,
    replyTo: opts.replyTo,
    attachments: opts.attachments,
  });

  if (error) throw new Error(error.message);
  return { skipped: false as const };
}

/** Escapes text before it's interpolated into an HTML email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** A labeled field row for the notification email tables. */
export function emailRow(label: string, value: string | undefined): string {
  if (!value) return "";
  return `<tr><td style="padding:4px 12px 4px 0;color:#667;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:4px 0;color:#111;font-size:13px;">${escapeHtml(value)}</td></tr>`;
}
