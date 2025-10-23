import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())

// Cache configuration: 5 minute revalidation, 30 second stale-while-revalidate
export const swrConfig = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60000, // 1 minute deduping
  focusThrottleInterval: 300000, // 5 minute focus throttle
  errorRetryCount: 2,
  errorRetryInterval: 5000,
}

// Custom hook for live matches with centralized caching
export function useLiveMatchesCache() {
  const { data, error, isLoading } = useSWR("/api/matches/live", fetcher, {
    ...swrConfig,
    revalidateInterval: 300000, // Only refresh every 5 minutes
  })

  return {
    matches: data?.response || [],
    loading: isLoading,
    error: error?.message || null,
  }
}

// Custom hook for upcoming matches with centralized caching
export function useUpcomingMatchesCache(days = 1) {
  const { data, error, isLoading } = useSWR(`/api/matches/upcoming?days=${days}`, fetcher, {
    ...swrConfig,
    revalidateInterval: 600000, // Only refresh every 10 minutes
  })

  return {
    matches: data?.response || [],
    loading: isLoading,
    error: error?.message || null,
  }
}
