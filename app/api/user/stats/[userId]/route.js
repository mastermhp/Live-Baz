import { db } from "@/lib/db"

export async function GET(req, { params }) {
  try {
    const { userId } = params

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID required" }), { status: 400 })
    }

    // Fetch user statistics from activities collection
    const activities = await db.collection("user_activities").find({ userId }).sort({ timestamp: -1 }).toArray()

    const stats = {
      pageViews: activities.filter((a) => a.activityType === "page_view").length,
      totalActivities: activities.length,
      articlesRead: activities.filter((a) => a.activityType === "article_view").length,
      matchesViewed: activities.filter((a) => a.activityType === "match_view").length,
      recentActivities: activities.slice(0, 10),
    }

    return new Response(JSON.stringify(stats), { status: 200 })
  } catch (error) {
    console.error("[v0] Failed to fetch user stats:", error)
    return new Response(JSON.stringify({ error: "Failed to fetch stats" }), { status: 500 })
  }
}
