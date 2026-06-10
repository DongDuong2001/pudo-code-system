import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { jsonToolResult, loadPudoApi } from "./core.js";

export function diagnoseProject() {
  const findings = loadPudoApi().evaluateDoctor();
  return {
    healthy: !findings.some((finding) => finding.severity === "WARN"),
    findings
  };
}

export function registerDoctorTools(server: McpServer): void {
  server.registerTool(
    "pudo.doctor",
    {
      description: "Diagnose missing tests, ownership, release, and AI safety controls.",
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async () => jsonToolResult(diagnoseProject())
  );
}
