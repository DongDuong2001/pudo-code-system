# MCP Security Checklist

Use this checklist before enabling an MCP server for a repository or team.

## Identity And Ownership

- [ ] The server is bound to one explicit repository root.
- [ ] Repository ownership and acting user are known.
- [ ] Cross-repository access is denied.
- [ ] Remote transports use authenticated identities and encrypted connections.

## Tool Permissions

- [ ] Tools are allowlisted.
- [ ] Unknown tools are denied by default.
- [ ] Read and write tools are clearly separated.
- [ ] Write tools require per-call approval.
- [ ] Shell execution is disabled by default.
- [ ] Database and production tools are read-only by default.

## Input And Output Safety

- [ ] Paths are normalized and checked against the repository root.
- [ ] Prompt-injection content is treated as untrusted data.
- [ ] Tool descriptions do not instruct the model to bypass policy.
- [ ] Secrets and `.env` values are never returned.
- [ ] Logs redact tokens, credentials, and sensitive file contents.

## Supply Chain

- [ ] MCP server source and publisher were reviewed.
- [ ] Dependency versions are pinned or constrained.
- [ ] Vulnerability and license checks are part of release review.
- [ ] Updates require changelog and regression review.

## Auditability

- [ ] Tool calls have structured audit records.
- [ ] Approval decisions are recorded.
- [ ] Failures include a stable error category.
- [ ] Logs identify the repository and session without leaking secrets.
