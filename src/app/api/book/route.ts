import { NextResponse } from "next/server";
import { sendNotificationEmail, emailRow } from "@/lib/email";
import { sendTelegramAlert, escapeTelegramHtml } from "@/lib/telegram";
import { prisma } from "@/lib/db";

type BookBody = {
  name: string;
  email: string;
  dateLabel: string;
  time: string;
  duration: number;
  meeting: string;
  timezone: string;
};

function isValid(body: Partial<BookBody>): body is BookBody {
  return (
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    typeof body.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) &&
    typeof body.dateLabel === "string" &&
    body.dateLabel.trim().length > 0 &&
    typeof body.time === "string" &&
    body.time.trim().length > 0 &&
    typeof body.duration === "number" &&
    typeof body.meeting === "string" &&
    typeof body.timezone === "string"
  );
}

export async function POST(req: Request) {
  let body: Partial<BookBody>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json({ error: "Missing or invalid booking details" }, { status: 400 });
  }

  try {
    await prisma.booking.create({
      data: {
        name: body.name,
        email: body.email,
        dateLabel: body.dateLabel,
        time: body.time,
        duration: body.duration,
        meeting: body.meeting,
        timezone: body.timezone,
      },
    });
    await prisma.activity.create({
      data: {
        kind: "task",
        text: `New consultation booked — ${body.name} (${body.dateLabel}, ${body.time})`,
        who: "System",
      },
    });
  } catch (err) {
    console.error("Failed to save booking to the database:", err);
    return NextResponse.json({ error: "Failed to save your booking" }, { status: 500 });
  }

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:520px;">
      <h2 style="margin:0 0 4px;font-size:18px;">New consultation booking</h2>
      <p style="margin:0 0 16px;color:#667;font-size:13px;">Submitted via the scheduler widget.</p>
      <table cellpadding="0" cellspacing="0">
        ${emailRow("Name", body.name)}
        ${emailRow("Email", body.email)}
        ${emailRow("Date", body.dateLabel)}
        ${emailRow("Time", `${body.time} (${body.timezone})`)}
        ${emailRow("Duration", `${body.duration} min`)}
        ${emailRow("Meeting type", body.meeting)}
      </table>
    </div>
  `;

  // The booking is already saved — an email hiccup shouldn't fail the request.
  try {
    await sendNotificationEmail({
      subject: `New booking from ${body.name} — ${body.dateLabel}`,
      html,
      replyTo: body.email,
    });
  } catch (err) {
    console.error("Failed to send booking notification email:", err);
  }

  try {
    const lines = [
      `📅 <b>New consultation booked</b>`,
      escapeTelegramHtml(body.name),
      escapeTelegramHtml(body.email),
      `${escapeTelegramHtml(body.dateLabel)} · ${escapeTelegramHtml(body.time)} (${escapeTelegramHtml(body.timezone)})`,
      `${body.duration} min · ${escapeTelegramHtml(body.meeting)}`,
    ];
    await sendTelegramAlert(lines.join("\n"));
  } catch (err) {
    console.error("Failed to send Telegram alert:", err);
  }

  return NextResponse.json({ ok: true });
}
