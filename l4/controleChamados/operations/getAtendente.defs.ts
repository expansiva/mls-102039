/// <mls fileReference="_102039_/l4/controleChamados/operations/getAtendente.defs.ts" enhancement="_blank"/>

export const operationGetAtendente = {
  "operationId": "getAtendente",
  "title": "Obter Atendente",
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
    "goal": "Obter Atendente",
    "steps": [
      "Ler o registro pelo identificador."
    ],
    "outcome": "Ler o registro pelo identificador."
  },
  "accessPattern": {
    "kind": "getById",
    "description": "Obter Atendente",
    "entity": "Atendente",
    "keyField": "Atendente.atendenteId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "Atendente.atendenteId",
      "Atendente.platformUserId"
    ]
  },
  "outputShape": {
    "kind": "object",
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
  "inputs": [
    {
      "inputId": "atendenteId",
      "fieldRef": "Atendente.atendenteId",
      "required": true,
      "source": "selectedEntity",
      "description": "Identificador estável do atendente reutilizado entre os módulos da organização."
    }
  ],
  "mdm": {
    "situationOutput": "active"
  },
  "pageId": "atendenteCatalogue",
  "commandName": "qryGetAtendente",
  "bffName": "qryGetAtendente"
} as const;

export default operationGetAtendente;
