import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";

const docs = defineCollection({
  name: "docs",
  directory: "src/content/",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    slug: z.string(),
    image: z.string().optional(),
    searchable: z.boolean().optional().default(true),
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
