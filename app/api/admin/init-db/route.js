import { initializeCollections } from "@/lib/db/init-collections.js"
import { seedDatabaseWithSampleData } from "@/lib/db/seed-data.js"

export async function POST(req) {
  try {
    await initializeCollections()
    await seedDatabaseWithSampleData()

    return Response.json({ message: "Database initialized successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Database init error:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
