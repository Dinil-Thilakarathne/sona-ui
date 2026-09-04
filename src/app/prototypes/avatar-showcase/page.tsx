import AvatarShowcase from "@/registry/sonaui/avatar-showcase/avatar-showcase";
import { getGitHubFollowers } from "@/lib/github-followers";

export const revalidate = 3600;

const githubUsername = "Dinil-Thilakarathne";

export default async function AvatarShowcasePrototypePage() {
  try {
    const result = await getGitHubFollowers({
      username: githubUsername,
      limit: 320,
      cache: "force-cache",
      revalidate,
    });

    const items = result.followers.map((follower) => ({
      id: follower.id,
      name: follower.login,
      imageUrl: follower.avatarUrl,
    }));

    return (
      <main className="grid min-h-screen place-items-center bg-background px-6 py-12">
        <div className="w-full max-w-5xl">
          <AvatarShowcase
            duration={24}
            items={items}
            lanes={3}
            maxItems={320}
            totalCount={result.totalCount}
          />
        </div>
      </main>
    );
  } catch {
    return (
      <main className="grid min-h-screen place-items-center bg-background px-6 py-12">
        <p className="text-muted-foreground text-sm">
          Unable to load GitHub followers right now.
        </p>
      </main>
    );
  }
}
