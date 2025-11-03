import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"

// GET all articles
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit")) || 50
    const skip = Number.parseInt(searchParams.get("skip")) || 0

    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.ARTICLES)

    const filter = {}
    if (category) filter.category = category

    const articles = await collection.find(filter).sort({ publishedAt: -1 }).limit(limit).skip(skip).toArray()

    const total = await collection.countDocuments(filter)

    return Response.json({ articles, total, limit, skip })
  } catch (error) {
    console.error("[v0] Error fetching articles:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// POST create a new article
export async function POST(req) {
  try {
    const body = await req.json()
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.ARTICLES)

    const slug = body.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")

    const article = {
      ...body,
      slug,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(article)

    return Response.json({ article: { _id: result.insertedId, ...article } }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating article:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
