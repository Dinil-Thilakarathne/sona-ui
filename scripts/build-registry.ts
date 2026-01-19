import fs from "fs";
import path from "path";

const REGISTRY_PATH = path.join(process.cwd(), "src/registry");
const EXAMPLE_PATH = path.join(REGISTRY_PATH, "example");
const COMPONENT_PATH = path.join(REGISTRY_PATH, "sonaui"); // Path to component source code
const OUTPUT_FILE = path.join(REGISTRY_PATH, "index.ts");

// Helper to convert PascalCase/camelCase to kebab-case
function toKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function parseFileName(fileName: string) {
  const nameWithoutExt = path.basename(fileName, path.extname(fileName));

  // Split by underscore to find variants
  // E.g., Accordion_ex.tsx -> ["Accordion", "ex"]
  // E.g., Accordion_bordered.tsx -> ["Accordion", "bordered"]
  const parts = nameWithoutExt.split("_");

  let componentName = parts[0];
  let variantName = "default";

  if (parts.length > 1) {
    const suffix = parts.slice(1).join("_"); // handle multiple underscores if needed, or just take the last one.
    // For now, let's assume [Component]_[Variant]

    // Map 'ex' to 'default' to preserve existing behavior
    if (suffix === "ex") {
      variantName = "default";
    } else {
      variantName = toKebabCase(suffix);
    }
  }

  const component = toKebabCase(componentName);

  return {
    component,
    name: variantName,
    importName: nameWithoutExt,
  };
}

