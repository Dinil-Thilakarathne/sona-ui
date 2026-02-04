"use client";

import { Mdx } from "@/components/common/mdx-components";

interface DocClientProps {
  doc: {
    title: string;
    body: { code: string };
  };
}

export default function DocClient({ doc }: DocClientProps) {
  return (
    <div>
      <Mdx code={doc.body.code} />
    </div>
  );
}
