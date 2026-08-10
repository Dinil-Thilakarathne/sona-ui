"use client";

import type { ComponentDocumentationData } from "@/components/docs-focus/component-doc-data";
import { DocsFocusShell } from "@/components/docs-focus/docs-focus-shell";
import type { DocsPageLink } from "@/components/docs-page-navigation/docs-page-navigation";

interface DocClientProps {
  doc: {
    title: string;
    slug: string;
    body: { code: string; raw: string };
    sourceFiles?: Record<string, string>;
  };
  navigation: { previous?: DocsPageLink; next?: DocsPageLink };
  componentData?: ComponentDocumentationData | null;
}

export default function DocClient({
  doc,
  navigation,
  componentData,
}: DocClientProps) {
  return (
    <DocsFocusShell
      doc={doc}
      navigation={navigation}
      componentData={componentData}
    />
  );
}
