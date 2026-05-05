# Habilidad de Resolución de Problemas y Depuración
> Skill, Debugging, SRE, Bug Fixing

## Contexto
Usa este prompt cuando te enfrentes a un error (bug), un rastro de error (error trace) o un comportamiento inesperado. Esta habilidad obliga a la IA a actuar como un solucionador de problemas (troubleshooter), analizando las causas raíz de manera sistemática en lugar de solo adivinar soluciones.

## Variables
- `{{error_message}}`: El mensaje de error exacto o la salida del registro (log).
- `{{behavior_description}}`: Lo que esperabas que sucediera en comparación con lo que realmente sucedió.
- `{{context_code}}`: El fragmento (snippet) de código donde está ocurriendo el error.

## Prompt
```text
Adopta el rol de un Ingeniero de Confiabilidad del Sistema (SRE) Senior / Solucionador de Problemas. Me estoy enfrentando a un error (bug) y necesito tu ayuda para diagnosticarlo y solucionarlo sistemáticamente.

Mensaje de Error / Stack Trace:
{{error_message}}

Comportamiento Esperado vs Real:
{{behavior_description}}

Contexto de Código Relevante:
{{context_code}}

Por favor, sigue esta metodología de depuración:
1. **Análisis de Causa Raíz:** Analiza el error y el código para explicar exactamente *por qué* está ocurriendo este error a nivel técnico.
2. **Hipótesis:** Proporciona 1 o 2 razones probables si la causa raíz no es 100% obvia a partir del fragmento de código.
3. **La Solución (The Fix):** Proporciona los cambios de código exactos requeridos para resolver el problema.
4. **Prevención de Regresiones:** Explica brevemente cómo esta solución asegura que el error no volverá a suceder (ej. manejo de casos extremos).

No intentes adivinar a ciegas. Si necesitas más información para diagnosticar el problema con precisión, pídela.
```

## Ejemplo de Uso

**Entrada:**
```text
Adopta el rol de un Ingeniero de Confiabilidad del Sistema (SRE) Senior / Solucionador de Problemas. Me estoy enfrentando a un error (bug) y necesito tu ayuda para diagnosticarlo y solucionarlo sistemáticamente.

Mensaje de Error / Stack Trace:
TypeError: Cannot read properties of undefined (reading 'map') at UserList.tsx:24

Comportamiento Esperado vs Real:
Esperaba que se renderizara la lista de usuarios, pero la aplicación se bloquea (crashes) cuando la API tarda demasiado en responder.

Contexto de Código Relevante:
const UserList = ({ users }) => {
  return <div>{users.map(u => <span key={u.id}>{u.name}</span>)}</div>
}

Por favor, sigue esta metodología de depuración:
[...resto del prompt...]
```
