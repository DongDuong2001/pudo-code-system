# Security Policy

## Supported Versions

We release patches for security vulnerabilities. The following versions are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.2.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability in PUDO Code System, please report it responsibly.

### How to Report

**Do not open a public issue** for security vulnerabilities.

Instead, please email us at **dongduong840@gmail.com** with the subject line: `[SECURITY] PUDO Code System - Vulnerability Report`

Include the following information:

1. **Description** of the vulnerability
2. **Steps to reproduce** the issue
3. **Potential impact** assessment
4. **Affected versions** (if known)
5. **Suggested fix** (if you have one)

### What to Expect

- **Acknowledgment** within 48 hours of receipt
- **Initial assessment** within 5 business days
- **Status updates** every 7 days until resolved
- **Resolution timeline** communicated as part of the initial assessment
- **Credit** in the security advisory (if desired)

If you do not receive an acknowledgment within 48 hours, send a follow-up email. For vulnerabilities with active exploitation risk, state that in the subject line so the report is prioritized.

## Security Considerations

### MCP Server

The PUDO MCP server is designed with security as a core principle:

- **Local stdio transport only** — No network exposure
- **Repository boundary enforcement** — All file operations restricted to configured project root
- **No shell execution** — The server does not expose shell or command execution
- **No network access** — The server cannot make outbound connections
- **No secret access** — Environment variables and secrets are not exposed
- **Approval-gated writes** — All write operations require explicit user confirmation
- **Audit logging** — All tool invocations can be logged with secret redaction

See [MCP Security Checklist](quality/mcp-security-checklist.md) and [Agent Tool Security](quality/agent-tool-security.md) for detailed security configuration.

### AI Agent Interactions

PUDO provides configuration for AI coding agents (Cursor, Claude, Codex, Copilot, Gemini, OpenCode, Kiro). Security considerations:

- Agent instructions are repository-scoped
- No credentials or secrets should be included in generated agent rules
- Context packs exclude sensitive paths by default
- Quality gates enforce security review for production changes

### Dependencies

We regularly audit dependencies for known vulnerabilities. Run `npm audit` in both the root and `packages/pudo-mcp-server` directories.

## Security Best Practices for Users

1. **Never commit secrets** — Use `.gitignore` and secret scanning
2. **Review generated code** — AI output may contain security issues
3. **Use quality gates** — Run `pudo check`, `pudo score`, `pudo doctor` before merging
4. **Configure MCP server policy** — Use `templates/mcp/pudo-server-policy.json` as a starting point
5. **Keep dependencies updated** — Run `npm update` regularly

## Security Advisories

Security advisories will be published as GitHub Security Advisories and noted in the [CHANGELOG](CHANGELOG.md).

## Contact

For security-related questions or concerns, email **dongduong840@gmail.com**.