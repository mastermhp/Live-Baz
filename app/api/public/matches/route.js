import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status") || "live"
    const limit = Number.parseInt(searchParams.get("limit")) || 50

    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.MATCHES)

    const matches = await collection.find({ status }).sort({ startTime: -1 }).limit(limit).toArray()

    return Response.json({ matches })
  } catch (error) {
    console.error("[v0] Error fetching matches:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
