import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit")) || 20
    const lang = searchParams.get("lang") || "en"

    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.ARTICLES)

    const filter = {
      publishedAt: { $exists: true, $lte: new Date() },
    }

    if (category) filter.category = category

    const articles = await collection.find(filter).sort({ publishedAt: -1 }).limit(limit).toArray()

    const translatedArticles = articles.map((article) => ({
      ...article,
      content: article.translations?.[lang] || article,
    }))

    return Response.json({ articles: translatedArticles })
  } catch (error) {
    console.error("[v0] Error fetching articles:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
