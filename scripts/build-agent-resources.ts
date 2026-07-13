import fs from "node:fs";
import path from "node:path";
import { agentResourceMetadata } from "../src/registry/agent-metadata";

type RegistryItem = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
};

const root = process.cwd();
const sourceRegistryPath = path.join(root, "src/registry/registry.json");
const docsPath = path.join(root, "src/content/docs");
const outputPath = path.join(root, "public/agent");
const catalogPath = path.join(outputPath, "catalog.json");
const detailsPath = path.join(outputPath, "components");
const registryBaseUrl = "https://sona-ui.vercel.app/r";
const siteBaseUrl = "https://sona-ui.vercel.app";

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function ensureDir(directory: string) {
  fs.mkdirSync(directory, { recursive: true });
}

function readDocTitle(slug: string) {
  const filePath = path.join(docsPath, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, "utf8");
  const title = source.match(/^title:\s*["'](.+?)["']\s*$/m)?.[1];
  return { filePath, title: title ?? slug };
}

function buildResources() {
  const registry = readJson<RegistryItem[]>(sourceRegistryPath);
  const registryByName = new Map(registry.map((item) => [item.name, item]));
  const metadata = Object.values(agentResourceMetadata);
  const errors: string[] = [];

  for (const item of metadata) {
    const registryItem = registryByName.get(item.name);
    if (!registryItem) {
      errors.push(`${item.name}: missing registry item`);
      continue;
    }
    if (registryItem.type !== "registry:ui") {
      errors.push(
        `${item.name}: agent metadata must point to a registry:ui item`,
      );
    }
    const doc = readDocTitle(item.docsSlug);
    if (!doc)
      errors.push(`${item.name}: missing docs file for ${item.docsSlug}`);
    for (const related of item.related ?? []) {
      if (!registryByName.has(related)) {
        errors.push(`${item.name}: related item does not exist: ${related}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("Agent resource validation failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  ensureDir(detailsPath);
  const catalogItems = metadata.map((item) => {
    const registryItem = registryByName.get(item.name)!;
    return {
      name: item.name,
      title: item.title,
      category: item.category,
      status: item.status,
      summary: item.summary,
      keywords: item.keywords,
      docs: `${siteBaseUrl}/docs/${item.docsSlug}`,
      registryItem: `${registryBaseUrl}/${item.name}.json`,
      detail: `${siteBaseUrl}/agent/components/${item.name}.json`,
      dependencies: registryItem.dependencies ?? [],
    };
  });

  const catalog = {
    schemaVersion: 1,
    registry: `${registryBaseUrl}/{name}.json`,
    items: catalogItems,
  };

  fs.writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);

  for (const item of metadata) {
    const registryItem = registryByName.get(item.name)!;
    const doc = readDocTitle(item.docsSlug)!;
    const detail = {
      schemaVersion: 1,
      ...item,
      registry: {
        url: `${registryBaseUrl}/${item.name}.json`,
        type: registryItem.type,
        dependencies: registryItem.dependencies ?? [],
        registryDependencies: registryItem.registryDependencies ?? [],
      },
      docs: {
        url: `${siteBaseUrl}/docs/${item.docsSlug}`,
        rawUrl: `${siteBaseUrl}/docs/${item.docsSlug}/raw.md`,
        sourceTitle: doc.title,
      },
    };
    fs.writeFileSync(
      path.join(detailsPath, `${item.name}.json`),
      `${JSON.stringify(detail, null, 2)}\n`,
    );
  }

  const lines = [
    "# Sona UI Agent Resources",
    "",
    "> Source-owned React components with purposeful motion and accessible interaction.",
    "",
    "## Start here",
    "",
    `- [Installation](${siteBaseUrl}/docs/installation)`,
    `- [Theming](${siteBaseUrl}/docs/theming)`,
    `- [Agent component catalog](${siteBaseUrl}/agent/catalog.json)`,
    `- [Registry index](${siteBaseUrl}/r/registry.json)`,
    "",
    "## Components",
    "",
    ...catalogItems.map(
      (item) => `- [${item.title}](${item.docs}): ${item.summary}`,
    ),
    "",
    "## Integration principles",
    "",
    "- Install through the Sona UI shadcn registry rather than copying source into prompts.",
    "- Inspect accessibility, motion, dependencies, and use cases before composing a component.",
    "- Preserve the consumer project's existing layout, tokens, and conventions.",
    "- Respect prefers-reduced-motion and keep decorative effects separate from meaningful content.",
    "",
  ];
  fs.writeFileSync(path.join(root, "public/llms.txt"), lines.join("\n"));
  console.log(`Built agent resources for ${metadata.length} registry items.`);
}

buildResources();
