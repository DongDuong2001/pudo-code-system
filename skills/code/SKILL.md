# Software Engineering Code Skill
> Skill, Coding, Implementation, Clean Code

## Context
Use this prompt when you have a clear plan and need the AI to generate the actual implementation code. This skill enforces strict adherence to clean code principles, testability, and robust error handling.

## Variables
- `{{specifications}}`: The detailed requirements or steps for the code you need.
- `{{language_framework}}`: The programming language and framework being used.
- `{{existing_patterns}}`: Any established patterns in the codebase that the AI must follow.

## Prompt
```text
Adopt the persona of a Senior Software Engineer. I need you to write production-ready code based on the following specifications:

Specifications: 
{{specifications}}

Language/Framework: 
{{language_framework}}

Existing Codebase Patterns to Follow:
{{existing_patterns}}

Please generate the implementation code adhering to these principles:
1. **Clean & Idiomatic:** Use standard conventions for the language. Keep functions small and focused on a single responsibility (SOLID principles).
2. **Robust Error Handling:** Do not swallow errors. Handle edge cases gracefully and use appropriate error boundaries or exceptions.
3. **Testable:** Write code that can be easily unit tested. Use dependency injection where appropriate.
4. **Self-Documenting:** Use clear, descriptive variable and function names. Only add comments to explain *why* something complex is being done, not *what* it is doing.

Provide the complete code blocks, avoiding abbreviations where possible.
```

## Example Usage

**Input:**
```text
Adopt the persona of a Senior Software Engineer. I need you to write production-ready code based on the following specifications:

Specifications: 
Create a React hook `useDebounce` that delays updating a value until a specified time has passed since the last change.

Language/Framework: 
TypeScript, React 18

Existing Codebase Patterns to Follow:
Always use generic types for custom hooks. Ensure strict typing.

Please generate the implementation code adhering to these principles:
[...rest of prompt...]
```
