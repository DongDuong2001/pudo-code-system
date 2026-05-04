# Component Scaffold

> **Phase:** 🟢 Develop  
> **Tags:** `#scaffold` `#component` `#boilerplate`  
> **AI Model:** Any (model-agnostic)

## Context

Use this prompt when **creating a new component, module, or service** from scratch. Instead of generating a minimal skeleton, it produces a production-ready scaffold that matches your codebase conventions and includes all the standard pieces (types, tests, styles, stories).

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{COMPONENT_NAME}}` | Name of the component/module | "DataTable" |
| `{{COMPONENT_PURPOSE}}` | What it does | "Renders sortable, filterable tabular data" |
| `{{PROPS_OR_INTERFACE}}` | Expected inputs | "data: T[], columns: Column[], onSort: fn" |
| `{{SIMILAR_COMPONENT}}` | An existing component to match style | "See src/components/UserList.tsx for patterns" |
| `{{FILE_STRUCTURE}}` | Expected output files | "Component, styles, tests, types, index" |

## Prompt

```
Scaffold a new component/module:

Name: {{COMPONENT_NAME}}
Purpose: {{COMPONENT_PURPOSE}}
Interface: {{PROPS_OR_INTERFACE}}
Match style of: {{SIMILAR_COMPONENT}}

Generate the following files:

{{FILE_STRUCTURE}}

For each file:
1. Follow the exact patterns and conventions from the referenced 
   similar component
2. Include proper TypeScript types (no `any`)
3. Add JSDoc comments for the component and its props
4. Include realistic placeholder content (not "Lorem ipsum")
5. Handle loading, error, and empty states
6. Make it accessible (ARIA labels, keyboard navigation, 
   semantic HTML)

Generate all files in one response, clearly separated with 
file path headers.
```

## Example Usage

### Input
```
Scaffold a new component/module:

Name: NotificationBell
Purpose: Displays a bell icon with unread notification count badge, 
opens a dropdown with recent notifications on click
Interface: notifications: Notification[], onMarkRead: (id) => void, 
onClearAll: () => void
Match style of: See src/components/UserMenu.tsx for dropdown pattern

Generate the following files:
- NotificationBell.tsx (component)
- NotificationBell.module.css (styles)
- NotificationBell.test.tsx (tests)
- types.ts (TypeScript interfaces)
- index.ts (barrel export)

[rest of prompt...]
```

### Expected Output
Five files: a fully typed component with dropdown behavior matching UserMenu, CSS module with animations, 8+ tests covering open/close/mark-read/empty-state, clean type definitions, and a barrel export. All following the patterns from the referenced component.
