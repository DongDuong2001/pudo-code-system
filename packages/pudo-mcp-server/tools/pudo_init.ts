import fs from "node:fs";
import path from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v4";
import {
  jsonToolResult,
  loadPudoApi,
  requireWriteApproval,
  findPudoPackageRoot,
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
  const dryRun = input.dryRun === true; // Default dryRun to false, so it auto-writes!
  if (!dryRun) {
    // If confirmWrite is explicitly set to false, require approval. Otherwise, default to true for automatic installation!
    if (input.confirmWrite === false) {
      requireWriteApproval(input.confirmWrite);
    }
  }

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

function getPlaybooksRecursively(dir: string, baseDir: string): Array<{ name: string; path: string }> {
  let results: Array<{ name: string; path: string }> = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getPlaybooksRecursively(filePath, baseDir));
    } else if (file.endsWith(".md")) {
      const relativePath = path.relative(baseDir, filePath).replaceAll("\\", "/");
      let title = file;
      try {
        const content = fs.readFileSync(filePath, "utf8");
        const match = content.match(/^#\s+(.+)$/m);
        if (match) {
          title = match[1].trim();
        }
      } catch {
        // Fall back to filename
      }
      results.push({
        name: title,
        path: relativePath
      });
    }
  }
  return results;
}

export function listPlaybooks() {
  const packageRoot = findPudoPackageRoot();
  const playbooksDir = path.join(packageRoot, "playbooks");
  const playbooks = getPlaybooksRecursively(playbooksDir, playbooksDir);
  return { playbooks };
}

export function getPlaybook(input: { path: string }) {
  const packageRoot = findPudoPackageRoot();
  const playbooksDir = path.join(packageRoot, "playbooks");
  const target = path.resolve(playbooksDir, input.path);
  const relative = path.relative(playbooksDir, target);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Path escapes playbooks boundary: ${input.path}`);
  }

  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
    throw new Error(`Playbook not found: ${input.path}`);
  }

  const content = fs.readFileSync(target, "utf8");
  return { path: input.path, content };
}

export function getInitOptions() {
  const api = loadPudoApi();
  return {
    tools: api.TOOL_NAMES,
    projects: api.PROJECT_TYPES,
    strictness: ["lite", "standard", "enterprise"]
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

  server.registerTool(
    "pudo.getInitOptions",
    {
      description: "Get lists of supported tools, project types (stacks), and strictness levels to initialize a PUDO project.",
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async () => jsonToolResult(getInitOptions())
  );

  server.registerTool(
    "pudo.listPlaybooks",
    {
      description: "List all available business and engineering playbooks (e.g. build-mvp, launch-saas, backend, database, system-design).",
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async () => jsonToolResult(listPlaybooks())
  );

  server.registerTool(
    "pudo.getPlaybook",
    {
      description: "Retrieve the full content of a specific playbook to guide development.",
      inputSchema: z.object({
        path: z.string().describe("Relative path to the playbook file, e.g. 'build-mvp.md' or 'backend/api-security.md'")
      }),
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async (input) => jsonToolResult(getPlaybook(input))
  );
}
