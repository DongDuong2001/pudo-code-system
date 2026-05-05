# Understand Phase Prompts

The **Understand** phase ensures that context and existing codebase patterns are fully established before any code modifications occur. These prompts help the AI safely explore unfamiliar code, recognize patterns, and audit dependencies.

## How to Use and Modify

The prompts in this folder focus on reading and summarizing code. You can easily modify them to suit specific framework requirements or corporate standards.

### Customizing Codebase Analysis
The [Codebase Analysis](codebase-analysis.md) prompt is generic. To modify it for specific tech stacks:
- Hardcode directory constraints (e.g., "Only analyze files within `src/components` and ignore `src/legacy`").
- Add formatting instructions for the output, such as requesting a JSON output or a specific Markdown structure for documentation purposes.

### Focusing Dependency Audits
When using the [Dependency Audit](dependency-audit.md) prompt, you can enhance it by appending internal security guidelines or specific versions to avoid. For example, "Highlight any use of Lodash, as we are migrating to native ES6 methods."

### Extending Pattern Recognition
The [Pattern Recognition](pattern-recognition.md) prompt asks the AI to deduce conventions from existing code. To make this more strict, you can modify the prompt to explicitly check against an internal style guide or linting rules (e.g., "Ensure pattern recognition adheres to the Airbnb JavaScript Style Guide").

## Contributing New Understand Prompts
If you create prompts that map out API endpoints, extract routing logic, or document data models, please submit a Pull Request following the standard template format.
