---
name: code-block-usage
description: Instructions and guidelines for using the code-block components (CodeBlock, CodeBlockSource, InternalCodeBlock) within the sona-ui repository.
---

# Code Block Components in Sona-UI

This skill describes how to correctly utilize the suite of code-block components available within the `sona-ui` repository: `CodeBlock`, `CodeBlockSource`, and `InternalCodeBlock`. These components provide rich syntax highlighting using Shiki, line highlighting, and diff support.

## Available Components

### 1. `CodeBlock`
Location: `src/components/code-block/code-block.tsx`

This is the main foundational block that creates a context-aware boundary. It provides elements like tabs, header, line numbers, and floating copy capabilities.

**Usage:**
Use `CodeBlock` when you need maximum granular control over the UI, explicitly laying out headers, tabs, or applying specific stylings to the `<pre>` wrapper.

```tsx
import { CodeBlock, CodeBlockHeader, CodeBlockPre, CodeBlockCode } from "@/components/code-block/code-block";

<CodeBlock code={"const x = 1;"} language="typescript" showDiff={false} highlightLines={[1]}>
  <CodeBlockHeader filename="example.ts" />
  <CodeBlockPre lineNumbers={true}>
    <CodeBlockCode />
  </CodeBlockPre>
</CodeBlock>
```

**Props:**
- `code` (string): The raw code to be highlighted.
- `language` (string): The syntax highlighting language (default: `javascript`).
- `floatingCopy` (boolean): Shows a floating copy button overlay.
- `highlightLines` (number[] | string): Array of line numbers to highlight differently.
- `focusLines` (number[] | string): Blurs out lines that are not in focus.
- `showDiff` (boolean): Indicates deleted/added lines using the `[data-diff]` lines internally.

---

### 2. `CodeBlockSource`
Location: `src/components/code-block/code-block-source.tsx`

This component takes a `filePath` (or falls back to `code` prop) to dynamically read the exact source code of a file from the disk and pass it down into the `CodeBlock`.

**Usage:**
Ideal for documentation pages where you want the code block to stay intrinsically synchronized with the file's current truth instead of manually copy-pasting code snippets into your TSX. **Requires usage within a server component since it performs filesystem reads (`readFileContent`).**

```tsx
import { CodeBlockSource } from "@/components/code-block/code-block-source";

// Usage in a server component
<CodeBlockSource filePath="src/components/button/button.tsx" language="tsx">
  <CodeBlockPre>
    <CodeBlockCode />
  </CodeBlockPre>
</CodeBlockSource>
```

---

### 3. `InternalCodeBlock`
Location: `src/components/code-block/internal-code-block.tsx`

A pre-wired abstraction perfectly suited for simple code block rendering without boilerplate.

**Usage:**
When you just want to pass `code`, `language`, and `filename` and get a standard block structure.

```tsx
import { InternalCodeBlock } from "@/components/code-block/internal-code-block";

<InternalCodeBlock
  code="console.log('Hello');"
  language="javascript"
  filename="hello.js"
/>
```

---

## Technical Dependencies
When modifying or working with these components, be aware of the following cross-dependencies:

- **Shiki:** Handles syntax highlighting dynamically.
- **Base UI:** Components like `<Menu>` and styling merge utilities (`@base-ui/react/use-render`, `@base-ui/react/merge-props`).
- **Icons:** `lucide-react` for standard UI icons and `@icons-pack/react-simple-icons` for language-specific glyphs.
- **Internal Components:**
  - `Tabs` from `@/components/tabs/tabs`
  - `ScrollArea` from `@/components/scroll-area/scroll-area`
  - `CopyButton` from `../copy-button/copy-button`
  - `readFileContent` from `@/lib/file-utils` (For `CodeBlockSource`)

## Best Practices
1. **Prefer `CodeBlockSource` for internal code:** When referencing files already within the `sona-ui` repository, use `CodeBlockSource` with absolute paths relative to root or workspace relative paths that `readFileContent` supports. This keeps documentation synced with reality.
2. **Handle Context properly:** `CodeBlockHeader`, `CodeBlockPre`, `CodeBlockLanguage`, `CodeBlockCode`, etc., must be placed inside `<CodeBlock>`, as they consume context (like `lines`, `nodes`, `code`, `showDiff`).
3. **Use the built-in diff functionality:** When showcasing changes to code, instead of manually typing `-` and `+`, use `showDiff` and let the component's internal `shiki` parsing colorize the deltas appropriately via the standard patch formatting.

## Reference Files

If you need to bootstrap these components into another standalone project, full source code for the components is provided in the `reference/` block of this skill.
- [code-block.tsx](file:///Users/dinilthilakarathne/repos/sona-ui/.agent/skills/code-block/reference/code-block.md)
- [code-block-source.tsx](file:///Users/dinilthilakarathne/repos/sona-ui/.agent/skills/code-block/reference/code-block-source.md)
- [internal-code-block.tsx](file:///Users/dinilthilakarathne/repos/sona-ui/.agent/skills/code-block/reference/internal-code-block.md)
