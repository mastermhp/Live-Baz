"use client"

import { useLiveMatchesCache } from "@/lib/swr-config"
import { transformMatches } from "@/lib/transform-api-data"

export function useLiveMatches() {
  const { matches, loading, error } = useLiveMatchesCache()
  const transformed = transformMatches({ response: matches })

  return {
    matches: transformed,
    loading,
    error,
  }
}
