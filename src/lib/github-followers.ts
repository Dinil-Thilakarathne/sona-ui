import "server-only";

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_API_VERSION = "2022-11-28";
const DEFAULT_LIMIT = 80;
const MAX_PER_PAGE = 100;

interface GitHubFollowerResponse {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

interface GitHubProfileResponse {
  login: string;
  followers: number;
}

interface GitHubErrorResponse {
  message?: string;
}

export interface GitHubFollower {
  id: string;
  login: string;
  avatarUrl: string;
  profileUrl: string;
  accountType: string;
}

export interface GitHubFollowersResult {
  username: string;
  followers: GitHubFollower[];
  totalCount: number;
  hasMore: boolean;
}

export interface GetGitHubFollowersOptions {
  /** GitHub account whose public followers should be fetched. */
  username: string;
  /** Optional token. Defaults to `GITHUB_TOKEN` and increases the API rate limit. */
  token?: string;
  /** Maximum follower records to return, or `"all"` to traverse every page.
   * @default 80
   */
  limit?: number | "all";
  /** Cache behavior forwarded to `fetch`.
   * @default "no-store"
   */
  cache?: RequestCache;
  /** Cancels the profile and pagination requests. */
  signal?: AbortSignal;
  /** Custom fetch implementation, primarily for tests and non-browser runtimes.
   * @default globalThis.fetch
   */
  fetcher?: typeof fetch;
}

export class GitHubFollowersError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GitHubFollowersError";
    this.status = status;
  }
}

function normalizeLimit(limit: number | "all" | undefined) {
  if (limit === "all") return null;

  const resolvedLimit = limit ?? DEFAULT_LIMIT;

  if (!Number.isFinite(resolvedLimit) || resolvedLimit < 0) {
    throw new Error("GitHub follower limit must be a non-negative number.");
  }

  return Math.floor(resolvedLimit);
}

function getNextPageUrl(linkHeader: string | null) {
  if (!linkHeader) return null;

  for (const link of linkHeader.split(",")) {
    const match = link.match(/<([^>]+)>;\s*rel="([^"]+)"/);
    if (match?.[2] === "next") return match[1];
  }

  return null;
}

async function readGitHubError(response: Response) {
  try {
    const payload = (await response.json()) as GitHubErrorResponse;
    return payload.message || response.statusText || `HTTP ${response.status}`;
  } catch {
    return response.statusText || `HTTP ${response.status}`;
  }
}

function createHeaders(token?: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "sona-ui-avatar-showcase",
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
  };

  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

/**
 * Fetches a paginated list of public GitHub followers plus the account's full
 * follower count. GitHub does not expose follow timestamps or guarantee
 * newest-first ordering, so records remain in API response order.
 */
export async function getGitHubFollowers({
  username,
  token = process.env.GITHUB_TOKEN,
  limit,
  cache = "no-store",
  signal,
  fetcher = fetch,
}: GetGitHubFollowersOptions): Promise<GitHubFollowersResult> {
  const normalizedUsername = username.trim();
  const normalizedToken = token?.trim();
  const resolvedLimit = normalizeLimit(limit);

  if (!normalizedUsername) {
    throw new Error("A GitHub username is required.");
  }

  const headers = createHeaders(normalizedToken);
  const encodedUsername = encodeURIComponent(normalizedUsername);
  const profileUrl = `${GITHUB_API_URL}/users/${encodedUsername}`;

  const profileResponse = await fetcher(profileUrl, {
    cache,
    headers,
    signal,
  });

  if (!profileResponse.ok) {
    const reason = await readGitHubError(profileResponse);
    throw new GitHubFollowersError(
      `Unable to fetch GitHub user "${normalizedUsername}": ${reason}`,
      profileResponse.status,
    );
  }

  const profile = (await profileResponse.json()) as GitHubProfileResponse;
  const followers: GitHubFollower[] = [];

  if (resolvedLimit === null || resolvedLimit > 0) {
    const perPage =
      resolvedLimit === null
        ? MAX_PER_PAGE
        : Math.min(MAX_PER_PAGE, resolvedLimit);
    let nextPageUrl: string | null =
      `${GITHUB_API_URL}/users/${encodedUsername}/followers?per_page=${perPage}&page=1`;

    while (
      nextPageUrl &&
      (resolvedLimit === null || followers.length < resolvedLimit)
    ) {
      const response = await fetcher(nextPageUrl, {
        cache,
        headers,
        signal,
      });

      if (!response.ok) {
        const reason = await readGitHubError(response);
        throw new GitHubFollowersError(
          `Unable to fetch followers for "${normalizedUsername}": ${reason}`,
          response.status,
        );
      }

      const page = (await response.json()) as GitHubFollowerResponse[];
      const remaining =
        resolvedLimit === null ? page.length : resolvedLimit - followers.length;

      followers.push(
        ...page.slice(0, remaining).map((follower) => ({
          id: String(follower.id),
          login: follower.login,
          avatarUrl: follower.avatar_url,
          profileUrl: follower.html_url,
          accountType: follower.type,
        })),
      );

      nextPageUrl = getNextPageUrl(response.headers.get("link"));
    }
  }

  return {
    username: profile.login,
    followers,
    totalCount: profile.followers,
    hasMore: followers.length < profile.followers,
  };
}
