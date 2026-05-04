# The PUDO Workflow

A deep-dive into each phase of the PUDO cycle: what happens, who does what, and when to move on.

---

## Overview

```
    ┌──────────┐
    │   PLAN   │  Define what & why
    └────┬─────┘
         │
         ▼
  ┌──────────────┐
  │  UNDERSTAND  │  Research where & how
  └──────┬───────┘
         │
         ▼
    ┌──────────┐
    │ DEVELOP  │  Build it
    └────┬─────┘
         │
         ▼
   ┌───────────┐
   │ OPTIMIZE  │  Make it better
   └─────┬─────┘
         │
         └──────→ Back to PLAN (next task)
```

---

## 🟡 Phase 1: Plan

> **Goal:** Define *what* you're building and *why* it matters.

### Activities

| Activity | Description |
|---|---|
| **Scope definition** | What's in scope? What's explicitly out of scope? |
| **Success criteria** | How will you know it's done? What does "good" look like? |
| **Constraints** | Time, tech stack, backward compatibility, performance budgets |
| **Risk identification** | What could go wrong? What are the unknowns? |
| **Implementation plan** | High-level approach — components, data flow, key decisions |

### Human's Role
- Articulate the goal in clear, specific terms
- Set boundaries and non-negotiables
- Review and approve the implementation plan

### AI's Role
- Draft the implementation plan based on stated goals
- Identify risks and edge cases the human might miss
- Suggest alternative approaches

### Exit Criteria
✅ Implementation plan exists and has been reviewed  
✅ Success criteria are defined and measurable  
✅ Scope boundaries are explicit  

### Common Pitfalls
- ⚠️ **Over-planning** — Don't spend 2 hours planning a 20-minute task. Match planning depth to task complexity.
- ⚠️ **Vague goals** — "Make it better" is not a plan. "Reduce page load time to under 2 seconds" is.
- ⚠️ **Skipping constraints** — If you don't tell the AI about constraints, it will generate unconstrained solutions.

---

## 🔵 Phase 2: Understand

> **Goal:** Build a confident mental model of the existing system.

### Activities

| Activity | Description |
|---|---|
| **Codebase analysis** | Read and map the relevant code. Understand the architecture. |
| **Dependency audit** | What libraries, APIs, and services does this code touch? |
| **Pattern recognition** | What conventions does this codebase follow? Match them. |
| **Risk assessment** | Where are the fragile spots? What's likely to break? |
| **Knowledge gaps** | What do you need to learn before building? |

### Human's Role
- Point AI to the right files and directories
- Provide tribal knowledge (undocumented decisions, known quirks)
- Validate the AI's analysis against your experience

### AI's Role
- Scan the codebase at scale (thousands of lines in seconds)
- Map dependency trees and call graphs
- Identify patterns and conventions
- Flag inconsistencies or potential issues

### Exit Criteria
✅ You can explain the relevant architecture to someone else  
✅ You know what existing code will be affected  
✅ You've identified the patterns you need to follow  

### Common Pitfalls
- ⚠️ **Skipping this phase** — The #1 source of bugs in AI-assisted development. AI writes valid code that doesn't fit the codebase.
- ⚠️ **Over-relying on AI analysis** — AI can miss nuance. Cross-reference with your own reading.
- ⚠️ **Analysis paralysis** — You don't need to understand *everything*. Focus on the blast radius of your change.

---

## 🟢 Phase 3: Develop

> **Goal:** Write the code, make it work, prove it with tests.

### Activities

| Activity | Description |
|---|---|
| **Task breakdown** | Break the plan into a checklist of concrete sub-tasks |
| **Implementation** | Write code, following the plan and matching existing patterns |
| **Testing** | Write tests alongside the code, not after |
| **Progress tracking** | Update the task checklist as you go |
| **Deviation management** | When reality diverges from the plan, decide: adapt or re-plan |

### Human's Role
- Review each piece of generated code before accepting
- Run the code, test it, and verify it actually works
- Decide when plan deviations require going back to Plan phase

### AI's Role
- Generate code that follows the plan and matches codebase patterns
- Write tests alongside implementation
- Track progress and flag blockers
- Suggest alternatives when the original approach hits issues

### Exit Criteria
✅ All tasks on the checklist are complete  
✅ Tests are passing  
✅ The feature works as specified in the plan  

### Common Pitfalls
- ⚠️ **Accepting code without reading it** — AI generates plausible-looking code that may have subtle bugs. Always review.
- ⚠️ **Skipping tests** — "I'll add tests later" means "I'll never add tests."
- ⚠️ **Scope creep** — Stick to the plan. New ideas go into the next PUDO cycle.

---

## 🟣 Phase 4: Optimize

> **Goal:** Elevate the implementation from "works" to "good."

### Activities

| Activity | Description |
|---|---|
| **Code review** | Review for readability, consistency, and maintainability |
| **Performance check** | Profile, benchmark, and optimize bottlenecks |
| **Refactoring** | Clean up any rushed code, reduce duplication, improve naming |
| **Documentation** | Write/update docs, add comments for non-obvious decisions |
| **Walkthrough** | Create a summary of what changed and why |

### Human's Role
- Validate that optimizations actually improve things (measure, don't guess)
- Final approval on code quality
- Merge, deploy, and close the loop

### AI's Role
- Identify refactoring opportunities and dead code
- Run performance analysis and suggest optimizations
- Generate documentation and change summaries
- Create the walkthrough artifact

### Exit Criteria
✅ Code passes review (self-review or peer review)  
✅ Documentation is updated  
✅ Walkthrough summarizes changes for future reference  
✅ No known performance regressions  

### Common Pitfalls
- ⚠️ **Skipping optimization** — "It works, ship it" builds tech debt at AI speed.
- ⚠️ **Over-optimizing** — Premature optimization is still the root of all evil. Focus on measurable improvements.
- ⚠️ **Forgetting documentation** — Future you (and your AI) will thank present you for good docs.

---

## Phase Transitions

PUDO is a cycle, not a straight line. Here's when to loop back:

| You're In | Signal | Go Back To |
|---|---|---|
| Understand | "The scope was wrong" | Plan |
| Develop | "I don't understand this part of the code" | Understand |
| Develop | "The approach isn't feasible" | Plan |
| Optimize | "This needs a fundamental rethink" | Plan |
| Optimize | "I found a bug in an area I don't understand" | Understand |

**The key rule:** Going back is not failure. Going back is the system working as designed. It's far cheaper to revisit a phase than to ship a broken feature.

---

## Scaling PUDO

### Small Tasks (< 30 min)
Run through the phases quickly, even mentally. A brief Plan ("I need to fix this button alignment") and a quick Understand ("let me check the CSS") is enough.

### Medium Tasks (1–4 hours)
Full written cycle. Plan with an implementation doc, Understand by analyzing relevant code, Develop with a task checklist, Optimize with a self-review.

### Large Tasks (days–weeks)
Nested PUDO cycles. The top-level PUDO plans the overall feature, then each component gets its own mini-PUDO cycle.

```
Feature PUDO (top-level)
├── Component A PUDO
│   ├── Plan → Understand → Develop → Optimize
├── Component B PUDO
│   ├── Plan → Understand → Develop → Optimize
└── Integration PUDO
    ├── Plan → Understand → Develop → Optimize
```
