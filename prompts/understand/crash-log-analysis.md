# Crash Log Analysis
> Phase: Understand, Tags: #debugging #crash #logs

## Context
Use this prompt when you have a stack trace or error log and need to understand the root cause before attempting a fix.

## Variables
- `{{error_log}}`: The stack trace or error output.
- `{{environment}}`: Language/Framework/OS (e.g., Python/Django, Node.js).

## Prompt
Act as an expert Debugger. Help me analyze this crash log in a {{environment}} environment.

Log:
```
{{error_log}}
```

Before suggesting code changes, please explain:
1. What exactly the error means in plain English.
2. Which specific file and line seem to be the origin of the crash.
3. What sequence of events likely led to this state.
4. What additional context (variables, DB state) I should check to confirm the hypothesis.

## Example Usage
**Input:** Help me analyze this crash log in a Node.js/Express environment. [Pasted Stack Trace]
