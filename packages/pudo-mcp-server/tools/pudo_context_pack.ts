import fs from "node:fs";
import path from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v4";
import {
  isSensitivePath,
  jsonToolResult,
  requireWriteApproval,
  resolveProjectRoot,
  resolveWithinRoot
} from "./core.js";

const defaultPaths = [
  "README.md",
  "package.json",
  "AGENTS.md",
  "CLAUDE.md",
  "GEMINI.md",
  ".pudo/config.json",
  ".pudo/session.md"
];

export function createContextPack(input: {
  paths?: string[];
  maxBytes?: number;
  outputPath?: string;
  write?: boolean;
  confirmWrite?: boolean;
}) {
  const root = resolveProjectRoot();
  const requestedPaths = (input.paths?.length ? input.paths : defaultPaths).slice(0, 25);
  const maxBytes = Math.min(Math.max(input.maxBytes || 24000, 1000), 100000);
  let remaining = maxBytes;
  const included: string[] = [];
  const skipped: Array<{ path: string; reason: string }> = [];
  const sections: string[] = ["# PUDO Context Pack", "", `Repository: ${path.basename(root)}`, ""];

  for (const relativePath of requestedPaths) {
    if (isSensitivePath(relativePath)) {
      skipped.push({ path: relativePath, reason: "sensitive or generated path" });
      continue;
    }

    const target = resolveWithinRoot(root, relativePath);
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      skipped.push({ path: relativePath, reason: "file not found" });
      continue;
    }

    const content = fs.readFileSync(target, "utf8");
    const bytes = Buffer.byteLength(content);
    if (remaining <= 0) {
      skipped.push({ path: relativePath, reason: "context budget exhausted" });
      continue;
    }

    const selected = bytes > remaining
      ? Buffer.from(content).subarray(0, remaining).toString("utf8")
      : content;
    sections.push(`## ${relativePath}`, "", "```text", selected.trimEnd(), "```", "");
    included.push(relativePath);
    remaining -= Buffer.byteLength(selected);
  }

  const content = `${sections.join("\n").trimEnd()}\n`;
  let writtenTo: string | null = null;

  if (input.write) {
    requireWriteApproval(input.confirmWrite);
    const outputPath = input.outputPath || ".pudo/context-pack.md";
    if (isSensitivePath(outputPath)) throw new Error("Context pack output path is not allowed.");
    const target = resolveWithinRoot(root, outputPath);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content, "utf8");
    writtenTo = outputPath;
  }

  return {
    content,
    included,
    skipped,
    bytes: Buffer.byteLength(content),
    written_to: writtenTo
  };
}

export function registerContextPackTools(server: McpServer): void {
  server.registerTool(
    "pudo.createContextPack",
    {
      description: "Build a bounded context pack from allowlisted repository files.",
      inputSchema: z.object({
        paths: z.array(z.string()).max(25).optional(),
        maxBytes: z.number().int().min(1000).max(100000).optional(),
        outputPath: z.string().optional(),
        write: z.boolean().optional(),
        confirmWrite: z.boolean().optional()
      }),
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async (input) => jsonToolResult(createContextPack(input))
  );
}
