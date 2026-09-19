import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Generated at /robots.txt — allow all crawlers, point to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
