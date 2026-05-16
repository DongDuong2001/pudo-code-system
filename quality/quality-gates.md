# Quality Gates

Quality gates define when a PUDO phase is allowed to move forward. They are not ceremony; they are the minimum evidence needed to avoid vague prompts, unverified AI output, and accidental releases.

## How Gates Work

1. Run the gate at the end of the phase.
2. Mark each item as pass, fail, or not applicable.
3. Treat failed critical items as blockers.
4. Convert non-blocking failures into follow-up tasks with owners.
5. Record accepted risks in the handoff or PR.

## Plan Gate

Run before moving from Plan to Understand.

### Pass Criteria

- [ ] Problem, user goal, and impact are clear.
- [ ] Scope is explicit and bounded.
- [ ] Success criteria are measurable.
- [ ] Constraints are documented.
- [ ] Out-of-scope items are named.
- [ ] Risks, unknowns, and assumptions are listed.
- [ ] Verification approach is known.

### Stop If

- The request is still vague.
- "Done" cannot be measured.
- The AI would need to guess core requirements.

## Understand Gate

Run before moving from Understand to Develop.

### Pass Criteria

- [ ] Relevant files and code paths were inspected.
- [ ] Existing architecture and conventions are understood.
- [ ] APIs, schemas, and dependencies were verified from source.
- [ ] Similar implementations or patterns were identified.
- [ ] Current tests and verification commands are known.
- [ ] Unknowns are documented instead of guessed.

### Stop If

- The plan depends on an unverified API or library behavior.
- The AI has not read the files it is about to change.
- Ownership boundaries or side effects are unclear.

## Develop Gate

Run before moving from Develop to Optimize.

### Pass Criteria

- [ ] Implementation follows the approved plan.
- [ ] Changes stay within the agreed scope.
- [ ] No unrelated rewrites or opportunistic refactors were added.
- [ ] Relevant tests were added or updated.
- [ ] Happy path, failure path, and key edge cases are handled.
- [ ] Public contracts are unchanged or intentionally documented.
- [ ] New dependencies, config, or migrations are justified.

### Stop If

- The code only works on the happy path.
- Tests were removed, skipped, or weakened without explanation.
- The implementation silently changes behavior outside the task.

## Optimize Gate

Run before final review or release preparation.

### Pass Criteria

- [ ] Refactors preserve existing behavior.
- [ ] Performance, security, accessibility, and maintainability were reviewed for the change size.
- [ ] Documentation or examples were updated when behavior changed.
- [ ] Observability is sufficient for the main failure modes.
- [ ] Required checks pass or failures are explained.
- [ ] Remaining risks are explicit.

### Stop If

- Optimization changes behavior without a plan.
- A reviewer cannot connect the diff back to the requirements.
- Known high-risk edge cases remain unhandled and unaccepted.

## Release Gate

Run before merge, deploy, or handoff.

### Pass Criteria

- [ ] Owner or reviewer approval is recorded.
- [ ] Changelog, release notes, or migration notes are updated when needed.
- [ ] Rollback or recovery plan is clear.
- [ ] Database migrations and compatibility risks are understood.
- [ ] Monitoring, logging, or alerts cover the likely failure modes.
- [ ] Security-sensitive changes received appropriate review.
- [ ] Post-release verification is defined.

### Stop If

- Rollback is unknown for a risky change.
- A migration can fail halfway without a recovery plan.
- The team cannot tell whether the release succeeded.

## Gate Outcomes

Use a simple status in PRs and handoffs:

- `Pass`: All required criteria are met.
- `Pass with accepted risk`: A non-critical issue is documented and owned.
- `Fail`: A blocker must be fixed before moving forward.
- `Re-plan`: The failure changes scope, architecture, or assumptions enough to return to Plan.
