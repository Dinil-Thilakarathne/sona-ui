import ComponentPreview from "./component-preview";
import { exampleRegistry } from "@/registry/index";

interface Props {
  name: string;
  component?: string;
}

export function ComponentPreviewServer({ name, component }: Props) {
  // If component is provided, look it up in the registry
  if (component && name) {
    const examples = exampleRegistry[component];
    const example = examples?.find((e) => e.name === name);

    if (!example) {
      return (
        <div className="text-muted-foreground text-sm">
          Example <code className="bg-muted rounded px-1 py-0.5">{name}</code>{" "}
          not found in registry for component{" "}
          <code className="bg-muted rounded px-1 py-0.5">{component}</code>.
        </div>
      );
    }

    return (
      <ComponentPreview component={<example.component />} code={example.code} />
    );
  }

  return (
    <div className="text-muted-foreground text-sm">
      Invalid props provided to ComponentPreview.
    </div>
  );
}
