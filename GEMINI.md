# Gemini Agent Instructions

Use the shared PUDO agent context in AGENTS.md.

Follow:
- Plan before implementation.
- Inspect relevant files before editing.
- Keep patches small and scoped.
- Do not invent APIs, file paths, env vars, or test results.
- Run relevant checks or state why they were skipped.
- Use .pudo/session.md for handoff when context may be lost.

## Package Stability & Release Guidelines
- **NPM Package Quality:** Maintain functionality, configuration, prompts, and exported features of the MCP server package and CLI.
- **Git Branching & Commits:** Create dedicated feature branches; do not commit directly to main. Stage and commit files individually using Conventional Commits.
- **Versioning & Changelog:** Determine version bump using [VERSIONING.md](release/VERSIONING.md). Maintain a clean `CHANGELOG.md` following [CHANGELOG_TEMPLATE.md](release/CHANGELOG_TEMPLATE.md).
- **Manual Verification:** Consult [RELEASE_CHECKLIST.md](release/RELEASE_CHECKLIST.md) and [PUBLISH_NPM.md](release/PUBLISH_NPM.md) before recommending any releases.

