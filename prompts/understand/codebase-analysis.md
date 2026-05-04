# Codebase Analysis

> **Phase:** 🔵 Understand  
> **Tags:** `#analysis` `#exploration` `#onboarding`  
> **AI Model:** Any (model-agnostic)

## Context

Use this prompt when **entering an unfamiliar codebase** or a part of the code you haven't touched before. It gives you a structured mental model before making changes.

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{DIRECTORY_OR_FILES}}` | What part of the codebase to analyze | "src/features/auth/" |
| `{{TASK_CONTEXT}}` | Why you're analyzing this code | "I need to add OAuth login" |
| `{{SPECIFIC_QUESTIONS}}` | What you need to understand | "How are sessions managed?" |

## Prompt

```
Analyze the following part of the codebase:

{{DIRECTORY_OR_FILES}}

I'm analyzing this because: {{TASK_CONTEXT}}

Provide a structured analysis covering:

1. **Architecture overview** — How is this code organized? 
   What's the high-level structure?
2. **Key files** — Which files are most important? What does 
   each one do? (List the top 5-10)
3. **Data flow** — How does data move through this code? 
   (Input → Processing → Output)
4. **Dependencies** — What external libraries or internal modules 
   does this code depend on?
5. **Patterns & conventions** — What coding patterns are used? 
   (naming conventions, folder structure, state management)
6. **Entry points** — Where would I start reading to understand 
   the flow?
7. **Potential concerns** — Any code smells, tech debt, or fragile 
   areas I should be aware of?

Additionally, answer these specific questions:
{{SPECIFIC_QUESTIONS}}

Format the output as a reference document I can keep open while working.
```

## Example Usage

### Input
```
Analyze the following part of the codebase:

src/features/dashboard/

I'm analyzing this because: I need to add a new analytics widget 
to the dashboard.

[rest of prompt with specific questions like:]
- How are existing widgets structured?
- Where does widget data come from?
- How is the layout managed?
```

### Expected Output
A reference doc listing: component hierarchy (DashboardLayout → WidgetGrid → Widget), data fetching pattern (React Query hooks in `hooks/`), widget interface/type definition, layout system (CSS Grid with configurable columns), and entry point recommendation (start with `DashboardLayout.tsx` → `WidgetGrid.tsx`).
