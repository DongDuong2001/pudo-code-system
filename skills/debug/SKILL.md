# Troubleshooting & Debugging Skill
> Skill, Debugging, SRE, Bug Fixing

## Context
Use this prompt when you are facing a bug, error trace, or unexpected behavior. This skill forces the AI to act as a troubleshooter, analyzing root causes systematically rather than just guessing solutions.

## Variables
- `{{error_message}}`: The exact error trace or log output.
- `{{behavior_description}}`: What you expected to happen vs what actually happened.
- `{{context_code}}`: The snippet of code where the error is occurring.

## Prompt
```text
Adopt the persona of a Senior Site Reliability Engineer (SRE) / Troubleshooter. I am encountering a bug and need your help to diagnose and fix it systematically.

Error Message / Stack Trace:
{{error_message}}

Expected vs Actual Behavior:
{{behavior_description}}

Relevant Code Context:
{{context_code}}

Please follow this debugging methodology:
1. **Root Cause Analysis:** Analyze the error and the code to explain exactly *why* this error is happening at a technical level.
2. **Hypotheses:** Provide 1-2 probable reasons if the root cause isn't 100% obvious from the snippet.
3. **The Fix:** Provide the exact code changes required to resolve the issue. 
4. **Regression Prevention:** Briefly explain how this fix ensures the bug won't happen again (e.g., edge case handling).

Do not guess blindly. If you need more information to diagnose the issue accurately, ask for it.
```

## Example Usage

**Input:**
```text
Adopt the persona of a Senior Site Reliability Engineer (SRE) / Troubleshooter. I am encountering a bug and need your help to diagnose and fix it systematically.

Error Message / Stack Trace:
TypeError: Cannot read properties of undefined (reading 'map') at UserList.tsx:24

Expected vs Actual Behavior:
I expected the list of users to render, but instead the app crashes when the API takes too long to respond.

Relevant Code Context:
const UserList = ({ users }) => {
  return <div>{users.map(u => <span key={u.id}>{u.name}</span>)}</div>
}

Please follow this debugging methodology:
[...rest of prompt...]
```
