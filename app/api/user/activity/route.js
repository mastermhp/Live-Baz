import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"
import { ObjectId } from "mongodb"

export async function POST(req) {
  try {
    const body = await req.json()
    const { userId, activityType, data } = body

    if (!userId || !activityType) {
      return NextResponse.json({ error: "userId and activityType are required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Create activity record
    const activity = {
      _id: new ObjectId(),
      userId: new ObjectId(userId),
      activityType, // 'page_view', 'article_viewed', 'match_viewed', 'prediction_viewed'
      data: data || {},
      timestamp: new Date(),
      ipAddress: req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown",
      userAgent: req.headers.get("user-agent"),
    }

    await db.collection("user_activities").insertOne(activity)

    // Update user last activity
    await db.collection(COLLECTIONS.USERS).updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: { lastActivity: new Date() },
        $inc: { totalActivities: 1 },
      },
    )

    return NextResponse.json({ message: "Activity recorded" }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error recording activity:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
