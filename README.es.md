<p align="center">
  <a href="https://forg.to/products/pudo" target="_blank" rel="noopener">
    <img src="https://forg.to/api/badges/upvote/pudo?theme=light&shape=square" alt="Pudo - Upvote on Forg on forg." height="48" />
  </a>
  <a href="https://unikorn.vn/p/pudo?ref=embed-pudo" target="_blank">
    <img src="https://unikorn.vn/api/widgets/badge/pudo?theme=light" alt="Pudo trên Unikorn.vn" style="width: 256px; height: 64px;" width="256" height="64" />
  </a>
  <a href="https://unikorn.vn/p/pudo?ref=embed-pudo" target="_blank">
    <img src="https://unikorn.vn/api/widgets/badge/pudo/rank?theme=light&type=daily" alt="Pudo - Hàng ngày" style="width: 250px; height: 64px;" width="250" height="64" />
  </a>
</p>

<p align="center">
  <img src="assets/Pudo_banner.png" alt="Sistema de Código PUDO" width="100%" />
</p>

<h3 align="center">Una metodología estructurada de 4 fases para programar con asistentes de IA.</h3>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Licencia: MIT" /></a>
  <img src="https://img.shields.io/badge/version-1.0.0-brightgreen.svg" alt="Versión 1.0.0" />
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-orange.svg" alt="PRs Bienvenidos" /></a>
  <img src="https://img.shields.io/badge/AI-agnostic-purple.svg" alt="Agnóstico a la IA" />
</p>

<p align="center">
  <b>🌍 Idiomas:</b>
  <a href="README.md">English</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.pt.md">Português</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.ru.md">Русский</a>
</p>

---

## El Problema

Abres tu editor. Escribes una solicitud vaga a tu asistente de IA. Este genera algo. Lo pegas. Funciona a medias. Pides una corrección. Rompe otra cosa. Repites el proceso durante 3 horas.

**Esto es la programación del caos.** Parece productivo, pero no lo es.

El problema no es la IA — es la **falta de estructura**. Sin una metodología clara, el desarrollo asistido por IA se convierte en un paseo aleatorio por tu base de código.

## La Solución: PUDO

**PUDO** te ofrece un ciclo repetible de 4 fases que convierte a la IA de una máquina tragamonedas en una herramienta de precisión.

| Fase | Objetivo | Tú Haces | La IA Hace |
|:---:|---|---|---|
| **(P) Plan (Planificar)** | Definir *qué* y *por qué* | Establecer alcance, restricciones, criterios de éxito | Redactar plan de implementación, identificar riesgos |
| **(U) Understand (Entender)** | Saber *dónde* y *cómo* | Señalar código relevante, explicar contexto | Analizar la base de código, mapear dependencias, buscar patrones |
| **(D) Develop (Desarrollar)** | Construir *eso* | Revisar, aprobar, probar | Escribir código, ejecutar pruebas, seguir el progreso |
| **(O) Optimize (Optimizar)** | Hacerlo *mejor* | Validar mejoras, integrar (merge) | Refactorizar, hacer benchmark, documentar cambios |

> **Concepto clave:** PUDO es un **ciclo**, no un proceso lineal (pipeline). Vuelves a visitar las fases a medida que aprendes más. Un descubrimiento en el Desarrollo podría enviarte de vuelta a la Planificación. Eso es lo esperado.

## Inicio Rápido

### 1. Comienza con la Planificación (Plan)

Antes de escribir cualquier código, define lo que estás construyendo:

```
Necesito construir [FUNCIÓN]. 
Los criterios de éxito son [CRITERIOS].
Las restricciones son [RESTRICCIONES].
Crea un plan de implementación antes de escribir código.
```

### 2. Pasa al Entendimiento (Understand)

Investiga antes de construir:

```
Antes de implementar, analiza el código existente:
- ¿Qué patrones ya están establecidos?
- ¿Qué dependencias están involucradas?
- ¿Qué se podría romper?
```

### 3. Ejecuta en el Desarrollo (Develop)

Construye con estructura:

```
Implementa el plan. Sigue el progreso con una lista de tareas (checklist).
Escribe pruebas junto a la implementación.
Señala cualquier desviación del plan.
```

### 4. Cierra con la Optimización (Optimize)

No lances el primer borrador:

```
Revisa la implementación:
- ¿Hay mejoras de rendimiento?
- ¿Es el código consistente con los patrones existentes?
- Escribe un resumen (walkthrough) explicando qué cambió y por qué.
```

### 5. Repite

Para cada tarea, cada función, cada corrección de errores. **Plan → Understand → Develop → Optimize.**

## Biblioteca de Prompts

PUDO viene con una [biblioteca de prompts lista para usar](prompts/) — **21 prompts** a lo largo de 4 fases y habilidades de dominio que puedes copiar y pegar en cualquier asistente de IA. Cada directorio de fase incluye un `README.md` detallado que explica cómo modificar y extender los prompts para las necesidades de tu equipo.

