"use client";

import { useState, useEffect } from "react";
import { getLiveMatches } from "@/lib/api-football";
import { transformMatches } from "@/lib/transform-api-data";

export function useLiveMatches(refreshInterval = 30000) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const data = await getLiveMatches();
        const transformed = transformMatches(data);
        setMatches(transformed);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch matches");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
    const interval = setInterval(fetchMatches, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { matches, loading, error };
}
