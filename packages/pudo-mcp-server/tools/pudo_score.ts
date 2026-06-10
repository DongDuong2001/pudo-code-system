import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { jsonToolResult, loadPudoApi } from "./core.js";

export function scoreRepoReadiness() {
  return loadPudoApi().evaluateScore();
}

export function registerScoreTools(server: McpServer): void {
  server.registerTool(
    "pudo.scoreRepoReadiness",
    {
      description: "Score repository AI readiness using evidence-based PUDO rubrics.",
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async () => jsonToolResult(scoreRepoReadiness())
  );
}
