# Anti-Hallucination Rules

Use these rules when AI output affects code, configuration, infrastructure, tests, or documentation that users may trust.

## The AI Must Not Invent

- File paths
- APIs
- Functions, helpers, classes, or components
- Environment variables
- Database tables, columns, indexes, or migrations
- Package behavior
- CLI flags or config keys
- Test results
- Benchmark results
- Security guarantees

## Required Grounding

- Cite or inspect relevant files before changing them.
- Verify imports, routes, schemas, and commands from source.
- Mark assumptions explicitly.
- Ask or re-plan when the implementation depends on missing context.
- Prefer existing project patterns over generic examples.

## Verification Rules

- Do not claim tests passed unless they were run.
- If tests were not run, state that clearly.
- Do not claim a package is installed without checking project files.
- Do not claim runtime behavior from static inspection alone.
- Do not present generated code as production-ready until it has been reviewed.

## Stop Signals

Request changes or return to Plan if the AI:

- Uses a path that does not exist.
- Calls an API that is not present in the project or official docs.
- Adds an env var without documenting where it is set.
- Changes a public contract without naming the impact.
- Rewrites unrelated files.
- Removes, skips, or weakens tests.
- Hardcodes secrets, local paths, or environment-specific values.

## Review Prompt

```text
Review this AI-generated change for hallucinations.

Check for invented paths, APIs, env vars, database fields, package behavior, commands, and test claims.

For each issue:
1. Quote or reference the suspect claim.
2. Show what source evidence is missing or contradictory.
3. Rate severity.
4. Propose the smallest fix.
```
