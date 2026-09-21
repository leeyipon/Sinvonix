import { getService, services } from "@/lib/site";
import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Sinvonix product";

/** Pre-render an OG image for each product. */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return ogImage({
    eyebrow: "Product",
    title: service ? service.tagline : "Five products, one unified platform.",
    subtitle: service?.blurb,
  });
}
