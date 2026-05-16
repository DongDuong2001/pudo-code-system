# AI Output Review

Use this checklist for any code, config, tests, or documentation generated with AI assistance. AI output is a draft until it is verified against the repo, requirements, and runtime behavior.

## Source Grounding

- [ ] Did the AI cite or inspect the relevant files before changing them?
- [ ] Are APIs, imports, and library calls real in this codebase?
- [ ] Did the AI avoid inventing helpers, schemas, env vars, routes, or config keys?
- [ ] Did the AI avoid relying on outdated API behavior?
- [ ] Are assumptions listed instead of hidden?

## Scope Control

- [ ] Did the AI stay within the requested task?
- [ ] Did it avoid unrelated rewrites, formatting churn, and broad refactors?
- [ ] Did it avoid changing public contracts without calling that out?
- [ ] Did it avoid adding dependencies without a clear justification?
- [ ] Did it preserve existing naming, architecture, and ownership boundaries?

## Safety

- [ ] No secrets, credentials, local paths, or private config were hardcoded.
- [ ] No tests were deleted, skipped, or weakened without explicit approval.
- [ ] Error handling is present for expected failure modes.
- [ ] Logs avoid tokens, secrets, raw PII, and noisy debug output.
- [ ] Auth, permission, and tenant boundaries are enforced server-side where relevant.

## Verification

- [ ] Happy path is tested or manually verified.
- [ ] Failure path is tested or manually verified.
- [ ] Important edge cases are covered or explicitly deferred.
- [ ] Existing tests still pass, or failures are explained.
- [ ] The code is not merely "looks right but untested."

## Maintainability

- [ ] The diff is minimal and reviewable.
- [ ] New abstractions remove real complexity instead of appearing too early.
- [ ] The implementation follows existing patterns.
- [ ] Comments explain non-obvious decisions, not obvious syntax.
- [ ] Documentation is updated when behavior changes.

## Common AI Review Questions

- What did the AI assume?
- Which files did it actually inspect?
- What could this break outside the happy path?
- Did it make the change smaller or bigger than needed?
- What test would fail if this implementation were wrong?

## Stop Signals

Request changes or re-plan if any of these are true:

- Hallucinated API, library, file, or config.
- Unrelated file rewrites.
- Hidden behavior or contract change.
- Removed or weakened tests.
- Hardcoded secret, credential, path, or environment-specific value.
- Security-sensitive change without appropriate validation.
