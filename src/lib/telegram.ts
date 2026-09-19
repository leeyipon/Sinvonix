const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * Sends a Telegram alert via the Bot API. Skips (with a warning) if the bot
 * isn't configured, so local dev without Telegram set up still works.
 */
export async function sendTelegramAlert(text: string) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn("Telegram bot token/chat id not set — skipping alert.");
    return { skipped: true as const };
  }

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API error: ${res.status} ${body}`);
  }
  return { skipped: false as const };
}

/** Escapes text before it's interpolated into an HTML-mode Telegram message. */
export function escapeTelegramHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
