<p align="center">
  <a href="https://forg.to/products/pudo" target="_blank" rel="noopener">
    <img src="https://forg.to/api/badges/upvote/pudo?theme=light&shape=square" alt="Pudo - Upvote on Forg on forg." height="48" />
  </a>
  <a href="https://forg.to/products/pudo" target="_blank" rel="noopener"><img src="https://forg.to/api/badges/launch-winner/pudo" alt="Pudo - 1st Place on Forg" width="200" />
  </a>
  <a href="https://unikorn.vn/p/pudo?ref=embed-pudo" target="_blank">
    <img src="https://unikorn.vn/api/widgets/badge/pudo?theme=light" alt="Pudo trên Unikorn.vn" height="48" />
  </a>
  <a href="https://unikorn.vn/p/pudo?ref=embed-pudo" target="_blank">
    <img src="https://unikorn.vn/api/widgets/badge/pudo/rank?theme=light&type=weekly" alt="Pudo - Hàng tuần" height="48" />
  </a>
</p>

<p align="center">
  <img src="assets/Pudo_banner.png" alt="Sistema de Código PUDO" width="100%" />
</p>

<h3 align="center">Uma metodologia estruturada de 4 fases para programar com assistentes de IA.</h3>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Licença: MIT" /></a>
  <img src="https://img.shields.io/badge/version-1.1.0-brightgreen.svg" alt="Versão 1.1.0" />
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-orange.svg" alt="PRs Bem-vindos" /></a>
  <img src="https://img.shields.io/badge/AI-agnostic-purple.svg" alt="Agnóstico de IA" />
</p>

<p align="center">
  <b>🌍 Idiomas:</b>
  <a href="README.md">English</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.pt.md">Português</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.ru.md">Русский</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/watch?v=yjRRjrx6Ews" target="_blank">
    <img src="https://img.youtube.com/vi/yjRRjrx6Ews/maxresdefault.jpg" alt="Watch the PUDO Code System overview video" width="80%" />
    <br />
    <strong>🎥 Watch the PUDO Code System overview video</strong>
  </a>
</p>

---

## O Problema

Você abre seu editor. Você digita uma solicitação vaga para seu assistente de IA. Ele gera algo. Você cola. Funciona pela metade. Você pede uma correção. Quebra outra coisa. Repita por 3 horas.

**Isso é a programação do caos.** Parece produtivo, mas não é.

O problema não é a IA — é a **falta de estrutura**. Sem uma metodologia clara, o desenvolvimento assistido por IA se torna uma caminhada aleatória pela sua base de código.

## A Solução: PUDO

**PUDO** oferece um ciclo repetível de 4 fases que transforma a IA de uma máquina caça-níqueis em uma ferramenta de precisão.

| Fase | Objetivo | Você Faz | IA Faz |
|:---:|---|---|---|
| **(P) Plan (Planejar)** | Definir *o que* e *por quê* | Definir escopo, restrições, critérios de sucesso | Elaborar plano de implementação, identificar riscos |
| **(U) Understand (Entender)** | Saber *onde* e *como* | Apontar para o código relevante, explicar o contexto | Analisar a base de código, mapear dependências, encontrar padrões |
| **(D) Develop (Desenvolver)** | Construir *isso* | Revisar, aprovar, testar | Escrever código, executar testes, acompanhar o progresso |
| **(O) Optimize (Otimizar)** | Tornar *melhor* | Validar melhorias, mesclar (merge) | Refatorar, benchmark, documentar alterações |

> **Conceito chave:** PUDO é um **ciclo**, não um pipeline. Você revisita as fases à medida que aprende mais. Uma descoberta no Desenvolvimento pode enviá-lo de volta ao Planejamento. Isso é esperado.

## Portões de Qualidade

Cada fase termina com um portão de controle. Não avance até que esse portão passe, ou até que o risco tenha sido explicitamente aceito.

| Portão | Executado antes de | Deve provar |
|---|---|---|
| **Plan Gate** | Understand | Escopo, critérios de sucesso, restrições e itens fora de escopo estão claros |
| **Understand Gate** | Develop | Os arquivos relevantes, a arquitetura, as APIs e os padrões foram verificados |
| **Develop Gate** | Optimize | A implementação permanece no escopo, tem testes e cobre os principais edge cases |
| **Optimize Gate** | Release | Refactors não mudam comportamento; desempenho, segurança, documentação e riscos foram revisados |
| **Release Gate** | Merge/deploy | Changelog, migração, rollback, monitoramento e aprovação do owner foram tratados |

Comece com [Quality Gates](quality/quality-gates.md), use os [QC checklists](quality/qc-checklists.md), revise alterações geradas por IA com [AI Output Review](quality/ai-output-review.md), e use failure modes do [general edge case catalogue](quality/edge-cases/general.md).

