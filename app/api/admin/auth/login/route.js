import { authenticateAdmin } from "@/lib/auth/admin-auth.js"

export async function POST(req) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 })
    }

    const admin = await authenticateAdmin(email, password)

    // In production, create a JWT token here
    // For now, returning admin data
    const response = Response.json(
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
    return Response.json({ error: error.message }, { status: 401 })
  }
}
