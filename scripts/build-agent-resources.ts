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

  return "https://sonaui.com";
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
    manifest: `${siteBaseUrl}/agent/manifest.json`,
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
    "# Sona UI",
    "",
    "> Source-owned React components with purposeful motion and accessible interaction.",
    "",
    "Use the current agent manifest and catalog to select components. Fetch a component's detail resource before installing it; this index is intentionally concise.",
    "",
    "When network access is unavailable, treat any installed or downloaded component guidance as a possibly outdated snapshot.",
    "",
    "## Get started",
    "",
    `- [Installation](${siteBaseUrl}/docs/installation): Set up the Sona UI registry and install a component.`,
    `- [Theming](${siteBaseUrl}/docs/theming): Adapt components to the consumer project's theme.`,
    `- [Use with AI](${siteBaseUrl}/docs/use-with-ai): Connect an agent and verify component selection.`,
    "",
    "## Component resources",
    "",
    `- [Agent manifest](${siteBaseUrl}/agent/manifest.json): Current entry point for the catalog and registry skill.`,
    `- [Component catalog](${siteBaseUrl}/agent/catalog.json): Searchable component summaries and links to detailed metadata.`,
    `- [Registry index](${siteBaseUrl}/r/registry.json): Installable registry items.`,
    `- [OpenAPI description](${siteBaseUrl}/openapi.json): Machine-readable API endpoints.`,
    "",
    "## Optional",
    "",
    `- [Component gallery](${siteBaseUrl}/components): Visual examples of available components.`,
    "",
  ];
  fs.writeFileSync(path.join(root, "public/llms.txt"), lines.join("\n"));
  const manifest = {
    schemaVersion: 1,
    catalog: `${siteBaseUrl}/agent/catalog.json`,
    guidance: `${siteBaseUrl}/llms.txt`,
    skill: `${registryBaseUrl}/agent-skill.json`,
    updatePolicy:
      "Fetch this manifest before selecting or installing a component. Installed skill files are snapshots; this manifest and its catalog are authoritative when reachable.",
  };
  fs.writeFileSync(
    path.join(outputPath, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  console.log(`Built agent resources for ${metadata.length} registry items.`);
}

buildResources();
