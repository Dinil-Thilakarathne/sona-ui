"use client";

import type { ReactElement } from "react";

import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockPre,
} from "@/components/code-block/code-block";

interface ComponentUsageProps {
  component: string;
  anatomy: string;
  highlightedAnatomy?: ReactElement;
}

export function ComponentUsage({
  anatomy,
  highlightedAnatomy,
}: ComponentUsageProps) {
  return (
    <div className="my-6 space-y-4 max-w-full min-w-0 w-full not-prose">
      <CodeBlock
        code={anatomy}
        language="tsx"
        initial={highlightedAnatomy}
        floatingCopy
      >
        <CodeBlockPre>
          <CodeBlockCode />
        </CodeBlockPre>
      </CodeBlock>
    </div>
  );
}
