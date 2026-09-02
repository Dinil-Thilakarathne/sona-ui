# Scenario: resolve an exact component name missing from the catalog

## Prompt

> I want to use the Sona UI `expanding-action` component, but it does not appear in the agent catalog. Confirm whether it exists and explain its integration requirements without installing it.

## Pass criteria

- Fetches `/r/expanding-action.json` directly before deciding whether the component is available.
- Treats a reachable registry item as authoritative even when the catalog omits it.
- Records file targets, dependencies, and registry dependencies from the registry payload.
- Consults available documentation or source to report accessibility and motion behavior.
- Does not modify the consumer project.
