import fs from "fs/promises";
import path from "path";

const REGISTRY_DIR = path.join(process.cwd(), "src/registry/sonaui");
const DOCS_DIR = path.join(process.cwd(), "src/content/docs");
const OUTPUT_FILE = path.join(process.cwd(), "src/registry/registry.json");
const EXAMPLE_DIR = path.join(process.cwd(), "src/registry/example");

const KNOWN_DEPENDENCIES = [
  "framer-motion",
  "lucide-react",
  "clsx",
  "tailwind-merge",
  "class-variance-authority", // cva
  "@radix-ui/react-accordion",
  "@radix-ui/react-dialog",
  "@radix-ui/themes",
  "motion",
  "gsap",
  "@gsap/react",
  "react-icons",
  "react-use-measure",
];

async function getComponentDescription(componentName: string): Promise<string> {
  let docFilename = `${componentName}.mdx`;
  let docPath = path.join(DOCS_DIR, docFilename);

  // Fuzzy match strategy
  if (!(await fileExists(docPath))) {
    const files = await fs.readdir(DOCS_DIR);
    // Find file that starts with componentName (case insensitive)
    const match = files.find(
      (f) =>
        f.toLowerCase().startsWith(componentName.toLowerCase()) &&
        f.endsWith(".mdx"),
    );
    if (match) {
      docPath = path.join(DOCS_DIR, match);
    } else {
      console.warn(`Warning: Doc file not found for ${componentName}`);
      return `Component ${componentName}`;
    }
  }

  const content = await fs.readFile(docPath, "utf-8");

  // 1. Try frontmatter "description"
  // We strictly look at the first block only
  const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    const descMatch = frontmatter.match(/description:\s*(.*)/i);
    if (descMatch && descMatch[1]) {
      return descMatch[1].trim().replace(/^["']|["']$/g, "");
    }
  }

  // 2. Try first paragraph after Title
  // Look for lines that are not headers, empty, or imports/exports/tags
  const lines = content.split("\n");
  let inFrontmatter = false;
  let seenTitle = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("---")) {
      inFrontmatter = !inFrontmatter;
      continue;
    }
    if (inFrontmatter) continue;

    if (line.startsWith("# ")) {
      seenTitle = true;
      continue;
    }

    if (
      seenTitle &&
      line.length > 0 &&
      !line.startsWith("#") &&
      !line.startsWith("<") &&
      !line.startsWith("import")
    ) {
      return line;
    }
  }

  return `Component ${componentName}`;
}

async function getComponentDependencies(
  componentPath: string,
): Promise<string[]> {
  const files = await fs.readdir(componentPath);
  const dependencies = new Set<string>();

  for (const file of files) {
    if (!file.endsWith(".tsx") && !file.endsWith(".ts")) continue;

    const content = await fs.readFile(path.join(componentPath, file), "utf-8");

    // Extract imports
    const importRegex = /from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const library = match[1];

      // specific libraries or anything starting with @radix-ui
      if (
        library.startsWith("@radix-ui/") ||
        KNOWN_DEPENDENCIES.includes(library)
      ) {
        dependencies.add(library);
      }
    }
  }

  return Array.from(dependencies);
}

// Helper to check if file exists
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Convert kebab-case to Title Case (e.g. bubble-up-button -> Bubble Up Button)
function toTitleCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function main() {
  const components = await fs.readdir(REGISTRY_DIR);
  const registry = [];

  for (const component of components) {
    const componentPath = path.join(REGISTRY_DIR, component);
    const stat = await fs.stat(componentPath);

    if (!stat.isDirectory()) continue;

    console.log(`Processing ${component}...`);

    // Files relative to registry root (e.g. registry/sonaui/accordion/Accordion.tsx)
    // The requirement says "registry/sonaui/..."
    const dirFiles = await fs.readdir(componentPath);
    const files = dirFiles.map((f) => ({
      path: `registry/sonaui/${component}/${f}`,
      type: "registry:ui",
    }));

    const description = await getComponentDescription(component);
    const dependencies = await getComponentDependencies(componentPath);
    const title = toTitleCase(component);

    registry.push({
      name: component, // kebab-case directory name
      type: "registry:ui",
      title: title,
      description: description,
      files: files,
      dependencies: dependencies,
    });
  }

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(registry, null, 2));
  console.log(`Registry updated at ${OUTPUT_FILE}`);
}

main().catch(console.error);
