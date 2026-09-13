"use client";

import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockHeader,
  CodeBlockPre,
} from "@/components/code-block/code-block";

type SourceFile = {
  path: string;
  target: string;
  content: string;
};

function languageFor(path: string) {
  const extension = path.split(".").pop()?.toLowerCase();
  return ["css", "js", "jsx", "ts", "tsx"].includes(extension ?? "")
    ? extension
    : "text";
}

export function ComponentFilePreview({ files }: { files: SourceFile[] }) {
  if (files.length === 0) return null;

  return (
    <div className="flex min-w-0 flex-col gap-4 rounded-xl border border-border bg-muted/30 p-3">
      {files.map((file) => (
        <CodeBlock
          key={file.path}
          code={file.content}
          language={languageFor(file.target)}
        >
          <CodeBlockHeader filename={file.target} />
          <CodeBlockPre>
            <CodeBlockCode />
          </CodeBlockPre>
        </CodeBlock>
      ))}
    </div>
  );
}
