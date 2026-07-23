import { exampleRegistry } from "@/registry/index";
import { ComponentUsage } from "./component-usage";

export function ComponentUsageServer({ component }: { component: string }) {
  const examples = exampleRegistry[component];
  const defaultExample =
    examples?.find((example) => example.name === "default") || examples?.[0];

  if (!defaultExample) {
    return (
      <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
        <p className="text-destructive text-sm">
          Component anatomy not found: <code>{component}</code>
        </p>
      </div>
    );
  }

  return (
    <ComponentUsage component={component} anatomy={defaultExample.anatomy} />
  );
}
