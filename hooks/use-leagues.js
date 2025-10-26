import useSWR from "swr"

const fetcher = (url) => fetch(url).then((res) => res.json())

export function useLeagues() {
  const { data, error, isLoading, mutate } = useSWR("/api/leagues", fetcher, {
    revalidateInterval: 30000, // 30 seconds
    dedupingInterval: 5000,
  })

  console.log("[v0] useLeagues - data:", data?.response?.length || 0, "loading:", isLoading)

  return {
    leagues: data?.response || [],
    loading: isLoading,
    error: error?.message || null,
    mutate,
  }
}
