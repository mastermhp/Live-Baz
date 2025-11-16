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
    const {
      matchId,
      team1,
      team2,
      league,
      predictedWinner,
      confidence,
      analysis,
      translations,
      author,
      authorId,
    } = body

    // Validate required fields
    if (!matchId || !team1 || !team2 || !predictedWinner || !analysis) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const collection = db.collection(COLLECTIONS.PREDICTIONS)

    const newPrediction = {
      matchId,
      team1,
      team2,
      league,
      predictedWinner,
      confidence: confidence || 70,
      analysis,
      translations: translations || {},
      author: author || "User",
      authorId: authorId || null,
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
