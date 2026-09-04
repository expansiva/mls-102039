/// <mls fileReference="_102039_/l4/controleChamados/workspaces/chamadoCatalogue.defs.ts" enhancement="_blank"/>

export const chamadoCatalogueWorkspace = {
  "workspaceId": "chamadoCatalogue",
  "title": "Chamado",
  "actors": [
    "atendente"
  ],
  "kind": "operation",
  "entity": "Chamado",
  "bffCalls": [
    {
      "bffId": "qryListChamado",
      "kind": "query",
      "uses": [
        {
          "operationId": "listChamado"
        }
      ],
      "input": [
        {
          "name": "sortBy",
          "from": "listChamado.sortBy",
          "source": "userInput",
          "type": "string",
          "enumValues": [
            "status"
          ]
        },
        {
          "name": "sortOrder",
          "from": "listChamado.sortOrder",
          "source": "userInput",
          "type": "string",
          "enumValues": [
            "asc",
            "desc"
          ]
        }
      ],
      "output": {
        "kind": "list",
        "fields": [
          {
            "name": "chamadoId",
            "from": "listChamado.$items.chamadoId",
            "type": "string",
            "required": true
          },
          {
            "name": "titulo",
            "from": "listChamado.$items.titulo",
            "type": "string",
            "required": true
          },
          {
            "name": "descricao",
            "from": "listChamado.$items.descricao",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "from": "listChamado.$items.status",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.chamadoCatalogue.qryListChamado"
    },
    {
      "bffId": "cmdCreateChamado",
      "kind": "command",
      "uses": [
        {
          "operationId": "createChamado"
        }
      ],
      "input": [
        {
          "name": "titulo",
          "from": "createChamado.titulo",
          "required": true,
          "source": "userInput",
          "type": "string"
        },
        {
          "name": "descricao",
          "from": "createChamado.descricao",
          "required": true,
          "source": "userInput",
          "type": "string"
        },
        {
          "name": "status",
          "from": "createChamado.status",
          "required": true,
          "source": "systemDefault",
          "type": "string",
          "enumValues": [
            "open",
            "closed"
          ]
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "chamadoId",
            "from": "createChamado.chamadoId",
            "type": "string",
            "required": true
          },
          {
            "name": "titulo",
            "from": "createChamado.titulo",
            "type": "string",
            "required": true
          },
          {
            "name": "descricao",
            "from": "createChamado.descricao",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "from": "createChamado.status",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.chamadoCatalogue.cmdCreateChamado"
    },
    {
      "bffId": "cmdUpdateChamado",
      "kind": "command",
      "uses": [
        {
          "operationId": "updateChamado"
        }
      ],
      "input": [
        {
          "name": "chamadoId",
          "from": "updateChamado.chamadoId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        },
        {
          "name": "titulo",
          "from": "updateChamado.titulo",
          "required": true,
          "source": "userInput",
          "type": "string"
        },
        {
          "name": "descricao",
          "from": "updateChamado.descricao",
          "required": true,
          "source": "userInput",
          "type": "string"
        },
        {
          "name": "status",
          "from": "updateChamado.status",
          "required": true,
          "source": "systemDefault",
          "type": "string",
          "enumValues": [
            "open",
            "closed"
          ]
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "chamadoId",
            "from": "updateChamado.chamadoId",
            "type": "string",
            "required": true
          },
          {
            "name": "titulo",
            "from": "updateChamado.titulo",
            "type": "string",
            "required": true
          },
          {
            "name": "descricao",
            "from": "updateChamado.descricao",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "from": "updateChamado.status",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.chamadoCatalogue.cmdUpdateChamado"
    },
    {
      "bffId": "cmdDeleteChamado",
      "kind": "command",
      "uses": [
        {
          "operationId": "deleteChamado"
        }
      ],
      "input": [
        {
          "name": "chamadoId",
          "from": "deleteChamado.chamadoId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "chamadoId",
            "from": "deleteChamado.chamadoId",
            "type": "string",
            "required": true
          },
          {
            "name": "titulo",
            "from": "deleteChamado.titulo",
            "type": "string",
            "required": true
          },
          {
            "name": "descricao",
            "from": "deleteChamado.descricao",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "from": "deleteChamado.status",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.chamadoCatalogue.cmdDeleteChamado"
    },
    {
      "bffId": "qryGetChamado",
      "kind": "query",
      "uses": [
        {
          "operationId": "getChamado"
        }
      ],
      "input": [
        {
          "name": "chamadoId",
          "from": "getChamado.chamadoId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "chamadoId",
            "from": "getChamado.chamadoId",
            "type": "string",
            "required": true
          },
          {
            "name": "titulo",
            "from": "getChamado.titulo",
            "type": "string",
            "required": true
          },
          {
            "name": "descricao",
            "from": "getChamado.descricao",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "from": "getChamado.status",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.chamadoCatalogue.qryGetChamado"
    },
    {
      "bffId": "qryLocateChamado",
      "kind": "query",
      "uses": [
        {
          "operationId": "locateChamado"
        }
      ],
      "input": [],
      "output": {
        "kind": "list",
        "fields": [
          {
            "name": "chamadoId",
            "from": "locateChamado.$items.chamadoId",
            "type": "string",
            "required": true
          },
          {
            "name": "titulo",
            "from": "locateChamado.$items.titulo",
            "type": "string",
            "required": true
          },
          {
            "name": "descricao",
            "from": "locateChamado.$items.descricao",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "from": "locateChamado.$items.status",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.chamadoCatalogue.qryLocateChamado"
    },
    {
      "bffId": "cmdCloseChamado",
      "kind": "command",
      "uses": [
        {
          "operationId": "closeChamado"
        }
      ],
      "input": [
        {
          "name": "chamadoId",
          "from": "closeChamado.chamadoId",
          "required": true,
          "source": "routeParam",
          "type": "string"
        },
        {
          "name": "status",
          "from": "closeChamado.status",
          "required": true,
          "source": "userInput",
          "type": "string",
          "enumValues": [
            "closed"
          ]
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "chamadoId",
            "from": "closeChamado.chamadoId",
            "type": "string",
            "required": true
          },
          {
            "name": "titulo",
            "from": "closeChamado.titulo",
            "type": "string",
            "required": true
          },
          {
            "name": "descricao",
            "from": "closeChamado.descricao",
            "type": "string",
            "required": true
          },
          {
            "name": "status",
            "from": "closeChamado.status",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.chamadoCatalogue.cmdCloseChamado"
    }
  ],
  "sections": [
    {
      "sectionId": "recordList",
      "intent": "Localizar Chamado.",
      "organisms": [
        {
          "role": "primarySurface",
          "dataSource": "qryListChamado"
        },
        {
          "role": "filterControl",
          "attachTo": "qryListChamado"
        },
        {
          "role": "contextualAction",
          "action": "cmdDeleteChamado"
        }
      ]
    },
    {
      "sectionId": "recordForm",
      "intent": "Criar ou corrigir Chamado.",
      "organisms": [
        {
          "role": "primarySurface",
          "action": "cmdCreateChamado"
        },
        {
          "role": "contextualAction",
          "action": "cmdUpdateChamado"
        }
      ]
    },
    {
      "sectionId": "closeChamado",
      "intent": "O chamado selecionado passa a ter o status fechado.",
      "organisms": [
        {
          "role": "primarySurface",
          "action": "cmdCloseChamado"
        }
      ]
    }
  ],
  "operationIds": [
    "closeChamado",
    "createChamado",
    "deleteChamado",
    "getChamado",
    "listChamado",
    "locateChamado",
    "updateChamado"
  ],
  "purpose": "Cadastro de Chamado.",
  "presentation": {
    "categoryRef": "entityRecordManagement",
    "confidence": 10,
    "classificationNote": "Derived from the recordCatalogue tier of the approved E8 model; the category is structural, not a guess."
  },
  "sliceHash": "sha256:24faaeec"
} as const;

export default chamadoCatalogueWorkspace;
