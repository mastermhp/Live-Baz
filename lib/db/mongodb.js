import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Invalid/missing environment variable: "MONGODB_URI"')
}

let cachedClient = null
let cachedDb = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()

  const db = client.db("livebaz")

  cachedClient = client
  cachedDb = db

  console.log("[v0] Connected to MongoDB")
  return { client, db }
}

export async function closeDatabase(client) {
  if (client) {
    await client.close()
  }
}
