import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"
import { ObjectId } from "mongodb"

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword)
}

export async function registerAdmin(email, password, name, role = "editor") {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.ADMIN_USERS)

    // Check if admin already exists
    const existing = await collection.findOne({ email })
    if (existing) {
      throw new Error("Admin already exists")
    }

    const hashedPassword = await hashPassword(password)
    const admin = {
      email,
      password: hashedPassword,
      name,
      role,
      permissions: getDefaultPermissions(role),
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(admin)
    return { _id: result.insertedId, ...admin }
  } catch (error) {
    console.error("[v0] Error registering admin:", error)
    throw error
  }
}

export async function authenticateAdmin(email, password) {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.ADMIN_USERS)

    const admin = await collection.findOne({ email, active: true })
    if (!admin) {
      throw new Error("Invalid email or password")
    }

    const validPassword = await comparePassword(password, admin.password)
    if (!validPassword) {
      throw new Error("Invalid email or password")
    }

    // Update last login
    await collection.updateOne({ _id: admin._id }, { $set: { lastLogin: new Date() } })

    const { password: _, ...adminWithoutPassword } = admin
    return adminWithoutPassword
  } catch (error) {
    console.error("[v0] Error authenticating admin:", error)
    throw error
  }
}

export async function getAdminById(id) {
  try {
    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.ADMIN_USERS)

    const admin = await collection.findOne({ _id: new ObjectId(id) })
    if (!admin) {
      throw new Error("Admin not found")
    }

    const { password: _, ...adminWithoutPassword } = admin
    return adminWithoutPassword
  } catch (error) {
    console.error("[v0] Error fetching admin:", error)
    throw error
  }
}

function getDefaultPermissions(role) {
  const permissions = {
    admin: [
      "manage_articles",
      "manage_matches",
      "manage_teams",
      "manage_leagues",
      "manage_users",
      "view_analytics",
      "manage_seo",
      "manage_translations",
    ],
    editor: ["manage_articles", "manage_translations", "view_analytics"],
    analyst: ["manage_matches", "manage_teams", "view_analytics"],
  }
  return permissions[role] || []
}

export function hasPermission(admin, permission) {
  return admin?.permissions?.includes(permission) || false
}

export function hasRole(admin, role) {
  return admin?.role === role || false
}
