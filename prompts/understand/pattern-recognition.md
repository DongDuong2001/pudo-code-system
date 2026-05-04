# Pattern Recognition

> **Phase:** 🔵 Understand  
> **Tags:** `#patterns` `#conventions` `#consistency`  
> **AI Model:** Any (model-agnostic)

## Context

Use this prompt **before writing new code** to ensure it matches the existing codebase conventions. AI-generated code that doesn't match the codebase style is one of the biggest friction sources in AI-assisted development.

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{CODEBASE_AREA}}` | Part of the codebase to study | "src/components/ and src/hooks/" |
| `{{CODE_TYPE}}` | What kind of code you're about to write | "A new React component with data fetching" |

## Prompt

```
Study the existing code in {{CODEBASE_AREA}} and identify the 
established patterns and conventions.

I'm about to write: {{CODE_TYPE}}

I need to match the existing style exactly. Analyze and document:

1. **File structure** — How are files organized? 
   (one component per file? index.ts barrels? co-located tests?)
2. **Naming conventions** — How are files, functions, variables, 
   and types named? (camelCase? PascalCase? kebab-case?)
3. **Component patterns** — How are components structured?
   (functional only? hooks pattern? render props? HOCs?)
4. **State management** — How is state handled?
   (useState? useReducer? Zustand? Context?)
5. **Data fetching** — How is data loaded?
   (useEffect? React Query? Server Components? SWR?)
6. **Error handling** — How are errors caught and displayed?
   (error boundaries? try-catch? toast notifications?)
7. **Styling approach** — How are styles applied?
   (CSS modules? styled-components? Tailwind? vanilla CSS?)
8. **TypeScript usage** — How strict is the typing?
   (interfaces vs types? any usage? generics?)
9. **Import order** — Is there a consistent import ordering?
   (React first? then third-party? then local?)
10. **Testing patterns** — How are tests written?
    (Jest? Vitest? Testing Library? what's tested?)

Provide a "style guide cheat sheet" I can reference while coding.
Format it as a quick-reference table.
```

## Example Usage

### Input
```
Study the existing code in src/components/ and src/hooks/ and 
identify the established patterns and conventions.

I'm about to write: A new data table component with sorting, 
filtering, and pagination.

[rest of prompt...]
```

### Expected Output
A cheat sheet table showing: PascalCase for components, camelCase for hooks, co-located `.test.tsx` files, Zustand for global state, React Query for server state, CSS modules for styling, strict TypeScript with interfaces for props, and example import order from an existing component.
