---
name: component-preview-usage
description: Instructions and guidelines for using the component-preview and component-preview-server components within the Sona-UI repository. Includes details on registry fetching.
---

# Component Preview in Sona-UI

This skill covers the usage of the Component Preview ecosystem in the `sona-ui` repository. The preview system handles displaying live React components alongside their raw source code in an interactive tabbed interface.

## Core Components

The system relies on three primary files:
1. `ComponentPreview` (`src/components/common/component-preview.tsx`): The client-side UI wrapper providing the Tabs (Preview / Code) and invoking `CodeBlock` under the hood. It takes raw `component` and `code` nodes.
2. `ComponentPreviewServer` (`src/components/common/component-preview-server.tsx`): A server component wrapper that automatically resolves a component and its source code from a global registry map.
3. `ComponentWrapper` (`src/components/common/component-wrapper.tsx`): The visual layout shell that adds the standard background, padding, and centered layout to the actual rendered component.

## Usage Guidelines

### 1. Manual Usage (ComponentPreview)
If you already have the component node and its raw string code, you can use `ComponentPreview` directly. This is generalized and can be used on any path or any arbitrary block of UI.

```tsx
import ComponentPreview from "@/components/common/component-preview";
import MyButton from "./my-button";

const codeString = `
export default function MyButton() {
  return <button>Click</button>
}
`;

export default function Page() {
  return (
    <ComponentPreview 
      component={<MyButton />} 
      code={codeString} 
    />
  )
}
```

### 2. Registry Usage (ComponentPreviewServer)
To build scalable documentation (like a UI library docs site), rely on `ComponentPreviewServer`. This abstracts away importing explicit components and parsing raw strings by reading from a central registry.

```tsx
import { ComponentPreviewServer } from "@/components/common/component-preview-server";

// Auto fetches the "default" example from the "button" category
// in the exampleRegistry
<ComponentPreviewServer 
  component="button" 
  name="default" 
/>
```

## How Registry Fetching Works

The `ComponentPreviewServer` component integrates tightly with the `@/registry/index` file (specifically `exampleRegistry`). 
When you pass `component="button"` and `name="default"`:
1. It queries `exampleRegistry["button"]` to get an array of button examples.
2. It `.find()`s the specific example where `e.name === "default"`.
3. If found, it passes the example's lazy-loaded/imported functional component `<example.component />` and its literal string `example.code` down to `ComponentPreview`.
4. If it fails, it gracefully handles the error by returning an inline message: `Example default not found in registry for component button.`

## Reference Files

If you need to bootstrap these preview block wrapper components into another standalone project, full source code for the components is provided in the `reference/` block of this skill.
- [component-preview.tsx](file:///Users/dinilthilakarathne/repos/sona-ui/.agent/skills/component-preview/reference/component-preview.md)
- [component-preview-server.tsx](file:///Users/dinilthilakarathne/repos/sona-ui/.agent/skills/component-preview/reference/component-preview-server.md)
- [component-wrapper.tsx](file:///Users/dinilthilakarathne/repos/sona-ui/.agent/skills/component-preview/reference/component-wrapper.md)
