import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(req) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("user_session")

    if (!sessionCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = JSON.parse(sessionCookie.value)
    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error verifying session:", error)
    return NextResponse.json({ error: "Invalid session" }, { status: 401 })
  }
}
