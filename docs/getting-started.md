# Getting Started with PUDO

This guide gets you from zero to your first complete PUDO cycle in under 10 minutes.

---

## What You Need

- An AI coding assistant — any of: Cursor, Claude Code, GitHub Copilot, ChatGPT, Gemini, Codex, OpenCode, or Kiro
- A repository to work in (or a new project)
- Node.js 20 or higher (for the CLI and MCP server)

You don't need to install anything to start. The CLI runs via `npx`.

---

## Option A: Use PUDO Without Installing Anything

If you just want to try the methodology right now, skip the CLI and follow the [5-minute cycle](#the-5-minute-pudo-cycle) below. PUDO is a thinking framework first — the CLI and MCP server automate and enforce it, but they're not required.

---

## Option B: Install PUDO Into Your Project

Run once in your project root:

```bash
npx pudo-code-system init
```

The interactive wizard walks you through:

1. Which AI tools you use (Cursor, Claude, Codex, Copilot, Gemini, OpenCode, Kiro — or all)
2. Your project type (Next.js, FastAPI, Express, Go, etc.)
3. Your preferred strictness level (Lite / Standard / Enterprise)

Non-interactive setup (fastest path for new repos):

```bash
npx pudo-code-system init \
  --yes \
  --tools=claude,cursor,codex \
  --project=nextjs \
  --strictness=standard
```

After init, verify the installation:

```bash
npx pudo-code-system check     # validates all installed files
npx pudo-code-system score     # scores repo readiness (aim for 80+)
npx pudo-code-system doctor    # diagnoses any gaps
```

Commit the generated files:

```bash
git add .
git commit -m "chore: initialize PUDO operating layer"
```

Everyone on your team now has PUDO available when they open the repo in their AI tool.

---

## The 5-Minute PUDO Cycle

Pick your next task. Work through these 4 steps before writing any code.

### Step 1 — Plan (2 minutes)

Write down — or paste into your AI assistant:

```text
I need to [describe the task].

Before writing any code, create an implementation plan with:
- Scope: what is and isn't included
- Success criteria: how will I know it's done?
- Constraints: time, tech stack, backward compat
- Risks: what could go wrong?

Do not write code yet.
```

Review the plan. If something is vague, ask the AI to clarify. When the plan makes sense to you, move on.

### Step 2 — Understand (2 minutes)

Point the AI to the relevant existing code:

```text
Before implementing, read [file or directory].
- What patterns does it follow?
- What would my change affect?
- Are there any conventions I should match?
```

You should be able to explain the relevant code structure to someone else before moving to Develop.

### Step 3 — Develop

Now write the code. Prompt your AI:

```text
Implement the plan using a task checklist.
Follow the existing patterns in [files].
Write tests alongside the implementation.
Flag any deviations from the plan.
```

Review each piece of generated code before accepting it. Don't skip this.

### Step 4 — Optimize

Before calling it done:

```text
Review the implementation:
- Is there anything to clean up?
- Does it follow the existing code style?
- Write a 3-sentence summary of what changed and why.
```

Run your project's tests. If they pass, you're done.

---

## Choosing Your Mode

| Mode | When to Use |
| --- | --- |
| **PUDO Lite** | Typo fixes, one-liners, throwaway scripts. Run the 4 phases mentally — takes 30 seconds. |
| **PUDO Standard** | Most features and bug fixes. Write the plan, run the full cycle, leave a session note. |
| **PUDO Enterprise** | Production changes, security work, compliance. Add owner approval, rollback plan, monitoring check. |

See [PUDO Modes](pudo-modes.md) for the full breakdown.

---

## Your First PR with PUDO

After completing a cycle:

1. Run `npx pudo-code-system score` — aim for 80 or above
2. Update `.pudo/session.md` with what changed and why
3. Open a PR — the PR template includes a PUDO phase checklist
4. Link to the session file so reviewers can see your reasoning

---

## What to Do Next

- Read [The Workflow](workflow.md) for a deep-dive into each phase
- Browse the [Prompt Library](../prompts/) for ready-to-use templates
- Check the [FAQ](faq.md) for common questions
- Look at [Examples](../examples/) to see PUDO applied to real tasks

---

## Stuck?

- Check [FAQ](faq.md) — most beginner questions are answered there
- Open a [Discussion](https://github.com/DongDuong2001/pudo-code-system/discussions) with your question
- Read [SUPPORT.md](../SUPPORT.md) for all help channels
