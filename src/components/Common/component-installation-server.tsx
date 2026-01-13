import { ComponentInstallation } from "./component-installation";
import { registry } from "@/registry/index";

interface Props {
  component: string;
}

export function ComponentInstallationServer({ component }: Props) {
  const componentFiles = registry[component];

  if (!componentFiles) {
    return (
      <div className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted rounded px-1 py-0.5">{component}</code> not
        found in registry.
      </div>
    );
  }

  return (
    <ComponentInstallation
      component={component}
      componentFiles={componentFiles}
    />
  );
}
