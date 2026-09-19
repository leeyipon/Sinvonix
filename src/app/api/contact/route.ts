import { NextResponse } from "next/server";
import { sendNotificationEmail, emailRow, escapeHtml } from "@/lib/email";
import { sendTelegramAlert, escapeTelegramHtml } from "@/lib/telegram";
import { prisma } from "@/lib/db";

type ContactBody = {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
};

function isValid(body: Partial<ContactBody>): body is ContactBody {
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
  let body: Partial<ContactBody>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "name, a valid email, and a message (10+ characters) are required" },
      { status: 400 }
    );
  }

  try {
    await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        company: body.company || "—",
        service: body.service || null,
        budget: body.budget || null,
        message: body.message,
        source: "Website form",
        status: "New",
      },
    });
    await prisma.activity.create({
      data: {
        kind: "lead",
        text: `New website lead — ${body.name}${body.company ? ` (${body.company})` : ""}`,
        who: "System",
      },
    });
  } catch (err) {
    console.error("Failed to save lead to the database:", err);
    return NextResponse.json({ error: "Failed to save your message" }, { status: 500 });
  }

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:520px;">
      <h2 style="margin:0 0 4px;font-size:18px;">New contact form submission</h2>
      <p style="margin:0 0 16px;color:#667;font-size:13px;">Submitted via the /contact page.</p>
      <table cellpadding="0" cellspacing="0">
        ${emailRow("Name", body.name)}
        ${emailRow("Email", body.email)}
        ${emailRow("Company", body.company)}
        ${emailRow("Service", body.service)}
        ${emailRow("Budget", body.budget)}
      </table>
      <p style="margin:16px 0 0;font-size:13px;color:#111;"><strong>Message:</strong><br/>${escapeHtml(body.message)}</p>
    </div>
  `;

  // The lead is already saved — an email hiccup shouldn't fail the request.
  try {
    await sendNotificationEmail({
      subject: `New contact form message from ${body.name}`,
      html,
      replyTo: body.email,
    });
  } catch (err) {
    console.error("Failed to send contact notification email:", err);
  }

  try {
    const n = escapeTelegramHtml(body.name);
    const lines = [
      `🆕 <b>New contact form lead</b>`,
      `${n}${body.company ? ` (${escapeTelegramHtml(body.company)})` : ""}`,
      escapeTelegramHtml(body.email),
      body.service ? `Service: ${escapeTelegramHtml(body.service)}` : null,
      body.budget ? `Budget: ${escapeTelegramHtml(body.budget)}` : null,
    ].filter(Boolean);
    await sendTelegramAlert(lines.join("\n"));
  } catch (err) {
    console.error("Failed to send Telegram alert:", err);
  }

  return NextResponse.json({ ok: true });
}
