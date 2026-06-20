# 5. Memory System

## Purpose

Project memory eliminates repeated context reconstruction across AI sessions. Memory files are **living documents** updated by agents (with approval) and read at workflow start.

## Architecture

```text
Repository (templates)          Installed project
memory/templates/*.md   ──►   .pudo/memory/*.md
                                      │
                                      ▼
                               Agent reads on session start
                               Agent writes via MCP (confirmWrite)
                                      │
                                      ▼
                               Referenced in run traces
```

## Memory Files

| File | Purpose | Update Frequency |
| --- | --- | --- |
| `project.md` | Vision, goals, stakeholders, constraints | Rarely |
| `business.md` | Business rules, pricing, user segments | Monthly |
| `architecture.md` | System diagram, key components, data flow | Per major feature |
| `coding-style.md` | Naming, patterns, lint rules | Rarely |
| `tech-stack.md` | Languages, frameworks, versions, infra | Per dependency change |
| `glossary.md` | Domain terms and definitions | As needed |
| `roadmap.md` | Planned features, priorities | Weekly |
| `decision-log.md` | ADR-style decisions with rationale | Per decision |
| `known-issues.md` | Active bugs, workarounds, tech debt | Daily |

## Template Location

Templates: `memory/templates/`  
Installed copies: `.pudo/memory/` (created by `pudo init --memory`, default in v3)

## Memory File Schema

Each memory file follows this structure:

```markdown
# {Title}

> Last updated: {ISO date} | Owner: {name or team}

## Summary
{2-3 sentence current state}

## Details
{Structured content — sections vary by file type}

## Related
- Links to architecture docs, ADRs, issues

## Changelog
| Date | Change | Author |
| --- | --- | --- |
```

## Read Rules (Agent)

1. Read `project.md` and `tech-stack.md` at session start (always)
2. Read `architecture.md` before Plan/Understand for non-trivial tasks
3. Read `decision-log.md` before architectural changes
4. Read `known-issues.md` before bug fixes
5. Do not read entire memory dir — use workflow-declared memory list

## Write Rules (Agent)

1. Writes require MCP `confirmWrite: true` or explicit human approval
2. Append to `decision-log.md` — never overwrite history
3. Update `known-issues.md` when discovering or fixing issues
4. Update `architecture.md` only after Optimize gate passes
5. Include changelog entry on every write

## Integration with Session Handoff

`.pudo/session.md` is **ephemeral** (current task).  
`.pudo/memory/` is **persistent** (project knowledge).

```text
Session ends → update session.md + relevant memory files
Session starts → read session.md + memory files declared by workflow
```

## Memory vs Context vs Knowledge

| Layer | Scope | Mutability |
| --- | --- | --- |
| **Memory** | This project | Agent-writable (approved) |
| **Context** | Domain/industry | Read-only packs from repo |
| **Knowledge** | PUDO ecosystem | Curated patterns, research |

## Init Command Extension (v3)

```bash
pudo init --memory              # Install memory templates to .pudo/memory/
pudo init --memory=minimal      # project.md + tech-stack.md only
pudo init --memory=enterprise   # All templates + glossary scaffold
```

## Success Criteria

- Memory templates install without errors
- MCP session handoff references memory updates
- Run trace records which memory files were read/written
- Reduces "explain the project again" prompts by > 50% (measured in benchmarks)
