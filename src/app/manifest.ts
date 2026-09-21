import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Generated at /manifest.webmanifest — basic PWA/install metadata. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sinvonix — Securing the Future of Digital Transformation",
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFA",
    theme_color: "#BCE927",
    icons: [{ src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" }],
  };
}
