# Agent integration support matrix

This matrix records evidence, not aspirations. A client is `verified` only after the discovery, inspection, installation, and validation scenarios have been run against that client during the stated verification window.

| Client      | Skill fixture                                | MCP fixture                                  | Discovery  | Install boundary                   | Status                                 | Last verified |
| ----------- | -------------------------------------------- | -------------------------------------------- | ---------- | ---------------------------------- | -------------------------------------- | ------------- |
| Codex       | [`codex.md`](./clients/codex.md)             | [`codex.md`](./clients/codex.md)             | Documented | Clean Next.js/Vite registry checks | Fixture ready; live client run pending | —             |
| Claude Code | [`claude-code.md`](./clients/claude-code.md) | [`claude-code.md`](./clients/claude-code.md) | Documented | Clean Next.js/Vite registry checks | Fixture ready; live client run pending | —             |
| Cursor      | [`cursor.md`](./clients/cursor.md)           | [`cursor.md`](./clients/cursor.md)           | Documented | Clean Next.js/Vite registry checks | Fixture ready; live client run pending | —             |

## Verification scenarios

- [Discover by intent](./scenarios/discover-tabs.md)
- [Install through the registry](./scenarios/install-component.md)
- [Preserve reduced motion](./scenarios/reduced-motion.md)
- [Classify an alias failure](./scenarios/troubleshoot-alias.md)

## Status definitions

- **Fixture ready:** configuration and expected behavior are documented, but a live client session has not been recorded.
- **Verified:** all required scenarios pass in the named client during the current release window.
- **Experimental:** a partial run works, but one or more required scenarios remain open.
