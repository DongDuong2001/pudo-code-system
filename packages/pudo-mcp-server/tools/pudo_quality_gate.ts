import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v4";
import { jsonToolResult, resolveProjectRoot } from "./core.js";

const gateRequirements = {
  plan: ["scope", "success criteria", "constraints", "out of scope"],
  understand: ["files inspected", "architecture", "api", "patterns"],
  develop: ["tests run", "edge cases", "changes made"],
  optimize: ["self-review", "remaining risks", "documentation"],
  release: ["rollback", "monitoring", "owner", "migration"]
} as const;

function readIfExists(root: string, relativePath: string): string {
  const target = path.join(root, relativePath);
  return fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";
}

// Headings, "..." placeholders and unticked "- [ ]" boxes are template text, not evidence.
function filledLines(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !line.startsWith("#") && !/^(-\s*)?\.\.\.$/.test(line) && !line.startsWith("- [ ]"))
    .join("\n");
}

const TEST_FILE = /(^|\/)(tests?|__tests__|spec)\/|\.(test|spec)\.[cm]?[jt]sx?$|_test\.(go|py)$|(^|\/)test_[^/]+\.py$/i;
const DOC_FILE = /\.(md|mdx|txt|rst)$/i;

// Uncommitted plus untracked files; null when this is not a git repository.
export function changedFiles(root: string): string[] | null {
  try {
    const output = execFileSync("git", ["status", "--porcelain", "--untracked-files=all"], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
    return output.split("\n").filter(Boolean).map((line) => line.slice(3).split(" -> ").at(-1)!.replaceAll('"', ""));
  } catch {
    return null;
  }
}

export function runQualityGate(gate: keyof typeof gateRequirements) {
  const root = resolveProjectRoot();
  const evidenceText = filledLines([
    readIfExists(root, ".pudo/session.md"),
    gate === "release" ? readIfExists(root, ".pudo/checklists/release.md") : ""
  ].join("\n")).toLowerCase();
  const checks: Array<{ requirement: string; pass: boolean }> = gateRequirements[gate].map((requirement) => ({
    requirement,
    pass: evidenceText.includes(requirement)
  }));

  const changed = changedFiles(root);
  if (gate === "develop" && changed) {
    const code = changed.filter((file) => !DOC_FILE.test(file) && !TEST_FILE.test(file) && !file.startsWith(".pudo/"));
    checks.push({
      requirement: "tests changed alongside code changes",
      pass: code.length === 0 || changed.some((file) => TEST_FILE.test(file))
    });
  }

  return {
    gate,
    passed: checks.every((check) => check.pass),
    checks,
    changed_files: changed,
    note: "Text checks confirm documented evidence; the git check confirms tests moved with code. Neither proves correctness: run the tests."
  };
}

export function registerQualityGateTools(server: McpServer): void {
  server.registerTool(
    "pudo.runQualityGate",
    {
      description: "Evaluate documented evidence for one PUDO quality gate.",
      inputSchema: z.object({
        gate: z.enum(["plan", "understand", "develop", "optimize", "release"])
      }),
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async ({ gate }) => jsonToolResult(runQualityGate(gate))
  );
}
