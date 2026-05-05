# Optimize Phase Prompts

The **Optimize** phase focuses on refining, refactoring, and verifying code after the core development is complete. These prompts ensure that the code is performant, maintainable, and aligned with quality standards before it is considered finished.

## How to Use and Modify

The prompts in this phase are tools for self-reflection and improvement. You can modify them to enforce your project's specific definition of high-quality code.

### Customizing Performance Reviews
The [Performance Review](performance-review.md) prompt helps identify bottlenecks. To adapt this for your environment:
- Specify the performance metrics that matter most (e.g., Big O time complexity, memory allocation, bundle size, database query counts).
- Set specific latency constraints or acceptable rendering times that the AI must evaluate against.

### Adapting the Code Review Checklist
The [Code Review Checklist](code-review-checklist.md) is intended to catch errors before a human reviewer does. Make it your own by:
- Adding your team's specific "gotchas" or historical pain points to the checklist.
- Instructing the AI to check for specific accessibility (a11y) standards, internationalization (i18n) readiness, or logging requirements.

### Refining Refactor Opportunities
When using the [Refactor Opportunities](refactor-opportunities.md) prompt:
- Direct the AI toward preferred design patterns (e.g., "Suggest refactoring opportunities that move logic from controllers into domain services").
- Define the scope of refactoring (e.g., "Identify refactoring opportunities but do not change the public API of the functions").

## Contributing New Optimize Prompts
If you create prompts tailored for specific optimization tasks (e.g., SQL Query Optimization, CSS Bundle Reduction, Accessibility Audits), please submit them via a Pull Request.
