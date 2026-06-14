# PUDO MCP Server

The PUDO MCP server is an alpha local stdio server that exposes project setup, validation, context, quality-gate, and readiness tools to MCP-compatible coding agents.

## Stability

- Server version: `0.1.0-alpha.1`
- MCP SDK: stable v1.x, pinned to `1.29.0`
- Transport: local stdio
- Repository boundary: one explicit project root
- Shell and network execution: not exposed

## Install And Run

```bash
# Via npx (no install needed)
npx @dongduong2001/mcp-server@alpha

# Or install globally
npm install -g @dongduong2001/mcp-server@alpha
pudo-mcp-server
```

For safety, set `PUDO_PROJECT_ROOT` to an explicit absolute path for your project root (if unset, the server defaults to the current working directory):

```bash
PUDO_PROJECT_ROOT=/path/to/project npx @dongduong2001/mcp-server@alpha
```

On PowerShell:

```powershell
$env:PUDO_PROJECT_ROOT = "D:\path\to\project"
npx @dongduong2001/mcp-server@alpha
```

The server writes protocol messages to stdout and diagnostics to stderr, as required for stdio MCP servers.

## Client Configuration

Use `npx` for zero-install setup:

```json
{
  "mcpServers": {
    "pudo": {
      "command": "npx",
      "args": ["@dongduong2001/mcp-server@alpha"],
      "env": {
        "PUDO_PROJECT_ROOT": "/absolute/path/to/project"
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
        "PUDO_PROJECT_ROOT": "/absolute/path/to/project"
      }
    }
  }
}
```

Do not place tokens or credentials in this configuration.

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

- [Agent Tool Security](../quality/agent-tool-security.md)
- [MCP Security Checklist](../quality/mcp-security-checklist.md)
- [Server Policy Template](../templates/mcp/pudo-server-policy.json)

The alpha server does not expose shell execution, network access, database access, or secrets. Context packs reject common sensitive and generated paths and enforce the repository boundary.

## Official MCP References

- [MCP documentation](https://modelcontextprotocol.io/docs/)
- [MCP TypeScript SDK v1](https://github.com/modelcontextprotocol/typescript-sdk/tree/v1.x)
