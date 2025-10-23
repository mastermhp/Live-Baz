import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())

// Cache configuration: Drastically increased intervals to conserve quota
export const swrConfig = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60000, // 1 minute deduping
  focusThrottleInterval: 3600000, // 1 hour focus throttle
  errorRetryCount: 1,
  errorRetryInterval: 10000,
}

export function useLiveMatchesCache() {
  const { data, error, isLoading } = useSWR("/api/matches/live", fetcher, {
    ...swrConfig,
    revalidateInterval: 3600000, // Refresh every 60 minutes (was 5 min)
  })

  return {
    matches: data?.response || [],
    loading: isLoading,
    error: error?.message || null,
  }
}

export function useUpcomingMatchesCache(days = 1) {
  const { data, error, isLoading } = useSWR(`/api/matches/upcoming?days=${days}`, fetcher, {
    ...swrConfig,
    revalidateInterval: 7200000, // Refresh every 120 minutes (was 10 min)
  })

  return {
    matches: data?.response || [],
    loading: isLoading,
    error: error?.message || null,
  }
}
