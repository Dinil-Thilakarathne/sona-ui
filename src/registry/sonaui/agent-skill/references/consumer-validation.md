# Consumer Validation

The registry install boundary is the source of truth.

Check `components.json`, aliases, Tailwind CSS entry points, React/framework versions, and existing `components/ui` conventions before installing.

## Preflight

Before installation:

1. Confirm the `@sona-ui` registry alias exists.
2. View the selected namespaced item through the shadcn CLI.
3. Inspect file targets, package dependencies, and registry dependencies.
4. Confirm remote dependencies resolve without authentication.
5. Detect target collisions and get explicit approval before overwriting a public primitive.

Preflight passes only when all five checks pass. Use the exact catalog `detail`, `docs`, and `registryItem` values, then use the detail resource's exact `docs.rawUrl`.

## Validation tiers

Required for every installation:

- Confirm registry dependencies and foundation files resolve.
- Confirm generated paths and imports follow the consumer aliases.
- Run the consumer's typecheck or build command.

Required for interactive components:

- Exercise the primary keyboard interaction.
- Check focus behavior and disabled states.
- Check `prefers-reduced-motion` behavior.

Required when visually integrated:

- Check narrow and wide layouts.
- Check light and dark themes when supported.
- Complete a browser visual review.

Record a pass, failure, or explicit not-run status for every applicable check. Report static validation separately from interaction and rendered visual verification.

## Failure classification

If an item references a protected, preview-only, or unreachable dependency URL, report a Sona registry metadata failure. Do not rewrite consumer aliases, copy source manually, or install dependency files separately as a workaround: shadcn still traverses declared registry dependencies.

Classify installation failures as consumer configuration, registry metadata, generated payload, agent resource, MCP/client, or deployment before changing source. Repair consumer configuration in the consumer project; repair generated payload or registry metadata at the Sona source.
