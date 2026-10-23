#!/usr/bin/env node
// PUDO Claude Code hooks. Usage: node pudo-hooks.mjs <session-start|stop|pre-compact>
// Reads the hook payload as JSON on stdin and answers on stdout, as Claude Code expects.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const pluginRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HANDOFF = path.join(".pudo", "auto-handoff.md");
const DOC_FILE = /\.(md|mdx|txt|rst)$/i;
const VERIFY_COMMAND = /\b(test|tests|check|lint|build|tsc|pytest|vitest|jest|mocha|playwright|cargo\s+(test|check|clippy)|go\s+(test|vet)|mvn|gradle|dotnet\s+test|rspec|phpunit)\b/i;

export function readTranscript(transcriptPath) {
  if (!transcriptPath || !fs.existsSync(transcriptPath)) return [];
  return fs.readFileSync(transcriptPath, "utf8")
    .split("\n")
    .flatMap((line) => {
      try {
        return [JSON.parse(line)];
      } catch {
        return [];
      }
    });
}

// Flatten the transcript into tool calls in order: { name, input }.
export function toolCalls(entries) {
  return entries.flatMap((entry) =>
    entry.type === "assistant" && Array.isArray(entry.message?.content)
      ? entry.message.content.filter((part) => part.type === "tool_use")
      : []
  );
}

function editedFile(call) {
  return ["Edit", "Write", "MultiEdit", "NotebookEdit"].includes(call.name)
    ? call.input?.file_path || call.input?.notebook_path
    : null;
}

function shellCommand(call) {
  return ["Bash", "PowerShell"].includes(call.name) ? String(call.input?.command || "") : null;
}

// Code edited after the last verification command means the work is unverified.
export function unverifiedEdits(calls) {
  let lastVerify = -1;
  calls.forEach((call, index) => {
    const command = shellCommand(call);
    if (command && VERIFY_COMMAND.test(command)) lastVerify = index;
  });
  return calls
    .slice(lastVerify + 1)
    .map(editedFile)
    .filter((file) => file && !DOC_FILE.test(file));
}

export function handoffFromTranscript(entries) {
  const calls = toolCalls(entries);
  const files = [...new Set(calls.map(editedFile).filter(Boolean))];
  const commands = calls.map(shellCommand).filter(Boolean).slice(-10);
  const lastAsk = entries
    .filter((entry) => entry.type === "user" && typeof entry.message?.content === "string")
    .map((entry) => entry.message.content)
    .at(-1);
  const list = (items) => (items.length ? items.map((item) => `- ${item}`).join("\n") : "- none");

  return `# PUDO Auto Handoff

Written by the PUDO PreCompact hook. Facts only; check them before relying on them.

## Last User Request

${lastAsk ? lastAsk.slice(0, 2000) : "unknown"}

## Files Edited

${list(files)}

## Recent Commands

${list(commands.map((command) => "`" + command.split("\n")[0].slice(0, 200) + "`"))}

## Unverified Edits

${list(unverifiedEdits(calls))}
`;
}

function coreRules() {
  const skill = fs.readFileSync(path.join(pluginRoot, "skills", "pudo", "SKILL.md"), "utf8");
  return skill.replace(/^---[\s\S]*?---\s*/, "");
}

function run(mode, input) {
  if (mode === "session-start") {
    let context = `PUDO MODE ACTIVE. Follow this workflow for the whole session.\n\n${coreRules()}`;
    const handoff = path.join(input.cwd || process.cwd(), HANDOFF);
    if (input.source === "compact" && fs.existsSync(handoff)) {
      context += `\n\n${fs.readFileSync(handoff, "utf8")}`;
    }
    return { hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: context } };
  }

  if (mode === "stop") {
    if (input.stop_hook_active) return null; // block once, never loop
    const files = unverifiedEdits(toolCalls(readTranscript(input.transcript_path)));
    if (!files.length) return null;
    return {
      decision: "block",
      reason: `PUDO Optimize gate: code changed after the last test/check run (${[...new Set(files)].slice(0, 5).join(", ")}). Run the relevant tests or checks now, or say plainly why they cannot run, then finish.`
    };
  }

  if (mode === "pre-compact") {
    // shortcut: overwrites .pudo/auto-handoff.md each compaction; never touches the hand-written .pudo/session.md.
    const target = path.join(input.cwd || process.cwd(), HANDOFF);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, handoffFromTranscript(readTranscript(input.transcript_path)), "utf8");
    return null;
  }

  throw new Error(`Unknown PUDO hook mode: ${mode}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const raw = fs.readFileSync(0, "utf8");
  const output = run(process.argv[2], raw.trim() ? JSON.parse(raw) : {});
  if (output) process.stdout.write(JSON.stringify(output));
}
