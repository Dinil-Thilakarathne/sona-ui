import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { type } from "arktype";

const shellOwnedSections = new Set([
  "Playground",
  "Installation",
  "Usage",
  "Props",
]);

function cleanComponentContent(content: string) {
  const withoutShellComponents = content
    .replace(/^# .+\n+/m, "")
    .replace(/<Divider\s*\/>\s*/g, "")
    .replace(/<ComponentPreview[\s\S]*?\/>\s*/g, "");
  let skipSection = false;

  return withoutShellComponents
    .split("\n")
    .filter((line) => {
      const heading = line.match(/^## (.+?)\s*$/)?.[1];
      if (heading) {
        skipSection = shellOwnedSections.has(heading);
      }
      return !skipSection;
    })
    .join("\n")
    .trim();
}

const docs = defineCollection({
  name: "docs",
  directory: "src/content/",
  include: "**/*.mdx",
  schema: type({
    title: "string",
    "description?": "string",
    "tags?": "string[]",
    slug: "string",
    "component?": "string",
    "image?": "string",
    searchable: "boolean = true",
  }),
  transform: async (document, context) => {
    const slugAsParams = document._meta.path
      .replace(/\\/g, "/")
      .replace(/\/docs\//, "")
      .replace(/\.mdx$/, "");
    const componentContent = document.component
      ? cleanComponentContent(document.content)
      : document.content;
    const body = await compileMDX(context, {
      ...document,
      content: componentContent,
    });
    return {
      ...document,
      slugAsParams: slugAsParams,
      body: {
        raw: componentContent,
        code: body,
      },
    };
  },
});

export default defineConfig({
  collections: [docs],
});
