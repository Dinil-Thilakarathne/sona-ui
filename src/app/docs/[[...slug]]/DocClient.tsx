"use client";

import { Mdx } from "@/components/common/mdx-components";
import { DocsCopyPage } from "@/components/docs-copy-page/docs-copy-page";
import { SITE_METADATA } from "@/config/site";

interface DocClientProps {
  doc: {
    title: string;
    slug: string;
    body: { code: string; raw: string };
  };
}

export default function DocClient({ doc }: DocClientProps) {
  const url = `${SITE_METADATA.siteLink}/docs/${doc.slug}`;
  const mdUrl = `/api/md?slug=${encodeURIComponent(doc.slug)}`;

  return (
    <div className=" w-full max-w-5xl mx-auto ">
      <div className=" flex justify-end  relative">
        <div className=" absolute right-0 -top-full">
          <DocsCopyPage page={doc.body.raw} url={url} mdUrl={mdUrl} />
        </div>
      </div>
      <Mdx code={doc.body.code} />
    </div>
  );
}
