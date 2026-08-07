const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const {
  parseArgs,
  resolveOptions,
  templates,
  writeFiles,
  evaluateProject,
  evaluateScore
} = require("../src/cli");

const repoRoot = path.resolve(__dirname, "..");
const binPath = path.join(repoRoot, "bin", "pudo.js");

function withTempDir(fn) {
  const previousCwd = process.cwd();
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pudo-cli-"));
  const cleanup = () => {
    process.chdir(previousCwd);
    fs.rmSync(dir, { recursive: true, force: true });
  };

  process.chdir(dir);
  try {
    const result = fn(dir);
    if (result && typeof result.then === "function") {
      return result.finally(cleanup);
    }

    cleanup();
    return result;
  } catch (error) {
    cleanup();
    throw error;
  }
}

test("parseArgs parses init --yes", () => {
  assert.deepEqual(parseArgs(["init", "--yes"]), {
    command: "init",
    yes: true,
    dryRun: false,
    force: false,
    tools: null,
    project: null,
    strictness: null,
    json: false,
    strict: false,
    help: false
  });
});

test("parseArgs parses check command", () => {
  const args = parseArgs(["check"]);

  assert.equal(args.command, "check");
  assert.equal(args.yes, false);
});

test("parseArgs parses explicit tools", () => {
  const args = parseArgs(["init", "--tools=cursor,claude"]);

  assert.equal(args.tools, "cursor,claude");
});

test("parseArgs parses score output flags", () => {
  const args = parseArgs(["score", "--json", "--strict"]);

  assert.equal(args.command, "score");
  assert.equal(args.json, true);
  assert.equal(args.strict, true);
});

test("resolveOptions falls back for invalid tool, project, and strictness", async () => {
  const args = parseArgs([
    "init",
    "--yes",
    "--tools=unknown",
    "--project=unknown",
    "--strictness=unknown"
  ]);

  const options = await resolveOptions(args);

  assert.deepEqual(options.tools, ["cursor", "claude", "codex", "copilot", "gemini", "opencode", "kiro"]);
  assert.equal(options.project, "generic");
  assert.equal(options.strictness, "standard");
});

test("templates creates Codex AGENTS.md", () => {
  const files = templates({
    tools: ["codex"],
    project: "generic",
    strictness: "standard"
  });

  assert.ok(files["AGENTS.md"]);
  assert.match(files["AGENTS.md"], /# Codex Workflow/);
});

test("templates creates .pudo/config.json", () => {
  const files = templates({
    tools: ["codex"],
    project: "go-api",
    strictness: "enterprise"
  });

  const config = JSON.parse(files[".pudo/config.json"]);

  assert.equal(config.mode, "enterprise");
  assert.equal(config.projectType, "go-api");
  assert.deepEqual(config.tools, ["codex"]);
});

test("templates creates Gemini, OpenCode, and Kiro instructions", () => {
  const files = templates({
    tools: ["gemini", "opencode", "kiro"],
    project: "nextjs",
    strictness: "standard"
  });

  assert.ok(files["GEMINI.md"]);
  assert.ok(files["opencode/opencode.md"]);
  assert.ok(files["kiro/system-prompt.md"]);
  assert.match(files["GEMINI.md"], /# Gemini Agent Instructions/);
  assert.match(files["opencode/opencode.md"], /# OpenCode Instructions/);
  assert.match(files["kiro/system-prompt.md"], /# Kiro System Prompt/);
});

test("writeFiles dry-run does not write files", () => withTempDir(() => {
  const results = writeFiles({ "AGENTS.md": "dry run\n" }, { dryRun: true, force: false });

  assert.deepEqual(results, ["would-create AGENTS.md"]);
  assert.equal(fs.existsSync("AGENTS.md"), false);
}));

test("writeFiles force overwrites existing files", () => withTempDir(() => {
  fs.writeFileSync("AGENTS.md", "old\n", "utf8");

  const skipped = writeFiles({ "AGENTS.md": "new\n" }, { dryRun: false, force: false });
  assert.deepEqual(skipped, ["skipped AGENTS.md"]);
  assert.equal(fs.readFileSync("AGENTS.md", "utf8"), "old\n");

  const updated = writeFiles({ "AGENTS.md": "new\n" }, { dryRun: false, force: true });
  assert.deepEqual(updated, ["updated AGENTS.md"]);
  assert.equal(fs.readFileSync("AGENTS.md", "utf8"), "new\n");
}));

test("init fixture creates expected project files", async () => withTempDir(async () => {
  const options = await resolveOptions(parseArgs([
    "init",
    "--yes",
    "--tools=codex,cursor,gemini,opencode,kiro",
    "--project=go-api",
    "--strictness=lite"
  ]));

  writeFiles(templates(options), { dryRun: false, force: false });

  assert.equal(fs.existsSync("AGENTS.md"), true);
  assert.equal(fs.existsSync(path.join(".cursor", "rules", "pudo-core.mdc")), true);
  assert.equal(fs.existsSync("GEMINI.md"), true);
  assert.equal(fs.existsSync(path.join("opencode", "opencode.md")), true);
  assert.equal(fs.existsSync(path.join("kiro", "system-prompt.md")), true);
  assert.equal(fs.existsSync(path.join(".pudo", "config.json")), true);
  assert.equal(fs.existsSync(path.join(".github", "pull_request_template.md")), true);
  assert.equal(evaluateProject().every((check) => check.pass), true);
}));

test("evaluateScore returns evidence-based rubric categories", () => {
  const report = evaluateScore();

  assert.equal(report.schema_version, "1.0");
  assert.equal(report.pudo_version, "1.3.2");
  assert.equal(report.max_score, 100);
  assert.equal(typeof report.score, "number");
  assert.ok(report.categories.agent_rules.evidence.length > 0);
  assert.ok(Array.isArray(report.categories.ai_safety.missing));
});

test("real CLI commands execute", () => withTempDir((dir) => {
  const help = execFileSync(process.execPath, [binPath, "--help"], {
    cwd: repoRoot,
    encoding: "utf8"
  });
  assert.match(help, /Usage:/);

  const dryRun = execFileSync(process.execPath, [binPath, "init", "--yes", "--dry-run"], {
    cwd: dir,
    encoding: "utf8"
  });
  assert.match(dryRun, /would-create AGENTS\.md/);
  assert.equal(fs.existsSync(path.join(dir, "AGENTS.md")), false);

  const check = execFileSync(process.execPath, [binPath, "check"], {
    cwd: repoRoot,
    encoding: "utf8"
  });
  assert.match(check, /Result: passed/);

  const score = execFileSync(process.execPath, [binPath, "score"], {
    cwd: repoRoot,
    encoding: "utf8"
  });
  assert.match(score, /PUDO score:/);

  const scoreJson = execFileSync(process.execPath, [binPath, "score", "--json"], {
    cwd: repoRoot,
    encoding: "utf8"
  });
  const report = JSON.parse(scoreJson);
  assert.equal(report.max_score, 100);
  assert.ok(report.categories.context_quality);

  const doctor = execFileSync(process.execPath, [binPath, "doctor"], {
    cwd: repoRoot,
    encoding: "utf8"
  });
  assert.match(doctor, /PUDO doctor/);
}));
