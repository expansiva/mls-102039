/// <mls fileReference="_102039_/l4/controleChamados/operations/createComentario.defs.ts" enhancement="_blank"/>

export const operationCreateComentario = {
  "operationId": "createComentario",
  "title": "Criar Comentário",
  "actors": [
    "atendente"
  ],
  "entity": "Comentario",
  "kind": "create",
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
    "goal": "Criar Comentário",
    "steps": [
      "Informar os dados do novo registro."
    ],
    "outcome": "Informar os dados do novo registro."
  },
  "accessPattern": {
    "kind": "create",
    "description": "Criar Comentário",
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
      "inputId": "chamadoId",
      "fieldRef": "Comentario.chamadoId",
      "required": true,
      "source": "selectedEntity",
      "description": "Chamado aberto selecionado ao qual o comentário pertence."
    },
    {
      "inputId": "atendenteId",
      "fieldRef": "Comentario.atendenteId",
      "required": true,
      "source": "selectedEntity",
      "description": "Atendente autenticado identificado como responsável pelo registro do comentário."
    },
    {
      "inputId": "conteudo",
      "fieldRef": "Comentario.conteudo",
      "required": true,
      "source": "userInput",
      "description": "Texto de acompanhamento escrito pelo atendente para o chamado."
    }
  ],
  "pageId": "comentarioCatalogue",
  "commandName": "cmdCreateComentario",
  "bffName": "cmdCreateComentario"
} as const;

export default operationCreateComentario;
