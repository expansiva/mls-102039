/// <mls fileReference="_102039_/l4/controleChamados/operations/updateComentario.defs.ts" enhancement="_blank"/>

export const operationUpdateComentario = {
  "operationId": "updateComentario",
  "title": "Atualizar Comentário",
  "actors": [
    "atendente"
  ],
  "entity": "Comentario",
  "kind": "update",
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
    "goal": "Atualizar Comentário",
    "steps": [
      "Corrigir os dados do registro escolhido."
    ],
    "outcome": "Corrigir os dados do registro escolhido."
  },
  "accessPattern": {
    "kind": "update",
    "description": "Atualizar Comentário",
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
    },
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
  "commandName": "cmdUpdateComentario",
  "bffName": "cmdUpdateComentario"
} as const;

export default operationUpdateComentario;
