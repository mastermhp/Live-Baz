import { NextResponse } from "next/server"

export async function GET(request) {
  try {
    const sessionCookie = request.cookies.get("admin_session")?.value

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false, error: "No session" }, { status: 401 })
    }

    // Parse the admin data from the cookie
    const admin = JSON.parse(sessionCookie)

    return NextResponse.json({
      authenticated: true,
      admin: {
        _id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        permissions: admin.permissions,
      },
    })
  } catch (error) {
    console.error("[v0] Verify error:", error)
    return NextResponse.json({ authenticated: false, error: "Invalid session" }, { status: 401 })
  }
}
