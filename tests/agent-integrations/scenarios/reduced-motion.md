# Scenario: preserve reduced motion

## Prompt

> Add a Sona UI animated dialog for a focused confirmation task. Make sure the interaction remains clear when prefers-reduced-motion is enabled.

## Pass criteria

- Selects `animated-dialog`.
- Preserves dialog semantics and focus management.
- Keeps the state change while reducing nonessential transform and opacity choreography.
- Verifies the reduced-motion path.
