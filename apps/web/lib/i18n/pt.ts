import type { Dictionary } from "./en";

const pt: Dictionary = {
  meta: {
    title: "PUDO Code System — Camada operacional para agentes de programação com IA",
    description:
      "Padronize fluxos de trabalho no Claude, Cursor, Windsurf, Roo e Codex. Aplique portões de qualidade, passagens de contexto e uma rubrica de prontidão do repositório de 100 pontos.",
    docsTitle: "Documentação — PUDO Code System",
    docsDescription:
      "Guias operacionais para orquestração de agentes de IA, configuração do servidor MCP e arquiteturas cloud resilientes.",
    articleSuffix: "Documentação do PUDO",
  },
  nav: {
    workflow: "Fluxo de trabalho",
    generator: "Gerador de regras",
    mcp: "Protocolo MCP",
    calculator: "Rubrica de prontidão",
    docs: "Docs e playbooks",
    copyTitle: "Clique para copiar o comando de início rápido",
    github: "Repositório no GitHub",
    exploreDocs: "Ver documentação",
    language: "Idioma",
  },
  hero: {
    release: "Versão v1.4.0",
    announcement: "Prompts MCP interativos e malha multiagente",
    titleLead: "A camada operacional para",
    titleAccent: "agentes de programação com IA",
    subtitle:
      "Padronize fluxos de trabalho no Claude, Cursor, Windsurf, Roo e Codex. Aplique invariantes de arquitetura, passagens de contexto e prontidão do repositório baseada em evidências.",
    ctaGenerate: "Gerar regras de agente",
    ctaMcp: "Configurar servidor MCP",
    ctaPlaybooks: "Ler playbooks",
    copyTitle: "Copiar o comando ativo",
    copyCommand: "Copiar comando",
  },
  workflow: {
    eyebrow: "Protocolo de agentes disciplinado",
    title: "O ciclo de trabalho PUDO",
    intro:
      "Agentes autônomos se desviam quando não têm limites. O PUDO ancora cada ação da IA em um ciclo verificável de 4 fases: Plan, Understand, Develop e Optimize.",
    phase: "Fase",
    rulesHeading: "Regras e restrições aplicadas",
    outputLabel: "Saída real do agente",
    compliant: "Conforme PUDO",
    phases: {
      plan: {
        name: "Plan",
        tagline: "Defina os limites antes de escrever qualquer código.",
        summary:
          "Impede que os agentes partam para reescritas destrutivas. Exige escopo claro, critérios de aceitação, estratégias de teste e consentimento humano explícito para operações arriscadas.",
        rules: [
          "Defina os arquivos exatos a alterar antes de editar",
          "Declare o que está fora do escopo para evitar expansão",
          "Aprovação explícita do usuário para migrações destrutivas",
          "Identifique pré-condições e riscos de regressão desde o início",
        ],
        gate: "Portão: plano ou checklist de resumo do PR aprovado.",
      },
      understand: {
        name: "Understand",
        tagline: "Inspecione a realidade antes de assumir convenções.",
        summary:
          "Obriga os agentes a ler os arquivos existentes e respeitar os invariantes de arquitetura em vez de inventar pacotes, APIs imaginárias ou estilos desalinhados.",
        rules: [
          "Leia os arquivos de implementação relevantes antes de gerar diffs",
          "Siga os padrões, frameworks e estrutura de pastas existentes",
          "Nada de APIs inventadas, flags fictícias ou dependências fantasma",
          "Preserve os comentários e a documentação de licença existentes",
        ],
        gate: "Portão: zero endpoints inventados ou caminhos não inspecionados.",
      },
      develop: {
        name: "Develop",
        tagline: "Faça patches pequenos, focados e revisáveis.",
        summary:
          "Restringe o agente a alterações atômicas acompanhadas de testes. Se o plano ou os testes falharem, pare e replaneje em vez de aplicar remendos.",
        rules: [
          "Diffs atômicos e revisáveis em vez de substituir arquivos inteiros",
          "Sempre adicione ou atualize testes junto com mudanças funcionais",
          "Pare e replaneje diante de bloqueios inesperados",
          "Prepare cada arquivo individualmente com Conventional Commits",
        ],
        gate: "Portão: testes unitários e de integração passando em cada patch.",
      },
      optimize: {
        name: "Optimize",
        tagline: "Portões de qualidade, autorrevisão e continuidade da passagem.",
        summary:
          "Ciclo final de verificação antes de o código chegar às branches principais. Exige linter aprovado, verificações de desempenho e estado de passagem em .pudo/session.md.",
        rules: [
          "Autorrevisão de vazamentos de memória, casos extremos e desempenho",
          "Execute os portões de qualidade do repositório (`npm test`, `npm run check`)",
          "Registre o estado de passagem multiagente em `.pudo/session.md`",
          "Verifique a pontuação 100/100 antes de marcar um release candidate",
        ],
        gate: "Portão: o script automatizado de qualidade termina com código 0.",
      },
    },
  },
  generator: {
    eyebrow: "Gerador de regras interativo",
    title: "Configure as regras do agente para o seu stack",
    intro:
      "Escolha seu stack tecnológico e o editor de IA de destino. Copie o arquivo de regras gerado ou baixe-o direto na raiz do seu repositório.",
    toolLabel: "1. Ferramenta de IA de destino",
    stackLabel: "2. Stack do projeto",
    modeLabel: "3. Modo de aplicação",
    standard: "Padrão",
    standardDesc: "Fluxo PUDO + portões de segurança",
    strict: "Rigoroso",
    strictDesc: "Aprovação obrigatória para migrações e comandos",
    cliLabel: "Equivalente em uma linha de CLI",
    copy: "Copiar",
    copied: "Copiado!",
    copyCode: "Copiar código",
    downloadTitle: "Baixar o arquivo diretamente",
    download: "Baixar",
    ready: "Pronto para salvar",
    frameworks: {
      next: "React Server Components, App Router",
      react: "SPA, estado no cliente, hooks",
      fastapi: "Python assíncrono, Pydantic v2",
      django: "Python, ORM, modelos robustos",
      go: "cmd/, internal/, estrutura padrão",
      rust: "Cargo, custo zero, verificações com clippy",
      bun: "Runtime de alta velocidade, bun:test",
    },
  },
  mcp: {
    eyebrow: "Model Context Protocol",
    title: "Conecte o PUDO diretamente ao seu agente de IA",
    intro:
      "Dê ao Claude Desktop, Cursor e Windsurf acesso aos invariantes de arquitetura do seu repositório, ao catálogo de playbooks, aos executores de portões de qualidade e às passagens de contexto ao vivo.",
    copied: "Copiado",
    copyConfig: "Copiar configuração",
    target: "Destino",
    npmPackage: "Pacote npm",
    stdioTitle: "Stdio CLI / agente personalizado",
    stdioFile: "Execução de processo",
    stdioPath: "Canal direto de comunicação via E/S padrão",
    promptsTitle: "Prompts MCP interativos",
    promptsIntro: "Comandos slash no Claude ou Cursor que guiam os desenvolvedores por fluxos padronizados:",
    promptInit: "Configuração interativa das regras do projeto",
    promptPlan: "Defina escopo e estratégias de teste",
    promptOptimize: "Execute checklists de portões de qualidade",
    resourcesTitle: "Recursos do protocolo MCP",
    resourcesIntro: "Contexto ao vivo para LLMs sem estourar o limite de tokens do system prompt:",
    resourceRules: "Arquivo de regras ativo do repo",
    resourceSession: "Estado da sessão ativa",
    resourcePlaybooks: "Playbooks integrados",
  },
  score: {
    eyebrow: "Auditoria interativa",
    title: "Rubrica de prontidão do repositório de 100 pontos",
    intro:
      "O PUDO avalia repositórios com uma rubrica baseada em evidências. Ative ou desative os critérios abaixo para simular a pontuação de prontidão do seu repositório.",
    reset: "Redefinir para 100/100",
    pts: "pts",
    auditStatus: "Status da auditoria",
    ready: "PRONTO",
    caution: "ATENÇÃO",
    blocked: "BLOQUEADO",
    readyDesc: "O repositório está totalmente preparado para agentes de programação autônomos.",
    cautionDesc: "Seguro para copilotos, mas requer portões de qualidade adicionais.",
    blockedDesc: "Alto risco de alucinação ou de alterações sem controle pelo agente.",
    categories: {
      rules: {
        name: "Regras e invariantes do agente",
        short: "Regras",
        description: "Arquivos de instruções explícitos que orientam os limites e decisões do agente.",
      },
      context: {
        name: "Qualidade e estado do contexto",
        short: "Contexto",
        description: "Configurações do repositório, invariantes de arquitetura e passagens multiagente.",
      },
      workflow: {
        name: "Fluxo e portões de qualidade",
        short: "Fluxo",
        description: "Lint automatizado, suítes de teste e portões de verificação de pull requests.",
      },
      safety: {
        name: "Segurança de IA e do protocolo MCP",
        short: "Segurança",
        description: "Proteções dry-run, exclusão de arquivos sensíveis e controle de permissões.",
      },
      evidence: {
        name: "Evidência operacional",
        short: "Evidência",
        description: "Telemetria de execução de testes, builds reproduzíveis e histórico git atômico.",
      },
    },
    items: {
      "rules-file": {
        title: "Conjunto de regras principal existe",
        description: "O repositório contém AGENTS.md, .cursorrules, .windsurfrules ou CLAUDE.md.",
      },
      "rules-workflow": {
        title: "Ciclo PUDO definido",
        description: "O arquivo de regras descreve o ciclo Plan -> Understand -> Develop -> Optimize.",
      },
      "rules-boundaries": {
        title: "Limites explícitos de risco e escopo",
        description: "Instruções claras contra migrações destrutivas ou APIs inventadas.",
      },
      "rules-stack": {
        title: "Invariantes do stack documentados",
        description: "Diretrizes do framework (ex.: Server Components, schemas Pydantic) fornecidas.",
      },
      "context-config": {
        title: "Configuração do PUDO presente",
        description: ".pudo/config.json válido com metadados do projeto e nível de rigor.",
      },
      "context-session": {
        title: "Arquivo de passagem de sessão existe",
        description: ".pudo/session.md mantém a continuidade entre janelas de contexto do agente.",
      },
      "context-arch": {
        title: "Padrões de arquitetura e schemas",
        description: "Diretrizes claras de estrutura do repositório evitam desvios de arquitetura.",
      },
      "workflow-gates": {
        title: "Portões de verificação automatizados",
        description: "Scripts executáveis (npm test, npm run check) aplicados nos commits.",
      },
      "workflow-pr": {
        title: "Template de pull request PUDO",
        description: ".github/pull_request_template.md exige a declaração do plano e dos testes.",
      },
      "workflow-release": {
        title: "Protocolos de release e checklists",
        description: "Checklists de release documentados e procedimentos de versionamento SemVer.",
      },
      "safety-sensitive": {
        title: "Exclusão de caminhos sensíveis",
        description: ".env, segredos e credenciais excluídos dos context packs da IA.",
      },
      "safety-dryrun": {
        title: "Dry-run e aprovação de escrita",
        description: "Ferramentas de IA mostram por padrão uma prévia antes de gravar em disco.",
      },
      "safety-hallucination": {
        title: "Restrições contra alucinação",
        description: "Os agentes devem falhar cedo em vez de inventar APIs hipotéticas.",
      },
      "evidence-tests": {
        title: "Suíte de testes passando",
        description: "Todos os testes unitários e de integração passam sem regressões.",
      },
      "evidence-git": {
        title: "Disciplina de Conventional Commits",
        description: "Histórico git limpo com commits atômicos e revisáveis.",
      },
    },
  },
  playbooks: {
    eyebrow: "Playbooks de engenharia",
    title: "Padrões de arquitetura para IA e cloud",
    intro:
      "Projetos reais para construir sistemas LLM resilientes, coordenar ciclos multiagente e estruturar bancos de dados distribuídos.",
    viewAll: "Ver todos os playbooks",
    readGuide: "Ler guia",
  },
  footer: {
    about:
      "Uma camada operacional de código aberto para agentes de programação com IA. Aplica a metodologia PUDO (Plan, Understand, Develop, Optimize), prontidão do repositório baseada em evidências e integrações com Model Context Protocol.",
    toolsHeading: "Ferramentas para desenvolvedores",
    toolWorkflow: "Ciclo da metodologia PUDO",
    toolGenerator: "Gerador de regras interativo",
    toolMcp: "Central do Model Context Protocol",
    toolRubric: "Rubrica de prontidão de 100 pontos",
    docsHeading: "Playbooks e docs",
    docQuickstart: "Guia de início rápido",
    docLlm: "Arquitetura de apps LLM",
    docAgents: "Orquestração multiagente",
    docDatabase: "Design e indexação de bancos de dados",
    license: "Licença MIT © 2026 Dong Duong (DongDuong2001). Feito para uma engenharia de IA disciplinada.",
    hosted: "Hospedado na Vercel",
    tracking: "Sem rastreamento",
  },
  docs: {
    sidebar: "Documentação",
    eyebrow: "Documentação e playbooks",
    title: "Central de conhecimento PUDO",
    intro:
      "Guias operacionais completos sobre orquestração de agentes de IA, configuração do servidor MCP e arquiteturas cloud resilientes.",
    searchPlaceholder: "Busque guias, playbooks, tags (ex.: RAG, MCP, PostgreSQL, Multi-Agent)...",
    read: "Ler",
    noResults: "Nenhum artigo corresponde à sua busca.",
    noResultsHint: 'Tente buscar "RAG", "MCP" ou "Index".',
    breadcrumb: "Docs",
    codeLabel: "Padrão PUDO",
    previous: "Anterior",
    next: "Próximo",
    minRead: "min de leitura",
    englishOnly: "Este artigo está disponível apenas em inglês.",
    categories: {
      "Getting Started": "Primeiros passos",
      "AI Engineering": "Engenharia de IA",
      "DevOS System Architecture": "Arquitetura de sistemas DevOS",
    },
  },
};

export default pt;
