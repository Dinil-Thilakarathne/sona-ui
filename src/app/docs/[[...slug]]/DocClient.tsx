"use client";

import { Mdx } from "@/components/Common/MDXComponents";

interface DocClientProps {
  doc: {
    title: string;
    body: { code: string };
  };
}

export default function DocClient({ doc }: DocClientProps) {
  return (
    <div>
      <h1>{doc.title}</h1>
      <Mdx code={doc.body.code} />
    </div>
  );
}
