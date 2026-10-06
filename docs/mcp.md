# PUDO MCP Server

The PUDO MCP server is a local stdio Model Context Protocol server that exposes project setup, validation, context, quality-gate, prompt wizards, resources, and readiness tools to MCP-compatible coding agents (Claude Desktop, Cursor, Windsurf, Zed, etc.).

## Stability

- Server version: `0.3.0-alpha.1`
- MCP SDK: stable v1.x, pinned to `1.29.0`
- Transport: local stdio
- Repository boundary: one explicit project root
- Shell and network execution: not exposed

## Install And Run

```bash
# Via npx (recommended, zero-install)
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

### Claude Desktop (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "pudo": {
      "command": "npx",
      "args": ["-y", "@dongduong2001/mcp-server@alpha"],
      "env": {
        "PUDO_PROJECT_ROOT": "/absolute/path/to/project"
      }
    }
  }
}
```

### Cursor (`.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "pudo": {
      "command": "npx",
      "args": ["-y", "@dongduong2001/mcp-server@alpha"],
      "env": {
        "PUDO_PROJECT_ROOT": "/absolute/path/to/project"
      }
    }
  }
}
```

### Windsurf (`~/.codeium/windsurf/mcp_config.json`)

```json
{
  "mcpServers": {
    "pudo": {
      "command": "npx",
      "args": ["-y", "@dongduong2001/mcp-server@alpha"],
      "env": {
        "PUDO_PROJECT_ROOT": "/absolute/path/to/project"
      }
    }
  }
}
```

Do not place tokens or credentials in this configuration.

## Prompts

MCP clients render these prompts as slash-commands or interactive wizards:

- `pudo-init`: Guided wizard to detect stack, call `pudo.initProject`, generate agent instruction files, and score readiness.
- `pudo-plan`: Step-by-step Plan phase prompt that enforces measurable scope, constraints, and Plan quality gates.
- `pudo-optimize`: Code review and release readiness prompt that triggers test suites, audits changes, and executes the Optimize/Release gates.

## Resources

Read-only workspace context accessible directly via MCP URI:

- `pudo://rules/current`: Active workspace agent rules (`AGENTS.md`, `CLAUDE.md`, `.cursor/rules`).
- `pudo://session/handoff`: Active session handoff document (`.pudo/session.md`).
- `pudo://playbooks/catalog`: Available engineering, database, and system design playbooks.

## Tools

| Tool | Default Access | Purpose |
|---|---|---|
| `pudo.initProject` | Auto-write (override with `dryRun: true`) | Initialize project files and agent instructions |
| `pudo.getInitOptions` | Read-only | List supported tools, tech stacks, and strictness levels |
| `pudo.listPlaybooks` | Read-only | List available engineering playbooks |
| `pudo.getPlaybook` | Read-only | Retrieve the full markdown content of a playbook |
| `pudo.generateAgentRules` | Read-only | Preview generated agent instructions |
| `pudo.validateAgentRules` | Read-only | Validate PUDO workflow files |
| `pudo.createContextPack` | Read-only by default | Build bounded context from repository files |
| `pudo.runQualityGate` | Read-only | Check documented gate evidence |
| `pudo.scoreRepoReadiness` | Read-only | Return the evidence-based score report |
| `pudo.doctor` | Read-only | Diagnose workflow and policy gaps |
| `pudo.updateSessionHandoff` | Approval required | Update `.pudo/session.md` |

## Security

Review:

- [Agent Tool Security](../quality/agent-tool-security.md)
- [MCP Security Checklist](../quality/mcp-security-checklist.md)
- [Server Policy Template](../templates/mcp/pudo-server-policy.json)

The server does not expose arbitrary shell execution, network access, database access, or secrets. Context packs reject sensitive and generated paths and enforce the repository boundary.

## Official MCP References

- [MCP documentation](https://modelcontextprotocol.io/docs/)
- [MCP TypeScript SDK v1](https://github.com/modelcontextprotocol/typescript-sdk/tree/v1.x)
