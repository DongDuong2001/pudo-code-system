# Starter Kits

Production-ready project foundations with integrated PUDO workflows, memory, and domain context.

## Purpose

Starter kits wrap stack templates with workflow defaults, memory seeds, and playbook entry points.

## Kits (Planned)

| Kit | Stack | Domain | Playbook |
| --- | --- | --- | --- |
| saas | Next.js | saas | launch-saas |
| rest-api | FastAPI / Express | — | build-mvp |
| mcp-server | TypeScript MCP | devtools | design-ai-product |

## Kit Structure

```text
starter-kits/{kit}/
├── README.md
├── kit.json
├── memory-seeds/
└── workflow-defaults.yaml
```

## Init (v3.1)

```bash
pudo init --kit=saas
```

Equivalent to:

```bash
pudo init --project=nextjs --domain=saas --memory --strictness=standard
```

## Related

- [Starter Kits Spec](../docs/devos/09-starter-kits.md)
- [Templates](../templates/README.md)
- [Playbooks](../playbooks/README.md)
