import { connectToDatabase } from "@/lib/db/mongodb.js"
import { COLLECTIONS } from "@/lib/db/models.js"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get("limit")) || 20
    const matchId = searchParams.get("matchId")
    const lang = searchParams.get("lang") || "en"

    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.PREDICTIONS)

    const filter = {}
    if (matchId) filter.matchId = matchId

    const predictions = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()

    // Translate predictions based on language
    const translatedPredictions = predictions.map((prediction) => ({
      ...prediction,
      analysis: prediction.translations?.[lang]?.analysis || prediction.analysis,
      title: prediction.translations?.[lang]?.title || prediction.title,
    }))

    return Response.json({ predictions: translatedPredictions })
  } catch (error) {
    console.error("[v0] Error fetching predictions:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.matchId || !body.team1 || !body.team2 || !body.predictedWinner) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.PREDICTIONS)

    const newPrediction = {
      matchId: body.matchId,
      team1: body.team1,
      team2: body.team2,
      league: body.league || "",
      matchDate: body.matchDate || new Date().toISOString(),
      venue: body.venue || "",
      predictedWinner: body.predictedWinner,
      confidence: body.confidence || 70,
      winProbability: body.winProbability || { team1: 0, draw: 0, team2: 0 },
      expertTip: body.expertTip || "",
      odds: body.odds || "",
      team1Stats: body.team1Stats || {},
      team2Stats: body.team2Stats || {},
      predictedLineups: body.predictedLineups || { team1: "", team2: "" },
      recentForm: body.recentForm || { team1: "", team2: "" },
      keyStats: body.keyStats || [],
      translations: body.translations || {
        en: { title: "", analysis: "" },
        fa: { title: "", analysis: "" },
        ar: { title: "", analysis: "" },
      },
      author: body.author || "User",
      authorId: body.authorId || null,
      createdAt: new Date(),
      result: "pending",
      likes: 0,
      views: 0,
    }

    const result = await collection.insertOne(newPrediction)

    return Response.json({
      success: true,
      predictionId: result.insertedId,
      message: "Prediction submitted successfully",
    })
  } catch (error) {
    console.error("[v0] Error creating prediction:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