## Impacto Esperado

Esses números são estimativas práticas e direcionais, não garantias. O ganho depende do tamanho da tarefa, da qualidade do repositório e de quão consistentemente a equipe realmente segue o PUDO.

| Tipo de tarefa | Redução de desperdício de tokens | Redução do tempo de desenvolvimento |
|---|---:|---:|
| Correção de uma linha / script pequeno | 0-8% | -5% a +5% |
| Feature pequena ou média | 25-38% | 12-20% |
| Bug difícil / incidente de produção | 22-35% | 10-18% |
| Feature com muitos arquivos / testes / handoff de equipe | 35-48% | 18-28% |
| Média prática para comunicar | **34%** | **18%** |

## Início Rápido

### 1. Comece com o Planejamento (Plan)

Antes de escrever qualquer código, defina o que você está construindo:

```
Eu preciso construir [RECURSO]. 
Os critérios de sucesso são [CRITÉRIOS].
As restrições são [RESTRIÇÕES].
Crie um plano de implementação antes de escrever qualquer código.
```

### 2. Siga para o Entendimento (Understand)

Pesquise antes de construir:

```
Antes de implementar, analise a base de código existente:
- Quais padrões já estão estabelecidos?
- Quais dependências estão envolvidas?
- O que pode quebrar?
```

### 3. Execute no Desenvolvimento (Develop)

Construa com estrutura:

```
Implemente o plano. Acompanhe o progresso com uma lista de tarefas (checklist).
Escreva testes junto com a implementação.
Sinalize quaisquer desvios do plano.
```

### 4. Encerre com Otimização (Optimize)

Não envie o primeiro rascunho:

```
Revise a implementação:
- Há melhorias de desempenho?
- O código é consistente com os padrões existentes?
- Escreva um resumo (walkthrough) explicando o que mudou e por quê.
```

### 5. Repita

Para cada tarefa, cada recurso, cada correção de bug. **Plan → Understand → Develop → Optimize.**

## Biblioteca de Prompts

O PUDO vem com uma [biblioteca de prompts pronta para uso](prompts/) — **21 prompts** distribuídos por 4 fases e habilidades de domínio que você pode copiar e colar em qualquer assistente de IA. Cada diretório de fase inclui um `README.md` detalhado explicando como modificar e estender os prompts para as necessidades da sua equipe.

| Fase | Prompts |
|---|---|
| **(P)** Plan | [Definição de Escopo](prompts/plan/scope-definition.md) · [Rascunho de Arquitetura](prompts/plan/architecture-draft.md) · [Avaliação de Risco](prompts/plan/risk-assessment.md) · [Esquema de Banco de Dados](prompts/plan/database-schema-design.md) · [Contrato de API](prompts/plan/api-contract-design.md) · [Modelo de Ameaça de Segurança](prompts/plan/security-threat-model.md) |
| **(U)** Understand | [Análise da Base de Código](prompts/understand/codebase-analysis.md) · [Auditoria de Dependências](prompts/understand/dependency-audit.md) · [Reconhecimento de Padrões](prompts/understand/pattern-recognition.md) · [Análise de Log de Falhas](prompts/understand/crash-log-analysis.md) |
| **(D)** Develop | [Implementação de Recurso](prompts/develop/feature-implementation.md) · [Test-Driven Dev (TDD)](prompts/develop/test-driven-dev.md) · [Estrutura de Componente](prompts/develop/component-scaffold.md) · [Suite de Teste de Integração](prompts/develop/integration-test-suite.md) · [Suite de Teste E2E](prompts/develop/e2e-test-suite.md) |
| **(O)** Optimize | [Revisão de Desempenho](prompts/optimize/performance-review.md) · [Checklist de Revisão de Código](prompts/optimize/code-review-checklist.md) · [Oportunidades de Refatoração](prompts/optimize/refactor-opportunities.md) · [Análise de Perfil de Memória](prompts/optimize/memory-profiling.md) · [Solução de Problemas de Rede](prompts/optimize/network-troubleshooting.md) |
| **Skills** | [Arquitetura e Planejamento](skills/plan/SKILL.md) · [Engenharia de Software](skills/code/SKILL.md) · [Solução de Problemas e Depuração](skills/debug/SKILL.md) · [Engenharia DevOps](skills/devops/SKILL.md) · [Engenharia de Teste (Test)](skills/test/SKILL.md) |
| **Ferramentas DevOps** | [GitHub Actions](skills/devops/github-actions/SKILL.md) · [GitLab CI](skills/devops/gitlab-ci/SKILL.md) · [Argo CD](skills/devops/argo-cd/SKILL.md) · [Jenkins](skills/devops/jenkins/SKILL.md) · [Terraform](skills/devops/terraform/SKILL.md) · [Docker](skills/devops/docker/SKILL.md) · [Kubernetes](skills/devops/kubernetes/SKILL.md) |

