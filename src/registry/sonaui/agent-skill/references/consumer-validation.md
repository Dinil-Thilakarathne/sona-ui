# Consumer Validation

The registry install boundary is the source of truth.

Check `components.json`, aliases, Tailwind CSS entry points, React/framework versions, and existing `components/ui` conventions before installing.

Before installation:

1. Confirm the `@sona-ui` registry alias exists.
2. View the selected namespaced item through the shadcn CLI.
3. Inspect file targets, package dependencies, and registry dependencies.
4. Confirm remote dependencies resolve without authentication.
5. Detect target collisions and ask before overwriting a public primitive.

Use the exact catalog `detail`, `docs`, and `registryItem` values, then use the detail resource's exact `docs.rawUrl`. Never derive a deployment hostname.

After installation, verify generated target paths, foundation dependencies, imports, and the consumer's own typecheck/build.

If an item references a protected, preview-only, or unreachable dependency URL, report a Sona registry metadata failure. Do not rewrite consumer aliases, copy source manually, or install dependency files separately as a workaround: shadcn still traverses declared registry dependencies.

Separate consumer configuration failures from Sona registry failures. Do not repair a consumer alias by changing component source unless the generated payload is actually incorrect.
