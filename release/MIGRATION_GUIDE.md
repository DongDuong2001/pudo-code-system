# Migration Guide Template

This document provides instructions on how to draft migration guides for breaking changes in the PUDO CLI or the MCP Server.

Whenever a breaking change is introduced (requiring a Major version bump under [VERSIONING.md](VERSIONING.md)), you must add a section to this guide.

---

## Template for Breaking Changes

### Upgrading to v[NEW_VERSION]

**Release Date:** YYYY-MM-DD

#### Overview of Breaking Changes
Provide a brief summary of what changed and why the breaking change was necessary.

#### Affected Areas
- [ ] CLI command structure/options
- [ ] MCP Server tools/schema
- [ ] `.pudo/` configuration keys
- [ ] Default agent instruction files (`AGENTS.md`, `CLAUDE.md`, etc.)

---

### Step-by-Step Migration Steps

#### 1. CLI Commands Migration
If a command was renamed or its arguments changed:
* **Old Usage:** `pudo check --some-old-flag`
* **New Usage:** `pudo check --some-new-flag`

Describe how developers should update their CI workflows or npm scripts.

#### 2. MCP Server Configuration
If tool schemas changed, specify how to re-configure the AI client (e.g., Cursor, Claude Desktop config).
For example, if `validateAgentRules` was renamed to `checkAgentRules`:
* Update any local scripts or client instructions that call `validateAgentRules`.

#### 3. Config Directory Updates
If the format of `.pudo/config.json` is modified:
* Run `pudo doctor` (if we include auto-fix functionality).
* Alternatively, specify the manual edits required:
  ```json
  // Old config.json
  {
    "strictness": "standard"
  }
  
  // New config.json
  {
    "mode": "standard"
  }
  ```

---

### Verification
Explain how the user can verify that the migration was successful:
1. Run `node bin/pudo.js doctor` to diagnose configuration health.
2. Launch the MCP server locally and run tool verification tests.
