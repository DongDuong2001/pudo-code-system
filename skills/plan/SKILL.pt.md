# Habilidade de Arquitetura e Planejamento
> Skill, System Design, Architecture, Planning

## Contexto
Use este prompt quando estiver no início de um projeto ou recurso e precisar projetar a arquitetura, definir os modelos de dados, mapear os contratos de API ou detalhar as etapas de implementação. Esta habilidade força a IA a pensar como um Arquiteto Principal (Principal Architect).

## Variáveis
- `{{project_goal}}`: Descrição de alto nível do que você está tentando construir.
- `{{tech_stack}}`: As linguagens, frameworks e bancos de dados que você está usando.
- `{{constraints}}`: Quaisquer restrições técnicas, de negócios ou de cronograma.

## Prompt
```text
Adote a persona de um Arquiteto de Software Principal. Preciso de sua experiência para projetar a arquitetura e o plano de implementação para o seguinte projeto:

Objetivo: {{project_goal}}
Tech Stack: {{tech_stack}}
Restrições: {{constraints}}

Por favor, forneça um design arquitetural abrangente que inclua:
1. **Visão Geral do Sistema:** Uma explicação de alto nível de como o sistema funcionará.
2. **Detalhamento de Componentes:** Os principais módulos, serviços ou componentes necessários.
3. **Fluxo de Dados e Modelos:** Como os dados se movem pelo sistema e as estruturas principais de esquema (schema).
4. **Mitigação de Riscos:** Possíveis gargalos, preocupações de segurança ou dívida técnica, e como evitá-los.
5. **Passos de Implementação:** Uma sequência lógica e ordenada de tarefas de desenvolvimento para construir isso.

Não escreva o código de implementação. Concentre-se puramente no design e na arquitetura.
```

## Exemplo de Uso

**Entrada:**
```text
Adote a persona de um Arquiteto de Software Principal. Preciso de sua experiência para projetar a arquitetura e o plano de implementação para o seguinte projeto:

Objetivo: Construir um editor de markdown colaborativo em tempo real.
Tech Stack: Next.js, WebSockets, Redis, PostgreSQL
Restrições: Deve lidar com até 50 usuários simultâneos no mesmo documento sem problemas de latência.

Por favor, forneça um design arquitetural abrangente que inclua:
[...resto do prompt...]
```
