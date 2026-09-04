/// <mls fileReference="_102039_/l4/controleChamados/workspaces/registrarComentarioChamado.defs.ts" enhancement="_blank"/>

export const registrarComentarioChamadoWorkspace = {
  "workspaceId": "registrarComentarioChamado",
  "title": "Registrar comentário em chamado aberto",
  "actors": [
    "atendente"
  ],
  "kind": "operation",
  "entity": "Comentario",
  "bffCalls": [
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
      "route": "controleChamados.registrarComentarioChamado.qryLocateChamado"
    },
    {
      "bffId": "cmdRegisterComentario",
      "kind": "command",
      "uses": [
        {
          "operationId": "registerComentario"
        }
      ],
      "input": [
        {
          "name": "atendenteId",
          "from": "registerComentario.atendenteId",
          "required": true,
          "source": "selectedEntity",
          "sourceRef": "qryAtendentePicker",
          "type": "string"
        },
        {
          "name": "chamadoId",
          "from": "registerComentario.chamadoId",
          "required": true,
          "source": "routeParam",
          "type": "string"
        },
        {
          "name": "conteudo",
          "from": "registerComentario.conteudo",
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
            "from": "registerComentario.comentarioId",
            "type": "string",
            "required": true
          },
          {
            "name": "chamadoId",
            "from": "registerComentario.chamadoId",
            "type": "string",
            "required": true
          },
          {
            "name": "atendenteId",
            "from": "registerComentario.atendenteId",
            "type": "string",
            "required": true
          },
          {
            "name": "conteudo",
            "from": "registerComentario.conteudo",
            "type": "string",
            "required": true
          }
        ]
      },
      "route": "controleChamados.registrarComentarioChamado.cmdRegisterComentario"
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
      "route": "controleChamados.registrarComentarioChamado.qryAtendentePicker"
    }
  ],
  "sections": [
    {
      "sectionId": "locateChamado",
      "intent": "Um chamado aberto, disponível no catálogo de chamados, está selecionado.",
      "organisms": [
        {
          "role": "primarySurface",
          "dataSource": "qryLocateChamado",
          "usage": "picker"
        }
      ]
    },
    {
      "sectionId": "registerComentario",
      "intent": "Um comentário fica registrado e vinculado ao chamado selecionado.",
      "organisms": [
        {
          "role": "primarySurface",
          "action": "cmdRegisterComentario"
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
    "listAtendente",
    "locateChamado",
    "registerComentario"
  ],
  "purpose": "Manter o acompanhamento de um chamado aberto por meio de um comentário vinculado.",
  "presentation": {
    "categoryRef": "processWizard",
    "confidence": 10,
    "classificationNote": "Derived from the journey tier of the approved E8 model; the category is structural, not a guess."
  },
  "sliceHash": "sha256:f0c5c53e"
} as const;

export default registrarComentarioChamadoWorkspace;
