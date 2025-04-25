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

/*
  fields: {
    title: {
      type: "string",
      description: "The title of the document",
      required: true,
    },
    componentPath: {
      type: "string",
      description: "The file path to the component",
      required: true,
    },
    examplePath: {
      type: "string",
      description: "The file path to the component example",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "Tags associated with the document",
      required: false,
    },
    slug: {
      type: "string",
      description: "The URL-friendly identifier for the document",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/docs/${doc.slug}`,
    },
  },

  */
