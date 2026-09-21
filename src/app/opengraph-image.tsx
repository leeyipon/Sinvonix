import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Sinvonix — Securing the Future of Digital Transformation";

export default function Image() {
  return ogImage({
    eyebrow: "The Sinvonix platform",
    title: "Five products. One unified platform.",
    subtitle: "Fraud intelligence, payment security, contact centre, automation and managed security for ASEAN's regulated markets.",
  });
}
