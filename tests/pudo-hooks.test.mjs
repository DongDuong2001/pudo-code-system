import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { handoffFromTranscript, toolCalls, unverifiedEdits } from "../claude/plugin/hooks/pudo-hooks.mjs";

const hook = path.resolve("claude/plugin/hooks/pudo-hooks.mjs");
const tool = (name, input) => ({ type: "assistant", message: { content: [{ type: "tool_use", name, input }] } });
const edit = (file) => tool("Edit", { file_path: file });
const bash = (command) => tool("Bash", { command });

function runHook(mode, payload) {
  return execFileSync(process.execPath, [hook, mode], { input: JSON.stringify(payload), encoding: "utf8" });
}

function withTranscript(entries, fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "pudo-hook-"));
  const file = path.join(dir, "t.jsonl");
  fs.writeFileSync(file, entries.map((entry) => JSON.stringify(entry)).join("\n"));
  try {
    return fn(file, dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("code edited after the last test run is unverified", () => {
  assert.deepEqual(unverifiedEdits(toolCalls([bash("npm test"), edit("src/a.ts")])), ["src/a.ts"]);
  assert.deepEqual(unverifiedEdits(toolCalls([edit("src/a.ts"), bash("npm test")])), []);
  assert.deepEqual(unverifiedEdits(toolCalls([edit("README.md")])), []);
  assert.deepEqual(unverifiedEdits(toolCalls([edit("src/a.ts"), bash("git status")])), ["src/a.ts"]);
});

test("stop hook blocks once, then lets the agent finish", () => withTranscript([edit("src/a.ts")], (file) => {
  assert.equal(JSON.parse(runHook("stop", { transcript_path: file })).decision, "block");
  assert.equal(runHook("stop", { transcript_path: file, stop_hook_active: true }), "");
}));

test("stop hook allows finishing after checks ran", () => withTranscript([edit("src/a.ts"), bash("pytest -q")], (file) => {
  assert.equal(runHook("stop", { transcript_path: file }), "");
}));

test("pre-compact writes the auto handoff and session-start reloads it", () => withTranscript(
  [{ type: "user", message: { content: "add login" } }, edit("src/a.ts")],
  (file, dir) => {
    runHook("pre-compact", { transcript_path: file, cwd: dir });
    const handoff = fs.readFileSync(path.join(dir, ".pudo", "auto-handoff.md"), "utf8");
    assert.match(handoff, /add login/);
    assert.match(handoff, /src\/a\.ts/);

    const start = JSON.parse(runHook("session-start", { source: "compact", cwd: dir }));
    assert.match(start.hookSpecificOutput.additionalContext, /PUDO MODE ACTIVE/);
    assert.match(start.hookSpecificOutput.additionalContext, /add login/);
  }
));

test("handoff tolerates an empty transcript", () => {
  assert.match(handoffFromTranscript([]), /Last User Request\n\nunknown/);
});
