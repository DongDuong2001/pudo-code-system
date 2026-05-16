# QC Checklists

Use these checklists when the work is large enough that "it works on my machine" is not enough. For phase-specific pass/fail gates, use [Quality Gates](quality-gates.md). For AI-specific review, use [AI Output Review](ai-output-review.md).

## How to Use

1. Pick the categories that match the change.
2. Mark each item as pass, fail, or not applicable.
3. Treat critical correctness, security, data, and rollback failures as blockers.
4. Convert every failed non-blocker into a concrete follow-up task.
5. Record accepted risks in the PR, handoff, or release notes.

## Product QC

- [ ] User problem and expected outcome are clear.
- [ ] Success criteria match the original request.
- [ ] Out-of-scope items were not accidentally included.
- [ ] Important user roles and permissions are covered.
- [ ] Empty, error, and edge-case user journeys are considered.
- [ ] Behavior is explainable to a user or stakeholder.

## Engineering QC

- [ ] Implementation follows existing architecture and conventions.
- [ ] The diff is focused and reviewable.
- [ ] Public contracts are preserved or intentionally documented.
- [ ] New dependencies are justified.
- [ ] Config, environment variables, and migrations are documented.
- [ ] Error handling is explicit for expected failures.
- [ ] Logs are useful without being noisy.

## Security QC

- [ ] User input is validated at trust boundaries.
- [ ] Authentication is enforced where required.
- [ ] Authorization is checked server-side where relevant.
- [ ] Tenant, workspace, or organization boundaries are protected.
- [ ] Secrets, tokens, credentials, and raw PII are not logged or committed.
- [ ] Injection, XSS, CSRF, SSRF, IDOR, replay, and rate-limit risks are considered when relevant.
- [ ] Security-sensitive changes have a reviewer or explicit risk acceptance.

## UX QC

- [ ] Loading, empty, success, disabled, and error states are covered.
- [ ] The UI handles long text, narrow screens, and large screens.
- [ ] Keyboard navigation and focus behavior are usable.
- [ ] Screen reader labels and accessible names are present where needed.
- [ ] Destructive or irreversible actions require appropriate confirmation.
- [ ] User-facing copy is clear and consistent with the product.

## Testing QC

- [ ] Happy path is tested.
- [ ] Failure path is tested.
- [ ] Important edge cases are tested.
- [ ] Regression tests are added for bug fixes.
- [ ] Tests are deterministic and independent.
- [ ] Existing tests pass, or failures are explained.
- [ ] Manual verification steps are documented when automated tests are not practical.

## Documentation QC

- [ ] README, docs, examples, or comments are updated when behavior changes.
- [ ] New prompts or templates follow the existing format.
- [ ] Migration, config, or setup changes include instructions.
- [ ] Decisions and tradeoffs are captured for future maintainers.
- [ ] Known limitations or accepted risks are documented.

## Release QC

- [ ] Release notes or changelog are updated when needed.
- [ ] Rollback or recovery plan is clear.
- [ ] Database migrations are tested or have a safe rollout plan.
- [ ] Monitoring, logging, or alerting covers likely failure modes.
- [ ] Owner approval is recorded for risky changes.
- [ ] Post-release verification is defined.

## AI-Output QC

- [ ] AI inspected relevant files instead of guessing.
- [ ] AI did not invent APIs, imports, helpers, env vars, or routes.
- [ ] AI did not delete, skip, or weaken tests without approval.
- [ ] AI did not rewrite unrelated files.
- [ ] AI did not hardcode secrets, local paths, or environment-specific config.
- [ ] AI did not silently change public contracts.
- [ ] AI did not add unnecessary dependencies or premature abstractions.
- [ ] AI output is verified by tests, review, or targeted manual checks.

## Failure Signals

Treat these as stop signs unless the team explicitly accepts the risk.

- The implementation meets the happy path but cannot be verified.
- A critical edge case is known and unhandled.
- The change can corrupt, leak, or silently drop user data.
- Rollback requires manual data repair that has not been planned.
- The reviewer cannot connect the code back to the stated requirements.
- The AI-generated diff is too broad to review confidently.
