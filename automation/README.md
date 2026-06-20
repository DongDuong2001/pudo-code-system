# Automation

CI recipes, release automation, and GitHub Actions templates for PUDO projects.

## Purpose

Provide reusable automation that enforces DevOS quality gates in CI/CD pipelines.

## Contents

| Item | Purpose |
| --- | --- |
| `ci/pudo-check.yml` | Reference workflow for PUDO validation in CI |
| `release/` | Release automation recipes (v1.4) |

## Recommended CI Steps

```yaml
- run: npm test
- run: npx pudo-code-system check
- run: npx pudo-code-system score --json
- run: npx pudo-code-system doctor
# v3.1:
- run: npx pudo-code-system lint
- run: npx pudo-code-system score --strict  # optional required check
```

## Related

- [.github/workflows/](../.github/workflows/)
- [Release Process](../governance/release-process.md)
