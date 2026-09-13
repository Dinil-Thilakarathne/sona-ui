import CodeBlock from "@/registry/sonaui/code-block/code-block";

export default function CodeBlockDiffExample() {
  return <CodeBlock language="ts" filename="config.ts" showDiff code={`-const theme = "light";\n+const theme = "dark";\n export default theme;`} />;
}
