# Refactor Opportunities

> **Phase:** 🟣 Optimize  
> **Tags:** `#refactor` `#cleanup` `#maintainability`  
> **AI Model:** Any (model-agnostic)

## Context

Use this prompt **after shipping a feature** to identify code that works but could be cleaner, simpler, or more maintainable. This is the "polish" pass that separates professional code from prototype code.

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CODE_TO_REFACTOR}}` | The code to analyze | (paste code or file paths) |
| `{{REFACTORING_GOALS}}` | What you want to improve | "Reduce duplication, improve readability" |
| `{{CONSTRAINTS}}` | What must NOT change | "Public API must stay the same" |

## Prompt

```
Analyze the following code for refactoring opportunities:

{{CODE_TO_REFACTOR}}

Goals: {{REFACTORING_GOALS}}
Constraints: {{CONSTRAINTS}}

Identify opportunities in these categories:

1. **DRY violations** — Duplicated code that should be extracted 
   into shared functions, components, or utilities.
   
2. **Complexity reduction** — Functions or components that are too 
   long, deeply nested, or doing too many things.
   
3. **Naming improvements** — Variables, functions, or files with 
   unclear or misleading names.
   
4. **Type improvements** — Places where TypeScript types could be 
   more precise, generic, or reusable.
   
5. **Pattern alignment** — Code that works but doesn't match the 
   established patterns in the rest of the codebase.
   
6. **Dead code** — Unused imports, unreachable branches, commented-out 
   code, or unused variables.
   
7. **Abstraction level** — Functions that mix high-level logic with 
   low-level details (e.g., business logic mixed with DOM manipulation).

For each opportunity:
- **Location:** File and line range
- **Current:** What the code looks like now (brief snippet)
- **Proposed:** What the refactored code would look like
- **Benefit:** Why this refactor is worth doing
- **Risk:** What could break (if anything)
- **Effort:** LOW / MEDIUM / HIGH

Sort by benefit-to-effort ratio (quick wins first).
```

## Example Usage

### Input
```
Analyze the following code for refactoring opportunities:

[paste a 300-line API route handler that validates input, queries 
the database, transforms data, sends notifications, and returns 
a response]

Goals: Break into smaller functions, improve testability
Constraints: API contract (request/response shape) must not change

[rest of prompt...]
```

### Expected Output
5-8 opportunities sorted by quick wins: extract validation into schema (LOW effort, HIGH benefit), split handler into controller/service/repo layers (MEDIUM effort, HIGH benefit), extract notification sending into async job (MEDIUM effort, MEDIUM benefit), rename `data` variable to `userProfile` (LOW effort, LOW benefit).
