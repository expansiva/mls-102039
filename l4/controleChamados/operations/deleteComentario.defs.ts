/// <mls fileReference="_102039_/l4/controleChamados/operations/deleteComentario.defs.ts" enhancement="_blank"/>

export const operationDeleteComentario = {
  "operationId": "deleteComentario",
  "title": "Excluir Comentário",
  "actors": [
    "atendente"
  ],
  "entity": "Comentario",
  "kind": "delete",
  "reads": [
    "Comentario"
  ],
  "writes": [
    "Comentario"
  ],
  "rulesApplied": [],
  "story": {
    "actor": "atendente",
    "goal": "Excluir Comentário",
    "steps": [
      "Remover o registro escolhido."
    ],
    "outcome": "Remover o registro escolhido."
  },
  "accessPattern": {
    "kind": "delete",
    "description": "Excluir Comentário",
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
      "inputId": "comentarioId",
      "fieldRef": "Comentario.comentarioId",
      "required": true,
      "source": "selectedEntity",
      "description": "Identificador estável do comentário persistido no histórico de acompanhamento."
    }
  ],
  "pageId": "comentarioCatalogue",
  "commandName": "cmdDeleteComentario",
  "bffName": "cmdDeleteComentario"
} as const;

export default operationDeleteComentario;
