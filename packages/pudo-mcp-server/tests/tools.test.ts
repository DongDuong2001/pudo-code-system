import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { createContextPack } from "../tools/pudo_context_pack.js";
import { initProject } from "../tools/pudo_init.js";
import { runQualityGate } from "../tools/pudo_quality_gate.js";
import { scoreRepoReadiness } from "../tools/pudo_score.js";

function findRepoRoot(start: string): string {
  let current = start;
  while (true) {
    const manifestPath = path.join(current, "package.json");
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
      if (manifest.name === "pudo-code-system" || manifest.name === "@dongduong2001/pudo-code-system") return current;
    }

    const parent = path.dirname(current);
    if (parent === current) throw new Error("Unable to find PUDO repository root.");
    current = parent;
  }
}

const repoRoot = findRepoRoot(path.dirname(fileURLToPath(import.meta.url)));
process.env.PUDO_PACKAGE_ROOT = repoRoot;

function withTempProject<T>(fn: (dir: string) => T): T {
  const previousCwd = process.cwd();
  const previousRoot = process.env.PUDO_PROJECT_ROOT;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pudo-mcp-"));
  process.env.PUDO_PROJECT_ROOT = dir;
  process.chdir(dir);

  try {
    return fn(dir);
  } finally {
    process.chdir(previousCwd);
    if (previousRoot === undefined) delete process.env.PUDO_PROJECT_ROOT;
    else process.env.PUDO_PROJECT_ROOT = previousRoot;
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("initProject defaults to dry-run", () => withTempProject(() => {
  const result = initProject({ tools: ["codex"], project: "generic" });

  assert.equal(result.dry_run, true);
  assert.equal(fs.existsSync("AGENTS.md"), false);
  assert.ok(result.results.some((line) => line === "would-create AGENTS.md"));
}));

test("initProject requires approval before writing", () => withTempProject(() => {
  assert.throws(
    () => initProject({ tools: ["codex"], dryRun: false }),
    /confirmWrite/
  );
}));

test("context pack excludes sensitive paths", () => withTempProject(() => {
  fs.writeFileSync("README.md", "# Example\n", "utf8");
  fs.writeFileSync(".env", "TOKEN=secret\n", "utf8");

  const result = createContextPack({ paths: ["README.md", ".env"] });

  assert.deepEqual(result.included, ["README.md"]);
  assert.equal(result.content.includes("TOKEN=secret"), false);
  assert.equal(result.skipped[0].path, ".env");
}));

test("scoreRepoReadiness exposes evidence rubric", () => {
  const previousCwd = process.cwd();
  const previousRoot = process.env.PUDO_PROJECT_ROOT;
  process.env.PUDO_PROJECT_ROOT = repoRoot;
  process.chdir(repoRoot);

  try {
    const report = scoreRepoReadiness() as {
      max_score: number;
      categories: Record<string, { evidence: string[] }>;
    };

    assert.equal(report.max_score, 100);
    assert.ok(report.categories.agent_rules.evidence.length > 0);
  } finally {
    process.chdir(previousCwd);
    if (previousRoot === undefined) delete process.env.PUDO_PROJECT_ROOT;
    else process.env.PUDO_PROJECT_ROOT = previousRoot;
  }
});

test("runQualityGate returns documented checks", () => {
  const previousRoot = process.env.PUDO_PROJECT_ROOT;
  process.env.PUDO_PROJECT_ROOT = repoRoot;

  try {
    const result = runQualityGate("release");
    assert.equal(result.gate, "release");
    assert.equal(result.checks.length, 4);
  } finally {
    if (previousRoot === undefined) delete process.env.PUDO_PROJECT_ROOT;
    else process.env.PUDO_PROJECT_ROOT = previousRoot;
  }
});

test("stdio server exposes the expected PUDO tools", async () => {
  const serverPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "src",
    "server.js"
  );
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [serverPath],
    env: {
      PUDO_PROJECT_ROOT: repoRoot,
      PUDO_PACKAGE_ROOT: repoRoot
    },
    stderr: "pipe"
  });
  const client = new Client({
    name: "pudo-mcp-test-client",
    version: "1.0.0"
  });

  try {
    await client.connect(transport);
    const result = await client.listTools();
    const names = result.tools.map((tool) => tool.name).sort();

    assert.deepEqual(names, [
      "pudo.createContextPack",
      "pudo.doctor",
      "pudo.generateAgentRules",
      "pudo.initProject",
      "pudo.runQualityGate",
      "pudo.scoreRepoReadiness",
      "pudo.updateSessionHandoff",
      "pudo.validateAgentRules"
    ]);
  } finally {
    await client.close();
  }
});
