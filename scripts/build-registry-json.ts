import fs from "fs";
import path from "path";

const REGISTRY_PATH = path.join(process.cwd(), "src/registry");
const COMPONENT_PATH = path.join(REGISTRY_PATH, "sonaui");
const PUBLIC_ROOT_REGISTRY_PATH = path.join(process.cwd(), "public/r");

// Helper to ensure directory exists
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Helper to convert kebab-case to Title Case
function toTitleCase(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function buildRegistryJson() {
  ensureDir(PUBLIC_ROOT_REGISTRY_PATH);

  // 1. Read metadata from registry.json
  const registryJsonPath = path.join(REGISTRY_PATH, "registry.json");
  let metadataMap: Record<string, any> = {};

  if (fs.existsSync(registryJsonPath)) {
    try {
      const rawData = fs.readFileSync(registryJsonPath, "utf-8");
      const data = JSON.parse(rawData);
      // Create a map for easier lookup
      if (Array.isArray(data)) {
        data.forEach((item: any) => {
          metadataMap[item.name] = item;
        });
      }
    } catch (error) {
      console.error("Error parsing registry.json:", error);
    }
  } else {
    console.warn("registry.json not found in src/registry. Using defaults.");
  }

  // 2. Scan components
  const registryItems: any[] = [];

  if (fs.existsSync(COMPONENT_PATH)) {
    const componentDirs = fs.readdirSync(COMPONENT_PATH);

    for (const componentName of componentDirs) {
      const componentDir = path.join(COMPONENT_PATH, componentName);
      if (!fs.statSync(componentDir).isDirectory()) continue;

      console.log(`Processing ${componentName}...`);

      const componentFiles: any[] = [];
      const dirItems = fs.readdirSync(componentDir);

      for (const item of dirItems) {
        const itemPath = path.join(componentDir, item);
        if (fs.statSync(itemPath).isDirectory()) continue;
        if (
          !item.endsWith(".tsx") &&
          !item.endsWith(".ts") &&
          !item.endsWith(".css")
        )
          continue;

        const content = fs.readFileSync(itemPath, "utf-8");
        const relativePath = `registry/sonaui/${componentName}/${item}`;

        componentFiles.push({
          path: relativePath,
          content: content,
          type: item.endsWith(".css") ? "registry:file" : "registry:ui",
          target: `components/sona-ui/${componentName}/${item}`,
        });
      }

      // Merge with metadata
      const metadata = metadataMap[componentName] || {};

      const entry = {
        name: componentName,
        type: "registry:ui",
        title: metadata.title || toTitleCase(componentName),
        description: metadata.description || `Component for ${componentName}`,
        files: componentFiles,
        dependencies: metadata.dependencies || [],
        registryDependencies: metadata.registryDependencies || [],
        ...metadata, // overwrite with specific metadata if exists
      };

      // Write individual component JSON to public/r/[name].json
      const outputPath = path.join(
        PUBLIC_ROOT_REGISTRY_PATH,
        `${componentName}.json`,
      );
      fs.writeFileSync(outputPath, JSON.stringify(entry, null, 2));

      // Add to main list
      // For the main registry index, we omit the 'content' field to keep the file size manageable,
      // but keep 'files', 'type', 'path', and 'target'.
      const indexItem = {
        ...entry,
        files: entry.files.map((f: any) => ({
          path: f.path,
          type: f.type,
          target: f.target,
        })),
      };

      registryItems.push(indexItem);
    }
  }

  // 3. Write main registry.json (Root and Public)
  const fullRegistry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "sona-ui",
    homepage: "https://sona-ui.vercel.app",
    items: registryItems,
  };

  const registryContent = JSON.stringify(fullRegistry, null, 2);

  // Root
  fs.writeFileSync(path.join(process.cwd(), "registry.json"), registryContent);

  // Public index (e.g., public/r/index.json)
  fs.writeFileSync(
    path.join(PUBLIC_ROOT_REGISTRY_PATH, "registry.json"),
    registryContent,
  );

  console.log(`Registry generated:
  - Root: registry.json
  - Public Index: public/r/index.json
  - Individual Items: public/r/*.json`);
}

buildRegistryJson();
