# Frequently Asked Questions

## General

### Is PUDO just waterfall with a new name?

No. Waterfall is linear: you finish one phase entirely before starting the next, and you never go back. PUDO is explicitly **cyclical and iterative** — you are expected to loop back to earlier phases when you discover new information. The phases are a compass, not a cage.

### Does PUDO work without AI?

Yes. The 4 phases (Plan, Understand, Develop, Optimize) are universal good practices. However, PUDO is **optimized** for AI-assisted workflows because:

- AI magnifies the cost of bad planning (it generates large amounts of off-target code fast)
- AI magnifies the value of good context (better prompts → better output)
- The explicit human/AI role separation helps you use AI effectively

### How is PUDO different from Agile/Scrum?

Different levels of abstraction:

| | Agile/Scrum | PUDO |
| --- | --- | --- |
| **Scope** | Team process | Individual task |
| **Unit of work** | Sprint (1–4 weeks) | Single task (minutes–days) |
| **Focus** | Project management | Coding methodology |
| **Artifacts** | User stories, backlogs | Plans, walkthroughs, prompts |

They're complementary. You can use PUDO inside each Agile task.

### Do I need to follow all 4 phases for every tiny change?

No. Scale the depth to the task:

- **Typo fix:** Plan (mentally, 5 seconds) → Develop (fix it) → Done
- **New feature:** Full written cycle with all 4 phases
- **Production bug:** Emphasize Understand and Optimize phases

The goal is **intention**, not bureaucracy.

### How is PUDO different from just writing a good prompt?

A good prompt is one output. PUDO is the system that produces good prompts *and* validates their output. The difference is the same as between "writing good code once" and "having a code review process." PUDO adds structure, quality gates, and measurement on top of the prompt itself.

### Is there evidence that PUDO actually reduces token waste?

There is one published measured case study in [benchmarks/results/stripe-webhook-2026-05](../benchmarks/results/stripe-webhook-2026-05/) showing reduced AI turns and token waste for a Stripe webhook integration task. The directional targets in the README (34% token waste reduction, 18% dev time reduction) are aspirational targets, not statistically validated benchmarks. More case studies are in progress.

---

## Workflow

### What if I'm in Develop and realize the plan was wrong?

Go back to Plan. This is the system working correctly. PUDO's value is in making these pivots **explicit** — you consciously decide to re-plan rather than patching around a flawed approach.

### How long should each phase take?

There's no fixed ratio. It depends on the task:

| Task Type | Plan | Understand | Develop | Optimize |
| --- | :---: | :---: | :---: | :---: |
| Greenfield feature | 20% | 10% | 50% | 20% |
| Legacy codebase change | 10% | 40% | 30% | 20% |
| Production bug fix | 10% | 40% | 30% | 20% |
| Refactoring | 15% | 25% | 30% | 30% |

### Can I do multiple PUDO cycles in parallel?

Yes, for independent tasks. For complex features, you'll often run **nested PUDO cycles** — one for the overall feature, and mini-cycles for each component. See the [scaling section](workflow.md#scaling-pudo) in the workflow doc.

### What happens if a quality gate fails?

A failed gate is not a failure of the process — it's the process working. When a gate fails:

1. Record what failed and why in `.pudo/session.md`
2. Decide whether to fix it now or accept the risk explicitly
3. If you accept the risk, document the reasoning in the PR
4. Never silently skip a gate — that turns PUDO back into ad hoc prompting

### How do I handle a production incident with PUDO?

Use PUDO Enterprise mode and weight the Understand phase heavily:

1. **Plan (brief):** What's broken, what's the blast radius, what's the rollback?
2. **Understand (thorough):** Read logs, trace the failure, identify root cause before touching code
3. **Develop (focused):** Smallest possible fix, with a feature flag if possible
4. **Optimize (mandatory):** Post-mortem, documentation, monitoring update

---

## AI Usage

### Which AI model works best with PUDO?

PUDO is model-agnostic. It works with:

