/// <mls fileReference="_102039_/l4/controleChamados/operations/createAtendente.defs.ts" enhancement="_blank"/>

export const operationCreateAtendente = {
  "operationId": "createAtendente",
  "title": "Criar Atendente",
  "actors": [
    "atendente"
  ],
  "entity": "Atendente",
  "kind": "create",
  "reads": [
    "Atendente"
  ],
  "writes": [
    "Atendente"
  ],
  "rulesApplied": [],
  "story": {
    "actor": "atendente",
    "goal": "Criar Atendente",
    "steps": [
      "Informar os dados do novo registro."
    ],
    "outcome": "Informar os dados do novo registro."
  },
  "accessPattern": {
    "kind": "create",
    "description": "Criar Atendente",
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
      "inputId": "platformUserId",
      "fieldRef": "Atendente.platformUserId",
      "required": true,
      "source": "userInput",
      "description": "Referência ao usuário correspondente no diretório da plataforma, sem duplicar dados de login."
    }
  ],
  "pageId": "atendenteCatalogue",
  "commandName": "cmdCreateAtendente",
  "bffName": "cmdCreateAtendente"
} as const;

export default operationCreateAtendente;
