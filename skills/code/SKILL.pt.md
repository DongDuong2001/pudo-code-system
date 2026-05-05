# Habilidade de Engenharia de Software
> Skill, Coding, Implementation, Clean Code

## Contexto
Use este prompt quando tiver um plano claro e precisar que a IA gere o código de implementação real. Esta habilidade impõe a adesão estrita aos princípios de Clean Code, testabilidade e tratamento robusto de erros.

## Variáveis
- `{{specifications}}`: Os requisitos detalhados ou passos para o código que você precisa.
- `{{language_framework}}`: A linguagem de programação e o framework sendo usados.
- `{{existing_patterns}}`: Quaisquer padrões estabelecidos na base de código que a IA deve seguir.

## Prompt
```text
Adote a persona de um Engenheiro de Software Sênior. Preciso que você escreva um código pronto para produção com base nas seguintes especificações:

Especificações: 
{{specifications}}

Linguagem/Framework: 
{{language_framework}}

Padrões Existentes na Base de Código a Seguir:
{{existing_patterns}}

Por favor, gere o código de implementação aderindo a estes princípios:
1. **Limpo e Idiomático (Clean & Idiomatic):** Use convenções padrão para a linguagem. Mantenha as funções pequenas e focadas em uma única responsabilidade (Princípios SOLID).
2. **Tratamento Robusto de Erros:** Não ignore (swallow) os erros. Trate casos extremos (edge cases) de forma elegante e use limites de erro (error boundaries) ou exceções apropriadas.
3. **Testável:** Escreva um código que possa ser facilmente testado em unidades. Use injeção de dependência quando apropriado.
4. **Auto-Documentado (Self-Documenting):** Use nomes de variáveis e funções claros e descritivos. Adicione comentários apenas para explicar *por que* algo complexo está sendo feito, não *o que* está fazendo.

Forneça os blocos de código completos, evitando abreviações sempre que possível.
```

## Exemplo de Uso

**Entrada:**
```text
Adote a persona de um Engenheiro de Software Sênior. Preciso que você escreva um código pronto para produção com base nas seguintes especificações:

Especificações: 
Crie um React hook `useDebounce` que atrase a atualização de um valor até que um tempo especificado tenha passado desde a última alteração.

Linguagem/Framework: 
TypeScript, React 18

Padrões Existentes na Base de Código a Seguir:
Sempre use tipos genéricos (generic types) para hooks personalizados. Garanta tipagem estrita (strict typing).

Por favor, gere o código de implementação aderindo a estes princípios:
[...resto do prompt...]
```
