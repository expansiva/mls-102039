/// <mls fileReference="_102039_/l4/controleChamados/operations/listChamado.defs.ts" enhancement="_blank"/>

export const operationListChamado = {
  "operationId": "listChamado",
  "title": "Listar Chamado",
  "actors": [
    "atendente"
  ],
  "entity": "Chamado",
  "kind": "query",
  "reads": [
    "Chamado"
  ],
  "writes": [],
  "rulesApplied": [],
  "story": {
    "actor": "atendente",
    "goal": "Listar Chamado",
    "steps": [
      "Encontrar o registro."
    ],
    "outcome": "Encontrar o registro."
  },
  "accessPattern": {
    "kind": "list",
    "description": "Listar Chamado",
    "entity": "Chamado",
    "keyField": "Chamado.chamadoId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "Chamado.chamadoId",
      "Chamado.titulo",
      "Chamado.descricao",
      "Chamado.status"
    ]
  },
  "outputShape": {
    "kind": "list",
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
      "inputId": "sortBy",
      "fieldRef": "Chamado.status",
      "required": false,
      "source": "userInput",
      "description": "Campo de ordenação da listagem.",
      "enumValues": [
        "status"
      ]
    },
    {
      "inputId": "sortOrder",
      "fieldRef": "Chamado.status",
      "required": false,
      "source": "userInput",
      "description": "Direção da ordenação.",
      "enumValues": [
        "asc",
        "desc"
      ]
    }
  ],
  "pageId": "chamadoCatalogue",
  "commandName": "qryListChamado",
  "bffName": "qryListChamado"
} as const;

export default operationListChamado;
