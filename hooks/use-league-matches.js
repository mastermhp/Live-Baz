import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())

export function useLeagueMatches(leagueId) {
  const { data, error, isLoading, mutate } = useSWR(leagueId ? `/api/leagues/${leagueId}/matches` : null, fetcher, {
    revalidateInterval: 10000, // 10 seconds for live updates
    dedupingInterval: 5000,
  })

  console.log("[v0] useLeagueMatches -", leagueId, "matches:", data?.response?.length || 0, "loading:", isLoading)

  return {
    matches: data?.response || [],
    loading: isLoading,
    error: error?.message || null,
    mutate,
  }
}
