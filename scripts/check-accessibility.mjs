import { AxeBuilder } from "@axe-core/playwright";
import { chromium } from "playwright";

const baseUrl = (process.env.A11Y_BASE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

const defaultSlugs = [
  "accordion",
  "animated-tabs",
  "expandable-tabs",
  "animated-switch",
  "animated-dropdown",
  "animated-dialog",
  "button",
  "ripple-button",
  "hold-to-delete-button",
  "magnetic-button",
  "circular-dock-menu",
  "fan-view",
];

const slugs =
  process.env.A11Y_SLUGS?.split(",")
    .map((slug) => slug.trim())
    .filter(Boolean) ?? defaultSlugs;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const results = [];

try {
  for (const slug of slugs) {
    const page = await context.newPage();
    const url = `${baseUrl}/docs/${slug}`;
    const response = await page.goto(url, { waitUntil: "networkidle" });

    if (!response?.ok()) {
      results.push({ slug, url, error: `HTTP ${response?.status() ?? "—"}` });
      await page.close();
      continue;
    }

    const previewCount = await page.locator("[data-component-preview]").count();
    if (previewCount === 0) {
      results.push({ slug, url, error: "No component preview found" });
      await page.close();
      continue;
    }

    const { violations } = await new AxeBuilder({ page })
      .include("[data-component-preview]")
      .analyze();
    results.push({ slug, url, violations });
    await page.close();
  }
} finally {
  await context.close();
  await browser.close();
}

const failures = results.filter(
  (result) => result.error || result.violations.length > 0,
);

for (const result of results) {
  if (result.error) {
    console.error(`✗ ${result.slug}: ${result.error}`);
    continue;
  }

  if (result.violations.length === 0) {
    console.log(`✓ ${result.slug}`);
    continue;
  }

  console.error(`✗ ${result.slug}`);
  for (const violation of result.violations) {
    console.error(`  ${violation.id} (${violation.impact}): ${violation.help}`);
    for (const node of violation.nodes) {
      console.error(`    ${node.html}`);
    }
  }
}

if (failures.length > 0) {
  console.error(
    `\nAccessibility check failed for ${failures.length}/${results.length} page(s).`,
  );
  process.exitCode = 1;
} else {
  console.log(`\nAccessibility check passed for ${results.length} page(s).`);
}
