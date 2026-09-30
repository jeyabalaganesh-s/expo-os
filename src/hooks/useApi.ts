// src/hooks/useApi.ts
import { useState, useEffect } from "react";

export function useApi<T = any>(url: string, deps: any[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    // TODO: replace fetch with axios and auth headers
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Network error");
        return r.json();
      })
      .then((json) => mounted && setData(json))
      .catch((err) => mounted && setError(err))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
