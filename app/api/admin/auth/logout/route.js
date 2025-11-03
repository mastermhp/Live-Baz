export async function POST(req) {
  const response = Response.json({ message: "Logged out successfully" })

  response.cookies.set("admin_session", "", {
    httpOnly: true,
    maxAge: 0,
  })

  return response
}
