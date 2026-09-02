---
name: sona-ui
description: Discover and integrate Sona UI registry components. Use when selecting, installing, composing, reviewing, or troubleshooting a Sona UI component in a consumer project.
metadata:
  version: "1.1.0"
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
https://sona-ui.vercel.app/r/{name}.json
```

Current-resource manifest:

```text
https://sona-ui.vercel.app/agent/manifest.json
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
4. When installation is requested, read `references/consumer-validation.md` and complete every preflight check. Installation is unblocked only when every dependency resolves, every target is known, and every collision has an explicit decision.
5. Install the smallest useful set with the consumer project's existing package runner:

   ```bash
   bunx shadcn@latest add @sona-ui/<component>
   ```

   Use `pnpx`, `npx`, or `yarn dlx` when that matches the consumer project.

6. Confirm the generated paths and imports match the inspected consumer conventions before composing the component into the requested experience.
7. Read `references/design-principles.md` when the component is interactive or visually integrated, then apply every validation tier required by `references/consumer-validation.md`. The work is complete only when each applicable check has a recorded result and static, interaction, and visual verification are reported separately.

## Scope discipline

Inspect before editing. Ask the user before making a material layout decision that was not requested. Do not rewrite a consumer's styling system to match Sona UI.
