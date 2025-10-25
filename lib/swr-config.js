"use client"

import useSWR from "swr"
import { useEffect, useRef } from "react"

const fetcher = (url) => fetch(url).then((res) => res.json())

export const swrConfig = {
  fetcher,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  dedupingInterval: 300,
  focusThrottleInterval: 1000,
  errorRetryCount: 3,
  errorRetryInterval: 2000,
}

export function useLiveMatchesCache() {
  const { data, error, isLoading, mutate } = useSWR("/api/matches/live", fetcher, {
    ...swrConfig,
    revalidateInterval: 0, // Disable SWR's interval-based revalidation
  })

  const intervalRef = useRef(null)

  useEffect(() => {
    // Set up continuous polling every 1 second for live matches
    intervalRef.current = setInterval(() => {
      mutate()
    }, 1000) // Poll every 1 second for real-time updates

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [mutate])

  return {
    matches: data?.response || [],
    loading: isLoading,
    error: error?.message || null,
    mutate,
  }
}

export function useUpcomingMatchesCache(days = 1) {
  const { data, error, isLoading, mutate } = useSWR(`/api/matches/upcoming?days=${days}`, fetcher, {
    ...swrConfig,
    revalidateInterval: 5000, // Poll upcoming matches every 5 seconds
  })

  return {
    matches: data?.response || [],
    loading: isLoading,
    error: error?.message || null,
    mutate,
  }
}
