import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "About Nimbus — the team building tomorrow's technology";

export default function Image() {
  return ogImage({
    eyebrow: "About",
    title: "Meet the people building tomorrow's technology.",
    subtitle: "Engineers, designers, QA specialists and strategists creating scalable digital products.",
  });
}
