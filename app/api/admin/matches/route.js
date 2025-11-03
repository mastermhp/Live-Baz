import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"
import { ObjectId } from "mongodb"

// GET all matches with filters
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")
    const leagueId = searchParams.get("leagueId")
    const limit = Number.parseInt(searchParams.get("limit")) || 50
    const skip = Number.parseInt(searchParams.get("skip")) || 0

    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.MATCHES)

    const filter = {}
    if (status) filter.status = status
    if (leagueId) filter.leagueId = new ObjectId(leagueId)

    const matches = await collection.find(filter).sort({ startTime: -1 }).limit(limit).skip(skip).toArray()

    const total = await collection.countDocuments(filter)

    return Response.json({ matches, total, limit, skip })
  } catch (error) {
    console.error("[v0] Error fetching matches:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// POST create a new match
export async function POST(req) {
  try {
    const body = await req.json()
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.MATCHES)

    const match = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(match)

    return Response.json({ match: { _id: result.insertedId, ...match } }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating match:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
