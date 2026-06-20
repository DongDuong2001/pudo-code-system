# Context System

Reusable domain context packs for the PUDO AI DevOS.

## Purpose

Provide industry and product-type knowledge as read-only overlays. Loaded when `.pudo/config.json` declares a domain.

## Domains

| Domain | File | Use For |
| --- | --- | --- |
| SaaS | `domains/saas.md` | Multi-tenant products, subscriptions |
| FinTech | `domains/fintech.md` | Payments, compliance |
| Developer Tools | `domains/devtools.md` | CLIs, SDKs, developer experience |
| AI Products | `domains/ai-products.md` | LLM apps, agents, RAG |

## Configuration

```json
{
  "domain": "saas",
  "context_domains": ["saas"]
}
```

Set via `pudo init --domain=saas` (v3.1).

## Loading Order

1. Kernel rules (`AGENTS.md`)
2. Domain context (this module)
3. Project memory (`.pudo/memory/`)
4. Workflow + skill

## Related

- [Context System Spec](../docs/devos/06-context-system.md)
- [Context Engineering](../docs/context-engineering.md)
