/// <mls fileReference="_102039_/l4/controleChamados/operations/reactivateAtendente.defs.ts" enhancement="_blank"/>

export const operationReactivateAtendente = {
  "operationId": "reactivateAtendente",
  "title": "Reativar Atendente",
  "actors": [
    "atendente"
  ],
  "entity": "Atendente",
  "kind": "update",
  "reads": [
    "Atendente"
  ],
  "writes": [
    "Atendente"
  ],
  "rulesApplied": [],
  "story": {
    "actor": "atendente",
    "goal": "Reativar Atendente",
    "steps": [
      "Reativar um registro desativado."
    ],
    "outcome": "Reativar um registro desativado."
  },
  "accessPattern": {
    "kind": "update",
    "description": "Reativar Atendente",
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
    "lifecycle": "reactivate"
  },
  "pageId": "atendenteCatalogue",
  "commandName": "cmdReactivateAtendente",
  "bffName": "cmdReactivateAtendente"
} as const;

export default operationReactivateAtendente;
