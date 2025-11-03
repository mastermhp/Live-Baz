import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"
import { broadcastMatchUpdate, notifyMatchStatusChange } from "@/lib/websocket-server.js"
import { ObjectId } from "mongodb"

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
          score: body.score,
          status: body.status,
          odds: body.odds,
          winPercentages: body.winPercentages,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return Response.json({ error: "Match not found" }, { status: 404 })
    }

    // Broadcast score update to all connected clients
    broadcastMatchUpdate(id, {
      type: "score-update",
      score: body.score,
      odds: body.odds,
      winPercentages: body.winPercentages,
    })

    // If status changed, notify clients
    if (body.status) {
      notifyMatchStatusChange(id, body.status)
    }

    return Response.json({ message: "Score updated and broadcasted" })
  } catch (error) {
    console.error("[v0] Error updating score:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
