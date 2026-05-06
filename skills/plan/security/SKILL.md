---
name: security-plan
description: Threat modeling, compliance, and secure by design architecture
---

# Security Planning Skill

This skill is focused on ensuring systems are resilient against attacks and inherently protect user data.

## When to use this skill
- When performing Threat Modeling (STRIDE) for new features.
- When planning Authentication, Authorization, and Session Management.
- When adhering to compliance requirements (GDPR, HIPAA, SOC2).

## Guidelines
- **Principle of Least Privilege:** Services and users should only have the bare minimum access permissions they need.
- **Defense in Depth:** Do not rely on a single defensive mechanism. Validate inputs at the client, the API edge, and the database boundary.
- **Secret Management:** Never hardcode secrets. Plan to use KMS, HashiCorp Vault, or environment-injected managed identities.
