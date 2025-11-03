import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"

// GET all leagues
export async function GET(req) {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.LEAGUES)

    const leagues = await collection.find({}).toArray()

    return Response.json({ leagues })
  } catch (error) {
    console.error("[v0] Error fetching leagues:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// POST create a new league
export async function POST(req) {
  try {
    const body = await req.json()
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.LEAGUES)

    const league = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(league)

    return Response.json({ league: { _id: result.insertedId, ...league } }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating league:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
