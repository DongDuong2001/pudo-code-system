# Code Review Checklist

> **Phase:** Optimize  
> **Tags:** `#review` `#quality` `#checklist` `#gates`
> **AI Model:** Any (model-agnostic)

## Context

Use this prompt **before merging or shipping code** to catch issues that are easy to fix now but expensive to fix later. It's a structured self-review or AI-assisted peer review.

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CODE_CHANGES}}` | The diff or files to review | (paste diff or file paths) |
| `{{ORIGINAL_REQUIREMENTS}}` | What the code should do | "Add user profile editing" |
| `{{CODEBASE_STANDARDS}}` | Team/project conventions | "ESLint strict, 80% test coverage" |
| `{{QUALITY_GATES}}` | Required checks before approval | "Auth verified, tests pass, rollback documented" |
| `{{EDGE_CASES}}` | Specific edge cases to verify | "Expired token, duplicate submit, empty result set" |

## Prompt

```
Review the following code changes:

{{CODE_CHANGES}}

Original requirements: {{ORIGINAL_REQUIREMENTS}}
Codebase standards: {{CODEBASE_STANDARDS}}
Quality gates to enforce: {{QUALITY_GATES}}
Edge cases to verify: {{EDGE_CASES}}

Run through this checklist and report findings:

## Quality Gates
- [ ] Do all required quality gates pass?
- [ ] Are failed gates documented with severity and a concrete fix?
- [ ] Are known edge cases covered by code, tests, monitoring, or explicit deferral?
- [ ] Is rollback or recovery clear for risky changes?

## Correctness
- [ ] Does the code do what the requirements specify?
- [ ] Are there any logical errors or off-by-one bugs?
- [ ] Are all edge cases handled?
- [ ] Are error states handled gracefully?

## Security
- [ ] Is user input validated and sanitized?
- [ ] Are there any SQL injection or XSS vulnerabilities?
- [ ] Are secrets/credentials hardcoded?
- [ ] Are API endpoints properly authenticated/authorized?

## Readability
- [ ] Are variable/function names descriptive and consistent?
- [ ] Is complex logic commented (why, not what)?
- [ ] Is the code structure easy to follow?
- [ ] Are there any overly clever one-liners that should be 
      simplified?

## Maintainability
- [ ] Is there duplicated code that should be extracted?
- [ ] Are functions/components focused (single responsibility)?
- [ ] Are types/interfaces properly defined (no `any`)?
- [ ] Would a new team member understand this code?

## Testing
- [ ] Are the important behaviors tested?
- [ ] Do tests have descriptive names?
- [ ] Are edge cases and error paths tested?
- [ ] Are tests independent (no shared mutable state)?

## Performance
- [ ] Are there any obvious performance issues?
- [ ] Are large data sets handled efficiently?
- [ ] Are there unnecessary re-renders or recomputations?

For each failed check:
- Explain the issue
- Rate severity (CRITICAL / WARNING / SUGGESTION)
- Provide a specific fix
- If a required quality gate fails, do not approve the PR

Rate the overall PR: ✅ Approve | ⚠️ Approve with comments | ❌ Request changes
```

## Example Usage

### Input
```
Review the following code changes:

[paste a git diff adding a search feature with debounced input, 
API call, and results display]

Original requirements: Add full-text search to the products page
Codebase standards: TypeScript strict mode, Vitest for tests, 
no console.log in production code
Quality gates to enforce: query input is safe, empty and failed searches are handled, tests pass
Edge cases to verify: empty query, no results, API failure, slow network, special characters

[rest of prompt...]
```

### Expected Output
The output should include quality gate status and request changes when a required gate fails.
Checklist with: ✅ correctness (search works), ⚠️ security (search input not sanitized — XSS via reflected results), ⚠️ readability (debounce helper should be extracted to utils), ❌ testing (no tests for empty results or API failure), overall: ⚠️ Approve with comments. Specific fixes for each issue.
