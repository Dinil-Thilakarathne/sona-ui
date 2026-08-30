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

type ResolvedRegistryItem = RegistryItem & {
  $schema: string;
};

const root = process.cwd();
const sourceRegistryPath = path.join(root, "src/registry/registry.json");
const resolvedRegistryPath = path.join(root, "public/r");
const docsPath = path.join(root, "src/content/docs");
const outputPath = path.join(root, "public/agent");
const catalogPath = path.join(outputPath, "catalog.json");
const detailsPath = path.join(outputPath, "components");
function getSiteBaseUrl() {
  const configuredUrl = process.env.AGENT_SITE_URL?.trim();
  if (configuredUrl) return configuredUrl.replace(/\/$/, "");

  return "https://sona-ui.vercel.app";
}

const siteBaseUrl = getSiteBaseUrl();
const registryBaseUrl = (
  process.env.REGISTRY_BASE_URL?.trim() ?? `${siteBaseUrl}/r`
).replace(/\/$/, "");

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
  const resolvedRegistryByName = new Map(
    registry.map((item) => {
      const resolvedPath = path.join(resolvedRegistryPath, `${item.name}.json`);
      if (!fs.existsSync(resolvedPath)) {
        throw new Error(
          `${item.name}: missing resolved registry payload; run build:registry first`,
        );
      }
      return [item.name, readJson<ResolvedRegistryItem>(resolvedPath)];
    }),
  );
  const metadata = Object.values(agentResourceMetadata);
  const errors: string[] = [];
  const getResolvedRegistryItem = (name: string) => {
    const item = resolvedRegistryByName.get(name);
    if (!item) throw new Error(`${name}: missing resolved registry item`);
    return item;
  };

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
    const registryItem = getResolvedRegistryItem(item.name);
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
    const registryItem = getResolvedRegistryItem(item.name);
    const doc = readDocTitle(item.docsSlug);
    if (!doc) throw new Error(`${item.name}: missing docs file`);
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
    `- [Full agent guidance](${siteBaseUrl}/llms-full.txt)`,
    `- [Registry index](${siteBaseUrl}/r/registry.json)`,
    `- [OpenAPI description](${siteBaseUrl}/openapi.json)`,
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

  const fullLines = [
    "# Sona UI Agent Resources (Full)",
    "",
    "> Detailed, machine-readable guidance for selecting and integrating Sona UI components.",
    "",
    "## Installation",
    "",
    `Configure the Sona UI registry in the consumer project's components.json:`,
    "",
    "```json",
    JSON.stringify(
      {
        registries: {
          "@sona-ui": `${registryBaseUrl}/{name}.json`,
        },
      },
      null,
      2,
    ),
    "```",
    "",
    `Install a selected item with the consumer project's package runner:`,
    "",
    "```bash",
    "bunx shadcn@latest add @sona-ui/<component>",
    "```",
    "",
    "## Selection guidance",
    "",
  ];

  for (const item of metadata) {
    fullLines.push(
      `### ${item.title}`,
      "",
      `- Category: ${item.category}`,
      `- Status: ${item.status}`,
      `- Summary: ${item.summary}`,
      `- Documentation: ${siteBaseUrl}/docs/${item.docsSlug}`,
      `- Registry item: ${registryBaseUrl}/${item.name}.json`,
      "",
      "Use when:",
      ...item.useWhen.map((value) => `- ${value}`),
      "",
      "Avoid when:",
      ...item.avoidWhen.map((value) => `- ${value}`),
      "",
      "Capabilities:",
      ...item.capabilities.map((value) => `- ${value}`),
      "",
      "Accessibility:",
      ...item.accessibility.map((value) => `- ${value}`),
      "",
      `Motion: ${item.motion.purpose}`,
      `Reduced motion: ${item.motion.reducedMotion}`,
      "",
    );
  }

  fullLines.push(
    "## Integration principles",
    "",
    "- Inspect the consumer project before changing aliases, tokens, layout, or global styles.",
    "- Preserve semantic HTML, keyboard behavior, focus visibility, and reduced-motion behavior.",
    "- Keep decorative effects separate from meaningful content and verify contrast against the complete visual surface.",
    "- Use the registry item as the installation authority; do not copy component source into prompts or skill files.",
    "",
  );
  fs.writeFileSync(
    path.join(root, "public/llms-full.txt"),
    fullLines.join("\n"),
  );
  console.log(`Built agent resources for ${metadata.length} registry items.`);
}

buildResources();
