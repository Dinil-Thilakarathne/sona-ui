import { componentMetadata, registry } from "@/registry/index";
import { ComponentInstallation } from "./component-installation";

interface Props {
  component: string;
}

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

function getRegistryDependencyName(dependency: string) {
  return dependency.match(/\/([^/]+)\.json$/)?.[1] ?? dependency;
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

  const formatVariables = (variables: Record<string, string>) =>
    Object.entries(variables)
      .map(([name, value]) => `  --${name}: ${value};`)
      .join("\n");
  const sections: string[] = [];
  const themeVariables = { ...metadata.cssVars.theme };

  for (const name of new Set([
    ...Object.keys(metadata.cssVars.light ?? {}),
    ...Object.keys(metadata.cssVars.dark ?? {}),
  ])) {
    themeVariables[`color-${name}`] = `var(--${name})`;
  }

  if (Object.keys(themeVariables).length > 0) {
    sections.push(`@theme inline {\n${formatVariables(themeVariables)}\n}`);
  }
  if (metadata.cssVars.light) {
    sections.push(`:root {\n${formatVariables(metadata.cssVars.light)}\n}`);
  }
  if (metadata.cssVars.dark) {
    sections.push(`.dark {\n${formatVariables(metadata.cssVars.dark)}\n}`);
  }

  return sections.join("\n\n");
}

export function ComponentInstallationServer({ component }: Props) {
  const componentFiles = registry[component];
  const metadata = componentMetadata[
    component as keyof typeof componentMetadata
  ] as RegistryMetadata | undefined;

  if (!componentFiles) {
    return (
      <div className="text-muted-foreground text-sm">
        Component{" "}
        <code className="px-1 py-0.5 bg-muted rounded">{component}</code> not
        found in registry.
      </div>
    );
  }

  const dependencyNames = new Set<string>(
    getImportedFoundations(componentFiles),
  );
  for (const dependency of metadata?.registryDependencies ?? []) {
    dependencyNames.add(getRegistryDependencyName(dependency));
  }

  const manualFiles = [...componentFiles];
  const packageDependencies = new Set(metadata?.dependencies ?? []);
  const themeFiles: Array<{ path: string; content: string }> = [];

  for (const dependencyName of dependencyNames) {
    const dependencyFiles = registry[dependencyName];
    if (dependencyFiles) manualFiles.push(...dependencyFiles);

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
      themeFiles.push({ path: "app/globals.css", content: themeCss });
    }
  }

  return (
    <ComponentInstallation
      component={component}
      componentFiles={manualFiles}
      metadata={{ dependencies: [...packageDependencies] }}
      themeFiles={themeFiles}
    />
  );
}
