# @dongduong2001/mcp-server

Local stdio MCP server for PUDO project setup, quality gates, interactive prompts, context packs, and readiness scoring.

## Stability

- Server version: `0.3.0-alpha.1` (from `package.json`)
- MCP SDK: stable v1.x, pinned to `1.29.0`
- Transport: local stdio
- Repository boundary: one explicit project root
- Shell and network execution: not exposed

## Install

```bash
# Via npx (recommended, no permanent install needed)
npx @dongduong2001/mcp-server@alpha

# Or install globally
npm install -g @dongduong2001/mcp-server@alpha
pudo-mcp-server
```

> **Note on Registry:** This package is hosted on GitHub Packages under `@dongduong2001`. If not authenticated, configure your npm scope:
> ```bash
> npm config set @dongduong2001:registry https://npm.pkg.github.com/
> ```

---

## Client Configuration

Use with any MCP-compatible client (Claude Desktop, Cursor, Windsurf, Zed, etc.):

### Claude Desktop (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "pudo": {
      "command": "npx",
      "args": ["-y", "@dongduong2001/mcp-server@alpha"],
      "env": {
        "PUDO_PROJECT_ROOT": "/absolute/path/to/your/project"
      }
    }
  }
}
```

### Cursor (`.cursor/mcp.json` or Global Cursor Settings)

```json
{
  "mcpServers": {
    "pudo": {
      "command": "npx",
      "args": ["-y", "@dongduong2001/mcp-server@alpha"],
      "env": {
        "PUDO_PROJECT_ROOT": "/absolute/path/to/your/project"
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
        "PUDO_PROJECT_ROOT": "/absolute/path/to/your/project"
      }
    }
  }
}
```

---

## Prompts (Interactive UI Wizards)

When connected in Claude Desktop, Cursor, or Windsurf, the following prompts appear in the client's prompt menu or slash-commands:

| Prompt | Arguments | Purpose |
|---|---|---|
| `pudo-init` | `project`, `tools`, `strictness` | Guided wizard to initialize the operating layer, generate agent instruction markdown files, and check readiness |
| `pudo-plan` | `task`, `scope`, `outOfScope` | Initiate the Plan phase with structured requirements, constraints, and gate check |
| `pudo-optimize` | `summary` | Audit changes, run test suites, verify optimize/release gates, and prepare handoff |

---

## Resources

Read-only workspace context accessible directly via MCP URI:

| URI | MIME Type | Content |
|---|---|---|
| `pudo://rules/current` | `text/markdown` | Active workspace agent rules (`AGENTS.md`, `CLAUDE.md`, `.cursor/rules`) |
| `pudo://session/handoff` | `text/markdown` | Active session handoff document (`.pudo/session.md`) |
| `pudo://playbooks/catalog` | `application/json` | Available engineering, database, and system design playbooks |

---

## Tools

| Tool | Default Access | Purpose |
|---|---|---|
| `pudo.initProject` | Auto-write (override with `dryRun: true`) | Initialize project files and agent instructions |
| `pudo.getInitOptions` | Read-only | List supported tools, tech stacks, and strictness levels |
| `pudo.listPlaybooks` | Read-only | List available engineering playbooks |
| `pudo.getPlaybook` | Read-only | Retrieve the full markdown content of a playbook |
| `pudo.generateAgentRules` | Read-only | Preview generated agent instructions without writing |
| `pudo.validateAgentRules` | Read-only | Validate installed PUDO workflow files |
| `pudo.createContextPack` | Read-only by default | Build bounded context pack from repository files |
| `pudo.runQualityGate` | Read-only | Check documented gate evidence (plan, understand, develop, optimize, release) |
| `pudo.scoreRepoReadiness` | Read-only | Return the evidence-based score report (0-100) |
| `pudo.doctor` | Read-only | Diagnose workflow and policy gaps |
| `pudo.updateSessionHandoff` | Approval required | Update `.pudo/session.md` for seamless handoff |

---

## Security

Review:
- [Agent Tool Security](https://github.com/DongDuong2001/pudo-code-system/blob/main/quality/agent-tool-security.md)
- [MCP Security Checklist](https://github.com/DongDuong2001/pudo-code-system/blob/main/quality/mcp-security-checklist.md)
- [Server Policy Template](https://github.com/DongDuong2001/pudo-code-system/blob/main/templates/mcp/pudo-server-policy.json)

The server does not expose arbitrary shell execution, network calls, database access, or secrets. Context packs filter out sensitive paths (`.env`, secrets, credentials) and enforce repository boundaries.

---

## Development

```bash
# Install dependencies
npm ci

# Build TypeScript
npm run build

# Run unit tests
npm test
```

## License

MIT