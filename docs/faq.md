# Frequently Asked Questions

## General

### Is PUDO just waterfall with a new name?

No. Waterfall is linear: you finish one phase entirely before starting the next, and you don't go back. PUDO is explicitly **cyclical and iterative** — you're expected to loop back to earlier phases when you discover new information. The phases are a compass, not a cage.

### Does PUDO work without AI?

Yes. The 4 phases (Plan, Understand, Develop, Optimize) are universal good practices. However, PUDO is **optimized** for AI-assisted workflows because:

- AI magnifies the cost of bad planning (it generates large amounts of off-target code fast)
- AI magnifies the value of good context (better prompts → better output)
- The explicit human/AI role separation helps you use AI effectively

### How is PUDO different from Agile/Scrum?

Different levels of abstraction:

| | Agile/Scrum | PUDO |
|---|---|---|
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

---

## Workflow

### What if I'm in Develop and realize the plan was wrong?

Go back to Plan. This is the system working correctly. PUDO's power is in making these pivots **explicit** — you consciously decide to re-plan rather than patching around a flawed approach.

### How long should each phase take?

There's no fixed ratio. It depends on the task:

| Task Type | Plan | Understand | Develop | Optimize |
|---|:---:|:---:|:---:|:---:|
| Greenfield feature | 20% | 10% | 50% | 20% |
| Legacy codebase change | 10% | 40% | 30% | 20% |
| Production bug fix | 10% | 40% | 30% | 20% |
| Refactoring | 15% | 25% | 30% | 30% |

### Can I do multiple PUDO cycles in parallel?

Yes, for independent tasks. For complex features, you'll often run **nested PUDO cycles** — one for the overall feature, and mini-cycles for each component. See the [scaling section](workflow.md#scaling-pudo) in the workflow doc.

---

## AI Usage

### Which AI model works best with PUDO?

PUDO is model-agnostic. It works with:

- **ChatGPT** (GPT-4, GPT-4o)
- **Claude** (Sonnet, Opus)
- **Gemini** (Pro, Ultra)
- **GitHub Copilot**
- **Any AI coding assistant**

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

---

## Getting Started

### What's the fastest way to try PUDO?

1. Pick your next coding task
2. Before writing code, spend 5 minutes in **Plan**: write down what you're building and why
3. Spend 5 minutes in **Understand**: look at the existing code that your change will touch
4. Then **Develop** with a checklist
5. After it works, spend 5 minutes in **Optimize**: review your own code before calling it done

That's it. You've done your first PUDO cycle.

### I keep skipping the Plan phase. Help.

This is the most common struggle. Try this: **make your AI assistant create the plan.** Open your AI tool and say:

```
Before I write any code, help me plan this task:
[describe the task]

Create an implementation plan with:
- Scope and constraints
- Key technical decisions
- Risks and unknowns
- Success criteria
```

Let the AI do the work of planning — you just review and approve. This takes 2 minutes and saves 20.
