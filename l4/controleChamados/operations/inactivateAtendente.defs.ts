/// <mls fileReference="_102039_/l4/controleChamados/operations/inactivateAtendente.defs.ts" enhancement="_blank"/>

export const operationInactivateAtendente = {
  "operationId": "inactivateAtendente",
  "title": "Desativar Atendente",
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
    "goal": "Desativar Atendente",
    "steps": [
      "Desativar o registro (preserva o histórico e as referências)."
    ],
    "outcome": "Desativar o registro (preserva o histórico e as referências)."
  },
  "accessPattern": {
    "kind": "update",
    "description": "Desativar Atendente",
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
    "lifecycle": "inactivate"
  },
  "pageId": "atendenteCatalogue",
  "commandName": "cmdInactivateAtendente",
  "bffName": "cmdInactivateAtendente"
} as const;

export default operationInactivateAtendente;
