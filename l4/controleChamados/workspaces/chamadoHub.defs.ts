/// <mls fileReference="_102039_/l4/controleChamados/workspaces/chamadoHub.defs.ts" enhancement="_blank"/>

export const chamadoHubWorkspace = {
  "workspaceId": "chamadoHub",
  "title": "Chamado",
  "actors": [
    "atendente"
  ],
  "kind": "landing",
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
      "route": "controleChamados.chamadoHub.qryListChamado"
    },
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
      "route": "controleChamados.chamadoHub.qryListComentario"
    }
  ],
  "sections": [
    {
      "sectionId": "collection",
      "intent": "Carteira e busca.",
      "organisms": [
        {
          "role": "primarySurface",
          "dataSource": "qryListChamado"
        }
      ]
    },
    {
      "sectionId": "record",
      "intent": "Registro selecionado e o que gira em volta dele.",
      "organisms": [
        {
          "role": "detailPanel",
          "dataSource": "qryListComentario"
        }
      ]
    }
  ],
  "operationIds": [
    "listChamado",
    "listComentario"
  ],
  "purpose": "Painel de Chamado.",
  "presentation": {
    "categoryRef": "dashboardCommandCenter",
    "confidence": 10,
    "classificationNote": "Derived from the hub tier of the approved E8 model; the category is structural, not a guess."
  },
  "sliceHash": "sha256:e421b487"
} as const;

export default chamadoHubWorkspace;
