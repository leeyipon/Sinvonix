import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Contact Nimbus — start a project or book a consultation";

export default function Image() {
  return ogImage({
    eyebrow: "Contact",
    title: "Let's build something worth talking about.",
    subtitle: "Tell us about your project — we reply within one business day, or book a free consultation.",
  });
}
