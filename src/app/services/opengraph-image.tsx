import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "The Sinvonix platform — CORDON, AEVIX, Conversa CI Hub, Chronicle AI, Managed Security";

export default function Image() {
  return ogImage({
    eyebrow: "Platform",
    title: "Five products, one unified platform.",
    subtitle: "Fraud intelligence, payment security, contact centre, automation and managed security.",
  });
}
