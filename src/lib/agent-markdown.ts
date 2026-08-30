import { SITE_METADATA } from "@/config/site";

const origin = SITE_METADATA.siteLink;

export const homeMarkdown = `# ${SITE_METADATA.siteName}

${SITE_METADATA.description}

Sona UI is a source-owned React component library. Install components through the shadcn registry, inspect their source, and adapt their interaction and motion to your product.

## Start here

- [Component catalog](${origin}/agent/catalog.json)
- [Installation](${origin}/docs/installation)
- [Use with AI](${origin}/docs/use-with-ai)
- [Registry index](${origin}/r/registry.json)
- [Agent guidance](${origin}/llms.txt)
`;

export function notFoundMarkdown(pathname: string) {
  return `# Not found

No public Sona UI resource exists at \`${pathname}\`.

## Continue from

- [Homepage](${origin}/)
- [Documentation](${origin}/docs/installation)
- [Sitemap](${origin}/sitemap.xml)
- [Agent guidance](${origin}/llms.txt)
`;
}
