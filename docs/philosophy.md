# The PUDO Philosophy

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler

PUDO extends this idea: **Good developers give AI instructions that produce understandable code.**

---

## Why PUDO Exists

The rise of AI coding assistants (ChatGPT, Claude, Gemini, GitHub Copilot) has fundamentally changed how we write software. But most developers interact with AI the same way they'd Google a Stack Overflow answer — reactively, without structure, one question at a time.

This leads to what we call **chaos coding:**

- **Slot machine development** — Prompt, hope for the best, retry if it fails
- **Spaghetti architecture** — Each AI response is isolated, with no awareness of the bigger picture
- **Infinite loops** — Fixing the AI's fix of the AI's fix, three layers deep
- **False productivity** — Writing 500 lines of code but shipping 50 lines of value

PUDO is the antidote. It's a methodology that gives developers a **repeatable, structured process** for working with AI assistants — turning them from unpredictable oracles into reliable pair programmers.

---

## Core Principles

### 1. Anti-Chaos: Structure Beats Improvisation

The #1 failure mode of AI-assisted development is diving straight into code. When you skip planning and understanding, you're asking an AI to solve a problem it doesn't understand, in a codebase it hasn't seen, with constraints it doesn't know about.

**PUDO's first two phases (Plan, Understand) exist to front-load context.** The more context your AI has, the better its output. This isn't a theory — it's a directly observable pattern.

### 2. Iterative, Not Waterfall

PUDO is drawn as a cycle for a reason. In practice, phases bleed into each other:

- You're **Developing** and discover a dependency you missed → go back to **Understand**
- You're **Optimizing** and realize the scope was wrong → go back to **Plan**
- You're **Planning** and need to prototype something to validate feasibility → jump to **Develop**

**The phases are a compass, not a cage.** They tell you where you are and where you should go — they don't force a rigid sequence.

### 3. AI-Native: Designed for Human+AI

PUDO doesn't treat AI as a fancy autocomplete. Each phase explicitly defines what the **human** does vs. what the **AI** does:

| Phase | Human's Job | AI's Job |
|---|---|---|
| **Plan** | Define goals, set constraints | Draft the plan, identify risks |
| **Understand** | Provide context, validate analysis | Research, analyze, map dependencies |
| **Develop** | Review, approve, test | Write code, track progress |
| **Optimize** | Validate, merge, deploy | Refactor, benchmark, document |

This separation matters because AI excels at **breadth** (scanning a large codebase) and **speed** (generating boilerplate), while humans excel at **judgment** (is this the right approach?) and **taste** (does this feel right?).

### 4. Phase Integrity: Clear Entry and Exit

Each phase has a **definition of done** — you know when to move on:

| Phase | Entry Criteria | Exit Criteria |
|---|---|---|
| **Plan** | A new task, feature, or bug | Implementation plan reviewed and approved |
| **Understand** | Approved plan | Confident mental model of the system |
| **Develop** | Understanding of codebase + plan | Feature complete, tests passing |
| **Optimize** | Working implementation | Code reviewed, documented, walkthrough written |

Without exit criteria, phases blur together and structure collapses. **If you can't articulate what "done" looks like for a phase, you're not ready to leave it.**

---

## What PUDO Is Not

- **Not Agile** — Agile operates at the sprint/team level. PUDO operates at the task/individual level. They're complementary, not competing.
- **Not waterfall** — PUDO is explicitly iterative. You loop back constantly.
- **Not a prompt template** — PUDO is a methodology. The [prompt library](../prompts/) provides templates, but PUDO is the thinking framework behind them.
- **Not AI-only** — PUDO works for traditional development too. But it's optimized for the human+AI workflow because that's where structure provides the highest ROI.

---

## The Mental Model

Think of PUDO as a **zoom lens:**

1. **Plan** — Zoom all the way out. What's the big picture?
2. **Understand** — Zoom into the system. What already exists?
3. **Develop** — Zoom into the code. What needs to change?
4. **Optimize** — Zoom back out. Is the change good enough?

Each phase shifts your perspective, ensuring you never lose sight of the forest *or* the trees.

---

<p align="center">
  <em>"I follow the PUDO method."</em>
  <br />
  That's how frameworks spread.
</p>
