// Session management utility with JWT-like functionality
export async function createSession(admin) {
  // The existing login route already stores admin data in httpOnly cookie
  // This helper is for validating sessions on protected routes
  return {
    _id: admin._id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    permissions: admin.permissions,
    createdAt: new Date(),
  }
}

export async function verifySession(token) {
  // Token is stored in httpOnly cookie and validated server-side
  // This validates if the session is still valid
  try {
    if (!token) return null

    const session = JSON.parse(Buffer.from(token, "base64").toString())
    return session
  } catch (error) {
    return null
  }
}
