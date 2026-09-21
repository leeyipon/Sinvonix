import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Contact Sinvonix — schedule a briefing";

export default function Image() {
  return ogImage({
    eyebrow: "Contact",
    title: "Tell us what you need.",
    subtitle: "Our team typically responds within one business day — standalone product or unified platform.",
  });
}
