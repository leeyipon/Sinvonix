import { caseStudies, getCaseStudy } from "@/lib/work";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Sinvonix track record";

/** Pre-render an OG image for each track record entry. */
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return ogImage({
    eyebrow: cs ? `Track Record · ${cs.category}` : "Track Record",
    title: cs ? `${cs.name}: ${cs.tagline}` : "Live in production, not in pilot.",
    subtitle: cs?.result,
  });
}
