import type { Dictionary } from "./en";

const es: Dictionary = {
  meta: {
    title: "PUDO Code System — Capa operativa para agentes de programación con IA",
    description:
      "Estandariza los flujos de trabajo en Claude, Cursor, Windsurf, Roo y Codex. Aplica puertas de calidad, traspasos de contexto y una rúbrica de preparación del repositorio de 100 puntos.",
    docsTitle: "Documentación — PUDO Code System",
    docsDescription:
      "Guías operativas para la orquestación de agentes de IA, la configuración del servidor MCP y arquitecturas cloud resilientes.",
    articleSuffix: "Documentación de PUDO",
  },
  nav: {
    workflow: "Flujo de trabajo",
    generator: "Generador de reglas",
    mcp: "Protocolo MCP",
    calculator: "Rúbrica de preparación",
    docs: "Docs y playbooks",
    copyTitle: "Haz clic para copiar el comando de inicio rápido",
    github: "Repositorio en GitHub",
    exploreDocs: "Ver documentación",
    language: "Idioma",
  },
  hero: {
    release: "Versión v1.4.0",
    announcement: "Prompts MCP interactivos y malla multiagente",
    titleLead: "La capa operativa para",
    titleAccent: "agentes de programación con IA",
    subtitle:
      "Estandariza los flujos de trabajo en Claude, Cursor, Windsurf, Roo y Codex. Aplica invariantes de arquitectura, traspasos de contexto y una preparación del repositorio basada en evidencia.",
    ctaGenerate: "Generar reglas de agente",
    ctaMcp: "Configurar servidor MCP",
    ctaPlaybooks: "Leer playbooks",
    copyTitle: "Copiar el comando activo",
    copyCommand: "Copiar comando",
  },
  workflow: {
    eyebrow: "Protocolo de agentes disciplinado",
    title: "El ciclo de trabajo PUDO",
    intro:
      "Los agentes autónomos se desvían cuando no tienen límites. PUDO ancla cada acción de la IA en un ciclo verificable de 4 fases: Plan, Understand, Develop y Optimize.",
    phase: "Fase",
    rulesHeading: "Reglas y restricciones aplicadas",
    outputLabel: "Salida real del agente",
    compliant: "Cumple PUDO",
    phases: {
      plan: {
        name: "Plan",
        tagline: "Define los límites antes de escribir código.",
        summary:
          "Evita que los agentes se lancen a reescrituras destructivas. Exige un alcance claro, criterios de aceptación, estrategias de prueba y consentimiento humano explícito para operaciones de riesgo.",
        rules: [
          "Define los archivos exactos a modificar antes de editar",
          "Declara lo que queda fuera de alcance para evitar desbordes",
          "Aprobación explícita del usuario para migraciones destructivas",
          "Identifica precondiciones y riesgos de regresión desde el inicio",
        ],
        gate: "Puerta: plan o checklist de resumen del PR aprobado.",
      },
      understand: {
        name: "Understand",
        tagline: "Inspecciona la realidad antes de asumir convenciones.",
        summary:
          "Obliga a los agentes a leer los archivos existentes y respetar los invariantes de arquitectura en lugar de inventar paquetes, APIs imaginarias o estilos incoherentes.",
        rules: [
          "Lee los archivos de implementación relevantes antes de generar diffs",
          "Sigue los patrones, frameworks y estructura de carpetas existentes",
          "Nada de APIs inventadas, flags ficticios ni dependencias fantasma",
          "Conserva los comentarios y la documentación de licencia",
        ],
        gate: "Puerta: cero endpoints inventados o rutas sin inspeccionar.",
      },
      develop: {
        name: "Develop",
        tagline: "Haz parches pequeños, enfocados y revisables.",
        summary:
          "Limita al agente a cambios atómicos acompañados de pruebas. Si el plan o las pruebas fallan, detente y vuelve a planificar en lugar de aplicar parches improvisados.",
        rules: [
          "Diffs atómicos y revisables en lugar de reemplazar archivos completos",
          "Añade o actualiza siempre las pruebas junto a los cambios funcionales",
          "Detente y vuelve a planificar ante bloqueos inesperados",
          "Prepara cada archivo por separado con Conventional Commits",
        ],
        gate: "Puerta: pruebas unitarias y de integración superadas en cada parche.",
      },
      optimize: {
        name: "Optimize",
        tagline: "Puertas de calidad, autorrevisión y continuidad del traspaso.",
        summary:
          "Ciclo final de verificación antes de que el código llegue a las ramas principales. Exige pasar el linter, revisar el rendimiento y guardar el estado de traspaso en .pudo/session.md.",
        rules: [
          "Autorrevisión de fugas de memoria, casos límite y rendimiento",
          "Ejecuta las puertas de calidad del repositorio (`npm test`, `npm run check`)",
          "Registra el estado de traspaso multiagente en `.pudo/session.md`",
          "Verifica una puntuación de 100/100 antes de etiquetar un release candidate",
        ],
        gate: "Puerta: el script de calidad automatizado termina con código 0.",
      },
    },
  },
  generator: {
    eyebrow: "Generador de reglas interactivo",
    title: "Configura las reglas del agente para tu stack",
    intro:
      "Elige tu stack tecnológico y el editor de IA de destino. Copia el archivo de reglas generado o descárgalo directamente en la raíz de tu repositorio.",
    toolLabel: "1. Herramienta de IA de destino",
    stackLabel: "2. Stack del proyecto",
    modeLabel: "3. Modo de aplicación",
    standard: "Estándar",
    standardDesc: "Flujo PUDO + puertas de seguridad",
    strict: "Estricto",
    strictDesc: "Aprobación obligatoria para migraciones y comandos",
    cliLabel: "Equivalente en una línea de CLI",
    copy: "Copiar",
    copied: "¡Copiado!",
    copyCode: "Copiar código",
    downloadTitle: "Descargar el archivo directamente",
    download: "Descargar",
    ready: "Listo para guardar",
    frameworks: {
      next: "React Server Components, App Router",
      react: "SPA, estado en el cliente, hooks",
      fastapi: "Python asíncrono, Pydantic v2",
      django: "Python, ORM, modelos gruesos",
      go: "cmd/, internal/, estructura estándar",
      rust: "Cargo, coste cero, revisiones con clippy",
      bun: "Runtime de alta velocidad, bun:test",
    },
  },
  mcp: {
    eyebrow: "Model Context Protocol",
    title: "Conecta PUDO directamente a tu agente de IA",
    intro:
      "Da a Claude Desktop, Cursor y Windsurf acceso a los invariantes de arquitectura de tu repositorio, el catálogo de playbooks, los ejecutores de puertas de calidad y los traspasos de contexto en vivo.",
    copied: "Copiado",
    copyConfig: "Copiar configuración",
    target: "Destino",
    npmPackage: "Paquete npm",
    stdioTitle: "Stdio CLI / agente personalizado",
    stdioFile: "Ejecución de proceso",
    stdioPath: "Canal directo de comunicación por E/S estándar",
    promptsTitle: "Prompts MCP interactivos",
    promptsIntro: "Comandos slash en Claude o Cursor que guían a los desarrolladores por flujos estandarizados:",
    promptInit: "Configuración interactiva de reglas del proyecto",
    promptPlan: "Define el alcance y las estrategias de prueba",
    promptOptimize: "Ejecuta los checklists de puertas de calidad",
    resourcesTitle: "Recursos del protocolo MCP",
    resourcesIntro: "Contexto en vivo para LLMs sin saturar el límite de tokens del system prompt:",
    resourceRules: "Archivo de reglas activo del repo",
    resourceSession: "Estado de la sesión activa",
    resourcePlaybooks: "Playbooks integrados",
  },
  score: {
    eyebrow: "Auditoría interactiva",
    title: "Rúbrica de preparación del repositorio de 100 puntos",
    intro:
      "PUDO evalúa los repositorios con una rúbrica basada en evidencia. Activa o desactiva los criterios para simular la puntuación de preparación de tu repositorio.",
    reset: "Restablecer a 100/100",
    pts: "pts",
    auditStatus: "Estado de la auditoría",
    ready: "LISTO",
    caution: "PRECAUCIÓN",
    blocked: "BLOQUEADO",
    readyDesc: "El repositorio está totalmente preparado para agentes de programación autónomos.",
    cautionDesc: "Seguro para copilotos, pero requiere puertas de calidad adicionales.",
    blockedDesc: "Alto riesgo de alucinaciones o cambios sin control por parte del agente.",
    categories: {
      rules: {
        name: "Reglas e invariantes del agente",
        short: "Reglas",
        description: "Archivos de instrucciones explícitos que guían los límites y decisiones del agente.",
      },
      context: {
        name: "Calidad y estado del contexto",
        short: "Contexto",
        description: "Configuración del repositorio, invariantes de arquitectura y traspasos multiagente.",
      },
      workflow: {
        name: "Flujo y puertas de calidad",
        short: "Flujo",
        description: "Linting automatizado, suites de pruebas y puertas de verificación de pull requests.",
      },
      safety: {
        name: "Seguridad de IA y del protocolo MCP",
        short: "Seguridad",
        description: "Protecciones dry-run, exclusión de archivos sensibles y control de permisos.",
      },
      evidence: {
        name: "Evidencia operativa",
        short: "Evidencia",
        description: "Telemetría de ejecución de pruebas, builds reproducibles e historial git atómico.",
      },
    },
    items: {
      "rules-file": {
        title: "Existe un conjunto de reglas principal",
        description: "El repositorio contiene AGENTS.md, .cursorrules, .windsurfrules o CLAUDE.md.",
      },
      "rules-workflow": {
        title: "Ciclo PUDO definido",
        description: "El archivo de reglas describe el ciclo Plan -> Understand -> Develop -> Optimize.",
      },
      "rules-boundaries": {
        title: "Límites explícitos de riesgo y alcance",
        description: "Instrucciones claras contra migraciones destructivas o APIs inventadas.",
      },
      "rules-stack": {
        title: "Invariantes del stack documentados",
        description: "Incluye pautas del framework (p. ej., Server Components, esquemas Pydantic).",
      },
      "context-config": {
        title: "Configuración de PUDO presente",
        description: ".pudo/config.json válido con metadatos del proyecto y nivel de rigor.",
      },
      "context-session": {
        title: "Existe el archivo de traspaso de sesión",
        description: ".pudo/session.md mantiene la continuidad entre ventanas de contexto del agente.",
      },
      "context-arch": {
        title: "Estándares de arquitectura y esquemas",
        description: "Pautas claras de estructura del repositorio que evitan la deriva arquitectónica.",
      },
      "workflow-gates": {
        title: "Puertas de verificación automatizadas",
        description: "Scripts ejecutables (npm test, npm run check) aplicados en cada commit.",
      },
      "workflow-pr": {
        title: "Plantilla de pull request PUDO",
        description: ".github/pull_request_template.md exige declarar el plan y las pruebas.",
      },
      "workflow-release": {
        title: "Protocolos de release y checklists",
        description: "Checklists de release documentados y procedimientos de versionado SemVer.",
      },
      "safety-sensitive": {
        title: "Exclusión de rutas sensibles",
        description: ".env, secretos y credenciales excluidos de los context packs de la IA.",
      },
      "safety-dryrun": {
        title: "Dry-run y aprobación de escritura",
        description: "Las herramientas de IA muestran por defecto una vista previa antes de escribir en disco.",
      },
      "safety-hallucination": {
        title: "Restricciones contra alucinaciones",
        description: "Los agentes deben fallar pronto en lugar de inventar APIs hipotéticas.",
      },
      "evidence-tests": {
        title: "Suite de pruebas en verde",
        description: "Todas las pruebas unitarias y de integración pasan sin regresiones.",
      },
      "evidence-git": {
        title: "Disciplina de Conventional Commits",
        description: "Historial git limpio con commits atómicos y revisables.",
      },
    },
  },
  playbooks: {
    eyebrow: "Playbooks de ingeniería",
    title: "Estándares de arquitectura para IA y cloud",
    intro:
      "Planos reales para construir sistemas LLM resilientes, coordinar ciclos multiagente y estructurar bases de datos distribuidas.",
    viewAll: "Ver todos los playbooks",
    readGuide: "Leer guía",
  },
  footer: {
    about:
      "Una capa operativa de código abierto para agentes de programación con IA. Aplica la metodología PUDO (Plan, Understand, Develop, Optimize), una preparación del repositorio basada en evidencia e integraciones con Model Context Protocol.",
    toolsHeading: "Herramientas para desarrolladores",
    toolWorkflow: "Ciclo de la metodología PUDO",
    toolGenerator: "Generador de reglas interactivo",
    toolMcp: "Centro de Model Context Protocol",
    toolRubric: "Rúbrica de preparación de 100 puntos",
    docsHeading: "Playbooks y docs",
    docQuickstart: "Guía de inicio rápido",
    docLlm: "Arquitectura de apps LLM",
    docAgents: "Orquestación multiagente",
    docDatabase: "Diseño e indexación de bases de datos",
    license: "Licencia MIT © 2026 Dong Duong (DongDuong2001). Hecho para una ingeniería de IA disciplinada.",
    hosted: "Alojado en Vercel",
    tracking: "Sin rastreo",
  },
  docs: {
    sidebar: "Documentación",
    eyebrow: "Documentación y playbooks",
    title: "Centro de conocimiento PUDO",
    intro:
      "Guías operativas completas sobre orquestación de agentes de IA, configuración del servidor MCP y arquitecturas cloud resilientes.",
    searchPlaceholder: "Busca guías, playbooks, etiquetas (p. ej., RAG, MCP, PostgreSQL, Multi-Agent)...",
    read: "Leer",
    noResults: "Ningún artículo coincide con tu búsqueda.",
    noResultsHint: 'Prueba a buscar "RAG", "MCP" o "Index".',
    breadcrumb: "Docs",
    codeLabel: "Estándar PUDO",
    previous: "Anterior",
    next: "Siguiente",
    minRead: "min de lectura",
    englishOnly: "Este artículo solo está disponible en inglés.",
    categories: {
      "Getting Started": "Primeros pasos",
      "AI Engineering": "Ingeniería de IA",
      "DevOS System Architecture": "Arquitectura de sistemas DevOS",
    },
  },
};

export default es;
