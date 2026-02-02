import { writeFileSync } from "fs";
import { join } from "path";

const GITHUB_REPO = "Dinil-Thilakarathne/sona-ui";
const OUTPUT_FILE = join(process.cwd(), "src/content/docs/changelog.mdx");

interface Release {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
}

async function fetchReleases() {
  console.log(`Fetching releases from ${GITHUB_REPO}...`);
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases`,
      {
        headers: process.env.GITHUB_TOKEN
          ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
          : {},
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch releases: ${response.statusText}`);
    }

    const releases: Release[] = await response.json();
    return releases;
  } catch (error) {
    console.warn("Error fetching releases, skipping changelog update:", error);
    return [];
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toISOString().split("T")[0];
}

function generateMarkdown(releases: Release[]) {
  const frontmatter = `---
title: "Changelog"
slug: changelog
description: "Latest updates and changes to Sona UI."
searchable: true
---

# Changelog

Stay up to date with the latest changes in Sona UI.

`;

  if (releases.length === 0) {
    return (
      frontmatter +
      "\nNo releases found or failed to fetch releases from GitHub.\n"
    );
  }

  const content = releases
    .map((release) => {
      return `

${release.body}

[View on GitHub](${release.html_url})
<Divider/>
`;
    })
    .join("\n---\n\n");

  return frontmatter + content;
}

async function main() {
  const releases = await fetchReleases();
  const markdown = generateMarkdown(releases);
  writeFileSync(OUTPUT_FILE, markdown);
  console.log(`Changelog updated at ${OUTPUT_FILE}`);
}

main();
