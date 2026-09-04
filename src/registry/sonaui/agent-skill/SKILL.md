---
name: sona-ui
description: Discover and integrate Sona UI registry components. Use when selecting, installing, composing, reviewing, or troubleshooting a Sona UI component in a consumer project.
metadata:
  version: "1.2.0"
---

# Sona UI Agent Skill

## Core invariant

Treat the Sona UI shadcn registry as the installation authority. When a component exists in the registry, install its source-owned item instead of reconstructing it.

Registry namespace:

```text
@sona-ui
```

Registry URL:

```text
https://sonaui.com/r/{name}.json
```

Current-resource manifest:

```text
https://sonaui.com/agent/manifest.json
```

## Reference routing

Before selecting a component, read:

- `references/component-selection.md`

Before installation or troubleshooting, read:

- `references/consumer-validation.md`

Before composing or reviewing motion and visual behavior, read:

- `references/design-principles.md`

When skill discovery or the optional shadcn MCP setup needs troubleshooting, read:

- `references/provider-setup.md`

## Workflow

1. Inspect the consumer project's framework, React version, styling entry, aliases, and existing component conventions. This phase is complete when each value is known and the presence or absence of `components.json` is recorded.
2. Fetch the current-resource manifest before selecting or installing a component. When reachable, use its catalog URL rather than an installed or copied catalog URL. If it is unavailable, record that the skill is using a local snapshot that may be older than production.
3. Read `references/component-selection.md`, translate the request into an interaction intent, and search the catalog named by the manifest. This phase is complete when one candidate—or the decision to use no Sona component—is justified from its `useWhen`, `avoidWhen`, accessibility, motion, and dependency fields, and its exact `detail`, `docs`, and `registryItem` resources are recorded.
4. When the user supplies an exact component name that is absent from the catalog, fetch `https://sonaui.com/r/{name}.json` directly before deciding it is unavailable. If reachable, treat that registry item as authoritative and record its file targets, dependencies, registry dependencies, documentation URL when present, and accessibility and motion behavior. Do not infer that the item is unavailable from the catalog omission alone.
5. When installation is requested, read `references/consumer-validation.md` and complete every preflight check. Installation is unblocked only when every dependency resolves, every target is known, and every collision has an explicit decision.
6. Install the smallest useful set with the consumer project's existing package runner:

   ```bash
   bunx shadcn@latest add @sona-ui/<component>
   ```

   Use `pnpx`, `npx`, or `yarn dlx` when that matches the consumer project.

7. Confirm the generated paths and imports match the inspected consumer conventions before composing the component into the requested experience.
8. Read `references/design-principles.md` when the component is interactive or visually integrated, then apply every validation tier required by `references/consumer-validation.md`. The work is complete only when each applicable check has a recorded result and static, interaction, and visual verification are reported separately.

## Publishing a new Sona component

Every published `registry:ui` item must also have a matching entry in `src/registry/agent-metadata.ts`. Add accurate `useWhen`, `avoidWhen`, capabilities, accessibility, motion, reduced-motion, and related-component guidance, then regenerate and validate both publishing surfaces:

```bash
bun run build:registry
bun run build:agent-resources
bun run check:registry
bun run check:agent-resources
```

Do not treat an item as published until both registry and agent-resource checks pass. The public component navigation is independent from registry and agent publication; an intentionally hidden documentation link still needs the full metadata contract.

## Scope discipline

Inspect before editing. Ask the user before making a material layout decision that was not requested. Do not rewrite a consumer's styling system to match Sona UI.
