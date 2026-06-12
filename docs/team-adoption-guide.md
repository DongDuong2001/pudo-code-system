# PUDO Team Adoption Guide

This guide walks a team through adopting PUDO across shared codebases, from first installation to consistent daily use.

## Prerequisites

- A shared repository with version control
- At least one AI coding tool per team member (Cursor, Claude Code, Codex, Copilot, Gemini, OpenCode, Kiro)
- Agreement on which strictness level fits the team (recommended: `standard`)

## Phase 1: Installation (30 minutes)

### Step 1: Initialize PUDO in the repository

Run once in the repository root:

```bash
npx pudo-code-system init --yes --tools=cursor,claude,codex,copilot,gemini,opencode,kiro --project=<PROJECT_TYPE> --strictness=standard
```

This creates agent configuration files, PR templates, quality checklists, and session handoff files.

### Step 2: Commit the generated files

```bash
git add .
git commit -m "chore: initialize PUDO operating layer"
```

Everyone on the team now has PUDO available when they open the repo in their AI tool.

### Step 3: Verify installation

```bash
npx pudo-code-system check
npx pudo-code-system score
npx pudo-code-system doctor
```

All three should pass. If `doctor` reports gaps, address them before moving to Phase 2.

## Phase 2: Establish Norms (1 week)

### 1. Agree on mode usage

| Task Size | Mode | Expectation |
|---|---|---|
| Typo fix, one-liner | PUDO Lite | Minimal ceremony, verify and move on |
| Feature, bug fix, refactor | PUDO Standard | Full P-U-D-O cycle, tests required |
| Production incident, migration | PUDO Enterprise | Full cycle plus owner, rollback, monitoring |

### 2. Require PUDO Standard for pull requests

Every PR targeting `main` should include evidence of the PUDO cycle. For Standard tasks, the session handoff file (`.pudo/session.md`) documents:
- What changed and why
- Files inspected
- Tests run
- Remaining risks

### 3. Use quality gates as a team contract

| Gate | When | What it proves |
|---|---|---|
| Plan Gate | Before starting | Scope, success criteria, constraints are clear |
| Understand Gate | Before coding | Relevant files and patterns were verified |
| Develop Gate | Before review | Implementation stays in scope with tests |
| Optimize Gate | Before merge | Refactors preserve behavior, risks documented |
| Release Gate | Before deploy | Changelog, rollback, monitoring handled |

Add a team rule: **do not merge a PR if the relevant gate was not passed.**

## Phase 3: Daily Workflow (Ongoing)

### Developer workflow

1. Start a task by defining scope and success criteria (Plan).
2. Use `pudo.createContextPack` or manually read relevant files before asking the AI to implement (Understand).
3. Implement in small steps, run tests after each change (Develop).
4. Run `npx pudo-code-system score` before opening a PR (Optimize).
5. Fill in `.pudo/session.md` before requesting review.

### Code review workflow

When reviewing an AI-assisted PR:
- Check that the session handoff exists and is accurate.
- Verify the score is above the team threshold (recommended: 80).
- Confirm the diff matches the stated scope.
- Run `npx pudo-code-system doctor` if the PR touches infrastructure or security.

### Recurring checks

| Check | Frequency | Command |
|---|---|---|
| Score | Every PR | `npx pudo-code-system score --json` |
| Doctor | Weekly | `npx pudo-code-system doctor` |
| Full check | Before release | `npx pudo-code-system check && npx pudo-code-system score --strict` |

## Phase 4: Continuous Improvement (Monthly)

### Review token waste

Use the [Benchmark Kit](../benchmarks/) to measure token waste and dev time reduction. Set a baseline in month 1 and review monthly:

| Month | Token Waste | Time to Verified Implementation | Bugs After AI Output |
|---|---|---|---|
| Month 1 (baseline) | ... | ... | ... |
| Month 2 | ... | ... | ... |
| Month 3 | ... | ... | ... |

### Audit prompt quality

If the team score drops or AI output quality declines, review:
1. Are context packs being built before coding?
2. Are developers skipping the Understand phase?
3. Has the repository structure changed without updating agent rules?

Run `npx pudo-code-system init --force` to regenerate agent rules if the project structure has changed significantly.

### Update agent rules

As the codebase evolves, agent rules should evolve too. Regenerate after major refactors:
```bash
npx pudo-code-system init --force --yes
git commit -m "chore: refresh PUDO agent rules after refactor"
```

## Team Size Guidelines

| Team Size | Recommended Approach |
|---|---|
| 2-5 developers | Everyone follows the same strictness level. One person reviews session handoffs. |
| 6-15 developers | Assign a PUDO champion per squad. Review score trends monthly. |
| 16+ developers | Use `enterprise` strictness. Integrate score into CI. Require session handoffs for all PRs. |

## CI Integration

Add to your GitHub Actions workflow (see `.github/workflows/pudo-check.yml`):

```yaml
- name: PUDO score check
  run: npx pudo-code-system score --strict --json
```

This blocks merges when the score falls below 80.

## Common Pitfalls

| Pitfall | Fix |
|---|---|
| Skipping Understand to "save time" | Enforce context pack requirement in PR template |
| Using PUDO Lite for everything | Team agreement: Standard is default for any change > 30 minutes |
| Not updating session handoff | Add session handoff check to PR review checklist |
| Stale agent rules after refactoring | Run `pudo init --force` after major structural changes |
| Over-engineering with Enterprise mode | Reserve Enterprise for production incidents, migrations, security |

## Measuring Success

After 3 months of consistent PUDO use, expect to see:
- Fewer AI-generated bugs reaching code review
- Faster onboarding for new team members (agent rules encode conventions)
- More predictable PR quality (score provides a machine-readable signal)
- Reduced context loss across sessions (session handoff captures state)