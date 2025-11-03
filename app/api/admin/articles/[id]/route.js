import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"
import { ObjectId } from "mongodb"

// GET single article
export async function GET(req, { params }) {
  try {
    const { id } = params
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.ARTICLES)

    const article = await collection.findOne({ _id: new ObjectId(id) })

    if (!article) {
      return Response.json({ error: "Article not found" }, { status: 404 })
    }

    return Response.json({ article })
  } catch (error) {
    console.error("[v0] Error fetching article:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// PUT update an article
export async function PUT(req, { params }) {
  try {
    const { id } = params
    const body = await req.json()
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.ARTICLES)

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...body,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return Response.json({ error: "Article not found" }, { status: 404 })
    }

    return Response.json({ message: "Article updated successfully" })
  } catch (error) {
    console.error("[v0] Error updating article:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// DELETE an article
export async function DELETE(req, { params }) {
  try {
    const { id } = params
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.ARTICLES)

    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return Response.json({ error: "Article not found" }, { status: 404 })
    }

    return Response.json({ message: "Article deleted successfully" })
  } catch (error) {
    console.error("[v0] Error deleting article:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
