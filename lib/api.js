// Helper functions for fetching articles
export async function getArticle(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/admin/articles/${id}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.article || null
  } catch (error) {
    console.error("[v0] Error fetching article:", error)
    return null
  }
}

export async function getRelatedArticles(category, excludeId = null) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    const res = await fetch(`${baseUrl}/api/admin/articles?category=${category}&limit=10`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.articles || []
  } catch (error) {
    console.error("[v0] Error fetching related articles:", error)
    return []
  }
}

export async function incrementArticleViews(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    await fetch(`${baseUrl}/api/admin/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ views: { $increment: 1 } }),
    })
  } catch (error) {
    console.error("[v0] Error incrementing views:", error)
  }
}
