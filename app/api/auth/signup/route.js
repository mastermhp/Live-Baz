import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"
import { ObjectId } from "mongodb"

export async function POST(req) {
  try {
    const body = await req.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const usersCollection = db.collection(COLLECTIONS.USERS)

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const user = {
      _id: new ObjectId(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
      lastLogin: new Date(),
      isActive: true,
      preferences: {
        favoriteLeagues: [],
        favoriteTeams: [],
        notifications: true,
      },
    }

    await usersCollection.insertOne(user)

    // Create user session
    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 },
    )

    // Set httpOnly cookie with user session
    response.cookies.set(
      "user_session",
      JSON.stringify({
        userId: user._id.toString(),
        email: user.email,
        name: user.name,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    )

    return response
  } catch (error) {
    console.error("[v0] Error in signup:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
