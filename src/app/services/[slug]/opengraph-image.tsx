import { getService, services } from "@/lib/site";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Nimbus service";

/** Pre-render an OG image for each service. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return ogImage({
    eyebrow: "Service",
    title: service ? service.tagline : "Digital solutions, engineered.",
    subtitle: service?.blurb,
  });
}
