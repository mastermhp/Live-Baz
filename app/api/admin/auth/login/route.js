import { NextResponse } from "next/server"
import { authenticateAdmin } from "@/lib/auth/admin-auth.js"

export async function POST(req) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const admin = await authenticateAdmin(email, password)

    const response = NextResponse.json(
      {
        message: "Login successful",
        admin,
      },
      { status: 200 },
    )

    // Set httpOnly cookie with admin session
    response.cookies.set("admin_session", JSON.stringify(admin), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return response
  } catch (error) {
    console.error("[v0] Error in login:", error)
    return NextResponse.json({ error: error.message }, { status: 401 })
  }
}
