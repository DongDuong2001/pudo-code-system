# Network Troubleshooting
> Phase: Optimize, Tags: #debugging #network #cloud

## Context
Use this prompt to debug connectivity, latency, and TLS/DNS issues.

## Variables
- `{{error_message}}`: The exact network error (e.g., ECONNRESET, 502 Bad Gateway).
- `{{infrastructure}}`: AWS, Kubernetes, Docker, Localhost.

## Prompt
Act as a Network/SRE Engineer. I'm receiving this network error: `{{error_message}}` on my infrastructure running in {{infrastructure}}.

Please help me troubleshoot by providing:
1. The definition of this error and the OSI layer it occurs at.
2. A checklist of 3-5 possible root causes.
3. Command-line tools (curl, ping, traceroute, nslookup) and example commands I should run to isolate the issue.

## Example Usage
**Input:** I'm receiving this network error: `504 Gateway Timeout` on my infrastructure running in Kubernetes.
