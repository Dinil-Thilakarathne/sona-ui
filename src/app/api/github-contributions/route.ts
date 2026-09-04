import { apiError } from "@/lib/api-error";
import { getGitHubProfileContributions } from "@/lib/github-contributions";

const githubLogin = "Dinil-Thilakarathne";
const CONTRIBUTIONS_CACHE_CONTROL =
  "public, max-age=60, s-maxage=900, stale-while-revalidate=86400";

export async function GET(request: Request) {
  try {
    const calendar = await getGitHubProfileContributions({
      login: githubLogin,
      signal: request.signal,
    });

    return Response.json(calendar, {
      headers: {
        "Cache-Control": CONTRIBUTIONS_CACHE_CONTROL,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("GITHUB_TOKEN")
        ? "GitHub contribution data is not configured."
        : "GitHub contribution data is temporarily unavailable.";

    const response = apiError({
      code: "SERVICE_UNAVAILABLE",
      message,
      resolution:
        "Retry later. This endpoint depends on GitHub contribution data.",
      status: 503,
    });
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }
}