| Fase | Prompts |
|---|---|
| **(P)** Plan | [Definición de Alcance](prompts/plan/scope-definition.md) · [Borrador de Arquitectura](prompts/plan/architecture-draft.md) · [Evaluación de Riesgos](prompts/plan/risk-assessment.md) · [Esquema de Base de Datos](prompts/plan/database-schema-design.md) · [Contrato de API](prompts/plan/api-contract-design.md) · [Modelo de Amenazas de Seguridad](prompts/plan/security-threat-model.md) |
| **(U)** Understand | [Análisis de Banco de Código](prompts/understand/codebase-analysis.md) · [Auditoría de Dependencias](prompts/understand/dependency-audit.md) · [Reconocimiento de Patrones](prompts/understand/pattern-recognition.md) · [Análisis de Registros de Fallos](prompts/understand/crash-log-analysis.md) |
| **(D)** Develop | [Implementación de Función](prompts/develop/feature-implementation.md) · [Test-Driven Dev (TDD)](prompts/develop/test-driven-dev.md) · [Andamiaje de Componentes](prompts/develop/component-scaffold.md) · [Suite de Pruebas de Integración](prompts/develop/integration-test-suite.md) · [Suite de Pruebas E2E](prompts/develop/e2e-test-suite.md) |
| **(O)** Optimize | [Revisión de Rendimiento](prompts/optimize/performance-review.md) · [Lista de Revisión de Código](prompts/optimize/code-review-checklist.md) · [Oportunidades de Refactorización](prompts/optimize/refactor-opportunities.md) · [Análisis de Perfil de Memoria](prompts/optimize/memory-profiling.md) · [Solución de Problemas de Red](prompts/optimize/network-troubleshooting.md) |
| **Skills** | [Arquitectura y Planificación](skills/plan/SKILL.md) · [Ingeniería de Software](skills/code/SKILL.md) · [Resolución de Problemas y Diagnóstico](skills/debug/SKILL.md) · [Ingeniería DevOps](skills/devops/SKILL.md) · [Ingeniería de Pruebas (Test)](skills/test/SKILL.md) |
| **Herramientas DevOps** | [GitHub Actions](skills/devops/github-actions/SKILL.md) · [GitLab CI](skills/devops/gitlab-ci/SKILL.md) · [Argo CD](skills/devops/argo-cd/SKILL.md) · [Jenkins](skills/devops/jenkins/SKILL.md) · [Terraform](skills/devops/terraform/SKILL.md) · [Docker](skills/devops/docker/SKILL.md) · [Kubernetes](skills/devops/kubernetes/SKILL.md) |

## Integraciones con IA

PUDO está diseñado para ser el sistema operativo por defecto de tus agentes de IA. Hemos incluido instrucciones de sistema preescritas para las herramientas más populares:

- **[Claude Projects](claude.md)**: Pégalo en las instrucciones personalizadas de tu Proyecto.
- **[Cursor](cursor/.cursorrules)**: Cópialo en `.cursorrules` en la raíz de tu repositorio.
- **[OpenCode](opencode/opencode.md)**: Añádelo a los prompts del sistema de OpenCode o las instrucciones del workspace.
- **[Antigravity](antigravity/instructions.xml)**: Cópialo en `.gemini/antigravity/instructions.xml` en tu workspace.
- **[Kiro](kiro/system-prompt.md)**: Configúralo como prompt del sistema en los ajustes de Kiro.

## Filosofía

PUDO no es solo una lista de verificación — es una mentalidad. Lee la [filosofía completa](docs/philosophy.md) para entender los principios detrás del método.

**Resumen (TL;DR):**
- **Anti-caos** — La estructura supera a la improvisación a escala.
- **Iterativo** — Es un ciclo, no una cascada.
- **Nativo para IA** — Diseñado para la programación en pareja entre humanos e IA.
- **Integridad de fase** — Cada fase tiene criterios claros de entrada y salida.

## ¿Para Quién Es Esto?

- **Desarrolladores usando asistentes de IA** (ChatGPT, Claude, Gemini, Copilot, etc.) que desean mejores resultados.
- **Líderes de equipo** que buscan una metodología compartida para el desarrollo asistido por IA.
- **Estudiantes** que aprenden a programar con IA de la manera correcta desde el primer día.

## Contribuir

PUDO crece con la comunidad. Mira [CONTRIBUTING.md](CONTRIBUTING.md) para saber cómo:

- Añadir nuevos prompts a la biblioteca.
- Enviar ejemplos prácticos (walkthroughs).
- Mejorar la documentación.

## Soporte y Financiación

Si encuentras útil a PUDO, considera apoyar el proyecto:

- [Ko-fi](https://ko-fi.com/dongphuduong)
- [Buy Me a Coffee](https://buymeacoffee.com/lab68dev)
- **PayPal:** dongduong840@gmail.com

## Licencia

[MIT](LICENSE) — Úsalo, haz un fork, hazlo tuyo.

---

<p align="center">
  <strong>Deja de improvisar. Empieza con PUDO.</strong>
  <br /><br />
  <em>Plan → Understand → Develop → Optimize</em>
</p>
