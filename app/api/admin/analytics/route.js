import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const period = searchParams.get("period") || "today" // today, week, month

    const { db } = await connectToDatabase()

    // Calculate date range based on period
    const now = new Date()
    const startDate = new Date()

    if (period === "today") {
      startDate.setHours(0, 0, 0, 0)
    } else if (period === "week") {
      startDate.setDate(now.getDate() - 7)
    } else if (period === "month") {
      startDate.setMonth(now.getMonth() - 1)
    }

    // Get analytics data
    const analyticsCollection = db.collection(COLLECTIONS.ANALYTICS)
    const articlesCollection = db.collection(COLLECTIONS.ARTICLES)

    const analytics = await analyticsCollection.find({ date: { $gte: startDate } }).toArray()

    // Get top articles
    const topArticles = await articlesCollection
      .find({ publishedAt: { $exists: true } })
      .sort({ views: -1 })
      .limit(10)
      .toArray()

    // Calculate totals
    const totalPageViews = analytics.reduce((sum, a) => sum + (a.pageViews || 0), 0)
    const totalVisitors = analytics.reduce((sum, a) => sum + (a.uniqueVisitors || 0), 0)
    const totalMatchesViewed = analytics.reduce((sum, a) => sum + (a.matchesViewed || 0), 0)

    return Response.json({
      totalPageViews,
      totalVisitors,
      totalMatchesViewed,
      topArticles,
      analyticsData: analytics,
      period,
    })
  } catch (error) {
    console.error("[v0] Error fetching analytics:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { db } = await connectToDatabase()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    await db.collection(COLLECTIONS.ANALYTICS).updateOne(
      { date: today },
      {
        $inc: {
          pageViews: body.pageViews || 0,
          uniqueVisitors: body.uniqueVisitors || 0,
          matchesViewed: body.matchesViewed || 0,
        },
        $push: {
          topArticles: body.articleId,
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true },
    )

    // Increment article views
    if (body.articleId) {
      await db.collection(COLLECTIONS.ARTICLES).updateOne({ _id: body.articleId }, { $inc: { views: 1 } })
    }

    return Response.json({ message: "Analytics recorded" })
  } catch (error) {
    console.error("[v0] Error recording analytics:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
