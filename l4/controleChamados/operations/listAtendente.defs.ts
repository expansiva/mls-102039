/// <mls fileReference="_102039_/l4/controleChamados/operations/listAtendente.defs.ts" enhancement="_blank"/>

export const operationListAtendente = {
  "operationId": "listAtendente",
  "title": "Listar Atendente",
  "actors": [
    "atendente"
  ],
  "entity": "Atendente",
  "kind": "query",
  "reads": [
    "Atendente"
  ],
  "writes": [],
  "rulesApplied": [],
  "story": {
    "actor": "atendente",
    "goal": "Listar Atendente",
    "steps": [
      "Encontrar o registro."
    ],
    "outcome": "Encontrar o registro."
  },
  "accessPattern": {
    "kind": "list",
    "description": "Listar Atendente",
    "entity": "Atendente",
    "keyField": "Atendente.atendenteId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "Atendente.atendenteId",
      "Atendente.platformUserId"
    ]
  },
  "outputShape": {
    "kind": "list",
    "fields": [
      {
        "name": "atendenteId",
        "type": "string",
        "required": true,
        "fieldRef": "Atendente.atendenteId"
      },
      {
        "name": "platformUserId",
        "type": "string",
        "required": true,
        "fieldRef": "Atendente.platformUserId"
      }
    ]
  },
  "inputs": [],
  "mdm": {
    "activeFilterInput": "includeInactive",
    "situationOutput": "active"
  },
  "pageId": "atendenteCatalogue",
  "commandName": "qryListAtendente",
  "bffName": "qryListAtendente"
} as const;

export default operationListAtendente;
