# Habilidad de Arquitectura y Planificación
> Skill, System Design, Architecture, Planning

## Contexto
Usa este prompt cuando estés al comienzo de un proyecto o función y necesites diseñar la arquitectura, definir los modelos de datos, trazar los contratos de API o desglosar los pasos de implementación. Esta habilidad obliga a la IA a pensar como un Arquitecto Principal (Principal Architect).

## Variables
- `{{project_goal}}`: Descripción de alto nivel de lo que intentas construir.
- `{{tech_stack}}`: Los lenguajes, frameworks y bases de datos que estás usando.
- `{{constraints}}`: Cualquier restricción técnica, de negocio o de tiempo.

## Prompt
```text
Adopta el rol de un Arquitecto de Software Principal. Necesito tu experiencia para diseñar la arquitectura y el plan de implementación para el siguiente proyecto:

Objetivo: {{project_goal}}
Tech Stack: {{tech_stack}}
Restricciones: {{constraints}}

Por favor, proporciona un diseño arquitectónico completo que incluya:
1. **Visión General del Sistema:** Una explicación de alto nivel de cómo funcionará el sistema.
2. **Desglose de Componentes:** Los principales módulos, servicios o componentes requeridos.
3. **Flujo de Datos y Modelos:** Cómo se mueven los datos a través del sistema y las estructuras principales de los esquemas (schemas).
4. **Mitigación de Riesgos:** Posibles cuellos de botella, problemas de seguridad o deuda técnica, y cómo evitarlos.
5. **Pasos de Implementación:** Una secuencia lógica y ordenada de tareas de desarrollo para construir esto.

No escribas el código de implementación. Céntrate puramente en el diseño y la arquitectura.
```

## Ejemplo de Uso

**Entrada:**
```text
Adopta el rol de un Arquitecto de Software Principal. Necesito tu experiencia para diseñar la arquitectura y el plan de implementación para el siguiente proyecto:

Objetivo: Construir un editor de markdown colaborativo en tiempo real.
Tech Stack: Next.js, WebSockets, Redis, PostgreSQL
Restricciones: Debe manejar hasta 50 usuarios concurrentes en el mismo documento sin problemas de latencia.

Por favor, proporciona un diseño arquitectónico completo que incluya:
[...resto del prompt...]
```
