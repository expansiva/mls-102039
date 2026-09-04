/// <mls fileReference="_102039_/l4/controleChamados/operations/registerComentario.defs.ts" enhancement="_blank"/>

export const operationRegisterComentario = {
  "operationId": "registerComentario",
  "title": "Registrar comentário",
  "actors": [
    "atendente"
  ],
  "entity": "Comentario",
  "kind": "commandInput",
  "reads": [
    "Atendente",
    "Chamado",
    "Comentario"
  ],
  "writes": [
    "Comentario"
  ],
  "rulesApplied": [
    "comentariosPermitidosSomenteEmChamadosAbertos"
  ],
  "story": {
    "actor": "atendente",
    "goal": "Registrar comentário",
    "steps": [
      "Registrar comentário",
      "Um comentário fica registrado e vinculado ao chamado selecionado."
    ],
    "outcome": "Um comentário fica registrado e vinculado ao chamado selecionado."
  },
  "accessPattern": {
    "kind": "commandInput",
    "description": "Registrar comentário",
    "entity": "Comentario",
    "keyField": "Comentario.comentarioId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "Comentario.comentarioId",
      "Comentario.chamadoId",
      "Comentario.atendenteId",
      "Comentario.conteudo"
    ]
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "comentarioId",
        "type": "string",
        "required": true,
        "fieldRef": "Comentario.comentarioId"
      },
      {
        "name": "chamadoId",
        "type": "string",
        "required": true,
        "fieldRef": "Comentario.chamadoId"
      },
      {
        "name": "atendenteId",
        "type": "string",
        "required": true,
        "fieldRef": "Comentario.atendenteId"
      },
      {
        "name": "conteudo",
        "type": "string",
        "required": true,
        "fieldRef": "Comentario.conteudo"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "atendenteId",
      "fieldRef": "Atendente.atendenteId",
      "required": true,
      "source": "selectedEntity",
      "description": "Atendente"
    },
    {
      "inputId": "chamadoId",
      "fieldRef": "Chamado.chamadoId",
      "required": true,
      "source": "routeParam",
      "description": "Chamado"
    },
    {
      "inputId": "conteudo",
      "fieldRef": "Comentario.conteudo",
      "required": true,
      "source": "userInput",
      "description": "Texto de acompanhamento escrito pelo atendente para o chamado."
    }
  ],
  "pageId": "registrarComentarioChamado",
  "commandName": "cmdRegisterComentario",
  "bffName": "cmdRegisterComentario"
} as const;

export default operationRegisterComentario;
