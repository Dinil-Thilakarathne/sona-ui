"use client";
import { useState, useEffect } from "react";

/**
 * Custom hook to fetch the star count of a GitHub repository.
 * @param owner - The owner of the GitHub repository.
 * @param repo - The name of the GitHub repository.
 * @returns An object containing the star count, loading state, and any error.
 */
export const useGitStars = (owner: string, repo: string) => {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    if (!owner || !repo) {
      console.log("Owner and repository name are required.");
      console.log(false);
      return;
    }

    const fetchStars = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`,
        );

        if (!response.ok) {
          throw new Error(`Error fetching repository: ${response.statusText}`);
        }

        const data = await response.json();
        setStars(data.stargazers_count || 0);
      } catch (err: unknown) {
        console.log(
          err instanceof Error ? err.message : "An unknown error occurred.",
        );
      } finally {
        console.log(false);
      }
    };

    fetchStars();
  }, [owner, repo]);

  return { stars };
};
