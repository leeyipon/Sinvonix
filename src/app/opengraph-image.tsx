import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Nimbus — Digital Solutions, AI Systems & Growth Marketing";

export default function Image() {
  return ogImage({
    eyebrow: "Digital studio",
    title: "Building digital solutions that grow businesses.",
    subtitle: "Custom web apps, AI-powered systems and growth marketing for ambitious teams.",
  });
}
