import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kollec.az"

  try {
    // Use a fixed, known-good date to avoid any date parsing issues
    const fixedDate = new Date("2025-01-07T00:00:00.000Z")

    // Static pages with fixed dates
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: fixedDate,
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/colleges`,
        lastModified: fixedDate,
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/admission`,
        lastModified: fixedDate,
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/news`,
        lastModified: fixedDate,
        changeFrequency: "daily",
        priority: 0.7,
      },
    ]

    // Add some static article and college pages with known IDs
    const additionalPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/news/1`,
        lastModified: fixedDate,
        changeFrequency: "weekly",
        priority: 0.6,
      },
      {
        url: `${baseUrl}/news/2`,
        lastModified: fixedDate,
        changeFrequency: "weekly",
        priority: 0.6,
      },
      {
        url: `${baseUrl}/news/3`,
        lastModified: fixedDate,
        changeFrequency: "weekly",
        priority: 0.6,
      },
      {
        url: `${baseUrl}/colleges/1`,
        lastModified: fixedDate,
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/colleges/2`,
        lastModified: fixedDate,
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/colleges/3`,
        lastModified: fixedDate,
        changeFrequency: "monthly",
        priority: 0.7,
      },
    ]

    return [...staticPages, ...additionalPages]
  } catch (error) {
    console.error("Error generating sitemap:", error)

    // Fallback sitemap with minimal pages
    const fallbackDate = new Date("2025-01-07T00:00:00.000Z")

    return [
      {
        url: baseUrl,
        lastModified: fallbackDate,
        changeFrequency: "daily",
        priority: 1,
      },
    ]
  }
}
