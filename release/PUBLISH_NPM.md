# npm Publishing Guide

This guide covers the manual publishing workflow for releasing updates to the npm registry.

## Prerequisites

1. **Permissions:** Ensure you have publisher rights to the npm organization or username scope (e.g., `@dongduong2001`).
2. **NPM Authentication:** You must be logged into npm CLI.
   ```bash
   npm login
   # Verify authentication
   npm whoami
   ```

---

## Publishing Workflow

Once [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md) is complete and all tests pass:

### 1. Build and Test Everything
Ensure the latest build is compiled and verified:
```bash
# Compile TS in MCP server and test
npm run mcp:test

# Verify root CLI logic
npm test
```

### 2. Verify Registry Configurations
Before publishing, check where the package is going.
In `packages/pudo-mcp-server/package.json`:
- `"publishConfig": { "access": "public" }` allows public scoping.
- If switching from a private GitHub Packages registry to the public npm registry, make sure to specify the public registry URL if needed, or omit it to default to npmjs.org.

### 3. Release Version Bumping
Run npm version in the root directory (and workspace package directory if applicable):
```bash
# Choose patch, minor, or major
npm version <patch|minor|major> --no-git-tag-version

# Sync with the MCP package
cd packages/pudo-mcp-server
npm version <patch|minor|major> --no-git-tag-version
cd ../..
```

### 4. Dry Run Verification
Dry run compiles the tarball and lists what will be published:
```bash
# Root package
npm publish --dry-run

# MCP Server package
npm publish --dry-run --prefix packages/pudo-mcp-server
```

Verify that no sensitive files (like local env keys, temporary scripts) are in the files list.

### 5. Official NPM Publish
Execute the publish command. Do NOT use automation scripts; this remains a manual step requiring developer approval.

```bash
# To publish the CLI / Root package
npm publish --access public

# To publish the MCP Server package
npm publish --access public --prefix packages/pudo-mcp-server
```

### 6. Git Push and Tags
Once the publish is successful, commit version bumps and push tags:
```bash
git add package.json package-lock.json packages/pudo-mcp-server/package.json packages/pudo-mcp-server/package-lock.json CHANGELOG.md
git commit -m "chore(release): release v<VERSION>"
git tag -a v<VERSION> -m "Release v<VERSION>"
git push origin <feature-branch>
git push origin --tags
```
