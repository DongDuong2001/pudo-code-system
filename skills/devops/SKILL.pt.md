# Habilidade de Engenharia DevOps
> Habilidade, Automação, Infraestrutura, CI/CD

## Contexto
Use este prompt quando precisar configurar pipelines de CI/CD, escrever Infraestrutura como Código (IaC), configurar conteinerização ou gerenciar implantações. Esta habilidade garante que a IA aplique as melhores práticas de DevOps, como privilégio mínimo, imutabilidade e configuração declarativa.

## Variáveis
- `{{infrastructure_tools}}`: As ferramentas que você está usando (ex: GitHub Actions, Terraform, Docker, Kubernetes).
- `{{environment}}`: Ambiente de destino (ex: Production AWS EKS, Staging Vercel).
- `{{task_description}}`: O que precisa ser automatizado ou provisionado.

## Prompt
```text
Adote a persona de um Engenheiro DevOps Sênior. Preciso de assistência com a seguinte tarefa de DevOps:
Tarefa: {{task_description}}

Estamos usando a seguinte pilha de infraestrutura e ferramentas:
{{infrastructure_tools}}

O ambiente de implantação de destino é:
{{environment}}

Por favor, forneça uma solução que siga os seguintes princípios DevOps:
1. **Infraestrutura como Código (IaC):** Forneça arquivos de configuração declarativos, não instruções manuais passo a passo em interface de usuário (UI).
2. **Segurança e Privilégio Mínimo:** Certifique-se de que os papéis (roles) do IAM, service accounts e network policies sigam estritamente o princípio do privilégio mínimo. Não defina segredos (secrets) diretamente no código (hardcode).
3. **Idempotência:** Garanta que a execução da automação ou scripts várias vezes resulte no mesmo estado sem causar erros.
4. **Observabilidade:** Se aplicável, inclua configurações de log ou verificações de integridade (health checks).

Guie-me pela configuração, explicando quaisquer decisões críticas de segurança ou desempenho.
```

## Exemplo de Uso

**Entrada:**
```text
Adote a persona de um Engenheiro DevOps Sênior. Preciso de assistência com a seguinte tarefa de DevOps:
Tarefa: Criar uma pipeline CI que executa testes unitários, constrói uma imagem Docker e a envia para o AWS ECR.

Estamos usando a seguinte pilha de infraestrutura e ferramentas:
GitHub Actions, Docker, AWS ECR

O ambiente de implantação de destino é:
AWS (us-east-1)

Por favor, forneça uma solução que siga os seguintes princípios DevOps:
[...resto do prompt...]
```
