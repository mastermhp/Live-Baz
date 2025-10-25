import useSWR from "swr"

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
    revalidateInterval: 2000,
  })

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
    revalidateInterval: 3000,
  })

  return {
    matches: data?.response || [],
    loading: isLoading,
    error: error?.message || null,
    mutate,
  }
}
