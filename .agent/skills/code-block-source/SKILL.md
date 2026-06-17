---
name: code-block-source-usage
description: Guidelines and rules for using the CodeBlockSource component, specifically handling how source files and code are read from the system in the Sona-UI repository.
---

# CodeBlockSource Component Guidelines

This skill details how `CodeBlockSource` actually reads files from the system and outlines the strict rules you must observe when integrating it into the project. 

The `CodeBlockSource` relies on `readFileContent` (located in `src/lib/file-utils.ts`), which dynamically reads content from the disk using `fs` and `path`.

## Rules & Constraints

When using `CodeBlockSource` or `readFileContent`, you must adhere to the following rules:

### 1. Server Components Only
`CodeBlockSource` is an asynchronous React Server Component that strictly uses the Node.js `fs` module to load file data.
- **Rule:** You CANNOT import or use `CodeBlockSource` inside a component marked with `"use client"`.
- **Reason:** The `fs` module does not exist in the browser context and will cause bundling or runtime crashes.
- **Workaround:** If you need code blocks in a client component, you must read the file in a parent server component, then pass the raw text string down to the basic `CodeBlock` component via the `code` prop.

### 2. File Path Resolution
All file paths passed into `filePath` are resolved relative to the absolute root directory of the project.
- **Rule:** Always use paths originating from the root directory (e.g., `src/components/...` or `public/...`). 
- **Rule:** DO NOT use relative standard dot paths like `./my-file.tsx` or `../components/my-file.tsx` because `readFileContent` uses `path.join(process.cwd(), filePath)`.

✅ **Correct Example:**
```tsx
<CodeBlockSource filePath="src/components/code-block/code-block.tsx" language="tsx" />
```

❌ **Incorrect Example:**
```tsx
// This will fail because it's relative to the current file, not process.cwd()
<CodeBlockSource filePath="./code-block.tsx" language="tsx" />
```

### 3. Graceful Error Handling
If a file cannot be found (e.g., typo in the path, or a file was moved but the documentation wasn't updated), the application will not crash.
- **Behavior:** `readFileContent` catches read exceptions, logs the exact error to the server console, and gracefully degrades by returning a string like: `// Error reading file: <filePath>`.
- **Rule:** During development, if you see a crash comment in your UI code blocks, check the server terminal logs to identify the `fs` failure.

### 4. Build Output Limits (Deployments)
In platforms like Vercel (Next.js serverless functions), raw source files (like `.tsx` under `src/`) aren't always shipped to the production server runtime by default unless explicitly tracked. 
- **Rule:** If you find that `CodeBlockSource` works in local development but fails with missing file errors in production, you may need to enable `experimental.outputFileTracingIncludes` in your `next.config.ts`, or verify `fs.readFile` static analysis.

## Usage Example

```tsx
import { CodeBlockSource } from "@/components/code-block/code-block-source";
import { CodeBlockPre, CodeBlockCode } from "@/components/code-block/code-block";

// This file must NOT have "use client";

export default function DocumentationPage() {
  return (
    <section>
      <h2>Button Component Reference</h2>
      
      {/* File read relative to project root */}
      <CodeBlockSource filePath="src/components/button/button.tsx" language="tsx">
        <CodeBlockPre lineNumbers>
          <CodeBlockCode />
        </CodeBlockPre>
      </CodeBlockSource>
    </section>
  );
}
```
