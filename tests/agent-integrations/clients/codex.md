# Codex compatibility fixture

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

Add the official shadcn MCP server to the user's Codex configuration:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

## Verification prompt

> List the components available from the Sona UI registry and identify the best option for switching between related settings. Do not install anything yet.

## Expected result

The agent can discover `fluid-tabs`, explain why it fits, and link to its Sona documentation and registry item.
