# Provider Setup

The skill installs at `.agents/skills/sona-ui/`. Skill discovery from that shared project directory depends on the agent client and its current configuration; confirm the client lists `sona-ui` before relying on automatic invocation.

The registry and the skill work without a custom Sona MCP server. The official shadcn MCP server is optional and provides registry discovery through the agent client.

## Codex

Add the shadcn server to the user's Codex configuration:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

## Claude Code

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

## Cursor

Add `.cursor/mcp.json` to the consumer project using the same `mcpServers.shadcn` configuration shown for Claude Code.

Setup is complete when the client lists the `sona-ui` skill and, when MCP is enabled, exposes the shadcn registry tools. Treat documented configuration as fixture-ready until a live discovery and installation session has been recorded for that client.
