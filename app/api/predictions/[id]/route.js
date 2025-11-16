import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"
import { ObjectId } from "mongodb"

export async function DELETE(req, { params }) {
  try {
    const { id } = params
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.PREDICTIONS)

    const result = await collection.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return Response.json({ error: "Prediction not found" }, { status: 404 })
    }

    return Response.json({ success: true, message: "Prediction deleted" })
  } catch (error) {
    console.error("[v0] Error deleting prediction:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
