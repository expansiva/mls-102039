/// <mls fileReference="_102039_/l4/controleChamados/operations/getComentario.defs.ts" enhancement="_blank"/>

export const operationGetComentario = {
  "operationId": "getComentario",
  "title": "Obter Comentário",
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
    "goal": "Obter Comentário",
    "steps": [
      "Ler o registro pelo identificador."
    ],
    "outcome": "Ler o registro pelo identificador."
  },
  "accessPattern": {
    "kind": "getById",
    "description": "Obter Comentário",
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
  "commandName": "qryGetComentario",
  "bffName": "qryGetComentario"
} as const;

export default operationGetComentario;
