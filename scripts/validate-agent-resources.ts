import fs from "node:fs";
import path from "node:path";
import { agentResourceMetadata } from "../src/registry/agent-metadata";

const root = process.cwd();
const catalogPath = path.join(root, "public/agent/catalog.json");
const detailsPath = path.join(root, "public/agent/components");
const metadataNames = Object.keys(agentResourceMetadata);

if (!fs.existsSync(catalogPath)) {
  console.error("Missing generated agent catalog: public/agent/catalog.json");
  process.exit(1);
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8")) as {
  schemaVersion?: number;
  items?: Array<{ name: string }>;
};
const catalogNames = new Set((catalog.items ?? []).map((item) => item.name));
const errors: string[] = [];

if (catalog.schemaVersion !== 1) {
  errors.push("catalog: unsupported or missing schemaVersion");
}

for (const name of metadataNames) {
  if (!catalogNames.has(name)) errors.push(`${name}: missing from catalog`);
  if (!fs.existsSync(path.join(detailsPath, `${name}.json`))) {
    errors.push(`${name}: missing generated detail resource`);
  }
}

if (!fs.existsSync(path.join(root, "public/llms.txt"))) {
  errors.push("missing generated public/llms.txt");
}

if (errors.length > 0) {
  console.error("Agent resource validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Agent resource validation passed for ${metadataNames.length} items.`,
);
