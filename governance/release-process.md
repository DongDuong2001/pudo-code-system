# Release Process

## Overview

Releases follow semver. PUDO DevOS repo and MCP server package have independent version lifecycles.

## Pre-Release Checklist

- [ ] All quality gates passed for included changes
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json (and MCP package if applicable)
- [ ] CI green (`pudo-check`, tests, MCP tests)
- [ ] Release gate checklist complete (`.pudo/checklists/release.md`)
- [ ] Rollback plan documented (Enterprise)

## Version Bumping

| Change Type | Version |
| --- | --- |
| Breaking API/path change | Major |
| New feature, backward compatible | Minor |
| Bug fix, docs only | Patch |

## Release Steps

1. Merge feature branch to `main`
2. Tag: `git tag v{X.Y.Z}`
3. Push tag (triggers MCP publish workflow on version tags)
4. Create GitHub Release with changelog excerpt

## MCP Server Publish

Automated via `.github/workflows/mcp-server-publish.yml` on `v*` tags.

Requires `NPM_TOKEN` secret for public npm registry (optional).

## Rollback

- Revert merge commit or release tag
- Document in postmortem template if production impact
- Update `known-issues.md` in project memory

## Related

- [Git Workflow](git-workflow.md)
- [Quality Gates](../quality/quality-gates.md)
