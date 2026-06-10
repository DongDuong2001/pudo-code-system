#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerCheckTools } from "../tools/pudo_check.js";
import { registerContextPackTools } from "../tools/pudo_context_pack.js";
import { registerDoctorTools } from "../tools/pudo_doctor.js";
import { registerInitTools } from "../tools/pudo_init.js";
import { registerQualityGateTools } from "../tools/pudo_quality_gate.js";
import { registerScoreTools } from "../tools/pudo_score.js";
import { registerSessionTools } from "../tools/pudo_session.js";
import { resolveProjectRoot } from "../tools/core.js";

const projectRoot = resolveProjectRoot();
process.chdir(projectRoot);

const server = new McpServer({
  name: "pudo-mcp-server",
  version: "0.1.0-alpha.1"
});

registerInitTools(server);
registerCheckTools(server);
registerScoreTools(server);
registerDoctorTools(server);
registerContextPackTools(server);
registerQualityGateTools(server);
registerSessionTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);

console.error(`PUDO MCP server connected for ${projectRoot}`);
