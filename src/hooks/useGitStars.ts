"use client";
import { useEffect, useState } from "react";

/**
 * Custom hook to fetch the cached star count for the Sona UI repository.
 * @returns An object containing the star count, loading state, and any error.
 */
export const useGitStars = () => {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStars = async () => {
      try {
        const response = await fetch("/api/github-stars", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Error fetching repository: ${response.statusText}`);
        }

        const data = (await response.json()) as { stars?: number };
        setStars(data.stars ?? 0);
      } catch (err: unknown) {
        if (controller.signal.aborted) return;

        console.log(
          err instanceof Error ? err.message : "An unknown error occurred.",
        );
      }
    };

    void fetchStars();

    return () => controller.abort();
  }, []);

  return { stars };
};
