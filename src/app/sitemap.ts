import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://rifabayuwedding.com/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      alternates: {
        languages: {
          id: "https://rifabayuwedding.com/id",
          en: "https://rifabayuwedding.com/en"
        }
      },
      priority: 1
    }
  ];
}
