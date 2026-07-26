import type * as React from "react";
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockHeader,
  CodeBlockPre,
} from "./code-block";

interface InternalCodeBlockProps
  extends Omit<React.ComponentProps<typeof CodeBlock>, "children"> {
  filename?: string;
}

export function InternalCodeBlock({
  code,
  language,
  filename,
  ...props
}: InternalCodeBlockProps) {
  return (
    <CodeBlock code={code} language={language} {...props} className=" my-4">
      <CodeBlockHeader filename={filename} />
      <CodeBlockPre>
        <CodeBlockCode />
      </CodeBlockPre>
    </CodeBlock>
  );
}
