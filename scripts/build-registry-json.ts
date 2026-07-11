import fs from "node:fs";
import path from "node:path";

type RegistryFileDefinition = {
  path: string;
  type: string;
  target?: string;
};

type RegistryItemDefinition = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  files: RegistryFileDefinition[];
  dependencies?: string[];
  registryDependencies?: string[];
  [key: string]: unknown;
};

type BuiltRegistryFile = RegistryFileDefinition & {
  content: string;
  target: string;
};

const registryPath = path.join(process.cwd(), "src/registry");
const metadataPath = path.join(registryPath, "registry.json");
const publicRegistryPath = path.join(process.cwd(), "public/r");
const registryBaseUrl = (
  process.env.REGISTRY_BASE_URL ?? "https://sona-ui.vercel.app/r"
).replace(/\/$/, "");

const foundationImports = {
  "@/lib/sona-utils": "sona-utils",
  "@/lib/sona-motion": "sona-motion",
} as const;

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function toTitleCase(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function defaultTarget(
  item: RegistryItemDefinition,
  file: RegistryFileDefinition,
) {
  const fileName = path.basename(file.path);
  switch (file.type) {
    case "registry:lib":
      return `lib/${fileName}`;
    case "registry:hook":
      return `hooks/${fileName}`;
    case "registry:component":
      return `components/${item.name}/${fileName}`;
    default:
      return `components/ui/${item.name}/${fileName}`;
  }
}

function buildFiles(item: RegistryItemDefinition): BuiltRegistryFile[] {
  return item.files.map((file) => {
    const sourcePath = path.join(
      registryPath,
      file.path.replace(/^registry\//, ""),
    );
    return {
      ...file,
      content: fs.readFileSync(sourcePath, "utf8"),
      target: file.target ?? defaultTarget(item, file),
    };
  });
}

function inferFoundationDependencies(files: BuiltRegistryFile[]) {
  const dependencies = new Set<string>();
  for (const file of files) {
    for (const [specifier, itemName] of Object.entries(foundationImports)) {
      if (
        file.content.includes(`"${specifier}"`) ||
        file.content.includes(`'${specifier}'`)
      ) {
        dependencies.add(`${registryBaseUrl}/${itemName}.json`);
      }
    }
  }
  return dependencies;
}

function resolveRegistryDependency(dependency: string) {
  if (registryBaseUrl === "https://sona-ui.vercel.app/r") return dependency;
  const match = dependency.match(/\/r\/([^/]+\.json)$/);
  return match ? `${registryBaseUrl}/${match[1]}` : dependency;
}

function buildRegistryJson() {
  ensureDir(publicRegistryPath);
  const metadata = JSON.parse(
    fs.readFileSync(metadataPath, "utf8"),
  ) as RegistryItemDefinition[];
  const registryItems: Array<Record<string, unknown>> = [];
  const expectedPayloads = new Set([
    "registry.json",
    ...metadata.map((item) => `${item.name}.json`),
  ]);

  for (const fileName of fs.readdirSync(publicRegistryPath)) {
    if (fileName.endsWith(".json") && !expectedPayloads.has(fileName)) {
      fs.rmSync(path.join(publicRegistryPath, fileName));
      console.log(`Removed stale registry payload ${fileName}`);
    }
  }

  for (const definition of metadata) {
    console.log(`Processing ${definition.name}...`);
    const files = buildFiles(definition);
    const registryDependencies = new Set(
      (definition.registryDependencies ?? []).map(resolveRegistryDependency),
    );
    for (const dependency of inferFoundationDependencies(files)) {
      registryDependencies.add(dependency);
    }

    const entry = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      ...definition,
      title: definition.title ?? toTitleCase(definition.name),
      description:
        definition.description ?? `Registry resource for ${definition.name}`,
      files,
      dependencies: definition.dependencies ?? [],
      registryDependencies: [...registryDependencies],
    };

    fs.writeFileSync(
      path.join(publicRegistryPath, `${definition.name}.json`),
      JSON.stringify(entry, null, 2),
    );

    registryItems.push({
      ...entry,
      files: files.map(({ content: _content, ...file }) => file),
    });
  }

  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "sona-ui",
    homepage: "https://sona-ui.vercel.app",
    items: registryItems,
  };
  const registryContent = JSON.stringify(registry, null, 2);
  fs.writeFileSync(path.join(process.cwd(), "registry.json"), registryContent);
  fs.writeFileSync(
    path.join(publicRegistryPath, "registry.json"),
    registryContent,
  );

  console.log(`Registry generated:
  - Root: registry.json
  - Public Index: public/r/registry.json
  - Individual Items: public/r/*.json`);
}

buildRegistryJson();
