import { NextResponse } from "next/server";
import { sendNotificationEmail, emailRow, escapeHtml } from "@/lib/email";
import { sendTelegramAlert, escapeTelegramHtml } from "@/lib/telegram";
import { prisma } from "@/lib/db";

type ApplyBody = {
  name: string;
  email: string;
  role?: string;
  portfolio?: string;
  message: string;
};

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function isValid(body: Partial<ApplyBody>): body is ApplyBody {
  return (
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    typeof body.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) &&
    typeof body.message === "string" &&
    body.message.trim().length >= 10
  );
}

export async function POST(req: Request) {
  const form = await req.formData();
  const body: Partial<ApplyBody> = {
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    role: String(form.get("role") ?? "") || undefined,
    portfolio: String(form.get("portfolio") ?? "") || undefined,
    message: String(form.get("message") ?? ""),
  };

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "name, a valid email, and a message (10+ characters) are required" },
      { status: 400 }
    );
  }

  const resume = form.get("resume");
  let resumeName: string | null = null;
  let resumeType: string | null = null;
  let resumeBuffer: Buffer | null = null;

  if (resume instanceof File && resume.size > 0) {
    if (!ALLOWED_RESUME_TYPES.has(resume.type)) {
      return NextResponse.json(
        { error: "Resume must be a PDF, DOC, or DOCX file" },
        { status: 400 }
      );
    }
    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: "Resume must be under 5MB" }, { status: 400 });
    }
    resumeName = resume.name;
    resumeType = resume.type;
    resumeBuffer = Buffer.from(await resume.arrayBuffer());
  }

  let applicationId: string;
  try {
    const created = await prisma.jobApplication.create({
      data: {
        name: body.name,
        email: body.email,
        role: body.role || null,
        portfolio: body.portfolio || null,
        message: body.message,
        resumeName,
        resumeType,
        resumeData: resumeBuffer ? new Uint8Array(resumeBuffer) : null,
      },
    });
    applicationId = created.id;
    await prisma.activity.create({
      data: {
        kind: "lead",
        text: `New job application — ${body.name}${body.role ? ` (${body.role})` : ""}`,
        who: "System",
      },
    });
  } catch (err) {
    console.error("Failed to save application to the database:", err);
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
  }

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:520px;">
      <h2 style="margin:0 0 4px;font-size:18px;">New job application</h2>
      <p style="margin:0 0 16px;color:#667;font-size:13px;">Submitted via the Join Our Team dialog.</p>
      <table cellpadding="0" cellspacing="0">
        ${emailRow("Name", body.name)}
        ${emailRow("Email", body.email)}
        ${emailRow("Role", body.role)}
        ${emailRow("Portfolio / LinkedIn", body.portfolio)}
        ${emailRow("Resume", resumeName ?? undefined)}
      </table>
      <p style="margin:16px 0 0;font-size:13px;color:#111;"><strong>Message:</strong><br/>${escapeHtml(body.message)}</p>
    </div>
  `;

  // The application is already saved — an email hiccup shouldn't fail the request.
  try {
    await sendNotificationEmail({
      subject: `New application from ${body.name}${body.role ? ` — ${body.role}` : ""}`,
      html,
      replyTo: body.email,
      attachments:
        resumeBuffer && resumeName
          ? [{ filename: resumeName, content: resumeBuffer }]
          : undefined,
    });
  } catch (err) {
    console.error("Failed to send application notification email:", err);
  }

  try {
    const lines = [
      `📄 <b>New job application</b>`,
      escapeTelegramHtml(body.name),
      escapeTelegramHtml(body.email),
      body.role ? `Role: ${escapeTelegramHtml(body.role)}` : null,
      resumeName ? `Resume attached: ${escapeTelegramHtml(resumeName)}` : null,
    ].filter(Boolean);
    await sendTelegramAlert(lines.join("\n"));
  } catch (err) {
    console.error("Failed to send Telegram alert:", err);
  }

  return NextResponse.json({ ok: true, id: applicationId });
}
