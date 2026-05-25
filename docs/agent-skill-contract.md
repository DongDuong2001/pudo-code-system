# Agent Skill Contract

PUDO skills should behave like reusable agent capabilities, not loose prompt snippets. Use this contract when adding or upgrading skills.

## Required Sections

- `Name`: Clear skill name.
- `Use When`: When the agent should load this skill.
- `Input Contract`: Required inputs and optional inputs.
- `Output Contract`: Exact artifacts the skill should produce.
- `Workflow`: Step-by-step procedure.
- `Checklist`: Pass/fail checks before the skill is complete.
- `Failure Modes`: Common ways the skill can produce bad output.
- `Command / Tool Expectations`: Commands, tools, or checks the agent should prefer.
- `Example Transcript`: Short example showing user request, agent action, and expected result.

## Input Contract

Define what the agent needs before acting:

```md
## Input Contract

Required:
- Task description
- Relevant files or repository area
- Constraints
- Success criteria

Optional:
- Existing plan
- Known risks
- Verification command
```

## Output Contract

Define what the agent must return:

```md
## Output Contract

- Summary of work
- Files changed or inspected
- Checks run
- Quality gate status
- Remaining risks
```

## Checklist

- [ ] Inputs are sufficient.
- [ ] Relevant files were inspected.
- [ ] Output matches the requested artifact.
- [ ] Failure modes were checked.
- [ ] Verification is reported.

## Failure Modes

- Acting without enough context.
- Inventing APIs, paths, env vars, or commands.
- Producing generic guidance instead of repo-specific output.
- Skipping verification.
- Expanding scope beyond the user request.

## Command / Tool Expectations

- Prefer `rg` for search.
- Prefer targeted file reads over full dumps.
- Run the cheapest relevant check first.
- State skipped checks clearly.
- Do not claim tests passed unless they ran.
