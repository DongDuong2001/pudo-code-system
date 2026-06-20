# Commands

Declarative command specifications for CLI and MCP expansion.

## Purpose

Define PUDO commands as structured specs before implementation in `src/cli.js` and MCP tools.

## Current CLI Commands

| Command | Spec Status | Implementation |
| --- | --- | --- |
| `init` | Implicit | `src/cli.js` |
| `check` | Implicit | `src/cli.js` |
| `score` | Schema output | `src/cli.js` |
| `doctor` | Implicit | `src/cli.js` |
| `lint` | Implicit | `src/cli.js` |

## Planned Commands (v3)

| Command | Purpose |
| --- | --- |
| `skills list` | List available skills |
| `template new {type}` | Scaffold from engineering template |
| `trace emit` | Write run trace JSON |
| `context show {domain}` | Display domain pack |
| `workflow list` | List workflow specs |

## Related

- [CLI Architecture](../docs/architecture.md)
- [MCP Server](../docs/mcp.md)
