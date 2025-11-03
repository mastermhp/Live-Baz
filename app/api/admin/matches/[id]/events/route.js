import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"
import { broadcastMatchUpdate, notifyGoal } from "@/lib/websocket-server.js"
import { ObjectId } from "mongodb"

export async function POST(req, { params }) {
  try {
    const { id } = params
    const body = await req.json()
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.MATCHES)

    // Add event to match
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $push: { events: { ...body, timestamp: new Date() } },
        $set: { updatedAt: new Date() },
      },
    )

    if (result.matchedCount === 0) {
      return Response.json({ error: "Match not found" }, { status: 404 })
    }

    // Broadcast the event to all connected clients in real-time
    broadcastMatchUpdate(id, {
      type: "event",
      event: body,
    })

    // If it's a goal, send special notification
    if (body.type === "goal") {
      notifyGoal(id, body)
    }

    return Response.json({ message: "Event recorded and broadcasted" })
  } catch (error) {
    console.error("[v0] Error recording event:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
