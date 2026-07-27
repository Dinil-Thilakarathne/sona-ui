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

## Reference routing

Before selecting a component, read:

- `references/component-selection.md`

Before installation or troubleshooting, read:

- `references/consumer-validation.md`

Before composing or reviewing motion and visual behavior, read:

- `references/design-principles.md`

## Workflow

1. Inspect the consumer project's framework, React version, styling entry, aliases, and existing component conventions.
2. Translate the user's request into an interaction intent before choosing a component by name.
3. Search the Sona UI agent catalog at `https://sona-ui.vercel.app/agent/catalog.json`.
4. Use the catalog item's exact `detail`, `docs`, and `registryItem` resources, then use the detail resource's exact `docs.rawUrl`. Do not derive deployment URLs manually.
5. Complete the installation preflight below.
6. Install the smallest useful set with the project's existing package runner:

   ```bash
   bunx shadcn@latest add @sona-ui/<component>
   ```

   Use `pnpx`, `npx`, or `yarn dlx` when that matches the consumer project.

7. Integrate without changing unrelated layout, global tokens, or architecture.
8. Apply the validation level appropriate to the integration.

For provider setup, use the compatibility fixtures documented in the repository for Codex, Claude Code, and Cursor. The official shadcn MCP server is the supported MCP path; Sona UI does not require a custom MCP server for registry discovery or installation.

## Installation preflight

Before installation:

1. Confirm `components.json` contains the `@sona-ui` registry alias.
2. Run `npx shadcn@latest view @sona-ui/<component>` using the consumer project's package runner.
3. Inspect `files[].target`, package dependencies, and registry dependencies.
4. Confirm every remote dependency resolves without authentication.
5. Check whether any target file already exists.
6. Ask before overwriting an existing public component primitive.

If a public registry item references a protected, preview-only, or unreachable dependency URL, classify it as a Sona registry metadata failure. Report the failing item and URL, then repair and republish the source registry.

Do not retry unrelated shadcn versions first, rewrite consumer aliases, copy component source manually, or assume installing dependency files separately will stop registry dependency traversal.

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

Required for every installation:

- Confirm registry dependencies and foundation files resolve.
- Run the consumer's typecheck or build command.
- Confirm generated paths and imports follow the consumer aliases.

Required for interactive components:

- Exercise the primary keyboard interaction.
- Check focus behavior and disabled states.
- Check reduced-motion behavior.

Required when visually integrated:

- Check narrow and wide layouts.
- Check light and dark themes when supported.
- Complete a browser visual review.

If installation fails, classify the failure as consumer configuration, registry metadata, generated payload, agent resource, MCP/client, or deployment before changing source.
