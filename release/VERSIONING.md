# Versioning Guide

This project follows [Semantic Versioning 2.0.0 (SemVer)](https://semver.org/). Managing versions correctly is critical to prevent breaking downstream AI workflows, tools, and integrations that rely on PUDO.

## SemVer Overview

A version number is formatted as `MAJOR.MINOR.PATCH` (e.g., `1.2.0`).

- **MAJOR version:** Bounded to incompatible API changes.
- **MINOR version:** Bounded to adding functionality in a backward-compatible manner.
- **PATCH version:** Bounded to backward-compatible bug fixes or documentation additions.

---

## Evolving both Playbooks & MCP Server

Because this repository functions as both an **AI Engineering Playbook** and a publishable **MCP Server package**, version updates must account for both:

### Patch Bumps (`0.0.x`)
Use for backward-compatible bug fixes and small documentation improvements:
- Fixing spelling, layout, or minor details in playbooks/documentation.
- Bug fixes in CLI command logic that don't alter the command options or output schema.
- Bug fixes in the MCP server tools that do not change tool names or schemas.
- Minor package dependency bumps.

### Minor Bumps (`0.x.0`)
Use for backward-compatible additions or improvements:
- Adding a **new playbook** or a new system design template.
- Adding a **new CLI command** or backward-compatible options.
- Adding a **new MCP Tool** or introducing optional properties to existing tool schemas.
- Enhancing prompt instructions without breaking compatibility with older agents.

### Major Bumps (`x.0.0`)
Use for backward-incompatible (breaking) changes:
- Renaming or deleting existing CLI commands or changing output schemas in a non-backward-compatible way.
- Renaming or removing **MCP Tools**, or changing required parameters in their schemas.
- Modifying directory structures, PUDO configuration keys, or files in a way that requires existing projects to run migrations.
- Complete overhaul of the PUDO mode configurations.

---

## Keeping Versions in Sync

We maintain multiple files that reference the current version. During a release, all of the following files **must** be updated simultaneously:

1. **Root `package.json`**:
   `"version": "MAJOR.MINOR.PATCH"`
2. **MCP Server `package.json`** (`packages/pudo-mcp-server/package.json`):
   `"version": "MAJOR.MINOR.PATCH"`
3. **Changelog Header** (`CHANGELOG.md`):
   `## [MAJOR.MINOR.PATCH] - YYYY-MM-DD`

Run `npm install` after updating package versions to keep `package-lock.json` files synchronized.
