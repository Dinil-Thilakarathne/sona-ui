import * as React from "react";
import { CodeBlock } from "./code-block";
import { readFileContent } from "@/lib/file-utils";

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
