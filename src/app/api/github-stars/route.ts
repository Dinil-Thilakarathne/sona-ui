const GITHUB_REPOSITORY_URL =
  "https://api.github.com/repos/Dinil-Thilakarathne/sona-ui";
const STARS_CACHE_CONTROL =
  "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400";

export async function GET() {
  try {
    const response = await fetch(GITHUB_REPOSITORY_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "sona-ui-star-count",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}.`);
    }

    const data = (await response.json()) as { stargazers_count?: number };

    return Response.json(
      { stars: data.stargazers_count ?? 0 },
      { headers: { "Cache-Control": STARS_CACHE_CONTROL } },
    );
  } catch {
    return Response.json(
      { message: "GitHub star data is temporarily unavailable." },
      {
        status: 503,
        headers: { "Cache-Control": "private, no-store" },
      },
    );
  }
}
