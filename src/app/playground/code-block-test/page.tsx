import { CodeBlockSource } from "@/components/code-block/code-block-source";

export default function CodeBlockTestPage() {
  return (
    <div className="container mx-auto space-y-8 py-10">
      <div>
        <h1 className="mb-4 text-2xl font-bold">CodeBlockSource Test</h1>
        <p className="text-muted-foreground mb-4">
          This page tests the server-side file reading capability of the
          CodeBlock component. Below should be the content of{" "}
          <code>src/lib/file-utils.ts</code>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          File Content: src/lib/file-utils.ts
        </h2>
        <CodeBlockSource
          filePath="src/lib/file-utils.ts"
          language="typescript"
          filename="src/lib/file-utils.ts"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Manual Code (Fallback)</h2>
        <CodeBlockSource
          code="console.log('Hello from manual code!');"
          language="typescript"
          filename="manual-example.ts"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Error Handling (Non-existent file)
        </h2>
        <CodeBlockSource
          filePath="src/lib/non-existent-file.ts"
          language="typescript"
          filename="non-existent.ts"
        />
      </div>
    </div>
  );
}
