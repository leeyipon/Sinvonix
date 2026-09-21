import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "About Sinvonix — built by operators who understand ASEAN's regulated markets";

export default function Image() {
  return ogImage({
    eyebrow: "About",
    title: "Built by operators, not vendors.",
    subtitle: "Over 50 years of combined experience operating across ASEAN's toughest regulated markets.",
  });
}
