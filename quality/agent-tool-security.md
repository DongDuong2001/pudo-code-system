# Agent Tool Security

AI agents can read data and trigger actions through local tools, MCP servers, plugins, and connectors. Treat every tool call as an access-control decision, not as trusted model output.

## Required Boundaries

- Use an explicit tool allowlist. Deny unknown tools by default.
- Separate read-only tools from tools that write files, execute commands, call networks, or mutate external systems.
- Require user approval for every write or destructive operation.
- Do not expose shell execution by default.
- Restrict filesystem access to the repository root and reject path traversal.
- Keep database and production integrations read-only unless a reviewed workflow requires writes.
- Never place secrets, tokens, credentials, or `.env` contents in prompts, traces, tool output, or generated files.
- Redact likely secrets before returning tool results.

## Threat Review

Review agent workflows for:

- Prompt injection from repository files, issues, web pages, logs, and tool output.
- Tool poisoning through misleading names, descriptions, schemas, or returned instructions.
- Privilege escalation across filesystem, network, database, and deployment boundaries.
- Supply-chain risk in MCP servers, plugins, packages, and transitive dependencies.
- Confused-deputy behavior where an agent uses user authority outside the approved task.
- Cross-repository access or writes under the wrong owner or organization.

## Approval Model

| Operation | Default |
|---|---|
| Read repository metadata | Allowed |
| Read source and documentation | Allowed within the repository root |
| Generate a preview or dry run | Allowed |
| Write project files | Explicit approval required |
| Execute shell commands | Denied |
| Access secrets | Denied |
| Write database or production state | Denied |
| Network access | Denied unless allowlisted |

## Audit Log

Record:

- Timestamp and run/session ID
- Tool name and sanitized arguments
- Repository identity and resolved root
- Approval decision
- Files or systems accessed
- Result status and error category

Do not log secret values or unrestricted file contents.
