# Support

## Getting Help

### Documentation

Start with the docs — most questions are answered there:

- [Getting Started](docs/getting-started.md) — First steps and the 5-minute PUDO cycle
- [Workflow Guide](docs/workflow.md) — Deep-dive into each phase
- [FAQ](docs/faq.md) — Frequently asked questions
- [PUDO Modes](docs/pudo-modes.md) — Choosing the right mode for your task
- [Team Adoption Guide](docs/team-adoption-guide.md) — Rolling out PUDO across a team

### GitHub Discussions

For questions, ideas, and community help: [GitHub Discussions](../../discussions)

This is the right place for:

- Questions about how to use PUDO for a specific scenario
- Sharing your benchmark results or case studies
- Proposing new prompts or features before building them
- General discussion about AI-assisted development methodology

### GitHub Issues

For bug reports and clear feature requests: [GitHub Issues](../../issues/new/choose)

Use the provided templates:

- **Bug report** — Something in the CLI, MCP server, or docs is broken
- **Feature request** — A specific improvement to the tools or methodology

### Security Vulnerabilities

**Do not open a public issue.** See [SECURITY.md](SECURITY.md) for the responsible disclosure process.

---

## Known Limitations

Before opening an issue, check whether your situation is a known limitation:

- PUDO does not guarantee AI output is correct — human review is always required
- The MCP server is in alpha (`0.1.0-alpha.1`) and uses local stdio only; remote transport is planned for v1.4
- Measurement targets are directional, based on one public case study; your mileage will vary
- The method requires discipline — skipping gates reduces its effectiveness

---

## How to Ask a Good Question

When asking for help, include:

1. **What you were trying to do** — the task, the tool, the command
2. **What you expected to happen**
3. **What actually happened** — error messages, unexpected output
4. **Your environment** — OS, Node.js version, tool name and version (e.g., Cursor 0.49, Claude Code 1.x)
5. **What you already tried**

The more specific you are, the faster you'll get a useful answer.

---

## Response Times

| Channel | Expected Response |
| --- | --- |
| GitHub Discussions | A few days |
| GitHub Issues (bug) | Within a week |
| Security report | 48-hour acknowledgment, 5-day initial assessment |

PUDO is maintained by a small team. Response times may vary. If you haven't heard back in two weeks, add a comment to your thread.

---

## Contributing

If you found a solution to a problem, consider contributing it back. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add prompts, examples, and documentation improvements.
