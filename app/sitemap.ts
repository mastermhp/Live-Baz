import type { MetadataRoute } from "next"

async function getArticles() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/admin/articles?limit=500`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.articles || []
  } catch (error) {
    console.error("[v0] Error fetching articles for sitemap:", error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles()

  const baseUrl = "https://your-domain.com"

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseUrl}/live`,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/leagues`,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/teams`,
      changeFrequency: "daily",
      priority: 0.7,
    },
  ]

  // Dynamic article pages
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article._id}`,
    lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(article.createdAt),
    changeFrequency: "weekly" as const,
    priority: article.featured ? 0.9 : 0.6,
  }))

  return [...staticPages, ...articlePages]
}
