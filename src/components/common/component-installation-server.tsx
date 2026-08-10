import { getComponentDocumentationData } from "@/components/docs-focus/component-doc-data";
import { ComponentInstallation } from "./component-installation";

interface Props {
  component: string;
}

export function ComponentInstallationServer({ component }: Props) {
  const data = getComponentDocumentationData(component);

  if (!data) {
    return (
      <div className="text-muted-foreground text-sm">
        Component{" "}
        <code className="rounded bg-muted px-1 py-0.5">{component}</code> not
        found in registry.
      </div>
    );
  }

  const installFiles = data.sourceFiles.filter(
    (file) => file.group === "component" && file.target !== "app/globals.css",
  );
  const themeFiles = data.sourceFiles
    .filter(
      (file) => file.group === "component" && file.target === "app/globals.css",
    )
    .map((file) => ({ path: file.target, content: file.content }));

  return (
    <ComponentInstallation
      component={component}
      componentFiles={installFiles.map((file) => ({
        path: file.path,
        target: file.target,
        type: "registry:file",
        content: file.content,
      }))}
      metadata={{ dependencies: data.dependencies }}
      themeFiles={themeFiles}
    />
  );
}
