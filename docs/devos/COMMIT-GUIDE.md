# DevOS v3 — Conventional Commit Guide

Use branch `feat/devos-v3` and **one file (or logical unit) per commit** so CI stays green and history is reviewable.

## Branch Setup

```bash
git checkout -b feat/devos-v3
```

## Commit Order (Suggested)

### Design docs (docs/devos/)

```bash
git add docs/devos/README.md && git commit -m "docs(devos): add DevOS design documentation index"
git add docs/devos/01-repository-architecture.md && git commit -m "docs(devos): define repository architecture for AI DevOS v3"
git add docs/devos/02-folder-structure.md && git commit -m "docs(devos): specify target folder structure and migration mapping"
git add docs/devos/03-workflow-design.md && git commit -m "docs(devos): design end-to-end workflow system"
git add docs/devos/04-skill-system.md && git commit -m "docs(devos): define reusable skill system and registry"
git add docs/devos/05-memory-system.md && git commit -m "docs(devos): design persistent project memory system"
git add docs/devos/06-context-system.md && git commit -m "docs(devos): design domain context pack system"
git add docs/devos/07-governance-model.md && git commit -m "docs(devos): define governance model for enterprise adoption"
git add docs/devos/08-documentation-strategy.md && git commit -m "docs(devos): establish documentation strategy for v3"
git add docs/devos/09-starter-kits.md && git commit -m "docs(devos): specify starter kit architecture"
git add docs/devos/10-playbooks.md && git commit -m "docs(devos): design playbook system for business outcomes"
git add docs/devos/11-template-library.md && git commit -m "docs(devos): define engineering template library"
git add docs/devos/12-ai-compatibility.md && git commit -m "docs(devos): document multi-tool AI compatibility strategy"
git add docs/devos/13-benchmark-report.md && git commit -m "docs(devos): add competitive benchmark report and recommendations"
git add docs/devos/14-migration-roadmap.md && git commit -m "docs(devos): add v2-v5 migration roadmap"
git add docs/devos/15-long-term-vision.md && git commit -m "docs(devos): define long-term vision for AI DevOS"
```

### Schemas

```bash
git add schemas/pudo-output-contract.schema.json && git commit -m "feat(schemas): add output contract JSON schema"
git add schemas/workflow.schema.json && git commit -m "feat(schemas): add workflow specification JSON schema"
```

### Module scaffolds

Continue with `feat(workflows):`, `feat(memory):`, `feat(context):`, etc. — one README or artifact per commit.

### Docs index

```bash
git add docs/README.md && git commit -m "docs: index DevOS v3 modules in documentation hub"
```

## Commit Message Format

```text
<type>(<scope>): <description>

[optional body]
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`

## CI Verification

After each commit:

```bash
npm test
npm run pudo:check
```

Or rely on GitHub Actions on push.

## PR Title

```text
feat: PUDO AI DevOS v3 architecture and module scaffold
```
