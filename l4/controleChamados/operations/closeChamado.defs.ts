/// <mls fileReference="_102039_/l4/controleChamados/operations/closeChamado.defs.ts" enhancement="_blank"/>

export const operationCloseChamado = {
  "operationId": "closeChamado",
  "title": "Confirmar o fechamento do chamado",
  "actors": [
    "atendente"
  ],
  "entity": "Chamado",
  "kind": "transition",
  "reads": [
    "Chamado"
  ],
  "writes": [
    "Chamado"
  ],
  "rulesApplied": [
    "fechamentoExigeChamadoAberto"
  ],
  "story": {
    "actor": "atendente",
    "goal": "Confirmar o fechamento do chamado",
    "steps": [
      "Confirmar o fechamento do chamado",
      "O chamado selecionado passa a ter o status fechado."
    ],
    "outcome": "O chamado selecionado passa a ter o status fechado."
  },
  "accessPattern": {
    "kind": "transition",
    "description": "Confirmar o fechamento do chamado",
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
      "source": "routeParam",
      "description": "Chamado"
    },
    {
      "inputId": "status",
      "fieldRef": "Chamado.status",
      "required": true,
      "source": "userInput",
      "description": "Decisão tomada.",
      "enumValues": [
        "closed"
      ]
    }
  ],
  "pageId": "chamadoCatalogue",
  "commandName": "cmdCloseChamado",
  "bffName": "cmdCloseChamado"
} as const;

export default operationCloseChamado;
