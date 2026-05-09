"use client";

import { apiFetch } from "@/lib/fetchClient";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useApiFetch(path, options = {}) {
  const {
    auth = true,
    isFormData = false,
    deps = [],
    retries = 2,
    retryDelay = 1000,
  } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mounted = useRef(false);
  const retryCountRef = useRef(0);

  const load = useCallback(
    async (opts = {}, attempt = 0) => {
      if (attempt === 0) {
        setLoading(true);
        setError(null);
        retryCountRef.current = 0;
      }

      try {
        const d = await apiFetch(path, { auth, isFormData, ...opts });
        if (!mounted.current) return null;
        setData(d);
        setError(null);
        setLoading(false);
        return d;
      } catch (err) {
        if (!mounted.current) return null;

        // Retry logic for network errors
        if (
          attempt < retries &&
          (err.name === "TypeError" || err.message?.includes("Failed to fetch"))
        ) {
          retryCountRef.current = attempt + 1;
          await new Promise((resolve) =>
            setTimeout(resolve, retryDelay * (attempt + 1)),
          );
          return load(opts, attempt + 1);
        }

        setError({
          message: err.message || "Failed to load data",
          status: err.status,
          originalError: err,
        });
        setLoading(false);
        return null;
      }
    },
    [path, auth, isFormData, retries, retryDelay],
  );

  useEffect(() => {
    mounted.current = true;
    load();
    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load, ...deps]);

  const refetch = useCallback(
    async (opts = {}) => {
      return load(opts, 0);
    },
    [load],
  );

  return { data, loading, error, refetch, retrying: retryCountRef.current > 0 };
}
