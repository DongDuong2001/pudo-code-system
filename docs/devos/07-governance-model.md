# 7. Governance Model

## Purpose

Governance defines **organizational standards** that apply across all workflows, skills, and projects. It complements `quality/` (phase gates) with **policy and process**.

## Structure

```text
governance/
├── README.md
├── coding-standards.md
├── architecture-guidelines.md
├── git-workflow.md
├── branch-strategy.md
├── review-checklist.md
├── testing-standards.md
├── documentation-standards.md
├── release-process.md
├── versioning.md
├── security-policy.md
├── privacy-compliance.md
├── risk-management.md
└── incident-response.md
```

## Relationship to Existing Quality Module

| Layer | Location | Focus |
| --- | --- | --- |
| **Quality gates** | `quality/quality-gates.md` | Phase exit criteria (PUDO loop) |
| **QC checklists** | `quality/qc-checklists.md` | Review categories |
| **AI safety** | `quality/anti-hallucination.md`, `agent-tool-security.md` | Agent behavior |
| **Governance** | `governance/*` | Org-wide policy and process |

Quality gates ask "can we advance?" Governance asks "does this meet our standards?"

## Mode Mapping

| Standard | Lite | Standard | Enterprise |
| --- | ---: | ---: | ---: |
| Coding standards | Conventions only | + lint in CI | + formal review |
| Git workflow | Trunk | Feature branches | + protected main |
| Testing standards | Manual verify | Unit tests required | + coverage threshold |
| Release process | Direct merge | PR + changelog | + rollback plan |
| Security policy | Secrets hygiene | + dependency audit | + threat model |
| Incident response | Ad hoc | Postmortem template | + on-call runbook |

## Key Policies

### Coding Standards

- Match existing repo patterns before introducing new ones
- Minimal diff scope — no drive-by refactors
- No secrets in code or commits
- Tests for behavior changes

### Git Workflow

- Conventional commits for DevOS repo (`feat:`, `docs:`, `fix:`)
- One logical change per commit (user preference for this migration)
- PR required for main branch
- CODEOWNERS for sensitive paths (already exists)

### Review Checklist

Extends `quality/qc-checklists.md` with governance items:

- [ ] Scope matches approved plan
- [ ] No unauthorized dependency additions
- [ ] Documentation updated if public API changed
- [ ] Security-sensitive paths reviewed by owner
- [ ] Rollback path documented (Enterprise)

### Release Process

1. All quality gates passed
2. CHANGELOG updated
3. Version bump (semver)
4. CI green
5. Release gate checklist (`.pudo/checklists/release.md`)
6. Tag and publish (MCP package separate lifecycle)

### Security & Privacy

- Reference `SECURITY.md` for vulnerability reporting
- MCP sandbox model unchanged: no shell, no network, bounded reads
- GDPR/privacy guidance in `governance/privacy-compliance.md` for applicable projects

## Enforcement Levels

| Level | Mechanism | v3 Status |
| --- | --- | --- |
| **Documented** | Markdown policy | Shipped |
| **Validated** | CLI check/score | Shipped |
| **Gated** | MCP quality gate | Partial (keyword scan) |
| **Enforced** | Required CI status check | Planned v4 (GitHub App) |
| **Audited** | Trace + audit log | Planned v4 |

## Enterprise Adoption

Enterprise teams configure governance via `.pudo/config.json`:

```json
{
  "strictness": "enterprise",
  "governance": {
    "require_pr": true,
    "min_test_coverage": 80,
    "require_adr": true,
    "security_review_paths": ["src/auth/", "packages/"]
  }
}
```

Doctor command extended to validate governance config (v3.1).

## Justification

Splitting governance from quality keeps phase gates lightweight while giving enterprises a single policy directory for compliance audits.
