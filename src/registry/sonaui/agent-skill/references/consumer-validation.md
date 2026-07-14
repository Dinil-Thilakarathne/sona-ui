# Consumer Validation

The registry install boundary is the source of truth.

Check `components.json`, aliases, Tailwind CSS entry points, React/framework versions, and existing `components/ui` conventions before installing. After installation, verify generated target paths, foundation dependencies, imports, and the consumer's own typecheck/build.

Separate consumer configuration failures from Sona registry failures. Do not repair a consumer alias by changing component source unless the generated payload is actually incorrect.
