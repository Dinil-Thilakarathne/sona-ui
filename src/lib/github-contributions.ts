import "server-only";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const MAX_RANGE_IN_DAYS = 366;

export interface GitHubContributionDay {
  date: string;
  value: number;
  label: string;
}

export interface GitHubContributionCalendar {
  login: string;
  days: GitHubContributionDay[];
  totalContributions: number;
  restrictedContributionsCount: number;
  viewerIsProfileOwner: boolean;
  from: string;
  to: string;
}

export interface GetGitHubContributionsOptions {
  login: string;
  token?: string;
  from?: Date;
  to?: Date;
  signal?: AbortSignal;
}

interface GitHubGraphQLResponse {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              contributionCount: number;
              date: string;
            }>;
          }>;
        };
        restrictedContributionsCount: number;
      };
      login: string;
    } | null;
    viewer: {
      login: string;
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

const contributionCalendarQuery = `
  query ProfileContributionCalendar(
    $login: String!
    $from: DateTime!
    $to: DateTime!
  ) {
    viewer {
      login
    }
    user(login: $login) {
      login
      contributionsCollection(from: $from, to: $to) {
        restrictedContributionsCount
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

function startOfUtcDay(date: Date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
}

function defaultDateRange() {
  const to = startOfUtcDay(new Date());
  const from = new Date(to);
  from.setUTCFullYear(from.getUTCFullYear() - 1);
  from.setUTCDate(from.getUTCDate() + 1);

  return { from, to };
}

function validateDateRange(from: Date, to: Date) {
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime()) || from > to) {
    throw new Error("GitHub contribution dates must form a valid range.");
  }

  const rangeInDays = Math.floor(
    (to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000),
  );

  if (rangeInDays > MAX_RANGE_IN_DAYS) {
    throw new Error("GitHub contribution ranges cannot exceed one year.");
  }
}

function formatContributionLabel(value: number, date: string) {
  const contributionLabel = value === 1 ? "contribution" : "contributions";
  return `${value} ${contributionLabel} on ${date}`;
}

export async function getGitHubProfileContributions({
  login,
  token = process.env.GITHUB_TOKEN,
  from: requestedFrom,
  to: requestedTo,
  signal,
}: GetGitHubContributionsOptions): Promise<GitHubContributionCalendar> {
  const normalizedLogin = login.trim();
  const normalizedToken = token?.trim();

  if (!normalizedLogin) {
    throw new Error("A GitHub login is required.");
  }

  if (!normalizedToken) {
    throw new Error(
      "GITHUB_TOKEN is required to fetch GitHub contribution data.",
    );
  }

  const defaults = defaultDateRange();
  const from = startOfUtcDay(requestedFrom ?? defaults.from);
  const to = startOfUtcDay(requestedTo ?? defaults.to);
  validateDateRange(from, to);

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${normalizedToken}`,
      "Content-Type": "application/json",
      "User-Agent": "sona-ui-activity-graph",
    },
    body: JSON.stringify({
      query: contributionCalendarQuery,
      variables: {
        login: normalizedLogin,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
    cache: "no-store",
    signal,
  });

  const payload = (await response.json()) as GitHubGraphQLResponse;

  if (!response.ok || payload.errors?.length) {
    const message =
      payload.errors?.map((error) => error.message).join("; ") ||
      `GitHub returned ${response.status}.`;
    throw new Error(`Unable to fetch GitHub contributions: ${message}`);
  }

  const user = payload.data?.user;
  const viewer = payload.data?.viewer;

  if (!user || !viewer) {
    throw new Error(`GitHub user "${normalizedLogin}" was not found.`);
  }

  const collection = user.contributionsCollection;
  const days = collection.contributionCalendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      value: day.contributionCount,
      label: formatContributionLabel(day.contributionCount, day.date),
    })),
  );

  return {
    login: user.login,
    days,
    totalContributions: collection.contributionCalendar.totalContributions,
    restrictedContributionsCount: collection.restrictedContributionsCount,
    viewerIsProfileOwner:
      viewer.login.toLowerCase() === user.login.toLowerCase(),
    from: from.toISOString(),
    to: to.toISOString(),
  };
}
