/// <mls fileReference="_102039_/l4/controleChamados/operations/updateChamado.defs.ts" enhancement="_blank"/>

export const operationUpdateChamado = {
  "operationId": "updateChamado",
  "title": "Atualizar Chamado",
  "actors": [
    "atendente"
  ],
  "entity": "Chamado",
  "kind": "update",
  "reads": [
    "Chamado"
  ],
  "writes": [
    "Chamado"
  ],
  "rulesApplied": [
    "comentariosPermitidosSomenteEmChamadosAbertos",
    "fechamentoExigeChamadoAberto",
    "chamadoFechadoNaoPodeSerReaberto"
  ],
  "story": {
    "actor": "atendente",
    "goal": "Atualizar Chamado",
    "steps": [
      "Corrigir os dados do registro escolhido."
    ],
    "outcome": "Corrigir os dados do registro escolhido."
  },
  "accessPattern": {
    "kind": "update",
    "description": "Atualizar Chamado",
    "entity": "Chamado",
    "keyField": "Chamado.chamadoId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "Chamado.chamadoId",
      "Chamado.titulo",
      "Chamado.descricao",
      "Chamado.status"
    ]
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "chamadoId",
        "type": "string",
        "required": true,
        "fieldRef": "Chamado.chamadoId"
      },
      {
        "name": "titulo",
        "type": "string",
        "required": true,
        "fieldRef": "Chamado.titulo"
      },
      {
        "name": "descricao",
        "type": "string",
        "required": true,
        "fieldRef": "Chamado.descricao"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "fieldRef": "Chamado.status"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "chamadoId",
      "fieldRef": "Chamado.chamadoId",
      "required": true,
      "source": "selectedEntity",
      "description": "Identificador estável do chamado, transportado entre as etapas de acompanhamento."
    },
    {
      "inputId": "titulo",
      "fieldRef": "Chamado.titulo",
      "required": true,
      "source": "userInput",
      "description": "Resumo do assunto ou solicitação de atendimento registrada no chamado."
    },
    {
      "inputId": "descricao",
      "fieldRef": "Chamado.descricao",
      "required": true,
      "source": "userInput",
      "description": "Detalhamento da solicitação de atendimento registrada no chamado."
    },
    {
      "inputId": "status",
      "fieldRef": "Chamado.status",
      "required": true,
      "source": "systemDefault",
      "description": "Situação atual do acompanhamento do chamado.",
      "enumValues": [
        "open",
        "closed"
      ]
    }
  ],
  "pageId": "chamadoCatalogue",
  "commandName": "cmdUpdateChamado",
  "bffName": "cmdUpdateChamado"
} as const;

export default operationUpdateChamado;
