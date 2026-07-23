import fs from "node:fs";
import path from "node:path";

type RegistryFile = {
  path: string;
  type: string;
  target?: string;
};

type RegistryItem = {
  name: string;
  type: string;
  dependencies?: string[];
  files: RegistryFile[];
};

const registryRoot = path.join(process.cwd(), "src/registry");
const componentRoot = path.join(registryRoot, "sonaui");
const metadataPath = path.join(registryRoot, "registry.json");
const metadata = JSON.parse(
  fs.readFileSync(metadataPath, "utf8"),
) as RegistryItem[];

const ignoredPackages = new Set(["react", "react-dom"]);
const importPattern =
  /(?:import|export)\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/g;
const foundationAliases = new Map([
  ["@/lib/sona-utils", "sona-utils"],
  ["@/lib/sona-motion", "sona-motion"],
]);

function packageName(specifier: string) {
  if (specifier.startsWith("@")) {
    return specifier.split("/").slice(0, 2).join("/");
  }
  return specifier.split("/")[0];
}

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

const errors: string[] = [];
const metadataNames = new Set(metadata.map((item) => item.name));
const componentNames = fs
  .readdirSync(componentRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

for (const name of componentNames) {
  if (!metadataNames.has(name)) {
    errors.push(`${name}: missing metadata entry with the same name`);
  }
}

for (const item of metadata) {
  const componentDir = path.join(componentRoot, item.name);
  if (item.files.length > 0 && !fs.existsSync(componentDir)) {
    errors.push(`${item.name}: component directory does not exist`);
    continue;
  }

  const declaredDependencies = new Set(item.dependencies ?? []);
  const declaredFiles = new Set(item.files.map((file) => file.path));

  for (const file of item.files) {
    const sourcePath = path.join(
      registryRoot,
      file.path.replace(/^registry\//, ""),
    );
    if (!fs.existsSync(sourcePath)) {
      errors.push(`${item.name}: declared file does not exist: ${file.path}`);
    }
  }

  if (!fs.existsSync(componentDir)) continue;

  for (const sourcePath of walk(componentDir)) {
    if (!/\.(?:ts|tsx|css)$/.test(sourcePath)) continue;
    const registryPath = path
      .relative(registryRoot, sourcePath)
      .split(path.sep)
      .join("/");
    if (!declaredFiles.has(`registry/${registryPath}`)) {
      errors.push(
        `${item.name}: source file is not declared: registry/${registryPath}`,
      );
    }

    if (sourcePath.endsWith(".css")) continue;
    const source = fs.readFileSync(sourcePath, "utf8");
    for (const match of source.matchAll(importPattern)) {
      const specifier = match[1];
      if (specifier.startsWith(".")) {
        const resolved = path.resolve(path.dirname(sourcePath), specifier);
        const candidates = [
          resolved,
          `${resolved}.ts`,
          `${resolved}.tsx`,
          `${resolved}.css`,
        ];
        if (!candidates.some((candidate) => fs.existsSync(candidate))) {
          errors.push(`${item.name}: unresolved relative import: ${specifier}`);
        }
        continue;
      }
      const foundationName = foundationAliases.get(specifier);
      if (foundationName) {
        if (!metadataNames.has(foundationName)) {
          errors.push(
            `${item.name}: missing local foundation metadata for ${specifier}`,
          );
        }
        continue;
      }
      if (specifier.startsWith("@/")) {
        errors.push(`${item.name}: non-portable alias import: ${specifier}`);
        continue;
      }

      const dependency = packageName(specifier);
      if (
        !ignoredPackages.has(dependency) &&
        !declaredDependencies.has(dependency)
      ) {
        errors.push(
          `${item.name}: missing dependency ${dependency} for ${specifier}`,
        );
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`Registry validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Registry validation passed for ${metadata.length} components.`);
