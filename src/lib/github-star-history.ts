import "server-only";

const GITHUB_API_URL = "https://api.github.com";
const MAX_PAGES = 100;
const PER_PAGE = 30;

export interface GitHubStarHistoryPoint {
  date: string;
  total: number;
}

export interface GetGitHubStarHistoryOptions {
  owner: string;
  repo: string;
  token?: string;
  signal?: AbortSignal;
}

interface GitHubStarHistoryWeek {
  week: number;
  total: number;
  days: number[];
}

export async function getGitHubStarHistory({
  owner,
  repo,
  token = process.env.GITHUB_TOKEN,
  signal,
}: GetGitHubStarHistoryOptions): Promise<GitHubStarHistoryPoint[]> {
  const normalizedOwner = owner.trim();
  const normalizedRepo = repo.trim();
  const normalizedToken = token?.trim();

  if (!normalizedOwner || !normalizedRepo) {
    throw new Error("A GitHub repository owner and name are required.");
  }
  if (!normalizedToken) {
    throw new Error("GITHUB_TOKEN is required to fetch GitHub star history.");
  }

  const pages: GitHubStarHistoryWeek[][] = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const response = await fetch(
      `${GITHUB_API_URL}/repos/${encodeURIComponent(normalizedOwner)}/${encodeURIComponent(normalizedRepo)}/stargazers/history?per_page=${PER_PAGE}&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${normalizedToken}`,
          "X-GitHub-Api-Version": "2026-03-10",
          "User-Agent": "sona-ui-github-star-history",
        },
        cache: "no-store",
        signal,
      },
    );
    const payload = (await response.json()) as
      | GitHubStarHistoryWeek[]
      | { message?: string };

    if (!response.ok) {
      const message =
        !Array.isArray(payload) && payload.message
          ? payload.message
          : `GitHub returned ${response.status}.`;
      throw new Error(`Unable to fetch GitHub star history: ${message}`);
    }
    if (!Array.isArray(payload) || payload.length === 0) break;
    pages.push(payload);
    if (payload.length < PER_PAGE) break;
  }

  return pages
    .flat()
    .reverse()
    .map((week) => ({
      date: new Date(week.week * 1000).toISOString(),
      total: Math.max(0, week.total),
    }));
}
