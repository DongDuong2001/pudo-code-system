# Changelog Template

Follow this template when adding new version blocks to `CHANGELOG.md`.

---

## [MAJOR.MINOR.PATCH] - YYYY-MM-DD

### Added
- Describe new features, playbooks, or tools added to the repository.
- E.g., `docs(system-design): add payments system architecture template`
- E.g., `feat(mcp): add support for tool-based project evaluation`

### Improved
- Describe backward-compatible modifications, optimizations, and cleanups.
- E.g., `docs(backend): refine caching strategy example code`
- E.g., `perf(mcp): speed up file scanning in context pack creation`

### Fixed
- Describe bug fixes to code, configurations, or instructions.
- E.g., `fix(cli): resolve relative path bug on Windows systems`
- E.g., `docs: correct broken links in README.md`

### Deprecated
- Describe features, tools, or playbooks that are slated for removal in future versions.
- E.g., `docs: deprecate legacy cursorrules setup in favor of modular .mdc files`

### Breaking Changes
- Explicitly detail any breaking changes, references to [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md), and quick fixes.
- E.g., `mcp: renamed tool 'validateAgentRules' to 'checkAgentRules'. See [Migration Guide](MIGRATION_GUIDE.md) for details.`
