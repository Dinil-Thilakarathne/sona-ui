import type * as React from "react";
import { readFileContent } from "@/lib/file-utils";
import { CodeBlock } from "./code-block";

interface CodeBlockSourceProps extends React.ComponentProps<typeof CodeBlock> {
  filePath?: string;
}

export async function CodeBlockSource({
  filePath,
  code: manualCode,
  ...props
}: CodeBlockSourceProps) {
  let code = manualCode || "";

  if (filePath && !code) {
    code = await readFileContent(filePath);
  }

  return <CodeBlock code={code} {...props} />;
}
