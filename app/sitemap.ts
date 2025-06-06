import type { MetadataRoute } from "next"
import { executeQuery } from "@/lib/db"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://kollec.az"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/colleges`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admission`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
  ]

  // Dynamic pages - Articles
  const articles = await executeQuery<{ id: string; updated_at: Date }>(`
    SELECT id, updated_at FROM articles WHERE published = true
  `)

  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/news/${article.id}`,
    lastModified: new Date(article.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // Dynamic pages - Colleges
  const colleges = await executeQuery<{ id: string }>(`
    SELECT id FROM colleges WHERE is_active = true
  `)

  const collegePages = colleges.map((college) => ({
    url: `${baseUrl}/colleges/${college.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...articlePages, ...collegePages]
}
