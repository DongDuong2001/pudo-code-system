# Release Checklist

This checklist must be executed and fully checked off before every official release of the `@dongduong2001/mcp-server` or `pudo-code-system` packages.

## 1. Pre-Release Verification

Run the following checks locally to ensure repository health and code quality:

- [ ] **Git Working Directory Clean:** Ensure there are no uncommitted changes in your working directory.
  ```bash
  git status
  ```
- [ ] **Run Linting:** Lint all prompts and JS/TS files to check for compliance.
  ```bash
  npm run check
  # or
  node bin/pudo.js check
  ```
- [ ] **Run Core Tests:** Execute CLI unit tests.
  ```bash
  npm test
  ```
- [ ] **Run MCP Server Tests:** Build and execute tests for the MCP server.
  ```bash
  npm run mcp:test
  ```
- [ ] **Verify Production Build:** Run the compiler for the MCP package.
  ```bash
  npm run mcp:build
  ```
- [ ] **Verify Local MCP Execution:** Test launching the MCP server locally with stdio to ensure it starts without errors.
  ```bash
  node packages/pudo-mcp-server/dist/src/server.js
  ```

---

## 2. Version and Metadata Update

Determine the version bump (major, minor, or patch) based on [VERSIONING.md](VERSIONING.md).

- [ ] **Update Root package.json Version:** Bump the version in the main project directory.
- [ ] **Update MCP Server package.json Version:** Bump the version in `packages/pudo-mcp-server/package.json`.
- [ ] **Sync package-lock.json:** Run npm install to update locks.
  ```bash
  npm install
  npm install --prefix packages/pudo-mcp-server
  ```
- [ ] **Check Dependencies:** Verify that any updated dependencies or peer dependencies are correctly defined.

---

## 3. Changelog and Release Notes

- [ ] **Update CHANGELOG.md:** Document all changes in the root `CHANGELOG.md` under the new version header, categorizing them according to the [CHANGELOG_TEMPLATE.md](CHANGELOG_TEMPLATE.md):
  - `Added` (new features/playbooks)
  - `Improved` (enhancements to tools or documents)
  - `Fixed` (bug fixes)
  - `Deprecated` (features slated for removal)
  - `Breaking Changes` (details & migration steps)
- [ ] **Ensure Migration Guide Updated:** If there are breaking changes, verify [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) is updated.

---

## 4. Package Dry-Run

Verify the packed files to ensure no unnecessary configuration or build files are leaked, and all required files are packaged.

- [ ] **CLI Package Dry-Run:**
  ```bash
  npm pack --dry-run
  ```
- [ ] **MCP Server Package Dry-Run:**
  ```bash
  npm pack --dry-run --prefix packages/pudo-mcp-server
  ```
- [ ] Check the file list to confirm:
  - Binaries are included.
  - Dist/build files are present.
  - Test files/configs are excluded (unless required).
  - Crucial prompts, configurations, and license files are present.

---

## 5. Publish and Push

Release commands are to be performed manually upon verification. Do not automate this step.

- [ ] **Publish Packages:** (Run commands as outlined in [PUBLISH_NPM.md](PUBLISH_NPM.md))
- [ ] **Git Tagging:** Tag the commit with the release version.
  ```bash
  git tag -a v<VERSION> -m "Release v<VERSION>"
  ```
- [ ] **Push to Remote:** Push the branch and tags to the origin repository.
  ```bash
  git push origin feature/backend-system-design-vNext
  git push origin --tags
  ```
- [ ] **Create GitHub Release:** Generate the release summary on GitHub and link the npm package version.
