# PUDO Copilot Cloud Agent Setup

This template provides a complete setup for using PUDO with GitHub Copilot's cloud agent mode.

## Files Included

| File | Purpose |
|---|---|
| `.github/copilot-instructions.md` | Repository-wide Copilot instructions with PUDO workflow |
| `.github/instructions/pudo-*.instructions.md` | Path-specific instruction files for different areas |
| `.github/pull_request_template.md` | PR template with PUDO phase verification |
| `.github/CODEOWNERS` | Ownership rules for PUDO workflow enforcement |

## Setup

### 1. Copy template files

```bash
cp templates/copilot-cloud-agent/.github/copilot-instructions.md .github/
cp templates/copilot-cloud-agent/.github/instructions/*.md .github/instructions/
cp templates/copilot-cloud-agent/.github/pull_request_template.md .github/
cp templates/copilot-cloud-agent/.github/CODEOWNERS .github/
```

### 2. Run PUDO init

```bash
npx pudo-code-system init --tools=copilot --project=<PROJECT_TYPE> --strictness=standard
```

### 3. Verify installation

```bash
npx pudo-code-system check
npx pudo-code-system score
```

## Cloud Agent Configuration

GitHub Copilot's cloud agent mode (Copilot Workspace) uses the repository's instruction files automatically. No additional configuration is needed.

The cloud agent will:
- Read `.github/copilot-instructions.md` for repository-wide rules
- Follow path-specific `.github/instructions/*.md` files
- Use the PR template for structured pull requests
- Respect CODEOWNERS for review assignments

## Customization

### Modifying Copilot Instructions

Edit `.github/copilot-instructions.md` to customize:
- Workflow rules (PUDO phases, quality gates)
- Repository-specific conventions
- Verification requirements
- Anti-patterns to avoid

### Path-Specific Instructions

Add files to `.github/instructions/` following the naming pattern:
- `pudo-frontend.instructions.md` for frontend code
- `pudo-api.instructions.md` for API endpoints
- `pudo-tests.instructions.md` for test files

These files apply only to changes in matching paths.

## Reference

- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [PUDO Documentation](https://github.com/DongDuong2001/pudo-code-system)