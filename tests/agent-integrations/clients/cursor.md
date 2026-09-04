# Cursor compatibility fixture

## Registry configuration

In the consumer project's `components.json`:

```json
{
  "registries": {
    "@sona-ui": "https://sonaui.com/r/{name}.json"
  }
}
```

## MCP configuration

Add `.cursor/mcp.json` to the consumer project:

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

> Find a decorative animated background from Sona UI for a hero section. Explain the contrast, WebGL, and reduced-motion considerations. Do not install anything yet.

## Expected result

The agent can discover `mesh-gradient-shader`, classify it as decorative, and warn that meaningful content must remain outside the shader surface.
