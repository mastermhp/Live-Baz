import { connectToDatabase } from "./mongodb.js"
import { COLLECTIONS } from "./models.js"

export async function seedDatabaseWithSampleData() {
  try {
    const { db } = await connectToDatabase()

    // Check if leagues already exist
    const leaguesCount = await db.collection(COLLECTIONS.LEAGUES).countDocuments()
    if (leaguesCount > 0) {
      console.log("[v0] Database already seeded")
      return
    }

    // Seed leagues
    const leaguesResult = await db.collection(COLLECTIONS.LEAGUES).insertMany([
      {
        apiId: "serie-a",
        name: "Serie A",
        country: "Italy",
        countryCode: "IT",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        season: 2024,
        type: "league",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        apiId: "laliga",
        name: "LaLiga",
        country: "Spain",
        countryCode: "ES",
        logo: "https://media.api-sports.io/football/leagues/775.png",
        season: 2024,
        type: "league",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        apiId: "ligue1",
        name: "Ligue 1",
        country: "France",
        countryCode: "FR",
        logo: "https://media.api-sports.io/football/leagues/61.png",
        season: 2024,
        type: "league",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    console.log("[v0] Seeded sample data")
  } catch (error) {
    console.error("[v0] Error seeding database:", error.message)
  }
}
