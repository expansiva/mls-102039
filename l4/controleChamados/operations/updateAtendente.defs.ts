/// <mls fileReference="_102039_/l4/controleChamados/operations/updateAtendente.defs.ts" enhancement="_blank"/>

export const operationUpdateAtendente = {
  "operationId": "updateAtendente",
  "title": "Atualizar Atendente",
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
    "goal": "Atualizar Atendente",
    "steps": [
      "Corrigir os dados do registro escolhido."
    ],
    "outcome": "Corrigir os dados do registro escolhido."
  },
  "accessPattern": {
    "kind": "update",
    "description": "Atualizar Atendente",
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
    },
    {
      "inputId": "platformUserId",
      "fieldRef": "Atendente.platformUserId",
      "required": true,
      "source": "userInput",
      "description": "Referência ao usuário correspondente no diretório da plataforma, sem duplicar dados de login."
    }
  ],
  "pageId": "atendenteCatalogue",
  "commandName": "cmdUpdateAtendente",
  "bffName": "cmdUpdateAtendente"
} as const;

export default operationUpdateAtendente;
