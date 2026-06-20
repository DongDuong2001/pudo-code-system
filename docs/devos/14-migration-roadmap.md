# 14. Migration Roadmap

## Version Overview

```text
v1.x (shipped)  →  v2.x (runtime)  →  v3.x (DevOS)  →  v4.x (orchestration)  →  v5.x (autonomous)
   Methodology        Traces + gates      OS modules         Multi-agent              Self-improving
```

---

## Version 2 — Runtime Foundation

**Goals:** Close the gap between documented gates and executable behavior.

### Major Features

| Feature | Description |
| --- | --- |
| Run trace emission | CLI/MCP write `pudo-run-trace.schema.json` compliant traces |
| Structured gate evidence | Gate results as JSON, not keyword scan |
| Skill contract migration (top 5) | Reference skill implementations |
| `score --strict` in CI | Optional required check |
| 5+ benchmark case studies | Evidence base |
| Version manifest | Single source for CLI, MCP, schema versions |

### Breaking Changes

- None for `pudo init` output paths
- MCP quality gate API adds `evidence` object (backward compatible)

### Migration Steps

1. Upgrade MCP server package
2. Enable `.pudo/traces/` directory in init
3. Migrate skills incrementally — old format still valid
4. Add `pudo trace emit` to session workflow

### Expected Benefits

- Auditable workflow history
- Trustworthy gate status
- Stronger benchmark claims

---

## Version 3 — AI DevOS (This Redesign)

**Goals:** Transform repo layout into modular operating system.

### Major Features

| Feature | Description |
| --- | --- |
| OS module scaffold | workflows/, agents/, memory/, context/, playbooks/, governance/ |
| Workflow YAML specs | Machine-readable lifecycle definitions |
| Memory system | Templates + `.pudo/memory/` install |
| Context domain packs | SaaS, FinTech, DevTools, etc. |
| Starter kits | Kit metadata + workflow integration |
| Playbooks | Business outcome workflows |
| Engineering templates | PRD, ADR, RFC, test plan, etc. |
| Output contract schema | Structured workflow outputs |
| DevOS documentation set | `docs/devos/*` (15 deliverables) |
| README rewrite | Vision, architecture, DevOS model |

### Breaking Changes

- **Soft break:** New directories; old paths remain
- `pudo init --memory` adds files (opt-in initially, default in v3.0)
- Skill linter warns on old format (does not fail until v3.2)

### Migration Steps

1. **Phase A — Docs & scaffold** (current)
   - Add `docs/devos/` design docs
   - Scaffold module READMEs and samples
   - Add schemas for output contract + workflow

2. **Phase B — Content migration**
   - Link prompts to workflow YAML
   - Upgrade skills to full contract (batch by domain)
   - Add 3 playbooks, 3 context packs, memory templates

3. **Phase C — CLI/MCP**
   - `pudo init --memory`, `--domain`, `--kit`
   - `pudo skills list`, `pudo template new`
   - MCP: listSkills, emitRunTrace

4. **Phase D — README & release**
   - README DevOS sections
   - ROADMAP update
   - Tag v3.0.0

### Expected Benefits

- Complete AI-native engineering platform structure
- Reduced onboarding friction for teams
- Composable workflows vs monolithic prompts

### Git Strategy (User Request)

Commit **single files per conventional commit** to feature branch `feat/devos-v3`:

```text
docs(devos): add repository architecture spec
docs(devos): add workflow design spec
feat(workflows): add PUDO plan workflow spec
feat(memory): add project memory template
feat(context): add SaaS domain pack
...
```

CI must pass on each commit (existing `pudo-check.yml`).

---

## Version 4 — Orchestration & Enforcement

**Goals:** Multi-agent collaboration and enforced governance.

### Major Features

| Feature | Description |
| --- | --- |
| Agent delegation graphs | roles/ → runtime routing |
| GitHub App | Required gate status checks |
| Framework adapters | LangGraph, OpenAI Agents SDK |
| Metrics dashboard | Score trends, token waste visualization |
| Remote MCP | Auth guidance + hosted transport |
| Behavioral scoring | Tests + gate evidence, not just file presence |
| Community prompt/skill registry | Searchable, versioned |

### Breaking Changes

- Enterprise gate enforcement may block merges without trace
- MCP remote transport changes client config

### Migration Steps

1. Opt-in GitHub App installation
2. Enable delegation in `.pudo/config.json`
3. Migrate to behavioral scoring gradually (`--strict` default)

### Expected Benefits

- Team-scale governance
- Multi-agent specialization
- Provable compliance

---

## Version 5 — Autonomous DevOS

**Goals:** Self-improving, knowledge-rich platform.

### Major Features

| Feature | Description |
| --- | --- |
| Knowledge graph | Linked memory, code, decisions |
| Self-improving workflows | Benchmark-driven skill refinement |
| Autonomous test generation | CI-integrated AI test agents |
| PUDO-as-a-service | Hosted MCP + governance for teams |
| Specification-driven default | Spec → plan → tasks → code pipeline |
| Enterprise AI governance | Policy engine, audit trails |

### Breaking Changes

- Possible default workflow shift to spec-driven
- Knowledge graph storage requirements

### Expected Benefits

- Continuous improvement from measured outcomes
- Enterprise adoption at scale
- Industry leadership in AI-native SE

---

## Migration Checklist (Repo Maintainers)

- [ ] Create branch `feat/devos-v3`
- [ ] Land docs/devos/ (15 files) — one commit each
- [ ] Scaffold modules with READMEs
- [ ] Add sample workflows, memory, context, playbooks
- [ ] Add schemas (output-contract, workflow)
- [ ] Update docs/README.md index
- [ ] Extend ROADMAP.md with v3-v5
- [ ] Verify CI green after each commit
- [ ] PR to main with full test plan

## Rollback Strategy

All v3 changes are additive until v3.0 tag. Rollback = revert feature branch. Installed projects unaffected until they opt into `pudo init --memory`.
