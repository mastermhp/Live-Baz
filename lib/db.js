import { MongoClient } from "mongodb"

const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017"
let cachedClient = null
let cachedDb = null

export async function connectDB() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    const client = new MongoClient(mongoUrl)
    await client.connect()

    const db = client.db("livebaz")

    cachedClient = client
    cachedDb = db

    return { client, db }
  } catch (error) {
    console.error("[v0] Database connection error:", error)
    throw error
  }
}

export async function getDb() {
  const { db } = await connectDB()
  return db
}

// Initialize connection and export db for convenience
let db = null

async function initDb() {
  if (!db) {
    const { db: database } = await connectDB()
    db = database
  }
  return db
}

export { db }

// Initialize on module load
initDb().catch(console.error)
