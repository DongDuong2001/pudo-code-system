# General Edge Cases

Use this list during Plan, Develop, and Review to avoid only testing the happy path. Select the cases that match the task; do not force every item onto every change.

## Input and Data

- Empty input
- Null or undefined values
- Missing required fields
- Invalid type or format
- Minimum and maximum values
- Very long text
- Large payload
- Special characters
- Unicode and emoji
- Duplicate request
- Duplicate record
- Stale client data
- Backward compatibility with old data

## Auth and Permissions

- Missing auth
- Expired session
- Revoked token
- Wrong role
- Permission denied
- Tenant or workspace mismatch
- Permission changed during the flow

## Network and Reliability

- Timeout
- Retry
- Retry exhaustion
- Partial failure
- Slow network
- Offline mode
- Interrupted upload or download
- Third-party service downtime
- Rate limit

## Concurrency and State

- Race condition
- Double submit
- Browser refresh
- Browser back/forward
- Multiple tabs
- Cached stale response
- Eventual consistency delay
- Out-of-order events

## UI and Accessibility

- Empty state
- Loading state
- Error state
- Disabled state
- Mobile layout
- Very small screen
- Very large screen
- Keyboard-only navigation
- Screen reader labels
- Focus management
- Localization text expansion
- Right-to-left layout when relevant
- Browser compatibility

## Time and Locale

- Timezone boundary
- Daylight saving time
- Date precision mismatch
- Locale-specific formatting
- Currency formatting
- Number separators

## Operations

- Missing environment variable
- Invalid environment variable
- Secret rotation
- Deployment rollback
- Feature flag off
- Feature flag changes mid-flow
- Monitoring absent
- Logs missing useful context

## Edge Case Prompt

```
For this change, list the highest-risk edge cases.

Feature:
{{FEATURE_DESCRIPTION}}

Data and dependencies:
{{DATA_AND_DEPENDENCIES}}

User roles:
{{USER_ROLES}}

For each edge case, include:
1. Trigger condition
2. Expected behavior
3. Test or verification approach
4. Severity if missed
```

## Exit Rule

Before shipping, every critical or high-severity edge case should be covered by code, tests, documentation, monitoring, or an explicit risk acceptance.
