/// <mls fileReference="_102039_/l4/controleChamados/operations/deleteChamado.defs.ts" enhancement="_blank"/>

export const operationDeleteChamado = {
  "operationId": "deleteChamado",
  "title": "Excluir Chamado",
  "actors": [
    "atendente"
  ],
  "entity": "Chamado",
  "kind": "delete",
  "reads": [
    "Chamado"
  ],
  "writes": [
    "Chamado"
  ],
  "rulesApplied": [],
  "story": {
    "actor": "atendente",
    "goal": "Excluir Chamado",
    "steps": [
      "Remover o registro escolhido."
    ],
    "outcome": "Remover o registro escolhido."
  },
  "accessPattern": {
    "kind": "delete",
    "description": "Excluir Chamado",
    "entity": "Chamado",
    "keyField": "Chamado.chamadoId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "Chamado.chamadoId",
      "Chamado.titulo",
      "Chamado.descricao",
      "Chamado.status"
    ]
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "chamadoId",
        "type": "string",
        "required": true,
        "fieldRef": "Chamado.chamadoId"
      },
      {
        "name": "titulo",
        "type": "string",
        "required": true,
        "fieldRef": "Chamado.titulo"
      },
      {
        "name": "descricao",
        "type": "string",
        "required": true,
        "fieldRef": "Chamado.descricao"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "fieldRef": "Chamado.status"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "chamadoId",
      "fieldRef": "Chamado.chamadoId",
      "required": true,
      "source": "selectedEntity",
      "description": "Identificador estável do chamado, transportado entre as etapas de acompanhamento."
    }
  ],
  "pageId": "chamadoCatalogue",
  "commandName": "cmdDeleteChamado",
  "bffName": "cmdDeleteChamado"
} as const;

export default operationDeleteChamado;
