import { NextResponse } from "next/server";
import { sendNotificationEmail, emailRow, escapeHtml } from "@/lib/email";
import type { Lead } from "@/lib/chat/types";

function isValid(lead: Partial<Lead>): lead is Lead {
  return (
    typeof lead.name === "string" &&
    lead.name.trim().length > 0 &&
    typeof lead.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)
  );
}

export async function POST(req: Request) {
  let body: Partial<Lead>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json({ error: "name and a valid email are required" }, { status: 400 });
  }

  const band = body.band ? ` · ${body.band.toUpperCase()} lead` : "";
  const solution = body.collected?.solution;
  const size = body.collected?.size;

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:520px;">
      <h2 style="margin:0 0 4px;font-size:18px;">New chat lead${band}</h2>
      <p style="margin:0 0 16px;color:#667;font-size:13px;">Submitted via the AI consultant chat widget.</p>
      <table cellpadding="0" cellspacing="0">
        ${emailRow("Name", body.name)}
        ${emailRow("Email", body.email)}
        ${emailRow("Company", body.company)}
        ${emailRow("Phone", body.phone)}
        ${emailRow("Country", body.country)}
        ${emailRow("Industry", body.industry)}
        ${emailRow("Budget", body.budget)}
        ${emailRow("Timeline", body.timeline)}
        ${emailRow("Interested in", solution)}
        ${emailRow("Company size", size)}
        ${emailRow("Lead score", body.score !== undefined ? String(body.score) : undefined)}
      </table>
      ${body.description ? `<p style="margin:16px 0 0;font-size:13px;color:#111;"><strong>What they're building:</strong><br/>${escapeHtml(body.description)}</p>` : ""}
    </div>
  `;

  try {
    await sendNotificationEmail({
      subject: `New chat lead: ${body.name}${band}`,
      html,
      replyTo: body.email,
    });
  } catch (err) {
    console.error("Failed to send lead notification email:", err);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
