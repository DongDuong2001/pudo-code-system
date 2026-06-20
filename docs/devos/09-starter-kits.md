# 9. Starter Kits

## Purpose

Starter kits are **production-ready project foundations** that integrate PUDO workflows, memory, governance, and stack-specific templates from day one.

## Relationship to Templates

| Layer | Location | Contains |
| --- | --- | --- |
| **Stack template** | `templates/{stack}/` | AGENTS.md overlay, stack notes |
| **Starter kit** | `starter-kits/{kit}/` | Template + workflow hooks + memory seeds + playbook entry |

```text
starter-kits/saas/
├── README.md                 # Setup instructions
├── kit.json                  # Metadata, dependencies, init flags
├── memory-seeds/             # Pre-filled memory templates
├── workflow-defaults.yaml    # Default workflows for this kit
└── references/
    └── templates/nextjs/     # Links to stack template
```

## Starter Kit Registry

| Kit | Stack Base | Primary Playbook | Target User |
| --- | --- | --- | --- |
| SaaS | Next.js + Node | launch-saas | Startup teams |
| REST API | Node Express / FastAPI | build-mvp | Backend devs |
| GraphQL API | Node + Apollo | build-mvp | API-first products |
| MCP Server | TypeScript MCP SDK | design-ai-product | Agent tooling |
| AI Chatbot | Next.js + LLM | design-ai-product | AI products |
| AI Agent | LangGraph adapter (v4) | design-ai-product | Agent builders |
| Landing Page | React Vite | build-mvp | Solo devs |
| Portfolio | React Vite | build-mvp | Freelancers |
| CMS | Next.js | build-internal-tool | Content teams |
| CLI | Node | build-mvp | Tool developers |
| Mobile App | React Native | build-mvp | Mobile devs |
| Admin Panel | Next.js | build-internal-tool | Internal tools |
| Browser Extension | MV3 scaffold | build-mvp | Extension devs |
| Microservices | Go API template | scale-infrastructure | SMB teams |

## Kit Metadata Schema (`kit.json`)

```json
{
  "id": "saas",
  "name": "SaaS Starter",
  "version": "1.0.0",
  "stack": ["nextjs", "node-express"],
  "domain": "saas",
  "strictness_default": "standard",
  "workflows": ["lifecycle/feature-delivery", "lifecycle/idea-to-mvp"],
  "playbook": "launch-saas",
  "memory_seeds": ["project.md", "tech-stack.md", "roadmap.md"],
  "governance_profile": "standard"
}
```

## Init Integration (v3.1)

```bash
pudo init --kit=saas
# Equivalent to:
pudo init --project=nextjs --domain=saas --memory --strictness=standard
```

## Workflow Integration

Each kit declares default workflows:

- **On feature request** → `feature-delivery`
- **On new project** → playbook entry workflow
- **On production bug** → `incident-response`

Agents read `workflow-defaults.yaml` from kit or `.pudo/config.json`.

## Existing Templates → Kit Mapping

| Existing Template | Starter Kit |
| --- | --- |
| `templates/nextjs/` | `starter-kits/saas/`, `starter-kits/admin-panel/` |
| `templates/python-fastapi/` | `starter-kits/rest-api/` |
| `templates/go-api/` | `starter-kits/microservices/` |
| `templates/mobile-react-native/` | `starter-kits/mobile-app/` |
| `templates/mcp/` policy | `starter-kits/mcp-server/` |

**No breaking change:** `--project=nextjs` continues to work; `--kit=` is additive.

## Quality Requirements for Kits

- [ ] README with 5-minute quick start
- [ ] Passes `pudo check` after init
- [ ] Score ≥ 70 on fresh init (standard strictness)
- [ ] At least one example walkthrough reference
- [ ] Memory seeds are non-empty scaffolds, not lorem ipsum

## Justification

Templates alone lack workflow and memory integration. Starter kits answer "how do I start a SaaS with PUDO?" in one command.
