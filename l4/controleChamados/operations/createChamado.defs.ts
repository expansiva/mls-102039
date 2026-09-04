/// <mls fileReference="_102039_/l4/controleChamados/operations/createChamado.defs.ts" enhancement="_blank"/>

export const operationCreateChamado = {
  "operationId": "createChamado",
  "title": "Criar Chamado",
  "actors": [
    "atendente"
  ],
  "entity": "Chamado",
  "kind": "create",
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
    "goal": "Criar Chamado",
    "steps": [
      "Informar os dados do novo registro."
    ],
    "outcome": "Informar os dados do novo registro."
  },
  "accessPattern": {
    "kind": "create",
    "description": "Criar Chamado",
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
  "commandName": "cmdCreateChamado",
  "bffName": "cmdCreateChamado"
} as const;

export default operationCreateChamado;
