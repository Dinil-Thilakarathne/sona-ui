# Claude Code compatibility fixture

## Registry configuration

In the consumer project's `components.json`:

```json
{
  "registries": {
    "@sona-ui": "https://sona-ui.vercel.app/r/{name}.json"
  }
}
```

## MCP configuration

Add `.mcp.json` to the consumer project:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

## Verification prompt

> Search the Sona UI registry for an accessible focused confirmation interaction. Explain the dependencies and accessibility requirements before installing anything.

## Expected result

The agent can discover `animated-dialog`, inspect its detail resource, and identify the required title, description, focus, and dismissal behavior.
