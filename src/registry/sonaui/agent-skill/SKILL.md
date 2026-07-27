---
name: sona-ui
version: 1.0.0
description: Use Sona UI components through the registry while preserving accessibility, purposeful motion, and consumer conventions.
---

# Sona UI Agent Skill

Use this skill when a user asks you to discover, install, compose, or review a Sona UI component.

## Core invariant

Install source-owned components through the Sona UI shadcn registry. Do not copy component source into prompts or recreate a component that already exists in the registry.

Registry namespace:

```text
@sona-ui
```

Registry URL:

```text
https://sona-ui.vercel.app/r/{name}.json
```

## Workflow

1. Inspect the consumer project's framework, React version, styling entry, aliases, and existing component conventions.
2. Translate the user's request into an interaction intent before choosing a component by name.
3. Search the Sona UI agent catalog at `https://sona-ui.vercel.app/agent/catalog.json`.
4. Read the selected component detail resource and documentation before installing.
5. Install the smallest useful set with the project's existing package runner:

   ```bash
   bunx shadcn@latest add @sona-ui/<component>
   ```

   Use `pnpx`, `npx`, or `yarn dlx` when that matches the consumer project.

6. Integrate without changing unrelated layout, global tokens, or architecture.
7. Validate types, dependencies, keyboard behavior, responsive behavior, and reduced motion.

For provider setup, use the compatibility fixtures documented in the repository for Codex, Claude Code, and Cursor. The official shadcn MCP server is the supported MCP path; Sona UI does not require a custom MCP server for registry discovery or installation.

## Selection rules

- Prefer components whose `useWhen` guidance matches the user's actual goal.
- Read `avoidWhen` before installing; explain when no Sona component is appropriate.
- Treat shaders and pointer effects as progressive enhancement.
- Keep destructive actions deliberate and accessible.
- Use semantic theme tokens rather than hard-coded colors.

## Motion and accessibility

Motion must communicate feedback, orientation, continuity, or hierarchy. Remove nonessential choreography for `prefers-reduced-motion` while preserving the state change.

Preserve semantic HTML, keyboard access, visible focus, accessible names, dialog labeling, and contrast against the complete visual surface. Do not hide meaningful content inside decorative canvases.

## Scope discipline

Inspect before editing. Ask the user before making a material layout decision that was not requested. Do not rewrite a consumer's styling system to match Sona UI.

## Validation

After installation:

- Confirm registry dependencies and foundation files resolve.
- Run the consumer's typecheck or build command.
- Exercise the primary keyboard interaction.
- Check narrow and wide layouts.
- Check light and dark themes when supported.
- Check reduced-motion behavior.

If installation fails, classify the failure as consumer configuration, registry metadata, generated payload, agent resource, MCP/client, or deployment before changing source.
