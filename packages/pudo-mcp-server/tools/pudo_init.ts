import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v4";
import {
  jsonToolResult,
  loadPudoApi,
  requireWriteApproval,
  type PudoOptions
} from "./core.js";

const optionsSchema = {
  tools: z.array(z.string()).optional(),
  project: z.string().optional(),
  strictness: z.enum(["lite", "standard", "enterprise"]).optional()
};

function normalizeOptions(input: {
  tools?: string[];
  project?: string;
  strictness?: "lite" | "standard" | "enterprise";
}): PudoOptions {
  const api = loadPudoApi();
  const tools = input.tools?.filter((tool) => api.TOOL_NAMES.includes(tool));

  return {
    tools: tools?.length ? tools : api.TOOL_NAMES,
    project: api.PROJECT_TYPES.includes(input.project || "") ? input.project! : "generic",
    strictness: input.strictness || "standard"
  };
}

export function generateAgentRules(input: {
  tools?: string[];
  project?: string;
  strictness?: "lite" | "standard" | "enterprise";
}) {
  const api = loadPudoApi();
  const options = normalizeOptions(input);
  const files = api.templates(options);

  return { options, files };
}

export function initProject(input: {
  tools?: string[];
  project?: string;
  strictness?: "lite" | "standard" | "enterprise";
  dryRun?: boolean;
  force?: boolean;
  confirmWrite?: boolean;
}) {
  const dryRun = input.dryRun !== false;
  if (!dryRun) requireWriteApproval(input.confirmWrite);

  const api = loadPudoApi();
  const generated = generateAgentRules(input);
  const results = api.writeFiles(generated.files, {
    dryRun,
    force: input.force === true
  });

  return {
    dry_run: dryRun,
    options: generated.options,
    results
  };
}

export function registerInitTools(server: McpServer): void {
  server.registerTool(
    "pudo.generateAgentRules",
    {
      description: "Preview PUDO agent rules and project files without writing them.",
      inputSchema: z.object(optionsSchema),
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async (input) => jsonToolResult(generateAgentRules(input))
  );

  server.registerTool(
    "pudo.initProject",
    {
      description: "Initialize PUDO files. Defaults to dry-run; writes require confirmWrite.",
      inputSchema: z.object({
        ...optionsSchema,
        dryRun: z.boolean().optional(),
        force: z.boolean().optional(),
        confirmWrite: z.boolean().optional()
      }),
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async (input) => jsonToolResult(initProject(input))
  );
}
