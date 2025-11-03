import { NextResponse } from "next/server"

export async function POST(req) {
  const response = NextResponse.json({ message: "Logout successful" }, { status: 200 })

  response.cookies.set("user_session", "", {
    httpOnly: true,
    maxAge: 0,
  })

  return response
}
