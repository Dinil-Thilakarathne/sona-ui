import { componentMetadata, registry } from "@/registry/index";
import { ComponentInstallation } from "./component-installation";

interface Props {
  component: string;
}

export function ComponentInstallationServer({ component }: Props) {
  const componentFiles = registry[component];
  const metadata =
    componentMetadata[component as keyof typeof componentMetadata];

  if (!componentFiles) {
    return (
      <div className="text-muted-foreground text-sm">
        Component{" "}
        <code className="px-1 py-0.5 bg-muted rounded">{component}</code> not
        found in registry.
      </div>
    );
  }

  return (
    <ComponentInstallation
      component={component}
      componentFiles={componentFiles}
      metadata={metadata}
    />
  );
}
