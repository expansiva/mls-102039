/// <mls fileReference="_102039_/l4/controleChamados/workspaces/atendenteCatalogue.defs.ts" enhancement="_blank"/>

export const atendenteCatalogueWorkspace = {
  "workspaceId": "atendenteCatalogue",
  "title": "Atendente",
  "actors": [
    "atendente"
  ],
  "kind": "operation",
  "entity": "Atendente",
  "bffCalls": [
    {
      "bffId": "qryListAtendente",
      "kind": "query",
      "uses": [
        {
          "operationId": "listAtendente"
        }
      ],
      "input": [],
      "output": {
        "kind": "list",
        "fields": [
          {
            "name": "atendenteId",
            "from": "listAtendente.$items.atendenteId",
            "type": "string",
            "required": true
          },
          {
            "name": "platformUserId",
            "from": "listAtendente.$items.platformUserId",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.atendenteCatalogue.qryListAtendente"
    },
    {
      "bffId": "cmdCreateAtendente",
      "kind": "command",
      "uses": [
        {
          "operationId": "createAtendente"
        }
      ],
      "input": [
        {
          "name": "platformUserId",
          "from": "createAtendente.platformUserId",
          "required": true,
          "source": "userInput",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "atendenteId",
            "from": "createAtendente.atendenteId",
            "type": "string",
            "required": true
          },
          {
            "name": "platformUserId",
            "from": "createAtendente.platformUserId",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.atendenteCatalogue.cmdCreateAtendente"
    },
    {
      "bffId": "cmdUpdateAtendente",
      "kind": "command",
      "uses": [
        {
          "operationId": "updateAtendente"
        }
      ],
      "input": [
        {
          "name": "atendenteId",
          "from": "updateAtendente.atendenteId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        },
        {
          "name": "platformUserId",
          "from": "updateAtendente.platformUserId",
          "required": true,
          "source": "userInput",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "atendenteId",
            "from": "updateAtendente.atendenteId",
            "type": "string",
            "required": true
          },
          {
            "name": "platformUserId",
            "from": "updateAtendente.platformUserId",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.atendenteCatalogue.cmdUpdateAtendente"
    },
    {
      "bffId": "cmdInactivateAtendente",
      "kind": "command",
      "uses": [
        {
          "operationId": "inactivateAtendente"
        }
      ],
      "input": [
        {
          "name": "atendenteId",
          "from": "inactivateAtendente.atendenteId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "atendenteId",
            "from": "inactivateAtendente.atendenteId",
            "type": "string",
            "required": true
          },
          {
            "name": "platformUserId",
            "from": "inactivateAtendente.platformUserId",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.atendenteCatalogue.cmdInactivateAtendente"
    },
    {
      "bffId": "cmdReactivateAtendente",
      "kind": "command",
      "uses": [
        {
          "operationId": "reactivateAtendente"
        }
      ],
      "input": [
        {
          "name": "atendenteId",
          "from": "reactivateAtendente.atendenteId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "atendenteId",
            "from": "reactivateAtendente.atendenteId",
            "type": "string",
            "required": true
          },
          {
            "name": "platformUserId",
            "from": "reactivateAtendente.platformUserId",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.atendenteCatalogue.cmdReactivateAtendente"
    },
    {
      "bffId": "qryGetAtendente",
      "kind": "query",
      "uses": [
        {
          "operationId": "getAtendente"
        }
      ],
      "input": [
        {
          "name": "atendenteId",
          "from": "getAtendente.atendenteId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "atendenteId",
            "from": "getAtendente.atendenteId",
            "type": "string",
            "required": true
          },
          {
            "name": "platformUserId",
            "from": "getAtendente.platformUserId",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.atendenteCatalogue.qryGetAtendente"
    }
  ],
  "sections": [
    {
      "sectionId": "recordList",
      "intent": "Localizar Atendente.",
      "organisms": [
        {
          "role": "primarySurface",
          "dataSource": "qryListAtendente"
        },
        {
          "role": "contextualAction",
          "action": "cmdInactivateAtendente"
        },
        {
          "role": "contextualAction",
          "action": "cmdReactivateAtendente"
        }
      ]
    },
    {
      "sectionId": "recordForm",
      "intent": "Criar ou corrigir Atendente.",
      "organisms": [
        {
          "role": "primarySurface",
          "action": "cmdCreateAtendente"
        },
        {
          "role": "contextualAction",
          "action": "cmdUpdateAtendente"
        }
      ]
    }
  ],
  "operationIds": [
    "createAtendente",
    "getAtendente",
    "inactivateAtendente",
    "listAtendente",
    "reactivateAtendente",
    "updateAtendente"
  ],
  "purpose": "Cadastro de Atendente.",
  "presentation": {
    "categoryRef": "entityRecordManagement",
    "confidence": 10,
    "classificationNote": "Derived from the recordCatalogue tier of the approved E8 model; the category is structural, not a guess."
  },
  "sliceHash": "sha256:60737e48"
} as const;

export default atendenteCatalogueWorkspace;
