"use client"

import useSWR from "swr"
import { useRef } from "react"

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
  // and added proper error handling with fallback
  const { data, error, isLoading, mutate } = useSWR("/api/matches/live", fetcher, {
    ...swrConfig,
    revalidateInterval: 2000, // Revalidate every 2 seconds instead of manual polling
  })

  const hasDataRef = useRef(false)

  if (data?.response && Array.isArray(data.response) && data.response.length > 0) {
    hasDataRef.current = true
  }

  const loading = isLoading && !hasDataRef.current

  console.log(
    "[v0] useLiveMatchesCache - data:",
    data?.response?.length || 0,
    "isLoading:",
    isLoading,
    "hasData:",
    hasDataRef.current,
    "loading:",
    loading,
    "error:",
    error?.message || "none",
  )

  return {
    matches: data?.response || [],
    loading,
    error: error?.message || null,
    mutate,
  }
}

export function useUpcomingMatchesCache(days = 1) {
  const { data, error, isLoading, mutate } = useSWR(`/api/matches/upcoming?days=${days}`, fetcher, {
    ...swrConfig,
    revalidateInterval: 5000,
  })

  return {
    matches: data?.response || [],
    loading: isLoading,
    error: error?.message || null,
    mutate,
  }
}

export function useFinishedMatchesCache(days = 1) {
  const { data, error, isLoading, mutate } = useSWR(`/api/matches/finished?days=${days}`, fetcher, {
    ...swrConfig,
    revalidateInterval: 10000, // Revalidate every 10 seconds for finished matches
  })

  return {
    matches: data?.response || [],
    loading: isLoading,
    error: error?.message || null,
    mutate,
  }
}
