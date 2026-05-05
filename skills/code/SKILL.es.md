# Habilidad de Ingeniería de Software
> Skill, Coding, Implementation, Clean Code

## Contexto
Usa este prompt cuando tengas un plan claro y necesites que la IA genere el código de implementación real. Esta habilidad impone una estricta adherencia a los principios de Clean Code, la testabilidad y un sólido manejo de errores.

## Variables
- `{{specifications}}`: Los requisitos o pasos detallados para el código que necesitas.
- `{{language_framework}}`: El lenguaje de programación y el framework que se están utilizando.
- `{{existing_patterns}}`: Cualquier patrón establecido en la base de código que la IA deba seguir.

## Prompt
```text
Adopta el rol de un Ingeniero de Software Senior. Necesito que escribas código listo para producción basado en las siguientes especificaciones:

Especificaciones: 
{{specifications}}

Lenguaje/Framework: 
{{language_framework}}

Patrones Existentes en la Base de Código a Seguir:
{{existing_patterns}}

Por favor, genera el código de implementación adhiriéndote a estos principios:
1. **Limpio e Idiomático (Clean & Idiomatic):** Usa convenciones estándar para el lenguaje. Mantén las funciones pequeñas y enfocadas en una sola responsabilidad (Principios SOLID).
2. **Manejo Sólido de Errores:** No ignores (swallow) los errores. Maneja los casos extremos (edge cases) con elegancia y usa límites de error (error boundaries) o excepciones adecuadas.
3. **Testable:** Escribe código que pueda ser fácilmente probado de forma unitaria. Usa inyección de dependencias cuando sea apropiado.
4. **Autodocumentado (Self-Documenting):** Usa nombres de variables y funciones claros y descriptivos. Solo agrega comentarios para explicar *por qué* se está haciendo algo complejo, no *qué* está haciendo.

Proporciona los bloques de código completos, evitando abreviaturas siempre que sea posible.
```

## Ejemplo de Uso

**Entrada:**
```text
Adopta el rol de un Ingeniero de Software Senior. Necesito que escribas código listo para producción basado en las siguientes especificaciones:

Especificaciones: 
Crea un React hook `useDebounce` que retrase la actualización de un valor hasta que haya pasado un tiempo especificado desde el último cambio.

Lenguaje/Framework: 
TypeScript, React 18

Patrones Existentes en la Base de Código a Seguir:
Usa siempre tipos genéricos (generic types) para custom hooks. Asegura un tipado estricto (strict typing).

Por favor, genera el código de implementación adhiriéndote a estos principios:
[...resto del prompt...]
```
