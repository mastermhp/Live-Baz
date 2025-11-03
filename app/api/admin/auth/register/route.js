import { registerAdmin } from "@/lib/auth/admin-auth.js"

export async function POST(req) {
  try {
    const body = await req.json()
    const { email, password, name, role } = body

    if (!email || !password || !name) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const admin = await registerAdmin(email, password, name, role || "editor")

    return Response.json(
      {
        message: "Admin registered successfully",
        admin: { _id: admin._id, email: admin.email, name: admin.name, role: admin.role },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Error in registration:", error)
    return Response.json({ error: error.message }, { status: 400 })
  }
}
