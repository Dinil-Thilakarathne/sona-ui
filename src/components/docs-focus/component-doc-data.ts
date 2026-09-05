import { componentMetadata, exampleRegistry, registry } from "@/registry/index";
import { playgroundRegistry } from "@/registry/playground";
import { componentProps } from "@/registry/prop-types";

export type ComponentSourceFile = {
  id: string;
  path: string;
  target: string;
  content: string;
  language: string;
  group: "component" | "example";
};

export type ComponentDocumentationData = {
  component: string;
  examples: Array<{ name: string; code: string }>;
  sourceFiles: ComponentSourceFile[];
  dependencies: string[];
  usage: string;
  props: (typeof componentProps)[string];
  hasPlayground: boolean;
};

type RegistryMetadata = {
  dependencies?: string[];
  registryDependencies?: string[];
  cssVars?: {
    theme?: Record<string, string>;
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
};

const foundationImports = {
  "@/lib/sona-utils": "sona-utils",
  "@/lib/sona-motion": "sona-motion",
} as const;

function languageFor(path: string) {
  const extension = path.split(".").pop()?.toLowerCase();
  return ["css", "js", "jsx", "ts", "tsx"].includes(extension ?? "")
    ? (extension ?? "text")
    : "text";
}

function getRegistryDependencyName(dependency: string) {
  return (
    dependency.match(/\/([^/]+)\.json$/)?.[1] ??
    dependency.replace(/^@sona-ui\//, "")
  );
}

function getImportedFoundations(files: (typeof registry)[string]) {
  return Object.entries(foundationImports)
    .filter(([specifier]) =>
      files.some(
        (file) =>
          file.content.includes(`"${specifier}"`) ||
          file.content.includes(`'${specifier}'`),
      ),
    )
    .map(([, foundation]) => foundation);
}

function buildThemeCss(metadata: RegistryMetadata) {
  if (!metadata.cssVars) return null;
  const format = (values: Record<string, string>) =>
    Object.entries(values)
      .map(([name, value]) => `  --${name}: ${value};`)
      .join("\n");
  const sections: string[] = [];
  const theme = { ...metadata.cssVars.theme };

  for (const name of new Set([
    ...Object.keys(metadata.cssVars.light ?? {}),
    ...Object.keys(metadata.cssVars.dark ?? {}),
  ])) {
    theme[`color-${name}`] = `var(--${name})`;
  }
  if (Object.keys(theme).length)
    sections.push(`@theme inline {\n${format(theme)}\n}`);
  if (metadata.cssVars.light)
    sections.push(`:root {\n${format(metadata.cssVars.light)}\n}`);
  if (metadata.cssVars.dark)
    sections.push(`.dark {\n${format(metadata.cssVars.dark)}\n}`);
  return sections.join("\n\n");
}

export function getComponentDocumentationData(
  component: string,
): ComponentDocumentationData | null {
  const componentFiles = registry[component];
  const examples = exampleRegistry[component];
  if (!componentFiles || !examples?.length) return null;

  const metadata = componentMetadata[
    component as keyof typeof componentMetadata
  ] as RegistryMetadata | undefined;
  const dependencyNames = new Set<string>(
    getImportedFoundations(componentFiles),
  );
  for (const dependency of metadata?.registryDependencies ?? []) {
    dependencyNames.add(getRegistryDependencyName(dependency));
  }

  const packageDependencies = new Set(metadata?.dependencies ?? []);
  const allFiles = [...componentFiles];
  for (const dependencyName of dependencyNames) {
    allFiles.push(...(registry[dependencyName] ?? []));
    const dependencyMetadata = componentMetadata[
      dependencyName as keyof typeof componentMetadata
    ] as RegistryMetadata | undefined;
    for (const dependency of dependencyMetadata?.dependencies ?? []) {
      packageDependencies.add(dependency);
    }
    const themeCss = dependencyMetadata
      ? buildThemeCss(dependencyMetadata)
      : null;
    if (themeCss) {
      allFiles.push({
        path: `${dependencyName}-theme.css`,
        target: "app/globals.css",
        type: "registry:file",
        content: themeCss,
      });
    }
  }

  const sourceFiles: ComponentSourceFile[] = allFiles.map((file, index) => ({
    id: `component:${file.path}:${index}`,
    path: file.path,
    target: file.target,
    content: file.content,
    language: languageFor(file.target),
    group: "component",
  }));
  sourceFiles.push(
    ...examples.map((example, index) => ({
      id: `example:${example.name}:${index}`,
      path: `${example.name}.tsx`,
      target: `${example.name}.tsx`,
      content: example.code,
      language: "tsx",
      group: "example" as const,
    })),
  );

  const defaultExample =
    examples.find((example) => example.name === "default") ?? examples[0];

  return {
    component,
    examples: examples.map(({ name, code }) => ({ name, code })),
    sourceFiles,
    dependencies: [...packageDependencies],
    usage: defaultExample.anatomy,
    props: componentProps[component],
    hasPlayground: Boolean(playgroundRegistry[component]),
  };
}
