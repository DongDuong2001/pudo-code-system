# Playbooks

Complete business outcome workflows for the PUDO AI DevOS.

## Purpose

Playbooks compose multiple workflows, skills, templates, and starter kits to achieve a specific business goal — not just a code change.

## Available Playbooks

| Playbook | Outcome | Duration |
| --- | --- | --- |
| [build-mvp](build-mvp.md) | Working MVP | 2-4 weeks |
| [launch-saas](launch-saas.md) | Production SaaS | 4-8 weeks |
| [deploy-production](deploy-production.md) | First production deploy | 1-2 weeks |
| [security-hardening](security-hardening.md) | Security audit + fixes | 1-2 weeks |
| [backend](backend/README.md) | Backend engineering guides | Continuous |
| [system-design](system-design/README.md) | System design templates | Continuous |
| [database](database/README.md) | Database optimization playbooks | Continuous |

## Playbook vs Workflow

| | Workflow | Playbook |
| --- | --- | --- |
| Scope | Single process | Business outcome |
| Example | Feature delivery | Launch SaaS |

## Usage

1. Select playbook matching your goal
2. Follow phases in order
3. Update `.pudo/memory/` at phase boundaries
4. Emit run traces for Enterprise mode

## Related

- [Playbooks Spec](../docs/devos/10-playbooks.md)
- [Workflows](../workflows/README.md)
- [Starter Kits](../starter-kits/README.md)
