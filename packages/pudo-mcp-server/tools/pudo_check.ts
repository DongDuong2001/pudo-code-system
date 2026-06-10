import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { jsonToolResult, loadPudoApi } from "./core.js";

export function validateAgentRules() {
  const checks = loadPudoApi().evaluateProject();
  return {
    passed: checks.every((check) => check.pass),
    checks
  };
}

export function registerCheckTools(server: McpServer): void {
  server.registerTool(
    "pudo.validateAgentRules",
    {
      description: "Validate required PUDO workflow and agent instruction files.",
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async () => jsonToolResult(validateAgentRules())
  );
}
