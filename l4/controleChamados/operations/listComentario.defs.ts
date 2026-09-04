/// <mls fileReference="_102039_/l4/controleChamados/operations/listComentario.defs.ts" enhancement="_blank"/>

export const operationListComentario = {
  "operationId": "listComentario",
  "title": "Listar Comentário",
  "actors": [
    "atendente"
  ],
  "entity": "Comentario",
  "kind": "query",
  "reads": [
    "Comentario"
  ],
  "writes": [],
  "rulesApplied": [],
  "story": {
    "actor": "atendente",
    "goal": "Listar Comentário",
    "steps": [
      "Encontrar o registro."
    ],
    "outcome": "Encontrar o registro."
  },
  "accessPattern": {
    "kind": "list",
    "description": "Listar Comentário",
    "entity": "Comentario",
    "keyField": "Comentario.comentarioId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "Comentario.comentarioId",
      "Comentario.chamadoId",
      "Comentario.atendenteId",
      "Comentario.conteudo"
    ]
  },
  "outputShape": {
    "kind": "list",
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
  "inputs": [],
  "pageId": "chamadoHub",
  "commandName": "qryListComentario",
  "bffName": "qryListComentario"
} as const;

export default operationListComentario;
