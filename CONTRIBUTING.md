# Contributing to PUDO Code System

First off, thank you for considering contributing to PUDO! Every contribution helps make this methodology more useful for developers everywhere.

## How to Contribute

### Report Issues

Found a typo, broken link, or confusing explanation? [Open an issue](../../issues/new) with:

- A clear title describing the problem
- The file path or section where you found it
- A suggested fix (if you have one)

### Add a New Prompt

Prompts are the heart of PUDO. To add a new one:

1. **Fork** this repository
2. **Choose the right phase folder** under `prompts/`:
   - `prompts/plan/` — Scoping, architecture, risk assessment
   - `prompts/understand/` — Codebase analysis, research, pattern recognition
   - `prompts/develop/` — Implementation, testing, scaffolding
   - `prompts/optimize/` — Performance, refactoring, code review
3. **Follow the prompt template:**

```markdown
# [Prompt Name]

> **Phase:** Plan | Understand | Develop | Optimize
> **Tags:** #tag1, #tag2, #tag3
> **AI Model:** Any (model-agnostic)

## Context

When to use this prompt and what it assumes about the project.

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{variable_name}}` | What this represents | `example value` |

## Prompt

The actual prompt text here.

## Example Usage

### Input
Concrete example of filling in the variables.

### Expected Output
What a good response looks like.
```

4. **Submit a Pull Request** with a clear description of the prompt and when developers should use it.

### Add a New Example Walkthrough

Real-world examples make PUDO tangible. To add one:

1. Create a new folder under `examples/` with the pattern `XX-short-name/`
2. Include a `walkthrough.md` that covers all 4 PUDO phases
3. Show real decisions, tradeoffs, and outcomes — not idealized scenarios

### General Guidelines

- **Keep it practical.** PUDO is a methodology for doers, not theorists.
- **Be model-agnostic.** Prompts should work across AI assistants (ChatGPT, Claude, Gemini, etc.).
- **Write for clarity.** Assume the reader is a developer who's never heard of PUDO.
- **Test your prompts.** Before submitting, try the prompt with at least one AI model and verify the output is useful.

## Code of Conduct

Be respectful, constructive, and inclusive. We're all here to write better code.

## Questions?

Open a [Discussion](../../discussions) or reach out via Issues. We're happy to help.
