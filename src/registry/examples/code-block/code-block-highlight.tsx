import CodeBlock from "@/registry/sonaui/code-block/code-block";

export default function CodeBlockHighlightExample() {
  return <CodeBlock language="tsx" filename="button.tsx" showLineNumbers highlightLines={[2, 3]} code={`export function Button() {\n  return <button type="button">Save</button>;\n}`} />;
}
