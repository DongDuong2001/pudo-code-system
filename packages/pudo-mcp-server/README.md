# @pudo-code-system/mcp-server

Local stdio MCP server for PUDO project setup, quality gates, context packs, and readiness scoring.

## Stability

- Server version: `0.2.0-alpha.12` (from `package.json`)
- MCP SDK: stable v1.x, pinned to `1.29.0`
- Transport: local stdio
- Repository boundary: one explicit project root
- Shell and network execution: not exposed

## Install

```bash
# From npm (recommended)
npx @pudo-code-system/mcp-server

# Or install globally
npm install -g @pudo-code-system/mcp-server
pudo-mcp-server
```

## Client Configuration

Use with any MCP-compatible client (Claude Desktop, Cursor, Codex, etc.):

```json
{
  "mcpServers": {
    "pudo": {
      "command": "npx",
      "args": ["@pudo-code-system/mcp-server"],
      "env": {
        "PUDO_PROJECT_ROOT": "/absolute/path/to/your/project"
      }
    }
  }
}
```

Or with globally installed binary:

```json
{
  "mcpServers": {
    "pudo": {
      "command": "pudo-mcp-server",
      "env": {
        "PUDO_PROJECT_ROOT": "/absolute/path/to/your/project"
      }
    }
  }
}
```

## Tools

| Tool | Default Access | Purpose |
|---|---|---|
| `pudo.generateAgentRules` | Read-only | Preview generated agent instructions |
| `pudo.validateAgentRules` | Read-only | Validate PUDO workflow files |
| `pudo.createContextPack` | Read-only by default | Build bounded context from repository files |
| `pudo.runQualityGate` | Read-only | Check documented gate evidence |
| `pudo.scoreRepoReadiness` | Read-only | Return the evidence-based score report |
| `pudo.doctor` | Read-only | Diagnose workflow and policy gaps |
| `pudo.initProject` | Approval required for writes | Initialize project files |
| `pudo.updateSessionHandoff` | Approval required | Update `.pudo/session.md` |

Write operations require `confirmWrite: true`. `pudo.initProject` defaults to dry-run.

## Security

Review:
- [Agent Tool Security](https://github.com/DongDuong2001/pudo-code-system/blob/main/quality/agent-tool-security.md)
- [MCP Security Checklist](https://github.com/DongDuong2001/pudo-code-system/blob/main/quality/mcp-security-checklist.md)
- [Server Policy Template](https://github.com/DongDuong2001/pudo-code-system/blob/main/templates/mcp/pudo-server-policy.json)

The alpha server does not expose shell execution, network access, database access, or secrets. Context packs reject common sensitive and generated paths and enforce the repository boundary.

## Development

```bash
# Install dependencies
npm ci

# Build
npm run build

# Test
npm test
```

## License

MIT