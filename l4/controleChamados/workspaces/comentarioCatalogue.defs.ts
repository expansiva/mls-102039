/// <mls fileReference="_102039_/l4/controleChamados/workspaces/comentarioCatalogue.defs.ts" enhancement="_blank"/>

export const comentarioCatalogueWorkspace = {
  "workspaceId": "comentarioCatalogue",
  "title": "Comentário",
  "actors": [
    "atendente"
  ],
  "kind": "operation",
  "entity": "Comentario",
  "bffCalls": [
    {
      "bffId": "qryListComentario",
      "kind": "query",
      "uses": [
        {
          "operationId": "listComentario"
        }
      ],
      "input": [],
      "output": {
        "kind": "list",
        "fields": [
          {
            "name": "comentarioId",
            "from": "listComentario.$items.comentarioId",
            "type": "string",
            "required": true
          },
          {
            "name": "chamadoId",
            "from": "listComentario.$items.chamadoId",
            "type": "string",
            "required": true
          },
          {
            "name": "atendenteId",
            "from": "listComentario.$items.atendenteId",
            "type": "string",
            "required": true
          },
          {
            "name": "conteudo",
            "from": "listComentario.$items.conteudo",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.comentarioCatalogue.qryListComentario"
    },
    {
      "bffId": "cmdCreateComentario",
      "kind": "command",
      "uses": [
        {
          "operationId": "createComentario"
        }
      ],
      "input": [
        {
          "name": "chamadoId",
          "from": "createComentario.chamadoId",
          "required": true,
          "source": "selectedEntity",
          "sourceRef": "qryChamadoPicker",
          "type": "string"
        },
        {
          "name": "atendenteId",
          "from": "createComentario.atendenteId",
          "required": true,
          "source": "selectedEntity",
          "sourceRef": "qryAtendentePicker",
          "type": "string"
        },
        {
          "name": "conteudo",
          "from": "createComentario.conteudo",
          "required": true,
          "source": "userInput",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "comentarioId",
            "from": "createComentario.comentarioId",
            "type": "string",
            "required": true
          },
          {
            "name": "chamadoId",
            "from": "createComentario.chamadoId",
            "type": "string",
            "required": true
          },
          {
            "name": "atendenteId",
            "from": "createComentario.atendenteId",
            "type": "string",
            "required": true
          },
          {
            "name": "conteudo",
            "from": "createComentario.conteudo",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.comentarioCatalogue.cmdCreateComentario"
    },
    {
      "bffId": "cmdUpdateComentario",
      "kind": "command",
      "uses": [
        {
          "operationId": "updateComentario"
        }
      ],
      "input": [
        {
          "name": "comentarioId",
          "from": "updateComentario.comentarioId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        },
        {
          "name": "chamadoId",
          "from": "updateComentario.chamadoId",
          "required": true,
          "source": "selectedEntity",
          "sourceRef": "qryChamadoPicker",
          "type": "string"
        },
        {
          "name": "atendenteId",
          "from": "updateComentario.atendenteId",
          "required": true,
          "source": "selectedEntity",
          "sourceRef": "qryAtendentePicker",
          "type": "string"
        },
        {
          "name": "conteudo",
          "from": "updateComentario.conteudo",
          "required": true,
          "source": "userInput",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "comentarioId",
            "from": "updateComentario.comentarioId",
            "type": "string",
            "required": true
          },
          {
            "name": "chamadoId",
            "from": "updateComentario.chamadoId",
            "type": "string",
            "required": true
          },
          {
            "name": "atendenteId",
            "from": "updateComentario.atendenteId",
            "type": "string",
            "required": true
          },
          {
            "name": "conteudo",
            "from": "updateComentario.conteudo",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.comentarioCatalogue.cmdUpdateComentario"
    },
    {
      "bffId": "cmdDeleteComentario",
      "kind": "command",
      "uses": [
        {
          "operationId": "deleteComentario"
        }
      ],
      "input": [
        {
          "name": "comentarioId",
          "from": "deleteComentario.comentarioId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "comentarioId",
            "from": "deleteComentario.comentarioId",
            "type": "string",
            "required": true
          },
          {
            "name": "chamadoId",
            "from": "deleteComentario.chamadoId",
            "type": "string",
            "required": true
          },
          {
            "name": "atendenteId",
            "from": "deleteComentario.atendenteId",
            "type": "string",
            "required": true
          },
          {
            "name": "conteudo",
            "from": "deleteComentario.conteudo",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.comentarioCatalogue.cmdDeleteComentario"
    },
    {
      "bffId": "qryGetComentario",
      "kind": "query",
      "uses": [
        {
          "operationId": "getComentario"
        }
      ],
      "input": [
        {
          "name": "comentarioId",
          "from": "getComentario.comentarioId",
          "required": true,
          "source": "selectedEntity",
          "type": "string"
        }
      ],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "comentarioId",
            "from": "getComentario.comentarioId",
            "type": "string",
            "required": true
          },
          {
            "name": "chamadoId",
            "from": "getComentario.chamadoId",
            "type": "string",
            "required": true
          },
          {
            "name": "atendenteId",
            "from": "getComentario.atendenteId",
            "type": "string",
            "required": true
          },
          {
            "name": "conteudo",
            "from": "getComentario.conteudo",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.comentarioCatalogue.qryGetComentario"
    },
    {
      "bffId": "qryChamadoPicker",
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
      "route": "controleChamados.comentarioCatalogue.qryChamadoPicker"
    },
    {
      "bffId": "qryAtendentePicker",
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
      "route": "controleChamados.comentarioCatalogue.qryAtendentePicker"
    }
  ],
  "sections": [
    {
      "sectionId": "recordList",
      "intent": "Localizar Comentário.",
      "organisms": [
        {
          "role": "primarySurface",
          "dataSource": "qryListComentario"
        },
        {
          "role": "contextualAction",
          "action": "cmdDeleteComentario"
        }
      ]
    },
    {
      "sectionId": "recordForm",
      "intent": "Criar ou corrigir Comentário.",
      "organisms": [
        {
          "role": "primarySurface",
          "action": "cmdCreateComentario"
        },
        {
          "role": "contextualAction",
          "action": "cmdUpdateComentario"
        },
        {
          "role": "filterControl",
          "dataSource": "qryChamadoPicker",
          "usage": "picker"
        },
        {
          "role": "filterControl",
          "dataSource": "qryAtendentePicker",
          "usage": "picker"
        }
      ]
    }
  ],
  "operationIds": [
    "createComentario",
    "deleteComentario",
    "getComentario",
    "listAtendente",
    "listChamado",
    "listComentario",
    "updateComentario"
  ],
  "purpose": "Cadastro de Comentário.",
  "presentation": {
    "categoryRef": "entityRecordManagement",
    "confidence": 10,
    "classificationNote": "Derived from the recordCatalogue tier of the approved E8 model; the category is structural, not a guess."
  },
  "sliceHash": "sha256:37314f08"
} as const;

export default comentarioCatalogueWorkspace;
