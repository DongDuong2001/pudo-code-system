import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v4";

export function registerPrompts(server: McpServer): void {
  server.registerPrompt(
    "pudo-init",
    {
      title: "PUDO: Initialize Operating Layer",
      description: "Guided wizard to scaffold PUDO agent rules, quality gates, and handoff files.",
      argsSchema: {
        project: z.string().optional().describe("Project tech stack (e.g. nextjs, react-vite, python-fastapi, rust, bun, generic)"),
        tools: z.string().optional().describe("Comma-separated AI tools (e.g. cursor,claude,windsurf,roo,gemini,codex)"),
        strictness: z.enum(["lite", "standard", "enterprise"]).optional().describe("Governance strictness level")
      }
    },
    async (args) => {
      const project = args.project || "generic";
      const tools = args.tools ? args.tools.split(",").map((t) => t.trim()) : undefined;
      const strictness = args.strictness || "standard";

      return {
        description: "Initialize PUDO Operating Layer in the current project repository.",
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: [
                "You are tasked with initializing the PUDO Operating Layer (Plan -> Understand -> Develop -> Optimize) in this workspace.",
                "",
                `Target Stack: ${project}`,
                `Strictness Level: ${strictness}`,
                tools ? `Selected AI Tools: ${tools.join(", ")}` : "AI Tools: All supported tools",
                "",
                "Please perform the following actions:",
                "1. If project was not explicitly provided or is generic, inspect repository files (package.json, Cargo.toml, go.mod, etc.) to detect the stack.",
                "2. Call tool `pudo.initProject` with the appropriate parameters to generate agent instructions (.cursor/rules, AGENTS.md, CLAUDE.md, etc.), PR templates, and .pudo/session.md.",
                "3. Call tool `pudo.validateAgentRules` and `pudo.scoreRepoReadiness` to verify that the generated operating layer is complete.",
                "4. Give the user a clear summary of the created rules and guidelines on how to begin the first Plan phase."
              ].join("\n")
            }
          }
        ]
      };
    }
  );

  server.registerPrompt(
    "pudo-plan",
    {
      title: "PUDO: Start Plan Phase",
      description: "Initiate the Plan phase for a new feature, bug fix, or refactor.",
      argsSchema: {
        task: z.string().describe("Description of the task or objective"),
        scope: z.string().optional().describe("Key boundaries and deliverables"),
        outOfScope: z.string().optional().describe("Explicit non-goals")
      }
    },
    async (args) => {
      return {
        description: "Execute PUDO Plan phase for the requested task.",
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: [
                "Begin the PUDO PLAN Phase for the following task:",
                "",
                `## Task Objective: ${args.task}`,
                args.scope ? `## Target Scope: ${args.scope}` : "",
                args.outOfScope ? `## Out of Scope: ${args.outOfScope}` : "",
                "",
                "Instructions for Agent:",
                "1. Define measurable success criteria, technical constraints, and potential risks.",
                "2. Break down the task into small, reviewable milestones.",
                "3. Outline which files will likely be inspected in the Understand phase.",
                "4. Check documented plan evidence by calling `pudo.runQualityGate` with gate: 'plan'.",
                "5. Present the implementation plan to the user for confirmation before touching any code."
              ].filter(Boolean).join("\n")
            }
          }
        ]
      };
    }
  );

  server.registerPrompt(
    "pudo-optimize",
    {
      title: "PUDO: Run Optimize & Release Audit",
      description: "Review code changes, run quality gates, and prepare handoff or release.",
      argsSchema: {
        summary: z.string().optional().describe("Summary of changes made during Develop phase")
      }
    },
    async (args) => {
      return {
        description: "Execute PUDO Optimize and Release Quality Gate audit.",
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: [
                "Begin the PUDO OPTIMIZE & RELEASE Phase:",
                "",
                args.summary ? `Summary of Develop Phase: ${args.summary}\n` : "",
                "Instructions for Agent:",
                "1. Self-review touched files: verify readability, edge cases, error handling, and backwards compatibility.",
                "2. Run all relevant tests, linters, and type checks. Document any skipped checks with explicit rationale.",
                "3. Call `pudo.runQualityGate` with gate: 'optimize' and gate: 'release'.",
                "4. Call `pudo.updateSessionHandoff` if context should be preserved for another session or teammate.",
                "5. Summarize what changed, how it was verified, and outline remaining risks or rollback strategy."
              ].join("\n")
            }
          }
        ]
      };
    }
  );
}
