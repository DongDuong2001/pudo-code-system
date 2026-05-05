# Habilidade de Solução de Problemas e Depuração
> Skill, Debugging, SRE, Bug Fixing

## Contexto
Use este prompt quando estiver enfrentando um bug, um rastreamento de erro (error trace) ou um comportamento inesperado. Esta habilidade força a IA a atuar como um solucionador de problemas (troubleshooter), analisando as causas raízes sistematicamente, em vez de apenas adivinhar soluções.

## Variáveis
- `{{error_message}}`: A mensagem de erro exata ou a saída de log.
- `{{behavior_description}}`: O que você esperava que acontecesse em comparação com o que realmente aconteceu.
- `{{context_code}}`: O trecho (snippet) de código onde o erro está ocorrendo.

## Prompt
```text
Adote a persona de um Engenheiro de Confiabilidade de Sistemas (SRE) Sênior / Solucionador de Problemas. Estou encontrando um bug e preciso de sua ajuda para diagnosticá-lo e corrigi-lo sistematicamente.

Mensagem de Erro / Stack Trace:
{{error_message}}

Comportamento Esperado vs Real:
{{behavior_description}}

Contexto de Código Relevante:
{{context_code}}

Por favor, siga esta metodologia de depuração:
1. **Análise de Causa Raiz:** Analise o erro e o código para explicar exatamente *por que* esse erro está acontecendo em um nível técnico.
2. **Hipóteses:** Forneça 1 ou 2 motivos prováveis se a causa raiz não for 100% óbvia a partir do trecho de código.
3. **A Correção:** Forneça as alterações exatas de código necessárias para resolver o problema.
4. **Prevenção de Regressão:** Explique brevemente como essa correção garante que o bug não acontecerá novamente (ex: tratamento de casos extremos).

Não tente adivinhar cegamente. Se você precisar de mais informações para diagnosticar o problema com precisão, peça.
```

## Exemplo de Uso

**Entrada:**
```text
Adote a persona de um Engenheiro de Confiabilidade de Sistemas (SRE) Sênior / Solucionador de Problemas. Estou encontrando um bug e preciso de sua ajuda para diagnosticá-lo e corrigi-lo sistematicamente.

Mensagem de Erro / Stack Trace:
TypeError: Cannot read properties of undefined (reading 'map') at UserList.tsx:24

Comportamento Esperado vs Real:
Eu esperava que a lista de usuários fosse renderizada, mas o aplicativo trava (crashes) quando a API demora muito para responder.

Contexto de Código Relevante:
const UserList = ({ users }) => {
  return <div>{users.map(u => <span key={u.id}>{u.name}</span>)}</div>
}

Por favor, siga esta metodologia de depuração:
[...resto do prompt...]
```
