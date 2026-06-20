# Governance

Organizational standards for the PUDO AI DevOS.

## Purpose

Define policies and processes that apply across workflows, skills, and projects. Complements `quality/` phase gates with org-wide standards.

## Documents

| Document | Purpose |
| --- | --- |
| [coding-standards.md](coding-standards.md) | Code style and conventions |
| [git-workflow.md](git-workflow.md) | Branching, commits, PRs |
| [release-process.md](release-process.md) | Versioning and release steps |

## Mode Mapping

| Standard | Lite | Standard | Enterprise |
| --- | ---: | ---: | ---: |
| Coding standards | Conventions | + lint CI | + formal review |
| Git workflow | Trunk | Feature branches | Protected main |
| Release process | Direct merge | PR + changelog | + rollback plan |

## Related

- [Governance Model Spec](../docs/devos/07-governance-model.md)
- [Quality Gates](../quality/quality-gates.md)
- [SECURITY.md](../SECURITY.md)
