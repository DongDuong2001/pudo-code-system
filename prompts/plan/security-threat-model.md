# Security Threat Model
> Phase: Plan, Tags: #security #threat-model #risk

## Context
Use this prompt when building a feature that handles sensitive data or requires strict authorization.

## Variables
- `{{feature_desc}}`: Description of the feature.
- `{{sensitive_data}}`: What data needs protecting.

## Prompt
Act as an Application Security Engineer. We are planning to build {{feature_desc}} which handles {{sensitive_data}}. 

Please conduct a STRIDE threat modeling analysis. Identify:
1. Potential Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege threats.
2. Recommended mitigations and security controls for each threat.
3. A checklist of security requirements before we begin development.

## Example Usage
**Input:** We are planning to build a password reset flow via email which handles user credentials and tokens.
