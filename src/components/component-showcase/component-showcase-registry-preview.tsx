import { exampleRegistry } from "@/registry";

export function ComponentShowcaseRegistryPreview({ slug }: { slug: string }) {
  const example = exampleRegistry[slug]?.at(-1);

  if (!example) {
    return (
      <span className="text-xs text-muted-foreground">Preview coming soon</span>
    );
  }

  const Example = example.component;

  return <Example />;
}
