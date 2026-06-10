import fs from "node:fs";
import path from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v4";
import {
  jsonToolResult,
  requireWriteApproval,
  resolveProjectRoot,
  resolveWithinRoot
} from "./core.js";

function bullets(items: string[] | undefined): string {
  return items?.length ? items.map((item) => `- ${item}`).join("\n") : "- ...";
}

export function updateSessionHandoff(input: {
  task: string;
  currentPhase: string;
  scope: string;
  filesInspected?: string[];
  decisions?: string[];
  assumptions?: string[];
  testsRun?: string[];
  remainingRisks?: string[];
  nextAction: string;
  confirmWrite?: boolean;
}) {
  requireWriteApproval(input.confirmWrite);
  const root = resolveProjectRoot();
  const target = resolveWithinRoot(root, ".pudo/session.md");
  const content = `# PUDO Session Handoff

## Task

${input.task}

## Current Phase

${input.currentPhase}

## Scope

${input.scope}

## Files Inspected

${bullets(input.filesInspected)}

## Decisions Made

${bullets(input.decisions)}

## Assumptions

${bullets(input.assumptions)}

## Tests Run

${bullets(input.testsRun)}

## Remaining Risks

${bullets(input.remainingRisks)}

## Next Action

${input.nextAction}
`;

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
  return { updated: ".pudo/session.md", bytes: Buffer.byteLength(content) };
}

export function registerSessionTools(server: McpServer): void {
  server.registerTool(
    "pudo.updateSessionHandoff",
    {
      description: "Replace the PUDO session handoff. Requires explicit write approval.",
      inputSchema: z.object({
        task: z.string().min(1),
        currentPhase: z.string().min(1),
        scope: z.string().min(1),
        filesInspected: z.array(z.string()).optional(),
        decisions: z.array(z.string()).optional(),
        assumptions: z.array(z.string()).optional(),
        testsRun: z.array(z.string()).optional(),
        remainingRisks: z.array(z.string()).optional(),
        nextAction: z.string().min(1),
        confirmWrite: z.boolean().optional()
      }),
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async (input) => jsonToolResult(updateSessionHandoff(input))
  );
}
