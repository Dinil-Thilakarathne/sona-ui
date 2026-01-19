import { ComponentUsage } from "./component-usage";
import { exampleRegistry } from "@/registry/index";

export function ComponentUsageServer({ component }: { component: string }) {
  const examples = exampleRegistry[component];
  const defaultExample =
    examples?.find((example) => example.name === "default") || examples?.[0];

  if (!defaultExample) {
    return (
      <div className="border-destructive bg-destructive/10 rounded-md border p-4">
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
