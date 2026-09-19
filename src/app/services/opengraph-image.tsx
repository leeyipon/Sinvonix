import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Nimbus services — software, AI, marketing and design";

export default function Image() {
  return ogImage({
    eyebrow: "Services",
    title: "One partner for software, AI & growth.",
    subtitle: "Four tightly integrated capabilities so strategy, build and marketing never fall out of sync.",
  });
}
