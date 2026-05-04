# Scope Definition

> **Phase:** Plan  
> **Tags:** `#scoping` `#greenfield` `#requirements`  
> **AI Model:** Any (model-agnostic)

## Context

Use this prompt at the **very start of a new task or feature** — before writing any code. It forces you to define boundaries, success criteria, and constraints upfront, preventing scope creep and wasted effort.

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{TASK_DESCRIPTION}}` | What you're building or fixing | "Add user profile editing to the settings page" |
| `{{SUCCESS_CRITERIA}}` | Measurable definition of "done" | "Users can update name, email, and avatar" |
| `{{CONSTRAINTS}}` | Technical or time limitations | "Must use existing Supabase auth, ship by Friday" |
| `{{OUT_OF_SCOPE}}` | What you're explicitly NOT doing | "Password change, account deletion" |

## Prompt

```
I need to work on the following task:

{{TASK_DESCRIPTION}}

Before writing any code, create an implementation plan.

Success criteria:
{{SUCCESS_CRITERIA}}

Constraints:
{{CONSTRAINTS}}

Explicitly out of scope:
{{OUT_OF_SCOPE}}

The implementation plan should include:
1. A breakdown of the task into concrete sub-tasks
2. The files that will need to be created or modified
3. Key technical decisions and their rationale
4. Potential risks or unknowns
5. Estimated complexity (simple / moderate / complex)

Do not write any code yet — just the plan.
```

## Example Usage

### Input
```
I need to work on the following task:

Add a dark mode toggle to our React dashboard. Currently the app 
only supports light mode.

Before writing any code, create an implementation plan.

Success criteria:
- Users can toggle between light and dark mode
- Preference persists across sessions (localStorage)
- All existing components render correctly in both modes

Constraints:
- React 18 with TypeScript
- Using CSS custom properties (no Tailwind)
- Must not break existing component styles

Explicitly out of scope:
- System preference detection (prefers-color-scheme)
- Per-page theme settings
- Animation on theme transition

The implementation plan should include:
1. A breakdown of the task into concrete sub-tasks
2. The files that will need to be created or modified
3. Key technical decisions and their rationale
4. Potential risks or unknowns
5. Estimated complexity (simple / moderate / complex)

Do not write any code yet — just the plan.
```

### Expected Output
A structured plan with 5–8 sub-tasks, file list, decision to use CSS custom properties with a `[data-theme]` attribute, risk note about third-party component libraries, and complexity rating of "moderate."
