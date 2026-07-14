# Scenario: classify an installation failure

## Prompt

> The Sona UI component installed, but its alias import cannot be resolved. Diagnose the issue and explain whether the fix belongs in the consumer project or the registry payload before changing files.

## Pass criteria

- Inspects `components.json`, aliases, and generated target paths.
- Distinguishes consumer configuration from registry metadata.
- Avoids changing component source without evidence.
- Gives one concrete next action.
