import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Nimbus case studies — work that moved the numbers";

export default function Image() {
  return ogImage({
    eyebrow: "Case Studies",
    title: "Work that moved the numbers.",
    subtitle: "Software, AI, growth and design engagements — the challenge, the build, and the results that followed.",
  });
}
