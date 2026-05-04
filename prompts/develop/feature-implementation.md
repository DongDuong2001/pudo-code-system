# Feature Implementation

> **Phase:** Develop  
> **Tags:** `#implementation` `#coding` `#feature`  
> **AI Model:** Any (model-agnostic)

## Context

Use this prompt **after Plan and Understand are complete** to execute the actual implementation. It structures the AI's output around your plan and codebase conventions, rather than letting it freestyle.

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{IMPLEMENTATION_PLAN}}` | The plan from the Plan phase | (paste your plan) |
| `{{CONVENTIONS}}` | Patterns from the Understand phase | "PascalCase components, Zustand stores, CSS modules" |
| `{{CURRENT_TASK}}` | Which specific sub-task to work on | "Task 3: Build the checkout form component" |

## Prompt

```
Implement the following task from our implementation plan:

{{CURRENT_TASK}}

Full plan for reference:
{{IMPLEMENTATION_PLAN}}

Codebase conventions to follow:
{{CONVENTIONS}}

Requirements:
1. Follow the plan exactly. If you think the plan needs changes, 
   say so BEFORE writing code — don't silently deviate.
2. Match the existing codebase conventions listed above.
3. Include inline comments for any non-obvious decisions.
4. Write the code in logical chunks — don't dump everything at once.
5. After each chunk, explain what it does and why.
6. Flag any assumptions you're making.

Track progress by marking completed items:
- [ ] = not started
- [x] = complete

Start with the first incomplete item.
```

## Example Usage

### Input
```
Implement the following task from our implementation plan:

Task 3: Build the checkout form component with Stripe Elements

Full plan for reference:
[paste the architecture plan from Plan phase]

Codebase conventions to follow:
- React functional components with TypeScript
- Props defined as interfaces (not types)
- CSS Modules for styling
- Error handling with toast notifications (react-hot-toast)
- Form validation with Zod schemas

[rest of prompt...]
```

### Expected Output
Step-by-step implementation: Zod validation schema → component skeleton → Stripe Elements integration → error handling → styling. Each chunk explained before the code, assumptions flagged, and progress checklist updated.
