import CodeBlock from "@/registry/sonaui/code-block/code-block";

export default function CodeBlockExample() {
  return (
    <CodeBlock
      code={`export function Greeting() {\n  return <h1>Hello, world!</h1>;\n}`}
      language="tsx"
      filename="greeting.tsx"
      showLineNumbers
    />
  );
}
