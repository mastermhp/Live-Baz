import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db/mongodb.js"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const period = searchParams.get("period") || "week"
    const limit = Number.parseInt(searchParams.get("limit")) || 50

    const { db } = await connectToDatabase()

    // Calculate date range
    const now = new Date()
    const startDate = new Date()

    if (period === "today") {
      startDate.setHours(0, 0, 0, 0)
    } else if (period === "week") {
      startDate.setDate(now.getDate() - 7)
    } else if (period === "month") {
      startDate.setMonth(now.getMonth() - 1)
    }

    // Get user activities grouped by type
    const activities = await db
      .collection("user_activities")
      .aggregate([
        {
          $match: {
            timestamp: { $gte: startDate },
          },
        },
        {
          $group: {
            _id: "$activityType",
            count: { $sum: 1 },
            lastActivity: { $max: "$timestamp" },
          },
        },
        {
          $sort: { count: -1 },
        },
      ])
      .toArray()

    // Get active users count
    const activeUsers = await db
      .collection("user_activities")
      .aggregate([
        {
          $match: {
            timestamp: { $gte: startDate },
          },
        },
        {
          $group: {
            _id: "$userId",
          },
        },
        {
          $count: "total",
        },
      ])
      .toArray()

    // Get hourly activity distribution
    const hourlyData = await db
      .collection("user_activities")
      .aggregate([
        {
          $match: {
            timestamp: { $gte: startDate },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d %H:00",
                date: "$timestamp",
              },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $limit: 24,
        },
      ])
      .toArray()

    // Get top users by activity
    const topUsers = await db
      .collection("user_activities")
      .aggregate([
        {
          $match: {
            timestamp: { $gte: startDate },
          },
        },
        {
          $group: {
            _id: "$userId",
            activityCount: { $sum: 1 },
            lastActivity: { $max: "$timestamp" },
          },
        },
        {
          $sort: { activityCount: -1 },
        },
        {
          $limit: 10,
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            userId: "$_id",
            name: "$user.name",
            email: "$user.email",
            activityCount: 1,
            lastActivity: 1,
          },
        },
      ])
      .toArray()

    return NextResponse.json({
      period,
      activitiesByType: activities,
      activeUsersCount: activeUsers[0]?.total || 0,
      hourlyData,
      topUsers,
    })
  } catch (error) {
    console.error("[v0] Error fetching user activity analytics:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
