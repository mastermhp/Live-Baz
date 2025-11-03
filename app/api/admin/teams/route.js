import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"

// GET all teams
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Number.parseInt(searchParams.get("limit")) || 100
    const skip = Number.parseInt(searchParams.get("skip")) || 0

    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.TEAMS)

    const teams = await collection.find({}).limit(limit).skip(skip).toArray()

    const total = await collection.countDocuments()

    return Response.json({ teams, total, limit, skip })
  } catch (error) {
    console.error("[v0] Error fetching teams:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// POST create a new team
export async function POST(req) {
  try {
    const body = await req.json()
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.TEAMS)

    const team = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(team)

    return Response.json({ team: { _id: result.insertedId, ...team } }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating team:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
