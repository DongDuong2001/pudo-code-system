# PUDO MCP Server

The PUDO MCP server is an alpha local stdio server that exposes project setup, validation, context, quality-gate, and readiness tools to MCP-compatible coding agents.

## Stability

- Server version: `0.1.0-alpha.1`
- MCP SDK: stable v1.x, pinned to `1.29.0`
- Transport: local stdio
- Repository boundary: one explicit project root
- Shell and network execution: not exposed

## Install And Build

```bash
npm install --prefix packages/pudo-mcp-server
npm run build --prefix packages/pudo-mcp-server
```

## Run

```bash
PUDO_PROJECT_ROOT=/path/to/project node packages/pudo-mcp-server/dist/src/server.js
```

On PowerShell:

```powershell
$env:PUDO_PROJECT_ROOT = "D:\path\to\project"
node packages/pudo-mcp-server/dist/src/server.js
```

The server writes protocol messages to stdout and diagnostics to stderr, as required for stdio MCP servers.

## Client Configuration

Use an absolute path to the built server:

```json
{
  "mcpServers": {
    "pudo": {
      "command": "node",
      "args": [
        "/absolute/path/to/pudo-code-system/packages/pudo-mcp-server/dist/src/server.js"
      ],
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
