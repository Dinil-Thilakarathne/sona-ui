import { apiError } from "@/lib/api-error";
import { getGitHubStarHistory } from "@/lib/github-star-history";

const GITHUB_OWNER = "Dinil-Thilakarathne";
const GITHUB_REPOSITORY = "sona-ui";
const STAR_HISTORY_CACHE_CONTROL =
  "public, max-age=60, s-maxage=900, stale-while-revalidate=86400";

export async function GET(request: Request) {
  try {
    const history = await getGitHubStarHistory({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPOSITORY,
      signal: request.signal,
    });

    return Response.json(
      { repository: `${GITHUB_OWNER}/${GITHUB_REPOSITORY}`, data: history },
      { headers: { "Cache-Control": STAR_HISTORY_CACHE_CONTROL } },
    );
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("GITHUB_TOKEN")
        ? "GitHub star history is not configured."
        : "GitHub star history is temporarily unavailable.";
    const response = apiError({
      code: "SERVICE_UNAVAILABLE",
      message,
      resolution:
        "Retry later. This endpoint depends on GitHub star history data.",
      status: 503,
    });
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }
}