async function buildRegistry() {
  if (!fs.existsSync(EXAMPLE_PATH)) {
    console.error(`Example directory not found: ${EXAMPLE_PATH}`);
    process.exit(1);
  }

  // --- 1. Process Examples ---
  const exampleRegistry: Record<string, any[]> = {};
  const imports: string[] = [];

  // Helper to split content into imports and body
  function splitContent(content: string) {
    const lines = content.split("\n");
    let splitIndex = 0;
    let inImport = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (inImport) {
        // Check for end of import statement
        if (
          (line.includes("from") || line.endsWith(";")) &&
          (line.endsWith(";") || line.endsWith('"') || line.endsWith("'"))
        ) {
          inImport = false;
        }
        continue;
      }

      // Check for start of import
      if (line.startsWith("import ")) {
        // If it's a complete single-line import, it doesn't trigger inImport
        // Single line: import ... from "..."; or import "...";
        if (
          (line.includes("from") &&
            (line.endsWith(";") || line.endsWith('"') || line.endsWith("'"))) ||
          line.endsWith(";")
        ) {
          inImport = false;
        } else {
          inImport = true;
        }
        continue;
      }

      // Skip empty lines between imports
      if (line === "") continue;

      // If we reach here, it's the first non-import line (and not empty)
      splitIndex = i;
      break;
    }

    const imports = lines.slice(0, splitIndex).join("\n").trim();
    const anatomy = lines.slice(splitIndex).join("\n").trim();

    return {
      imports,
      anatomy,
    };
  }

  function scanExamples(dir: string) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      if (fs.statSync(itemPath).isDirectory()) {
        scanExamples(itemPath);
        continue;
      }

      if (!item.endsWith(".tsx") && !item.endsWith(".ts")) continue;

      const content = fs.readFileSync(itemPath, "utf-8");
      // path relative to example folder: e.g. "accordion/accordion-demo.tsx"
      const relativePath = path.relative(EXAMPLE_PATH, itemPath);
      // Normalized import path: "accordion/accordion-demo"
      const importPath = relativePath.replace(/\.(tsx|ts)$/, "");

      // Determine component name from the directory structure
      // e.g. "accordion/accordion-demo.tsx" -> component: "accordion"
      const pathParts = relativePath.split(path.sep);
      let component = "";
      if (pathParts.length > 1) {
        component = pathParts[0]; // The folder name is the component
      } else {
        // Fallback if file is at root (shouldn't happen with strict structure now)
        component = toKebabCase(
          path.basename(item, path.extname(item)).split("-")[0],
        );
      }

      // Determine variant/name from filename
      // e.g. "accordion-demo.tsx" -> "default"
      // e.g. "accordion-bordered.tsx" -> "bordered"
      const fileNameNoExt = path.basename(item, path.extname(item));
      let name = "default";

      // Remove component prefix if present to find validity?
      // recursive logic: if filename ends with "-demo", it's default.
      if (fileNameNoExt.endsWith("-demo")) {
        name = "default";
      } else {
        // Try to strip the component name from the start if it exists, to get the variant
        // e.g. accordion-bordered -> bordered
        if (fileNameNoExt.startsWith(component + "-")) {
          name = fileNameNoExt.substring(component.length + 1);
        } else {
          name = fileNameNoExt; // fallback
        }
      }

      // Unique import name based on path to avoid collisions
      // e.g. accordion_accordion_demo
      const importName = importPath.replace(/\//g, "_").replace(/-/g, "_");

      imports.push(
        `import ${importName} from "@/registry/example/${importPath}";`,
      );

      if (!exampleRegistry[component]) {
        exampleRegistry[component] = [];
      }

      const { imports: importCode, anatomy } = splitContent(content);

      exampleRegistry[component].push({
        name,
        componentCode: importName,
        code: content,
        imports: importCode,
        anatomy: anatomy,
      });
    }
  }

  scanExamples(EXAMPLE_PATH);

  // --- 2. Process Component Source Code ---
  const registry: Record<string, any> = {};

  if (fs.existsSync(COMPONENT_PATH)) {
    const componentDirs = fs.readdirSync(COMPONENT_PATH);

    for (const startDir of componentDirs) {
      const dirPath = path.join(COMPONENT_PATH, startDir);
      if (!fs.statSync(dirPath).isDirectory()) continue;

      // The directory name is the component name (e.g., "accordion")
      // We need to recursively find all files in this directory
      const files: {
        path: string;
        type: string; // "registry:ui"
        content: string;
        target: string; // The import path that users should use? Or relative path.
      }[] = [];

      function scanDir(currentPath: string) {
        const items = fs.readdirSync(currentPath);
        for (const item of items) {
          const itemPath = path.join(currentPath, item);
          if (fs.statSync(itemPath).isDirectory()) {
            scanDir(itemPath);
          } else {
            if (!item.endsWith(".tsx") && !item.endsWith(".ts")) continue;

            const content = fs.readFileSync(itemPath, "utf-8");
            const relativePath = path.relative(COMPONENT_PATH, itemPath);
            // e.g. accordion/Accordion.tsx

            files.push({
              path: itemPath, // Absolute path (not really needed in registry)
              type: "registry:ui",
              content: content,
              target: relativePath,
            });
          }
        }
      }

      scanDir(dirPath);

      if (files.length > 0) {
        registry[startDir] = files;
      }
    }
  }

  // --- 3. Process Component Metadata from registry.json ---
  const registryJsonPath = path.join(REGISTRY_PATH, "registry.json");
  let componentMetadata = {};

  if (fs.existsSync(registryJsonPath)) {
    try {
      const registryData = JSON.parse(
        fs.readFileSync(registryJsonPath, "utf-8"),
      );
      // Convert array to object keyed by component name
      componentMetadata = registryData.reduce((acc: any, item: any) => {
        // Normalize usage fields if they are arrays
        if (item.usage) {
          if (Array.isArray(item.usage.imports)) {
            item.usage.imports = item.usage.imports.join("\n");
          }
          if (Array.isArray(item.usage.code)) {
            item.usage.code = item.usage.code.join("\n");
          }
        }
        acc[item.name] = item;
        return acc;
      }, {});
    } catch (error) {
      console.error("Error parsing registry.json:", error);
    }
  }

  // Generate file content
  const outputContent = `// This file is auto-generated. Do not edit.
import * as React from "react";
${imports.join("\n")}

export type RegistryEntry = {
  name: string;
  component: React.ComponentType;
  code: string;
  imports: string;
  anatomy: string;
};

export const exampleRegistry: Record<string, RegistryEntry[]> = {
${Object.entries(exampleRegistry)
  .map(
    ([component, entries]) => `  "${component}": [
${entries
  .map(
    (entry) => `    {
      name: "${entry.name}",
      component: ${entry.componentCode},
      code: \`${entry.code.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
      imports: \`${entry.imports.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
      anatomy: \`${entry.anatomy.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
    }`,
  )
  .join(",\n")}
  ]`,
  )
  .join(",\n")}
};

export type Registry = {
    [key: string]: Array<{
        type: string;
        content: string;
        path: string;
        target: string;
    }>
}

export const registry: Registry = {
${Object.entries(registry)
  .map(
    ([component, files]) => `  "${component}": [
${files
  .map(
    (file: any) => `    {
      type: "${file.type}",
      content: \`${file.content.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
      path: "${file.target}",
      target: "components/sonaui/${file.target}"
    }`,
  )
  .join(",\n")}
  ]`,
  )
  .join(",\n")}
};

export const componentMetadata = ${JSON.stringify(componentMetadata, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, outputContent);
  console.log(`Registry generated at ${OUTPUT_FILE}`);
}

buildRegistry();
