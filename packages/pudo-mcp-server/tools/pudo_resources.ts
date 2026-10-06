import fs from "node:fs";
import path from "node:path";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { resolveProjectRoot, findPudoPackageRoot } from "./core.js";
import { listPlaybooks } from "./pudo_init.js";

export function registerResources(server: McpServer): void {
  server.registerResource(
    "pudo-current-rules",
    "pudo://rules/current",
    {
      description: "Current workspace PUDO agent rules and directives",
      mimeType: "text/markdown"
    },
    async (uri) => {
      const root = resolveProjectRoot();
      const candidateFiles = ["AGENTS.md", "CLAUDE.md", "GEMINI.md", ".cursor/rules/pudo-core.mdc"];
      const contents: string[] = [];

      for (const rel of candidateFiles) {
        const full = path.join(root, rel);
        if (fs.existsSync(full)) {
          contents.push(`\n<!-- File: ${rel} -->\n${fs.readFileSync(full, "utf8")}`);
        }
      }

      const text = contents.length > 0
        ? contents.join("\n---\n")
        : "# PUDO Rules\n\nNo agent rule files found. Run `pudo.initProject` to initialize.";

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/markdown",
            text
          }
        ]
      };
    }
  );

  server.registerResource(
    "pudo-session-handoff",
    "pudo://session/handoff",
    {
      description: "Current PUDO session handoff file (.pudo/session.md)",
      mimeType: "text/markdown"
    },
    async (uri) => {
      const root = resolveProjectRoot();
      const sessionPath = path.join(root, ".pudo", "session.md");
      const text = fs.existsSync(sessionPath)
        ? fs.readFileSync(sessionPath, "utf8")
        : "# PUDO Session Handoff\n\nNo active session handoff found.";

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/markdown",
            text
          }
        ]
      };
    }
  );

  server.registerResource(
    "pudo-playbooks-catalog",
    "pudo://playbooks/catalog",
    {
      description: "Catalog of available engineering, database, and system-design playbooks",
      mimeType: "application/json"
    },
    async (uri) => {
      const playbooks = listPlaybooks();
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(playbooks, null, 2)
          }
        ]
      };
    }
  );
}
