/// <mls fileReference="_102039_/l4/controleChamados/operations/getChamado.defs.ts" enhancement="_blank"/>

export const operationGetChamado = {
  "operationId": "getChamado",
  "title": "Obter Chamado",
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
    "goal": "Obter Chamado",
    "steps": [
      "Ler o registro pelo identificador."
    ],
    "outcome": "Ler o registro pelo identificador."
  },
  "accessPattern": {
    "kind": "getById",
    "description": "Obter Chamado",
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
    }
  ],
  "pageId": "chamadoCatalogue",
  "commandName": "qryGetChamado",
  "bffName": "qryGetChamado"
} as const;

export default operationGetChamado;