## Integrações com IA

O PUDO foi projetado para ser o sistema operacional padrão dos agentes de programação com IA. Prefira o formato de configuração atual de cada ferramenta, mantendo arquivos legacy quando ainda forem úteis para workspaces antigos.

| Ferramenta | Arquivos atuais | Configuração recomendada | Status |
|---|---|---|---|
| **Codex** | [AGENTS.md](AGENTS.md), [codex/AGENTS.md](codex/AGENTS.md) | Mantenha `AGENTS.md` na raiz; copie `codex/AGENTS.md` para o repositório de destino quando precisar de um template Codex mais completo | OK |
| **Claude Code / Projects** | [CLAUDE.md](CLAUDE.md), [claude/CLAUDE.md](claude/CLAUDE.md), [.claude/settings.json](.claude/settings.json) | Use `CLAUDE.md` na raiz como arquivo ponte; mantenha o fluxo detalhado do Claude em `claude/CLAUDE.md` | Atualizado |
| **Cursor** | [Project Rules](cursor/.cursor/rules/pudo-core.mdc), [legacy .cursorrules](cursor/.cursorrules) | Prefira `.cursor/rules/*.mdc`; mantenha `.cursorrules` para versões antigas do Cursor | Migrado |
| **GitHub Copilot** | [.github/copilot-instructions.md](.github/copilot-instructions.md), [.github/instructions/](.github/instructions/) | Use instruções no nível do repositório junto com arquivos `.instructions.md` por caminho | Adicionado |
| **OpenCode** | [opencode/opencode.md](opencode/opencode.md) | Adicione aos system prompts ou workspace instructions do OpenCode | OK |
| **Antigravity / Gemini-style** | [antigravity/instructions.xml](antigravity/instructions.xml) | Copie para `.gemini/antigravity/instructions.xml` no workspace de destino | OK |
| **Kiro** | [kiro/system-prompt.md](kiro/system-prompt.md) | Defina como system prompt do Kiro | OK |

## Filosofia

O PUDO não é apenas uma lista de verificação — é uma mentalidade. Leia a [filosofia completa](docs/philosophy.md) para entender os princípios por trás do método.

**TL;DR:**
- **Anti-caos** — A estrutura vence a improvisação em escala
- **Iterativo** — É um ciclo, não um modelo cascata (waterfall)
- **Nativo para IA** — Projetado para programação em par entre humanos e IA
- **Integridade de fase** — Cada fase possui critérios claros de entrada e saída

## Quando Não Usar PUDO

PUDO pode ser excessivo para correções de uma linha, protótipos descartáveis, exploração pura ou scripts não críticos. Use o ciclo completo quando correção, manutenibilidade, segurança ou handoff em equipe forem importantes.

## Limitações Atuais

- PUDO não garante que a saída da IA esteja correta.
- Revisão humana continua sendo obrigatória.
- Mudanças sensíveis de segurança ainda exigem revisão dedicada.
- Os exemplos são ilustrativos, não universais.
- O método exige disciplina; pular quality gates faz você voltar ao prompting ad hoc.

## Para Quem É Isso?

- **Desenvolvedores usando assistentes de IA** (ChatGPT, Claude, Gemini, Copilot, etc.) que desejam resultados melhores
- **Líderes de equipe** em busca de uma metodologia compartilhada para desenvolvimento assistido por IA
- **Estudantes** aprendendo a programar com IA da maneira correta desde o primeiro dia

## Contribuindo

O PUDO cresce com a comunidade. Veja [CONTRIBUTING.md](CONTRIBUTING.md) para saber como:

- Adicionar novos prompts à biblioteca
- Enviar tutoriais (walkthroughs) de cenários reais
- Melhorar a documentação

## Apoio & Financiamento

Se você achar o PUDO útil, considere apoiar o projeto:

<iframe src="https://github.com/sponsors/DongDuong2001/button" title="Sponsor DongDuong2001" height="32" width="114" style="border: 0; border-radius: 6px;"></iframe>

- [GitHub Sponsors](https://github.com/sponsors/DongDuong2001)
- [Patreon](https://patreon.com/DongDuong2001)
- [Ko-fi](https://ko-fi.com/dongphuduong)
- [Buy Me a Coffee](https://buymeacoffee.com/lab68dev)
- **PayPal:** dongduong840@gmail.com

## Licença

[MIT](LICENSE) — Use, faça fork, torne isso seu.

---

<p align="center">
  <strong>Pare de improvisar. Comece a fazer PUDO.</strong>
  <br /><br />
  <em>Plan → Understand → Develop → Optimize</em>
</p>
