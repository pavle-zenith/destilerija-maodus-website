import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { allRakije } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: site.domain,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.domain}/rakije`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...allRakije.map((r) => ({
      url: `${site.domain}/rakije/${r.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.domain}/kontakt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.domain}/veleprodaja`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
