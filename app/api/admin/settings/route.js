import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/db/mongodb"

export async function GET() {
  try {
    const db = await getDatabase()
    const settings = await db.collection("settings").findOne({ type: "global" })
    
    return NextResponse.json({ settings: settings || {} })
  } catch (error) {
    console.error("Failed to fetch settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const db = await getDatabase()
    
    await db.collection("settings").updateOne(
      { type: "global" },
      { $set: { ...body, type: "global", updatedAt: new Date() } },
      { upsert: true }
    )
    
    return NextResponse.json({ success: true, message: "Settings saved successfully" })
  } catch (error) {
    console.error("Failed to save settings:", error)
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
  }
}
