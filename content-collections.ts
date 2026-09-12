import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { type } from "arktype";

type MdxTreeNode = {
  type: string;
  depth?: number;
  value?: string;
  children?: MdxTreeNode[];
  name?: string;
  attributes?: MdxTreeNode[];
};

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function remarkDocumentationSections() {
  return (tree: MdxTreeNode) => {
    const children = tree.children;
    if (!children) return;

    const sectionStarts = children.reduce<number[]>((starts, node, index) => {
      if (node.type === "heading" && node.depth === 2) starts.push(index);
      return starts;
    }, []);

    if (sectionStarts.length === 0) return;

    const nextChildren = children.slice(0, sectionStarts[0]);
    sectionStarts.forEach((start, index) => {
      const end = sectionStarts[index + 1] ?? children.length;
      const sectionChildren = children.slice(start, end);
      const heading = sectionChildren[0];
      const headingText = (heading.children ?? [])
        .map((child) => child.value ?? "")
        .join(" ");
      nextChildren.push({
        type: "mdxJsxFlowElement",
        name: "DocumentationSection",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "id",
            value: slugifyHeading(headingText),
          },
        ],
        children: sectionChildren,
      });
    });

    tree.children = nextChildren;
  };
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
    const body = await compileMDX(
      context,
      {
        ...document,
        content: document.content,
      },
      { remarkPlugins: [remarkDocumentationSections] },
    );
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
