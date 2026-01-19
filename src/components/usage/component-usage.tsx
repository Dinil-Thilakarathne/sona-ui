"use client";

import type { ReactElement } from "react";

import {
  CodeBlock,
  CodeBlockPre,
  CodeBlockCode,
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
    <div className="not-prose my-6 w-full max-w-full min-w-0 space-y-4">
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
