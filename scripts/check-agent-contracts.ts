import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const catalogPath = path.join(root, "public/agent/catalog.json");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8")) as {
  items: Array<{
    name: string;
    detail: string;
    docs: string;
    registryItem: string;
  }>;
};

const errors: string[] = [];
const requiredPublicFiles = [
  "public/llms.txt",
  "public/llms-full.txt",
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
  if (!item.docs.startsWith("https://sona-ui.vercel.app/docs/")) {
    errors.push(`${item.name}: invalid docs URL`);
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
