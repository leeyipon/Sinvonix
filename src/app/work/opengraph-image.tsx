import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Sinvonix track record — live in production, not in pilot";

export default function Image() {
  return ogImage({
    eyebrow: "Track Record",
    title: "Live in production, not in pilot.",
    subtitle: "Three deployment tracks running as recurring operations across ASEAN.",
  });
}
