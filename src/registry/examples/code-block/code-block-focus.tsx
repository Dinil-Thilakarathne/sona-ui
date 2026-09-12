import CodeBlock from "@/registry/sonaui/code-block/code-block";

export default function CodeBlockFocusExample() {
  return <CodeBlock language="tsx" filename="button.tsx" focusLines="2-3" code={`export function Button() {\n  return <button type="button">\n    Save\n  </button>;\n}`} />;
}
