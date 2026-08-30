import { allDocs, type Doc } from "content-collections";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://sona-ui.vercel.app";
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/components`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const docPages = allDocs
    .filter((doc: Doc) => doc.slug !== "home")
    .map((doc: Doc) => ({
      url: `${siteUrl}/docs/${doc.slug}`,
      changeFrequency: "weekly" as const,
      priority: doc.searchable ? 0.8 : 0.6,
    }));

  return [...staticPages, ...docPages];
}