- **ChatGPT** (GPT-4, GPT-4o)
- **Claude** (Sonnet, Opus)
- **Gemini** (Pro, Ultra)
- **GitHub Copilot**
- Any AI coding assistant

The methodology is about **how you interact** with AI, not which AI you use.

### Should I use PUDO prompts verbatim?

The [prompt library](../prompts/) provides starting points. You should:

1. **Start with the template** — Copy the prompt and fill in the variables
2. **Customize for your context** — Add project-specific details, constraints, and conventions
3. **Evolve your own variants** — Over time, build your personal prompt library based on what works

### Can I use PUDO with multiple AI tools in the same cycle?

Absolutely. You might use:

- **Copilot** for inline code completion in Develop
- **Claude** for architecture analysis in Understand
- **ChatGPT** for drafting documentation in Optimize

PUDO structures your workflow, not your toolchain.

### The AI keeps going off-plan. How do I stop it?

This is the most common source of scope creep in AI-assisted development. Fixes:

1. **Be more explicit in the Plan prompt** — List what is explicitly out of scope
2. **Use the Develop phase prompt** — It includes an instruction to flag deviations instead of implementing them
3. **Use shorter turns** — Ask for one sub-task at a time instead of the full implementation
4. **Run `pudo score --strict`** — Failing the score check forces a scope review before merge

---

## Getting Started

### What's the fastest way to try PUDO?

1. Pick your next coding task
2. Before writing code, spend 5 minutes in **Plan**: write down what you're building and why
3. Spend 5 minutes in **Understand**: look at the existing code your change will touch
4. Then **Develop** with a checklist
5. After it works, spend 5 minutes in **Optimize**: review your own code before calling it done

That's it. You've done your first PUDO cycle. See [Getting Started](getting-started.md) for a full walkthrough.

### I keep skipping the Plan phase. Help.

This is the most common struggle. Try this: **make your AI assistant create the plan.** Open your AI tool and say:

```text
Before I write any code, help me plan this task:
[describe the task]

Create an implementation plan with:
- Scope and constraints
- Key technical decisions
- Risks and unknowns
- Success criteria
```

Let the AI do the work of planning — you just review and approve. This takes 2 minutes and saves 20.

### How do I convince my team to adopt PUDO?

Start with one person and one task. Measure the outcome (turns, tokens, bugs found in review). Share the result with the team. Then use the [Team Adoption Guide](team-adoption-guide.md) for a structured rollout.

Trying to mandate methodology top-down without evidence rarely works. One concrete case study from inside your own codebase is more convincing than any external benchmark.

---

## MCP Server

### What is the PUDO MCP server?

The MCP server (`packages/pudo-mcp-server`) exposes PUDO operations as callable tools via the [Model Context Protocol](https://modelcontextprotocol.io/). Compatible agents (like Claude with MCP support) can call `pudo.scoreRepoReadiness`, `pudo.runQualityGate`, and other tools directly without the developer needing to run CLI commands manually.

### Is the MCP server production-ready?

Not yet. It is labeled `0.1.0-alpha.1`. The alpha version uses local stdio transport only — no network exposure. Remote transport (HTTP + authentication) is planned for v1.4. It is suitable for local development use; do not expose it as a networked service with the current version.

### How do I set up the MCP server?

See [docs/mcp.md](mcp.md) for full setup instructions.

Quick start:

```bash
npx @dongduong2001/mcp-server@alpha
```

---

## Contributing

### How do I add a new prompt?

See [CONTRIBUTING.md](../CONTRIBUTING.md#add-a-new-prompt) for the full process, including the required template format and testing expectations.

### How do I submit a benchmark case study?

See [CONTRIBUTING.md](../CONTRIBUTING.md#add-a-benchmark-case-study) for the template and submission process. Measured case studies from real codebases are the highest-value contributions to the project.

### I found a security issue. What do I do?

See [SECURITY.md](../SECURITY.md) for the responsible disclosure process. Do not open a public issue.
