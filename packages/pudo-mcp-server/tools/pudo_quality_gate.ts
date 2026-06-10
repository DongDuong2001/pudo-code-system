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

export function runQualityGate(gate: keyof typeof gateRequirements) {
  const root = resolveProjectRoot();
  const evidenceText = [
    readIfExists(root, ".pudo/session.md"),
    readIfExists(root, ".pudo/checklists/release.md"),
    readIfExists(root, ".github/pull_request_template.md"),
    readIfExists(root, "quality/quality-gates.md")
  ].join("\n").toLowerCase();
  const checks = gateRequirements[gate].map((requirement) => ({
    requirement,
    pass: evidenceText.includes(requirement)
  }));

  return {
    gate,
    passed: checks.every((check) => check.pass),
    checks,
    note: "A passing text check confirms documented evidence, not implementation correctness."
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
