"use client"

import { useFinishedMatchesCache } from "@/lib/swr-config"
import { transformMatches } from "@/lib/transform-api-data"

export function useFinishedMatches(days = 1) {
  const { matches, loading, error } = useFinishedMatchesCache(days)
  const transformed = Array.isArray(matches) ? transformMatches(matches) : []

  return {
    matches: transformed,
    loading,
    error,
  }
}
