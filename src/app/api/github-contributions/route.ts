import { getGitHubProfileContributions } from "@/lib/github-contributions";

const githubLogin = "Dinil-Thilakarathne";

export async function GET(request: Request) {
  try {
    const calendar = await getGitHubProfileContributions({
      login: githubLogin,
      signal: request.signal,
    });

    return Response.json(calendar, {
      headers: {
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("GITHUB_TOKEN")
        ? "GitHub contribution data is not configured."
        : "GitHub contribution data is temporarily unavailable.";

    return Response.json(
      { message },
      {
        status: 503,
        headers: {
          "Cache-Control": "private, no-store",
        },
      },
    );
  }
}
