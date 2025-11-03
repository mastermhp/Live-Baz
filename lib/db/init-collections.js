import { connectToDatabase } from "./mongodb.js"
import { COLLECTIONS } from "./models.js"

export async function initializeCollections() {
  try {
    const { db } = await connectToDatabase()

    // Create indexes for better query performance
    const collections = await db.listCollections().toArray()
    const collectionNames = collections.map((c) => c.name)

    // Matches collection
    if (!collectionNames.includes(COLLECTIONS.MATCHES)) {
      await db.createCollection(COLLECTIONS.MATCHES)
      console.log("[v0] Created matches collection")
    }
    await db.collection(COLLECTIONS.MATCHES).createIndex({ apiId: 1 }, { unique: true })
    await db.collection(COLLECTIONS.MATCHES).createIndex({ status: 1 })
    await db.collection(COLLECTIONS.MATCHES).createIndex({ startTime: 1 })
    await db.collection(COLLECTIONS.MATCHES).createIndex({ leagueId: 1 })

    // Teams collection
    if (!collectionNames.includes(COLLECTIONS.TEAMS)) {
      await db.createCollection(COLLECTIONS.TEAMS)
      console.log("[v0] Created teams collection")
    }
    await db.collection(COLLECTIONS.TEAMS).createIndex({ apiId: 1 }, { unique: true })
    await db.collection(COLLECTIONS.TEAMS).createIndex({ name: 1 })

    // Leagues collection
    if (!collectionNames.includes(COLLECTIONS.LEAGUES)) {
      await db.createCollection(COLLECTIONS.LEAGUES)
      console.log("[v0] Created leagues collection")
    }
    await db.collection(COLLECTIONS.LEAGUES).createIndex({ apiId: 1 }, { unique: true })
    await db.collection(COLLECTIONS.LEAGUES).createIndex({ country: 1 })

    // Articles collection
    if (!collectionNames.includes(COLLECTIONS.ARTICLES)) {
      await db.createCollection(COLLECTIONS.ARTICLES)
      console.log("[v0] Created articles collection")
    }
    await db.collection(COLLECTIONS.ARTICLES).createIndex({ slug: 1 }, { unique: true })
    await db.collection(COLLECTIONS.ARTICLES).createIndex({ category: 1 })
    await db.collection(COLLECTIONS.ARTICLES).createIndex({ publishedAt: -1 })

    // Admin Users collection
    if (!collectionNames.includes(COLLECTIONS.ADMIN_USERS)) {
      await db.createCollection(COLLECTIONS.ADMIN_USERS)
      console.log("[v0] Created admin_users collection")
    }
    await db.collection(COLLECTIONS.ADMIN_USERS).createIndex({ email: 1 }, { unique: true })

    // Analytics collection
    if (!collectionNames.includes(COLLECTIONS.ANALYTICS)) {
      await db.createCollection(COLLECTIONS.ANALYTICS)
      console.log("[v0] Created analytics collection")
    }
    await db.collection(COLLECTIONS.ANALYTICS).createIndex({ date: -1 })

    console.log("[v0] All collections initialized with indexes")
  } catch (error) {
    console.error("[v0] Error initializing collections:", error.message)
  }
}
