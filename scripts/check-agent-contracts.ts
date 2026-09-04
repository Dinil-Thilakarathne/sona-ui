import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const catalogPath = path.join(root, "public/agent/catalog.json");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8")) as {
  registry: string;
  manifest?: string;
  items: Array<{
    name: string;
    detail: string;
    docs: string;
    registryItem: string;
  }>;
};

const errors: string[] = [];
const productionOrigin = "https://sonaui.com";
const requiredPublicFiles = [
  "public/llms.txt",
  "public/llms-full.txt",
  "public/agent/manifest.json",
  "public/r/registry.json",
  "public/r/agent-skill.json",
];

for (const file of requiredPublicFiles) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`missing ${file}`);
}

for (const item of catalog.items) {
  const detailName = path.basename(new URL(item.detail).pathname);
  const registryName = path.basename(new URL(item.registryItem).pathname);
  if (!fs.existsSync(path.join(root, "public/agent/components", detailName))) {
    errors.push(`${item.name}: missing detail resource ${detailName}`);
  }
  if (!fs.existsSync(path.join(root, "public/r", registryName))) {
    errors.push(`${item.name}: missing registry resource ${registryName}`);
  }
  if (!item.docs.startsWith(`${productionOrigin}/docs/`)) {
    errors.push(`${item.name}: invalid docs URL`);
  }

  const detailPath = path.join(root, "public/agent/components", detailName);
  const registryPath = path.join(root, "public/r", registryName);
  if (fs.existsSync(detailPath) && fs.existsSync(registryPath)) {
    const detail = JSON.parse(fs.readFileSync(detailPath, "utf8")) as {
      registry: { registryDependencies?: string[] };
      docs: { url: string; rawUrl: string };
    };
    const payload = JSON.parse(fs.readFileSync(registryPath, "utf8")) as {
      registryDependencies?: string[];
    };
    if (
      JSON.stringify(detail.registry.registryDependencies ?? []) !==
      JSON.stringify(payload.registryDependencies ?? [])
    ) {
      errors.push(`${item.name}: agent detail does not match resolved payload`);
    }
    if (
      !detail.docs.url.startsWith(`${productionOrigin}/docs/`) ||
      !detail.docs.rawUrl.startsWith(`${productionOrigin}/docs/`)
    ) {
      errors.push(`${item.name}: agent detail leaks a non-production URL`);
    }
  }
}

if (catalog.registry !== `${productionOrigin}/r/{name}.json`) {
  errors.push("catalog: registry URL is not the production alias");
}
if (catalog.manifest !== `${productionOrigin}/agent/manifest.json`) {
  errors.push("catalog: manifest URL is not the production alias");
}

for (const fileName of fs.readdirSync(path.join(root, "public/r"))) {
  if (!fileName.endsWith(".json") || fileName === "registry.json") continue;
  const payload = JSON.parse(
    fs.readFileSync(path.join(root, "public/r", fileName), "utf8"),
  ) as { registryDependencies?: string[] };
  for (const dependency of payload.registryDependencies ?? []) {
    if (!dependency.startsWith("@sona-ui/")) {
      errors.push(
        `${fileName}: registry dependency must use @sona-ui namespace: ${dependency}`,
      );
    }
  }
}

const matrixPath = path.join(
  root,
  "tests/agent-integrations/support-matrix.md",
);
if (!fs.existsSync(matrixPath)) errors.push("missing support matrix");

if (errors.length > 0) {
  console.error("Agent contract check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Agent contract check passed for ${catalog.items.length} items.`);
