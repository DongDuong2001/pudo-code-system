# Develop Phase Prompts

The **Develop** phase is where the actual code generation and implementation happens. These prompts are designed to yield predictable, testable, and robust code by referencing the work done in the Plan and Understand phases.

## How to Use and Modify

The execution stage requires strict adherence to project standards. You can and should modify these prompts to bake in your project's non-negotiable coding conventions.

### Modifying Feature Implementation
The [Feature Implementation](feature-implementation.md) prompt is built to execute a planned feature. Modify this prompt by adding permanent context about your project:
- Add rules about state management (e.g., "Always use Zustand for global state, never React Context").
- Include rules about error handling (e.g., "All custom exceptions must extend `BaseAppError`").

### Tailoring Test-Driven Development (TDD)
The [Test-Driven Dev](test-driven-dev.md) prompt ensures tests are written alongside or before feature code. To make this prompt work best for you:
- Specify your testing framework (e.g., Jest, PyTest, JUnit) directly in the prompt.
- Define what types of tests you expect (unit vs. integration).
- Include mocking strategies (e.g., "Always use MSW for mocking network requests").

### Standardizing Component Scaffolding
When using the [Component Scaffold](component-scaffold.md) prompt to create boilerplate:
- Modify it to output your exact folder structure (e.g., `ComponentName/index.tsx`, `ComponentName/styles.module.css`, `ComponentName/ComponentName.test.tsx`).
- Inject your preferred styling solution (e.g., Tailwind CSS, Styled Components) into the template.

## Contributing New Develop Prompts
If you develop prompts for specific tasks like database migrations, API endpoint generation, or UI component storybook generation, please submit them via a Pull Request.
