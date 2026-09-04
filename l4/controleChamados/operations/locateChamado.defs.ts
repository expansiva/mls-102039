/// <mls fileReference="_102039_/l4/controleChamados/operations/locateChamado.defs.ts" enhancement="_blank"/>

export const operationLocateChamado = {
  "operationId": "locateChamado",
  "title": "Localizar o chamado aberto",
  "actors": [
    "atendente"
  ],
  "entity": "Chamado",
  "kind": "query",
  "reads": [
    "Chamado"
  ],
  "writes": [],
  "rulesApplied": [],
  "story": {
    "actor": "atendente",
    "goal": "Localizar o chamado aberto",
    "steps": [
      "Localizar o chamado aberto",
      "Um chamado aberto, disponível no catálogo de chamados, está selecionado para conclusão."
    ],
    "outcome": "Um chamado aberto, disponível no catálogo de chamados, está selecionado para conclusão."
  },
  "accessPattern": {
    "kind": "list",
    "description": "Localizar o chamado aberto",
    "entity": "Chamado",
    "keyField": "Chamado.chamadoId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "Chamado.chamadoId",
      "Chamado.titulo",
      "Chamado.descricao",
      "Chamado.status"
    ]
  },
  "outputShape": {
    "kind": "list",
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
  "inputs": [],
  "pageId": "chamadoCatalogue",
  "commandName": "qryLocateChamado",
  "bffName": "qryLocateChamado"
} as const;

export default operationLocateChamado;
