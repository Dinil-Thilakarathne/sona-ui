import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { type } from "arktype";

const docs = defineCollection({
  name: "docs",
  directory: "src/content/",
  include: "**/*.mdx",
  schema: type({
    title: "string",
    "description?": "string",
    "tags?": "string[]",
    slug: "string",
    "image?": "string",
    searchable: "boolean = true",
  }),
  transform: async (document, context) => {
    const slugAsParams = document._meta.path
      .replace(/\\/g, "/")
      .replace(/\/docs\//, "")
      .replace(/\.mdx$/, "");
    const body = await compileMDX(context, document);
    return {
      ...document,
      slugAsParams: slugAsParams,
      body: {
        raw: document.content,
        code: body,
      },
    };
  },
});

export default defineConfig({
  collections: [docs],
});
