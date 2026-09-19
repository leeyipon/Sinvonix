import { caseStudies, getCaseStudy } from "@/lib/work";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Nimbus case study";

/** Pre-render an OG image for each case study. */
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return ogImage({
    eyebrow: cs ? `Case Study · ${cs.category}` : "Case Study",
    title: cs ? `${cs.name}: ${cs.tagline}` : "Work that moved the numbers.",
    subtitle: cs?.result,
  });
}
