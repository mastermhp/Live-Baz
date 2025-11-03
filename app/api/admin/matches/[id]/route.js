import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"
import { ObjectId } from "mongodb"

// GET single match
export async function GET(req, { params }) {
  try {
    const { id } = params
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.MATCHES)

    const match = await collection.findOne({ _id: new ObjectId(id) })

    if (!match) {
      return Response.json({ error: "Match not found" }, { status: 404 })
    }

    return Response.json({ match })
  } catch (error) {
    console.error("[v0] Error fetching match:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// PUT update a match
export async function PUT(req, { params }) {
  try {
    const { id } = params
    const body = await req.json()
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.MATCHES)

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
      return Response.json({ error: "Match not found" }, { status: 404 })
    }

    return Response.json({ message: "Match updated successfully" })
  } catch (error) {
    console.error("[v0] Error updating match:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// DELETE a match
export async function DELETE(req, { params }) {
  try {
    const { id } = params
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.MATCHES)

    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return Response.json({ error: "Match not found" }, { status: 404 })
    }

    return Response.json({ message: "Match deleted successfully" })
  } catch (error) {
    console.error("[v0] Error deleting match:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
