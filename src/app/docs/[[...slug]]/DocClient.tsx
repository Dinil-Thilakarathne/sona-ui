"use client";

import { Suspense } from "react";
import { Mdx } from "@/components/common/mdx-components";
import { DocsCopyPage } from "@/components/docs-copy-page/docs-copy-page";
import {
  type DocsPageLink,
  DocsPageNavigation,
} from "@/components/docs-page-navigation/docs-page-navigation";
import { DocsTableOfContents } from "@/components/docs-table-of-contents/docs-table-of-contents";
import { SITE_METADATA } from "@/config/site";

interface DocClientProps {
  doc: {
    title: string;
    slug: string;
    body: { code: string; raw: string };
  };
  navigation: { previous?: DocsPageLink; next?: DocsPageLink };
}

export default function DocClient({ doc, navigation }: DocClientProps) {
  const url = `${SITE_METADATA.siteLink}/docs/${doc.slug}`;
  const mdUrl = `/api/md?slug=${encodeURIComponent(doc.slug)}`;

  return (
    <div className="relative mx-auto w-full max-w-[calc(75ch+17rem)]">
      <div className="xl:grid xl:grid-cols-[minmax(0,75ch)_13rem] xl:gap-x-12">
        <div>
          <Mdx
            code={doc.body.code}
            headerActions={
              <DocsCopyPage page={doc.body.raw} url={url} mdUrl={mdUrl} />
            }
          />
        </div>

        <Suspense fallback={<div className="hidden xl:block">Loading</div>}>
          <DocsTableOfContents />
        </Suspense>
        <DocsPageNavigation
          {...navigation}
          className="mt-8 hidden xl:col-start-1 xl:row-start-2 xl:grid"
        />
      </div>
    </div>
  );
}
