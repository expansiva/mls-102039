/// <mls fileReference="_102039_/l2/controleChamados/web/shared/chamadoHub.defs.ts" enhancement="_blank"/>

/**
 * uiScenary contract (page skeleton reads `scenaries[].value` as <Scene value>):
 *   scenaries[]: { value, kind: "base"|"detail"|"command", commandName?, preconditions: stateKey[] }
 *   preconditions = required route/selection inputs (skill rule 8). Unsatisfied → base, silently.
 *   URL `?scenary=` is a request; the shared setter is the source of truth.
 *   destructiveCommandIds never become scenes (confirmation stays a modal).
 */
export const definition = {
  "pageId": "chamadoHub",
  "pageName": "Chamado",
  "moduleName": "controleChamados",
  "baseClassName": "ControleChamadosChamadoHubBase",
  "routePattern": "/controleChamados/chamadoHub",
  "sourceKind": "operation",
  "ownerIds": [
    "workspace:chamadoHub",
    "contract:controleChamados.chamadoHub.qryListChamado",
    "contract:controleChamados.chamadoHub.qryListComentario"
  ],
  "operationIds": [
    "listChamado",
    "listComentario"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "chamadoHub",
    "workspaceKind": "landing",
    "actor": "atendente",
    "entity": "Chamado",
    "owners": [
      {
        "kind": "operation",
        "id": "listChamado",
        "defPath": "_102039_/l4/controleChamados/operations/listChamado.defs.ts"
      },
      {
        "kind": "operation",
        "id": "listComentario",
        "defPath": "_102039_/l4/controleChamados/operations/listComentario.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "listChamado",
          "commandName": "qryListChamado",
          "steps": [
            "Encontrar o registro."
          ]
        },
        {
          "operationId": "listComentario",
          "commandName": "qryListComentario",
          "steps": [
            "Encontrar o registro."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "tsPath": "_102039_/l2/controleChamados/web/contracts/chamadoHub.ts",
    "contracts": [
      {
        "commandName": "qryListChamado",
        "routeConst": "qryListChamadoRoute"
      },
      {
        "commandName": "qryListComentario",
        "routeConst": "qryListComentarioRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102039_/l2/controleChamados/web/desktop/page11/chamadoHub.defs.ts",
    "layoutId": "status_overview"
  },
  "states": [
    {
      "stateKey": "ui.chamadoHub.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoHub.scenary",
      "name": "uiScenary",
      "kind": "uiScenary",
      "valueSet": [
        "base"
      ],
      "defaultValue": "base"
    },
    {
      "stateKey": "ui.chamadoHub.action.qryListChamado.status",
      "name": "qryListChamadoState",
      "kind": "actionStatus",
      "actionRef": "qryListChamado",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.chamadoHub.input.qryListChamado.sortBy",
      "name": "qryListChamadoSortBy",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "qryListChamado",
        "direction": "input",
        "field": "sortBy"
      },
      "valueSet": [
        "open",
        "closed"
      ],
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoHub.input.qryListChamado.sortOrder",
      "name": "qryListChamadoSortOrder",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "qryListChamado",
        "direction": "input",
        "field": "sortOrder"
      },
      "valueSet": [
        "asc",
        "desc"
      ],
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoHub.data.qryListChamado",
      "name": "qryListChamadoData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryListChamado",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    },
    {
      "stateKey": "ui.chamadoHub.action.qryListComentario.status",
      "name": "qryListComentarioState",
      "kind": "actionStatus",
      "actionRef": "qryListComentario",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.chamadoHub.data.qryListComentario",
      "name": "qryListComentarioData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryListComentario",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    }
  ],
  "actions": [
    {
      "actionId": "qryListChamado",
      "kind": "query",
      "commandRef": "qryListChamado",
      "routeKey": "controleChamados.chamadoHub.qryListChamado",
      "purpose": "Listar Chamado",
      "methodName": "loadQryListChamado",
      "handlerName": "handleQryListChamadoClick",
      "inputStateKeys": [
        "ui.chamadoHub.input.qryListChamado.sortBy",
        "ui.chamadoHub.input.qryListChamado.sortOrder"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.chamadoHub.data.qryListChamado"
      ],
      "statusStateKey": "ui.chamadoHub.action.qryListChamado.status"
    },
    {
      "actionId": "qryListComentario",
      "kind": "query",
      "commandRef": "qryListComentario",
      "routeKey": "controleChamados.chamadoHub.qryListComentario",
      "purpose": "Listar Comentário",
      "methodName": "loadQryListComentario",
      "handlerName": "handleQryListComentarioClick",
      "inputStateKeys": [],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.chamadoHub.data.qryListComentario"
      ],
      "statusStateKey": "ui.chamadoHub.action.qryListComentario.status"
    },
    {
      "actionId": "set.qryListChamadoSortBy",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoHub.input.qryListChamado.sortBy",
      "methodName": "setQryListChamadoSortBy",
      "handlerName": "handleQryListChamadoSortByChange"
    },
    {
      "actionId": "set.qryListChamadoSortOrder",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoHub.input.qryListChamado.sortOrder",
      "methodName": "setQryListChamadoSortOrder",
      "handlerName": "handleQryListChamadoSortOrderChange"
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "commandName": "qryListChamado",
      "preconditions": []
    }
  ],
  "destructiveCommandIds": [],
  "initialLoads": [
    {
      "actionId": "qryListChamado",
      "stateKey": "ui.chamadoHub.data.qryListChamado"
    },
    {
      "actionId": "qryListComentario",
      "stateKey": "ui.chamadoHub.data.qryListComentario"
    }
  ],
  "dataBindings": [
    {
      "id": "binding.chamadoHub.qryListChamado",
      "source": "bff.qryListChamado",
      "command": "qryListChamado",
      "description": "Listar Chamado",
      "kind": "query",
      "stateKey": "ui.chamadoHub.data.qryListChamado",
      "inputStateKeys": [
        "ui.chamadoHub.input.qryListChamado.sortBy",
        "ui.chamadoHub.input.qryListChamado.sortOrder"
      ],
      "inputs": [
        {
          "name": "sortBy",
          "stateKey": "ui.chamadoHub.input.qryListChamado.sortBy",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        },
        {
          "name": "sortOrder",
          "stateKey": "ui.chamadoHub.input.qryListChamado.sortOrder",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        }
      ],
      "selection": "single"
    },
    {
      "id": "binding.chamadoHub.qryListComentario",
      "source": "bff.qryListComentario",
      "command": "qryListComentario",
      "description": "Listar Comentário",
      "kind": "query",
      "stateKey": "ui.chamadoHub.data.qryListComentario",
      "inputStateKeys": [],
      "inputs": [],
      "selection": "single"
    }
  ],
  "businessContextRefs": [],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "pt",
    "activeLocales": [
      "pt"
    ],
    "runtimeLocales": [
      "pt-br"
    ]
  },
  "i18n": {
    "section.collection.title": "Carteira de chamados",
    "organism.qryListChamado.title": "Listar Chamado",
    "intent.qryListChamado.list.title": "Listar Chamado",
    "intent.qryListChamado.list.empty": "Nenhum registro encontrado",
    "intent.qryListChamado.list.column.chamadoId.label": "Identificador do chamado",
    "intent.qryListChamado.list.column.titulo.label": "Título",
    "intent.qryListChamado.list.column.descricao.label": "Descrição",
    "intent.qryListChamado.list.column.status.label": "Status",
    "intent.qryListChamado.list.filter.sortBy.label": "Sort By",
    "intent.qryListChamado.list.filter.sortOrder.label": "Sort Order",
    "section.record.title": "Contexto do registro",
    "organism.qryListComentario.title": "Listar Comentário",
    "intent.qryListComentario.list.title": "Listar Comentário",
    "intent.qryListComentario.list.empty": "Nenhum registro encontrado",
    "intent.qryListComentario.list.column.comentarioId.label": "Identificador do comentário",
    "intent.qryListComentario.list.column.chamadoId.label": "Identificador do chamado",
    "intent.qryListComentario.list.column.atendenteId.label": "Atendente que registrou",
    "intent.qryListComentario.list.column.conteudo.label": "Comentário"
  },
  "automation": {
    "statePrefix": "ui.chamadoHub",
    "stateKeys": [
      "ui.chamadoHub.status",
      "ui.chamadoHub.scenary",
      "ui.chamadoHub.action.qryListChamado.status",
      "ui.chamadoHub.input.qryListChamado.sortBy",
      "ui.chamadoHub.input.qryListChamado.sortOrder",
      "ui.chamadoHub.data.qryListChamado",
      "ui.chamadoHub.action.qryListComentario.status",
      "ui.chamadoHub.data.qryListComentario"
    ],
    "actionIds": [
      "qryListChamado",
      "qryListComentario",
      "set.qryListChamadoSortBy",
      "set.qryListChamadoSortOrder"
    ]
  }
};

export const pipeline = [
  {
    "id": "chamadoHub__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102039_/l2/controleChamados/web/shared/chamadoHub.ts",
    "defPath": "_102039_/l2/controleChamados/web/shared/chamadoHub.defs.ts",
    "dependsFiles": [
      "_102039_/l2/controleChamados/web/contracts/chamadoHub.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
