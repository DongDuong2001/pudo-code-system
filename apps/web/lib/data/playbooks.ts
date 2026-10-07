export interface DocArticle {
  slug: string;
  category: "Getting Started" | "AI Engineering" | "DevOS System Architecture";
  title: string;
  summary: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const DOC_ARTICLES: DocArticle[] = [
  {
    slug: "quickstart",
    category: "Getting Started",
    title: "PUDO Quickstart Guide",
    summary: "Initialize your repository with standardized AI agent instructions and quality gates in under 60 seconds.",
    readTime: "3 min read",
    tags: ["CLI", "Init", "Setup"],
    content: `# Quickstart: Initialize PUDO in Your Repository

PUDO (**Plan -> Understand -> Develop -> Optimize**) creates a disciplined operating environment for autonomous and copilot coding agents.

## 1. Zero-Install Initialization

Run the initialization wizard using \`npx\` or your preferred package manager:

\`\`\`bash
# Interactive setup wizard with stack auto-detection
npx @dongduong2001/pudo-code-system init

# Or accept detected defaults immediately
npx @dongduong2001/pudo-code-system init --yes
\`\`\`

## 2. What Gets Generated

When you initialize a project, PUDO generates:

1. **Primary Agent Ruleset:**
   - \`AGENTS.md\` (for Codex / universal agents)
   - \`.cursorrules\` (for Cursor IDE)
   - \`.windsurfrules\` (for Windsurf Cascade)
   - \`.clinerules\` (for Roo Code / Cline)
   - \`CLAUDE.md\` (for Claude Code CLI)
2. **Context Configuration (\`.pudo/config.json\`):**
   - Declares the project language, framework stack, strictness level, and rule file paths.
3. **Session Handoff (\`.pudo/session.md\`):**
   - Provides a scratchpad for AI agents to pass context between sessions without losing progress.
4. **Pull Request Quality Template (\`.github/pull_request_template.md\`):**
   - Enforces scope declarations, verification logs, and AI safety criteria on every pull request.

## 3. Verify Repository Health

Run the built-in checker to verify compliance:

\`\`\`bash
npx @dongduong2001/pudo-code-system check
\`\`\`

Audit repository readiness against our 100-point rubric:

\`\`\`bash
npx @dongduong2001/pudo-code-system score
\`\`\`
`,
  },
  {
    slug: "mcp-server-guide",
    category: "Getting Started",
    title: "MCP Server Integration Guide",
    summary: "Connect Claude Desktop, Cursor, and Windsurf to PUDO via Model Context Protocol stdio transport.",
    readTime: "5 min read",
    tags: ["MCP", "Cursor", "Claude", "Windsurf"],
    content: `# Model Context Protocol (MCP) Server Guide

The PUDO MCP Server connects LLM agents directly to repository health checks, rule initializers, and engineering playbooks.

## Supported Capabilities

- **Interactive Prompts:**
  - \`pudo-init\`: Interactive wizard helping users select stacks, target tools, and dry-run file creation.
  - \`pudo-plan\`: Formulate structured scope, risks, and acceptance criteria before writing code.
  - \`pudo-optimize\`: Enforce quality checklists and atomic commit conventions.
- **Protocol Resources:**
  - \`pudo://rules/current\`: Read the active agent instructions file.
  - \`pudo://session/handoff\`: Read active multi-agent handoff state.
  - \`pudo://playbooks/catalog\`: Discover and search built-in engineering playbooks.
- **Tools:**
  - \`pudo_init_project\`: Create agent rule files with approval gates.
  - \`pudo_run_quality_gate\`: Run repository linters and test suites.
  - \`pudo_get_context_pack\`: Generate sanitized context bundles for LLMs.
  - \`pudo_score_readiness\`: Evidence-based 100-point repository audit.

---

## Editor Configuration

### Claude Desktop
Add to your \`claude_desktop_config.json\`:

\`\`\`json
{
  "mcpServers": {
    "pudo": {
      "command": "npx",
      "args": ["-y", "@dongduong2001/mcp-server@latest"]
    }
  }
}
\`\`\`

### Cursor IDE
Configure in **Settings > Features > MCP**:
- **Name:** \`pudo\`
- **Type:** \`command\`
- **Command:** \`npx -y @dongduong2001/mcp-server@latest\`

### Windsurf Cascade
Add to your \`~/.codeium/windsurf/mcp_config.json\`:

\`\`\`json
{
  "mcpServers": {
    "pudo": {
      "command": "npx",
      "args": ["-y", "@dongduong2001/mcp-server@latest"]
    }
  }
}
\`\`\`
`,
  },
  {
    slug: "llm-app-architecture",
    category: "AI Engineering",
    title: "LLM Application Architecture Playbook",
    summary: "Production-grade, observable architecture featuring hybrid RAG, structured decoding, prompt caching, and evaluation.",
    readTime: "8 min read",
    tags: ["RAG", "LLM", "Prompt Caching", "Eval"],
    content: `# LLM Application Architecture Playbook

## Production Architecture Blueprint

\`\`\`text
[ Client Query ]
       │
       ▼
[ Guardrail & Input Sanitizer ] ──(Invalid)──> [ Fast Rejection / 400 ]
       │
       ▼
[ Semantic Cache (Redis) ] ──(Cache Hit)──> [ Cached Response ]
       │ (Cache Miss)
       ▼
[ Query Rewriter & Hybrid Search ]
       ├─ Dense Vector Search (HNSW / Cosine)
       └─ Sparse Keyword Search (BM25)
       │
       ▼
[ Cross-Encoder Re-Ranker ] (Top K: 20 → 5)
       │
       ▼
[ Context Assembler & Token Budget Gate ]
       │
       ▼
[ LLM Inference Engine ] (Streaming / Structured Outputs)
       │
       ▼
[ Schema Validator (Zod / Pydantic) ]
       ├─ Valid   ──> [ Stream Response & Cache Write ]
       └─ Invalid ──> [ Retry / Fallback Handler ]
\`\`\`

---

## Core Pillars & Best Practices

### 1. Hybrid Search & Retrieval (RAG)
1. **Never rely on pure vector search:** Dense embeddings capture semantic similarity but miss exact product IDs, error codes, and UUIDs. Always combine BM25 and vector embeddings using **Reciprocal Rank Fusion (RRF)**.
2. **Re-Ranking is mandatory:** Dense retrieval should cast a wide net ($K \\approx 20\\text{--}50$), followed by a cross-encoder re-ranker to distill down to the top $3\\text{--}5$ most relevant chunks.
3. **Hierarchical Chunking:** Store parent chunks for context with child chunks for indexing to preserve surrounding context without token bloat.

### 2. Output Contracts & Determinism
1. **Structured Outputs over Free-Form Text:** Always prefer native JSON Schema / constrained decoding (e.g., OpenAI Structured Outputs, Anthropic Tool Use, Pydantic / Zod schemas).
2. **Deterministic Retries:** If schema validation fails, feed the validation error back to the model with an exponential backoff retry budget (max 2 retries).

### 3. Prompt Caching & Cost Optimization
1. **Prefix Invariance:** Keep static system instructions and few-shot examples at the beginning of the prompt. Dynamic user input should always go at the very end to maximize KV-cache hits.
2. **Model Tier Routing:** Route simple classification/extraction tasks to lightweight fast models (e.g. Claude 3.5 Haiku, GPT-4o-mini), saving frontier models for complex multi-step reasoning.
`,
  },
  {
    slug: "multi-agent-orchestration",
    category: "AI Engineering",
    title: "Multi-Agent Orchestration Playbook",
    summary: "Production patterns for hierarchical multi-agent teams, state isolation, handoff contracts, and infinite loop prevention.",
    readTime: "9 min read",
    tags: ["Multi-Agent", "Handoff", "Supervisor", "State"],
    content: `# Multi-Agent Orchestration Playbook

## Architectural Pattern: Hierarchical Supervisory Mesh

\`\`\`text
                  [ User / System Goal ]
                            │
                            ▼
               [ Primary Orchestrator Agent ]
               (State & Task Graph Manager)
               ┌────────────┼────────────┐
               ▼            ▼            ▼
        [ Research Agent ] [ Coder Agent ] [ Tester Agent ]
        (Read-Only Tools)  (Write & Patch)  (CI & Quality)
               └────────────┬────────────┘
                            ▼
              [ Shared State / Handoff Store ]
               (Context Window Isolator)
\`\`\`

---

## Production Rules of Engagement

### 1. The Single-Responsibility Principle for Agents
- Never give one agent write permissions to both implementation code and test suites.
- Separate **Code Authors** from **Code Reviewers** to eliminate confirmation bias in autonomous self-evaluation.

### 2. State Isolation & Window Conservation
- Do **NOT** pass the entire chat history between subagents.
- Each subagent should receive only a structured **Handoff Contract**:
  - \`Goal\`: Concrete objective to achieve.
  - \`Preconditions\`: Known file paths, schemas, and dependencies.
  - \`Constraints\`: What must NOT be touched.
  - \`Expected Output\`: Structured return payload or diff summary.

### 3. Loop Guards & Execution Budgets
- Enforce strict iteration bounds (e.g., max 15 tool calls per subagent turn).
- Implement fingerprinting of repeated tool arguments. If an agent executes identical tool calls with identical arguments twice in a row, interrupt the agent loop and prompt for human re-planning.

### 4. Human-in-the-Loop Escalation
- Any irreversible action (database drop, cloud resource deletion, production deployment) must trigger a suspended state requiring an explicit approval signature.
`,
  },
  {
    slug: "database-design-guide",
    category: "DevOS System Architecture",
    title: "Database Design & Indexing Playbook",
    summary: "High-performance schema modeling, compound indexing strategies, migration zero-downtime rules, and transaction safety.",
    readTime: "7 min read",
    tags: ["Database", "PostgreSQL", "Indexing", "Migrations"],
    content: `# Database Design & Indexing Playbook

## 1. Indexing Strategy & Performance

### The B-Tree Leftmost Prefix Rule
Compound indexes \`(tenant_id, status, created_at)\` can only accelerate queries filtering from the leftmost column:
- \`WHERE tenant_id = ?\` ✅
- \`WHERE tenant_id = ? AND status = ?\` ✅
- \`WHERE status = ?\` ❌ (Requires full index scan)

### Partial Indexes for High Cardinality
Avoid indexing millions of archived or inactive rows. Use partial indexes:

\`\`\`sql
CREATE INDEX idx_orders_unfulfilled 
ON orders (tenant_id, created_at) 
WHERE status = 'pending';
\`\`\`

---

## 2. Zero-Downtime Migration Rules

1. **Never rename columns in-place:** Use the expand-contract pattern:
   - Phase 1: Add new column \`new_col\`.
   - Phase 2: Dual-write to both \`old_col\` and \`new_col\`.
   - Phase 3: Backfill historical rows.
   - Phase 4: Switch readers to \`new_col\`.
   - Phase 5: Drop \`old_col\`.
2. **Add columns with safe defaults:** In modern PostgreSQL (11+), adding a column with a default value does not rewrite the table, but always verify constraints with \`NOT NULL\` are added concurrently.
`,
  },
  {
    slug: "microservices-architecture",
    category: "DevOS System Architecture",
    title: "Microservices Architecture Playbook",
    summary: "Service boundary decomposition, distributed transactions with Saga, idempotency keys, and resilient communication.",
    readTime: "8 min read",
    tags: ["Microservices", "Saga", "Idempotency", "Resilience"],
    content: `# Microservices Architecture Playbook

## 1. Boundary Decomposition (Domain-Driven Design)
- Decompose services around **Bounded Contexts**, not database tables.
- A service must own its private datastore. Never share database connections across distinct microservice boundaries.

---

## 2. Distributed Transactions: The Saga Pattern
- Avoid two-phase commits (2PC) in distributed cloud environments.
- Use **Orchestrated Sagas** for complex business flows:
  - Each step has a forward compensating transaction (rollback).
  - If step 3 fails, the orchestrator triggers compensating actions for steps 2 and 1 in reverse order.

---

## 3. Idempotency & Exactly-Once Semantics
- Every mutating HTTP endpoint (\`POST /orders\`) must require an \`Idempotency-Key\` header.
- Store the key and the resulting response in Redis/PostgreSQL within a transactional boundary.
`,
  },
  {
    slug: "security-architecture",
    category: "DevOS System Architecture",
    title: "Security & Zero-Trust Architecture Playbook",
    summary: "OWASP API Top 10 mitigation, secret management, defense-in-depth, and AI prompt injection guardrails.",
    readTime: "6 min read",
    tags: ["Security", "Zero-Trust", "OWASP", "AI Safety"],
    content: `# Security & Zero-Trust Architecture Playbook

## 1. AI Safety & Prompt Injection Mitigation
- Treat all LLM inputs and retrieved external context as untrusted user data.
- **Indirect Prompt Injection:** Isolate retrieved data inside clearly marked structural XML/JSON tags:
  \`\`\`text
  <context_boundary>
  {{ retrieved_chunks }}
  </context_boundary>
  \`\`\`
- Instruct the model that instructions inside \`<context_boundary>\` must NEVER be interpreted as system commands.

---

## 2. Secret Hygiene & Secret Rotation
- Never commit secrets to source code.
- PUDO context packs automatically exclude \`.env*\`, \`*.pem\`, \`id_rsa\`, and known credential paths.
`,
  },
];
