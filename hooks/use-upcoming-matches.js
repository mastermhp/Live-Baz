"use client"

import { useUpcomingMatchesCache } from "@/lib/swr-config"
import { transformMatches } from "@/lib/transform-api-data"

export function useUpcomingMatches(days = 1) {
  const { matches, loading, error } = useUpcomingMatchesCache(days)
  const transformed = Array.isArray(matches) ? transformMatches(matches) : []

  console.log(
    "[v0] useUpcomingMatches - matches:",
    matches?.length,
    "transformed:",
    transformed?.length,
    "loading:",
    loading,
  )

  return {
    matches: transformed,
    loading,
    error,
  }
}
