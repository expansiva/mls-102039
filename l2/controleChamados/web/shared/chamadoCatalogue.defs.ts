/// <mls fileReference="_102039_/l2/controleChamados/web/shared/chamadoCatalogue.defs.ts" enhancement="_blank"/>

/**
 * uiScenary contract (page skeleton reads `scenaries[].value` as <Scene value>):
 *   scenaries[]: { value, kind: "base"|"detail"|"command", commandName?, preconditions: stateKey[] }
 *   preconditions = required route/selection inputs (skill rule 8). Unsatisfied → base, silently.
 *   URL `?scenary=` is a request; the shared setter is the source of truth.
 *   destructiveCommandIds never become scenes (confirmation stays a modal).
 */
export const definition = {
  "pageId": "chamadoCatalogue",
  "pageName": "Chamado",
  "moduleName": "controleChamados",
  "baseClassName": "ControleChamadosChamadoCatalogueBase",
  "routePattern": "/controleChamados/chamadoCatalogue/:chamadoId?",
  "sourceKind": "operation",
  "ownerIds": [
    "workspace:chamadoCatalogue",
    "contract:controleChamados.chamadoCatalogue.qryListChamado",
    "contract:controleChamados.chamadoCatalogue.cmdCreateChamado",
    "contract:controleChamados.chamadoCatalogue.cmdUpdateChamado",
    "contract:controleChamados.chamadoCatalogue.cmdDeleteChamado",
    "contract:controleChamados.chamadoCatalogue.qryGetChamado",
    "contract:controleChamados.chamadoCatalogue.qryLocateChamado",
    "contract:controleChamados.chamadoCatalogue.cmdCloseChamado"
  ],
  "operationIds": [
    "closeChamado",
    "createChamado",
    "deleteChamado",
    "getChamado",
    "listChamado",
    "locateChamado",
    "updateChamado"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "chamadoCatalogue",
    "workspaceKind": "operation",
    "actor": "atendente",
    "entity": "Chamado",
    "owners": [
      {
        "kind": "operation",
        "id": "closeChamado",
        "defPath": "_102039_/l4/controleChamados/operations/closeChamado.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createChamado",
        "defPath": "_102039_/l4/controleChamados/operations/createChamado.defs.ts"
      },
      {
        "kind": "operation",
        "id": "deleteChamado",
        "defPath": "_102039_/l4/controleChamados/operations/deleteChamado.defs.ts"
      },
      {
        "kind": "operation",
        "id": "getChamado",
        "defPath": "_102039_/l4/controleChamados/operations/getChamado.defs.ts"
      },
      {
        "kind": "operation",
        "id": "listChamado",
        "defPath": "_102039_/l4/controleChamados/operations/listChamado.defs.ts"
      },
      {
        "kind": "operation",
        "id": "locateChamado",
        "defPath": "_102039_/l4/controleChamados/operations/locateChamado.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateChamado",
        "defPath": "_102039_/l4/controleChamados/operations/updateChamado.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "closeChamado",
          "commandName": "cmdCloseChamado",
          "steps": [
            "Confirmar o fechamento do chamado",
            "O chamado selecionado passa a ter o status fechado."
          ]
        },
        {
          "operationId": "createChamado",
          "commandName": "cmdCreateChamado",
          "steps": [
            "Informar os dados do novo registro."
          ]
        },
        {
          "operationId": "deleteChamado",
          "commandName": "cmdDeleteChamado",
          "steps": [
            "Remover o registro escolhido."
          ]
        },
        {
          "operationId": "getChamado",
          "commandName": "qryGetChamado",
          "steps": [
            "Ler o registro pelo identificador."
          ]
        },
        {
          "operationId": "listChamado",
          "commandName": "qryListChamado",
          "steps": [
            "Encontrar o registro."
          ]
        },
        {
          "operationId": "locateChamado",
          "commandName": "qryLocateChamado",
          "steps": [
            "Localizar o chamado aberto",
            "Um chamado aberto, disponível no catálogo de chamados, está selecionado para conclusão."
          ]
        },
        {
          "operationId": "updateChamado",
          "commandName": "cmdUpdateChamado",
          "steps": [
            "Corrigir os dados do registro escolhido."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "tsPath": "_102039_/l2/controleChamados/web/contracts/chamadoCatalogue.ts",
    "contracts": [
      {
        "commandName": "qryListChamado",
        "routeConst": "qryListChamadoRoute"
      },
      {
        "commandName": "cmdCreateChamado",
        "routeConst": "cmdCreateChamadoRoute"
      },
      {
        "commandName": "cmdUpdateChamado",
        "routeConst": "cmdUpdateChamadoRoute"
      },
      {
        "commandName": "cmdDeleteChamado",
        "routeConst": "cmdDeleteChamadoRoute"
      },
      {
        "commandName": "qryGetChamado",
        "routeConst": "qryGetChamadoRoute"
      },
      {
        "commandName": "qryLocateChamado",
        "routeConst": "qryLocateChamadoRoute"
      },
      {
        "commandName": "cmdCloseChamado",
        "routeConst": "cmdCloseChamadoRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102039_/l2/controleChamados/web/desktop/page11/chamadoCatalogue.defs.ts",
    "layoutId": "pos_workspace"
  },
  "states": [
    {
      "stateKey": "ui.chamadoCatalogue.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.scenary",
      "name": "uiScenary",
      "kind": "uiScenary",
      "valueSet": [
        "base",
        "detail",
        "createChamado",
        "updateChamado",
        "closeChamado"
      ],
      "defaultValue": "base"
    },
    {
      "stateKey": "ui.chamadoCatalogue.action.qryListChamado.status",
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
      "stateKey": "ui.chamadoCatalogue.input.qryListChamado.sortBy",
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
      "stateKey": "ui.chamadoCatalogue.input.qryListChamado.sortOrder",
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
      "stateKey": "ui.chamadoCatalogue.data.qryListChamado",
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
      "stateKey": "ui.chamadoCatalogue.action.cmdCreateChamado.status",
      "name": "cmdCreateChamadoState",
      "kind": "actionStatus",
      "actionRef": "cmdCreateChamado",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.chamadoCatalogue.input.cmdCreateChamado.titulo",
      "name": "cmdCreateChamadoTitulo",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateChamado",
        "direction": "input",
        "field": "titulo"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.input.cmdCreateChamado.descricao",
      "name": "cmdCreateChamadoDescricao",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateChamado",
        "direction": "input",
        "field": "descricao"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.input.cmdCreateChamado.status",
      "name": "cmdCreateChamadoStatus",
      "kind": "input",
      "source": "systemDefault",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateChamado",
        "direction": "input",
        "field": "status"
      },
      "valueSet": [
        "open",
        "closed"
      ],
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.output.cmdCreateChamado",
      "name": "cmdCreateChamadoOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdCreateChamado",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.chamadoCatalogue.action.cmdCreateChamado.error",
      "name": "cmdCreateChamadoError",
      "kind": "actionError",
      "actionRef": "cmdCreateChamado",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.action.cmdUpdateChamado.status",
      "name": "cmdUpdateChamadoState",
      "kind": "actionStatus",
      "actionRef": "cmdUpdateChamado",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId",
      "name": "cmdUpdateChamadoChamadoId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdUpdateChamado",
        "direction": "input",
        "field": "chamadoId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.titulo",
      "name": "cmdUpdateChamadoTitulo",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdUpdateChamado",
        "direction": "input",
        "field": "titulo"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.descricao",
      "name": "cmdUpdateChamadoDescricao",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdUpdateChamado",
        "direction": "input",
        "field": "descricao"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.status",
      "name": "cmdUpdateChamadoStatus",
      "kind": "input",
      "source": "systemDefault",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdUpdateChamado",
        "direction": "input",
        "field": "status"
      },
      "valueSet": [
        "open",
        "closed"
      ],
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.output.cmdUpdateChamado",
      "name": "cmdUpdateChamadoOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdUpdateChamado",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.chamadoCatalogue.action.cmdUpdateChamado.error",
      "name": "cmdUpdateChamadoError",
      "kind": "actionError",
      "actionRef": "cmdUpdateChamado",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.action.cmdDeleteChamado.status",
      "name": "cmdDeleteChamadoState",
      "kind": "actionStatus",
      "actionRef": "cmdDeleteChamado",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.chamadoCatalogue.input.cmdDeleteChamado.chamadoId",
      "name": "cmdDeleteChamadoChamadoId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdDeleteChamado",
        "direction": "input",
        "field": "chamadoId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.output.cmdDeleteChamado",
      "name": "cmdDeleteChamadoOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdDeleteChamado",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.chamadoCatalogue.action.cmdDeleteChamado.error",
      "name": "cmdDeleteChamadoError",
      "kind": "actionError",
      "actionRef": "cmdDeleteChamado",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.action.qryGetChamado.status",
      "name": "qryGetChamadoState",
      "kind": "actionStatus",
      "actionRef": "qryGetChamado",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.chamadoCatalogue.input.qryGetChamado.chamadoId",
      "name": "qryGetChamadoChamadoId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "qryGetChamado",
        "direction": "input",
        "field": "chamadoId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.data.qryGetChamado",
      "name": "qryGetChamadoData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryGetChamado",
        "direction": "output"
      },
      "outputShape": "object",
      "collection": false,
      "defaultValue": null
    },
    {
      "stateKey": "ui.chamadoCatalogue.action.qryLocateChamado.status",
      "name": "qryLocateChamadoState",
      "kind": "actionStatus",
      "actionRef": "qryLocateChamado",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.chamadoCatalogue.data.qryLocateChamado",
      "name": "qryLocateChamadoData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryLocateChamado",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    },
    {
      "stateKey": "ui.chamadoCatalogue.action.cmdCloseChamado.status",
      "name": "cmdCloseChamadoState",
      "kind": "actionStatus",
      "actionRef": "cmdCloseChamado",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.chamadoCatalogue.input.cmdCloseChamado.chamadoId",
      "name": "cmdCloseChamadoChamadoId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "cmdCloseChamado",
        "direction": "input",
        "field": "chamadoId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.input.cmdCloseChamado.status",
      "name": "cmdCloseChamadoStatus",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCloseChamado",
        "direction": "input",
        "field": "status"
      },
      "valueSet": [
        "open",
        "closed"
      ],
      "defaultValue": ""
    },
    {
      "stateKey": "ui.chamadoCatalogue.output.cmdCloseChamado",
      "name": "cmdCloseChamadoOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdCloseChamado",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.chamadoCatalogue.action.cmdCloseChamado.error",
      "name": "cmdCloseChamadoError",
      "kind": "actionError",
      "actionRef": "cmdCloseChamado",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "qryListChamado",
      "kind": "query",
      "commandRef": "qryListChamado",
      "routeKey": "controleChamados.chamadoCatalogue.qryListChamado",
      "purpose": "Listar Chamado",
      "methodName": "loadQryListChamado",
      "handlerName": "handleQryListChamadoClick",
      "inputStateKeys": [
        "ui.chamadoCatalogue.input.qryListChamado.sortBy",
        "ui.chamadoCatalogue.input.qryListChamado.sortOrder"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.chamadoCatalogue.data.qryListChamado"
      ],
      "statusStateKey": "ui.chamadoCatalogue.action.qryListChamado.status"
    },
    {
      "actionId": "cmdCreateChamado",
      "kind": "command",
      "commandRef": "cmdCreateChamado",
      "routeKey": "controleChamados.chamadoCatalogue.cmdCreateChamado",
      "purpose": "Criar Chamado",
      "methodName": "cmdCreateChamado",
      "handlerName": "handleCmdCreateChamadoClick",
      "inputStateKeys": [
        "ui.chamadoCatalogue.input.cmdCreateChamado.titulo",
        "ui.chamadoCatalogue.input.cmdCreateChamado.descricao",
        "ui.chamadoCatalogue.input.cmdCreateChamado.status"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.chamadoCatalogue.output.cmdCreateChamado"
      ],
      "statusStateKey": "ui.chamadoCatalogue.action.cmdCreateChamado.status",
      "errorStateKey": "ui.chamadoCatalogue.action.cmdCreateChamado.error",
      "feedback": {
        "successMessageKey": "action.cmdCreateChamado.success",
        "errorMessageKey": "action.cmdCreateChamado.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.chamadoCatalogue.input.cmdCreateChamado.titulo",
        "ui.chamadoCatalogue.input.cmdCreateChamado.descricao",
        "ui.chamadoCatalogue.input.cmdCreateChamado.status"
      ],
      "refreshActionIds": [
        "qryListChamado",
        "qryGetChamado",
        "qryLocateChamado"
      ]
    },
    {
      "actionId": "cmdUpdateChamado",
      "kind": "command",
      "commandRef": "cmdUpdateChamado",
      "routeKey": "controleChamados.chamadoCatalogue.cmdUpdateChamado",
      "purpose": "Atualizar Chamado",
      "methodName": "cmdUpdateChamado",
      "handlerName": "handleCmdUpdateChamadoClick",
      "inputStateKeys": [
        "ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId",
        "ui.chamadoCatalogue.input.cmdUpdateChamado.titulo",
        "ui.chamadoCatalogue.input.cmdUpdateChamado.descricao",
        "ui.chamadoCatalogue.input.cmdUpdateChamado.status"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId"
      ],
      "outputStateKeys": [
        "ui.chamadoCatalogue.output.cmdUpdateChamado"
      ],
      "statusStateKey": "ui.chamadoCatalogue.action.cmdUpdateChamado.status",
      "errorStateKey": "ui.chamadoCatalogue.action.cmdUpdateChamado.error",
      "feedback": {
        "successMessageKey": "action.cmdUpdateChamado.success",
        "errorMessageKey": "action.cmdUpdateChamado.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId",
        "ui.chamadoCatalogue.input.cmdUpdateChamado.titulo",
        "ui.chamadoCatalogue.input.cmdUpdateChamado.descricao",
        "ui.chamadoCatalogue.input.cmdUpdateChamado.status"
      ],
      "refreshActionIds": [
        "qryListChamado",
        "qryGetChamado",
        "qryLocateChamado"
      ]
    },
    {
      "actionId": "cmdDeleteChamado",
      "kind": "command",
      "commandRef": "cmdDeleteChamado",
      "routeKey": "controleChamados.chamadoCatalogue.cmdDeleteChamado",
      "purpose": "Excluir Chamado",
      "methodName": "cmdDeleteChamado",
      "handlerName": "handleCmdDeleteChamadoClick",
      "inputStateKeys": [
        "ui.chamadoCatalogue.input.cmdDeleteChamado.chamadoId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.chamadoCatalogue.input.cmdDeleteChamado.chamadoId"
      ],
      "outputStateKeys": [
        "ui.chamadoCatalogue.output.cmdDeleteChamado"
      ],
      "statusStateKey": "ui.chamadoCatalogue.action.cmdDeleteChamado.status",
      "errorStateKey": "ui.chamadoCatalogue.action.cmdDeleteChamado.error",
      "feedback": {
        "successMessageKey": "action.cmdDeleteChamado.success",
        "errorMessageKey": "action.cmdDeleteChamado.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.chamadoCatalogue.input.cmdDeleteChamado.chamadoId"
      ],
      "refreshActionIds": [
        "qryListChamado",
        "qryGetChamado",
        "qryLocateChamado"
      ]
    },
    {
      "actionId": "qryGetChamado",
      "kind": "query",
      "commandRef": "qryGetChamado",
      "routeKey": "controleChamados.chamadoCatalogue.qryGetChamado",
      "purpose": "Obter Chamado",
      "methodName": "loadQryGetChamado",
      "handlerName": "handleQryGetChamadoClick",
      "inputStateKeys": [
        "ui.chamadoCatalogue.input.qryGetChamado.chamadoId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.chamadoCatalogue.input.qryGetChamado.chamadoId"
      ],
      "outputStateKeys": [
        "ui.chamadoCatalogue.data.qryGetChamado"
      ],
      "statusStateKey": "ui.chamadoCatalogue.action.qryGetChamado.status"
    },
    {
      "actionId": "qryLocateChamado",
      "kind": "query",
      "commandRef": "qryLocateChamado",
      "routeKey": "controleChamados.chamadoCatalogue.qryLocateChamado",
      "purpose": "Localizar o chamado aberto",
      "methodName": "loadQryLocateChamado",
      "handlerName": "handleQryLocateChamadoClick",
      "inputStateKeys": [],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.chamadoCatalogue.data.qryLocateChamado"
      ],
      "statusStateKey": "ui.chamadoCatalogue.action.qryLocateChamado.status"
    },
    {
      "actionId": "cmdCloseChamado",
      "kind": "command",
      "commandRef": "cmdCloseChamado",
      "routeKey": "controleChamados.chamadoCatalogue.cmdCloseChamado",
      "purpose": "Confirmar o fechamento do chamado",
      "methodName": "cmdCloseChamado",
      "handlerName": "handleCmdCloseChamadoClick",
      "inputStateKeys": [
        "ui.chamadoCatalogue.input.cmdCloseChamado.chamadoId",
        "ui.chamadoCatalogue.input.cmdCloseChamado.status"
      ],
      "routeParamInputStateKeys": [
        "ui.chamadoCatalogue.input.cmdCloseChamado.chamadoId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.chamadoCatalogue.output.cmdCloseChamado"
      ],
      "statusStateKey": "ui.chamadoCatalogue.action.cmdCloseChamado.status",
      "errorStateKey": "ui.chamadoCatalogue.action.cmdCloseChamado.error",
      "feedback": {
        "successMessageKey": "action.cmdCloseChamado.success",
        "errorMessageKey": "action.cmdCloseChamado.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.chamadoCatalogue.input.cmdCloseChamado.status"
      ],
      "refreshActionIds": [
        "qryListChamado",
        "qryGetChamado",
        "qryLocateChamado"
      ]
    },
    {
      "actionId": "set.qryListChamadoSortBy",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoCatalogue.input.qryListChamado.sortBy",
      "methodName": "setQryListChamadoSortBy",
      "handlerName": "handleQryListChamadoSortByChange"
    },
    {
      "actionId": "set.qryListChamadoSortOrder",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoCatalogue.input.qryListChamado.sortOrder",
      "methodName": "setQryListChamadoSortOrder",
      "handlerName": "handleQryListChamadoSortOrderChange"
    },
    {
      "actionId": "set.cmdCreateChamadoTitulo",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoCatalogue.input.cmdCreateChamado.titulo",
      "methodName": "setCmdCreateChamadoTitulo",
      "handlerName": "handleCmdCreateChamadoTituloChange"
    },
    {
      "actionId": "set.cmdCreateChamadoDescricao",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoCatalogue.input.cmdCreateChamado.descricao",
      "methodName": "setCmdCreateChamadoDescricao",
      "handlerName": "handleCmdCreateChamadoDescricaoChange"
    },
    {
      "actionId": "set.cmdCreateChamadoStatus",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoCatalogue.input.cmdCreateChamado.status",
      "methodName": "setCmdCreateChamadoStatus",
      "handlerName": "handleCmdCreateChamadoStatusChange"
    },
    {
      "actionId": "set.cmdUpdateChamadoChamadoId",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId",
      "methodName": "setCmdUpdateChamadoChamadoId",
      "handlerName": "handleCmdUpdateChamadoChamadoIdChange",
      "prefill": {
        "command": "cmdUpdateChamado",
        "sourceStateKey": "ui.chamadoCatalogue.data.qryListChamado",
        "sourceOutputShape": "array",
        "matchField": "chamadoId",
        "fields": [
          {
            "itemField": "titulo",
            "targetStateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.titulo"
          },
          {
            "itemField": "descricao",
            "targetStateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.descricao"
          },
          {
            "itemField": "status",
            "targetStateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.status"
          }
        ]
      }
    },
    {
      "actionId": "set.cmdUpdateChamadoTitulo",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.titulo",
      "methodName": "setCmdUpdateChamadoTitulo",
      "handlerName": "handleCmdUpdateChamadoTituloChange"
    },
    {
      "actionId": "set.cmdUpdateChamadoDescricao",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.descricao",
      "methodName": "setCmdUpdateChamadoDescricao",
      "handlerName": "handleCmdUpdateChamadoDescricaoChange"
    },
    {
      "actionId": "set.cmdUpdateChamadoStatus",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.status",
      "methodName": "setCmdUpdateChamadoStatus",
      "handlerName": "handleCmdUpdateChamadoStatusChange"
    },
    {
      "actionId": "set.cmdDeleteChamadoChamadoId",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoCatalogue.input.cmdDeleteChamado.chamadoId",
      "methodName": "setCmdDeleteChamadoChamadoId",
      "handlerName": "handleCmdDeleteChamadoChamadoIdChange"
    },
    {
      "actionId": "set.qryGetChamadoChamadoId",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoCatalogue.input.qryGetChamado.chamadoId",
      "methodName": "setQryGetChamadoChamadoId",
      "handlerName": "handleQryGetChamadoChamadoIdChange"
    },
    {
      "actionId": "set.cmdCloseChamadoChamadoId",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoCatalogue.input.cmdCloseChamado.chamadoId",
      "methodName": "setCmdCloseChamadoChamadoId",
      "handlerName": "handleCmdCloseChamadoChamadoIdChange",
      "prefill": {
        "command": "cmdCloseChamado",
        "sourceStateKey": "ui.chamadoCatalogue.data.qryListChamado",
        "sourceOutputShape": "array",
        "matchField": "chamadoId",
        "fields": [
          {
            "itemField": "status",
            "targetStateKey": "ui.chamadoCatalogue.input.cmdCloseChamado.status"
          }
        ]
      }
    },
    {
      "actionId": "set.cmdCloseChamadoStatus",
      "kind": "stateSetter",
      "stateKey": "ui.chamadoCatalogue.input.cmdCloseChamado.status",
      "methodName": "setCmdCloseChamadoStatus",
      "handlerName": "handleCmdCloseChamadoStatusChange"
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "commandName": "qryListChamado",
      "preconditions": []
    },
    {
      "value": "detail",
      "kind": "detail",
      "commandName": "qryGetChamado",
      "preconditions": [
        "ui.chamadoCatalogue.input.qryGetChamado.chamadoId"
      ]
    },
    {
      "value": "createChamado",
      "kind": "command",
      "commandName": "cmdCreateChamado",
      "preconditions": []
    },
    {
      "value": "updateChamado",
      "kind": "command",
      "commandName": "cmdUpdateChamado",
      "preconditions": [
        "ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId"
      ]
    },
    {
      "value": "closeChamado",
      "kind": "command",
      "commandName": "cmdCloseChamado",
      "preconditions": [
        "ui.chamadoCatalogue.input.cmdCloseChamado.chamadoId"
      ]
    }
  ],
  "destructiveCommandIds": [
    "cmdDeleteChamado"
  ],
  "initialLoads": [
    {
      "actionId": "qryListChamado",
      "stateKey": "ui.chamadoCatalogue.data.qryListChamado"
    },
    {
      "actionId": "qryLocateChamado",
      "stateKey": "ui.chamadoCatalogue.data.qryLocateChamado"
    }
  ],
  "dataBindings": [
    {
      "id": "binding.chamadoCatalogue.qryListChamado",
      "source": "bff.qryListChamado",
      "command": "qryListChamado",
      "description": "Listar Chamado",
      "kind": "query",
      "stateKey": "ui.chamadoCatalogue.data.qryListChamado",
      "inputStateKeys": [
        "ui.chamadoCatalogue.input.qryListChamado.sortBy",
        "ui.chamadoCatalogue.input.qryListChamado.sortOrder"
      ],
      "inputs": [
        {
          "name": "sortBy",
          "stateKey": "ui.chamadoCatalogue.input.qryListChamado.sortBy",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        },
        {
          "name": "sortOrder",
          "stateKey": "ui.chamadoCatalogue.input.qryListChamado.sortOrder",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        }
      ],
      "selection": "single"
    },
    {
      "id": "binding.chamadoCatalogue.cmdCreateChamado",
      "source": "bff.cmdCreateChamado",
      "command": "cmdCreateChamado",
      "description": "Criar Chamado",
      "kind": "command",
      "stateKey": "ui.chamadoCatalogue.output.cmdCreateChamado",
      "inputStateKeys": [
        "ui.chamadoCatalogue.input.cmdCreateChamado.titulo",
        "ui.chamadoCatalogue.input.cmdCreateChamado.descricao",
        "ui.chamadoCatalogue.input.cmdCreateChamado.status"
      ],
      "inputs": [
        {
          "name": "titulo",
          "stateKey": "ui.chamadoCatalogue.input.cmdCreateChamado.titulo",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        },
        {
          "name": "descricao",
          "stateKey": "ui.chamadoCatalogue.input.cmdCreateChamado.descricao",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        },
        {
          "name": "status",
          "stateKey": "ui.chamadoCatalogue.input.cmdCreateChamado.status",
          "source": "systemDefault",
          "required": true,
          "presentation": "form"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.chamadoCatalogue.cmdUpdateChamado",
      "source": "bff.cmdUpdateChamado",
      "command": "cmdUpdateChamado",
      "description": "Atualizar Chamado",
      "kind": "command",
      "stateKey": "ui.chamadoCatalogue.output.cmdUpdateChamado",
      "inputStateKeys": [
        "ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId",
        "ui.chamadoCatalogue.input.cmdUpdateChamado.titulo",
        "ui.chamadoCatalogue.input.cmdUpdateChamado.descricao",
        "ui.chamadoCatalogue.input.cmdUpdateChamado.status"
      ],
      "inputs": [
        {
          "name": "chamadoId",
          "stateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        },
        {
          "name": "titulo",
          "stateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.titulo",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        },
        {
          "name": "descricao",
          "stateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.descricao",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        },
        {
          "name": "status",
          "stateKey": "ui.chamadoCatalogue.input.cmdUpdateChamado.status",
          "source": "systemDefault",
          "required": true,
          "presentation": "form"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.chamadoCatalogue.cmdDeleteChamado",
      "source": "bff.cmdDeleteChamado",
      "command": "cmdDeleteChamado",
      "description": "Excluir Chamado",
      "kind": "command",
      "stateKey": "ui.chamadoCatalogue.output.cmdDeleteChamado",
      "inputStateKeys": [
        "ui.chamadoCatalogue.input.cmdDeleteChamado.chamadoId"
      ],
      "inputs": [
        {
          "name": "chamadoId",
          "stateKey": "ui.chamadoCatalogue.input.cmdDeleteChamado.chamadoId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        }
      ],
      "selection": "none",
      "destructive": true
    },
    {
      "id": "binding.chamadoCatalogue.qryGetChamado",
      "source": "bff.qryGetChamado",
      "command": "qryGetChamado",
      "description": "Obter Chamado",
      "kind": "query",
      "stateKey": "ui.chamadoCatalogue.data.qryGetChamado",
      "inputStateKeys": [
        "ui.chamadoCatalogue.input.qryGetChamado.chamadoId"
      ],
      "inputs": [
        {
          "name": "chamadoId",
          "stateKey": "ui.chamadoCatalogue.input.qryGetChamado.chamadoId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.chamadoCatalogue.qryLocateChamado",
      "source": "bff.qryLocateChamado",
      "command": "qryLocateChamado",
      "description": "Localizar o chamado aberto",
      "kind": "query",
      "stateKey": "ui.chamadoCatalogue.data.qryLocateChamado",
      "inputStateKeys": [],
      "inputs": [],
      "selection": "single"
    },
    {
      "id": "binding.chamadoCatalogue.cmdCloseChamado",
      "source": "bff.cmdCloseChamado",
      "command": "cmdCloseChamado",
      "description": "Confirmar o fechamento do chamado",
      "kind": "command",
      "stateKey": "ui.chamadoCatalogue.output.cmdCloseChamado",
      "inputStateKeys": [
        "ui.chamadoCatalogue.input.cmdCloseChamado.chamadoId",
        "ui.chamadoCatalogue.input.cmdCloseChamado.status"
      ],
      "inputs": [
        {
          "name": "chamadoId",
          "stateKey": "ui.chamadoCatalogue.input.cmdCloseChamado.chamadoId",
          "source": "routeParam",
          "required": true,
          "presentation": "route"
        },
        {
          "name": "status",
          "stateKey": "ui.chamadoCatalogue.input.cmdCloseChamado.status",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        }
      ],
      "selection": "none"
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
    "section.recordList.title": "Localização e seleção de chamados",
    "organism.qryListChamado.title": "Listar Chamado",
    "intent.qryListChamado.list.title": "Listar Chamado",
    "intent.qryListChamado.list.empty": "Nenhum registro encontrado",
    "intent.qryListChamado.list.column.chamadoId.label": "Identificador do chamado",
    "intent.qryListChamado.list.column.titulo.label": "Título",
    "intent.qryListChamado.list.column.descricao.label": "Descrição",
    "intent.qryListChamado.list.column.status.label": "Status",
    "intent.qryListChamado.list.filter.sortBy.label": "Sort By",
    "intent.qryListChamado.list.filter.sortOrder.label": "Sort Order",
    "organism.qryLocateChamado.title": "Localizar o chamado aberto",
    "intent.qryLocateChamado.list.title": "Localizar o chamado aberto",
    "intent.qryLocateChamado.list.empty": "Nenhum registro encontrado",
    "intent.qryLocateChamado.list.column.chamadoId.label": "Identificador do chamado",
    "intent.qryLocateChamado.list.column.titulo.label": "Título",
    "intent.qryLocateChamado.list.column.descricao.label": "Descrição",
    "intent.qryLocateChamado.list.column.status.label": "Status",
    "organism.qryGetChamado.title": "Obter Chamado",
    "intent.qryGetChamado.list.title": "Obter Chamado",
    "intent.qryGetChamado.list.empty": "Nenhum registro encontrado",
    "intent.qryGetChamado.list.column.chamadoId.label": "Identificador do chamado",
    "intent.qryGetChamado.list.column.titulo.label": "Título",
    "intent.qryGetChamado.list.column.descricao.label": "Descrição",
    "intent.qryGetChamado.list.column.status.label": "Status",
    "organism.cmdDeleteChamado.title": "Excluir Chamado",
    "intent.cmdDeleteChamado.form.title": "Excluir Chamado",
    "intent.cmdDeleteChamado.form.action.cmdDeleteChamado": "Excluir Chamado",
    "section.recordForm.title": "Criação e correção",
    "organism.cmdCreateChamado.title": "Criar Chamado",
    "intent.cmdCreateChamado.form.title": "Criar Chamado",
    "intent.cmdCreateChamado.form.action.cmdCreateChamado": "Criar Chamado",
    "intent.cmdCreateChamado.form.field.titulo.label": "Título",
    "intent.cmdCreateChamado.form.field.descricao.label": "Descrição",
    "intent.cmdCreateChamado.form.field.status.label": "Status",
    "organism.cmdUpdateChamado.title": "Atualizar Chamado",
    "intent.cmdUpdateChamado.form.title": "Atualizar Chamado",
    "intent.cmdUpdateChamado.form.action.cmdUpdateChamado": "Atualizar Chamado",
    "intent.cmdUpdateChamado.form.field.titulo.label": "Título",
    "intent.cmdUpdateChamado.form.field.descricao.label": "Descrição",
    "intent.cmdUpdateChamado.form.field.status.label": "Status",
    "section.closeChamado.title": "Conclusão do chamado",
    "organism.cmdCloseChamado.title": "Confirmar o fechamento do chamado",
    "intent.cmdCloseChamado.form.title": "Confirmar o fechamento do chamado",
    "intent.cmdCloseChamado.form.action.cmdCloseChamado": "Confirmar o fechamento do chamado",
    "intent.cmdCloseChamado.form.field.status.label": "Status",
    "action.cmdCreateChamado.success": "Criar Chamado: OK",
    "action.cmdCreateChamado.error": "Criar Chamado: falhou",
    "action.cmdUpdateChamado.success": "Atualizar Chamado: OK",
    "action.cmdUpdateChamado.error": "Atualizar Chamado: falhou",
    "action.cmdDeleteChamado.success": "Excluir Chamado: OK",
    "action.cmdDeleteChamado.error": "Excluir Chamado: falhou",
    "action.cmdCloseChamado.success": "Confirmar o fechamento do chamado: OK",
    "action.cmdCloseChamado.error": "Confirmar o fechamento do chamado: falhou"
  },
  "automation": {
    "statePrefix": "ui.chamadoCatalogue",
    "stateKeys": [
      "ui.chamadoCatalogue.status",
      "ui.chamadoCatalogue.scenary",
      "ui.chamadoCatalogue.action.qryListChamado.status",
      "ui.chamadoCatalogue.input.qryListChamado.sortBy",
      "ui.chamadoCatalogue.input.qryListChamado.sortOrder",
      "ui.chamadoCatalogue.data.qryListChamado",
      "ui.chamadoCatalogue.action.cmdCreateChamado.status",
      "ui.chamadoCatalogue.input.cmdCreateChamado.titulo",
      "ui.chamadoCatalogue.input.cmdCreateChamado.descricao",
      "ui.chamadoCatalogue.input.cmdCreateChamado.status",
      "ui.chamadoCatalogue.output.cmdCreateChamado",
      "ui.chamadoCatalogue.action.cmdCreateChamado.error",
      "ui.chamadoCatalogue.action.cmdUpdateChamado.status",
      "ui.chamadoCatalogue.input.cmdUpdateChamado.chamadoId",
      "ui.chamadoCatalogue.input.cmdUpdateChamado.titulo",
      "ui.chamadoCatalogue.input.cmdUpdateChamado.descricao",
      "ui.chamadoCatalogue.input.cmdUpdateChamado.status",
      "ui.chamadoCatalogue.output.cmdUpdateChamado",
      "ui.chamadoCatalogue.action.cmdUpdateChamado.error",
      "ui.chamadoCatalogue.action.cmdDeleteChamado.status",
      "ui.chamadoCatalogue.input.cmdDeleteChamado.chamadoId",
      "ui.chamadoCatalogue.output.cmdDeleteChamado",
      "ui.chamadoCatalogue.action.cmdDeleteChamado.error",
      "ui.chamadoCatalogue.action.qryGetChamado.status",
      "ui.chamadoCatalogue.input.qryGetChamado.chamadoId",
      "ui.chamadoCatalogue.data.qryGetChamado",
      "ui.chamadoCatalogue.action.qryLocateChamado.status",
      "ui.chamadoCatalogue.data.qryLocateChamado",
      "ui.chamadoCatalogue.action.cmdCloseChamado.status",
      "ui.chamadoCatalogue.input.cmdCloseChamado.chamadoId",
      "ui.chamadoCatalogue.input.cmdCloseChamado.status",
      "ui.chamadoCatalogue.output.cmdCloseChamado",
      "ui.chamadoCatalogue.action.cmdCloseChamado.error"
    ],
    "actionIds": [
      "qryListChamado",
      "cmdCreateChamado",
      "cmdUpdateChamado",
      "cmdDeleteChamado",
      "qryGetChamado",
      "qryLocateChamado",
      "cmdCloseChamado",
      "set.qryListChamadoSortBy",
      "set.qryListChamadoSortOrder",
      "set.cmdCreateChamadoTitulo",
      "set.cmdCreateChamadoDescricao",
      "set.cmdCreateChamadoStatus",
      "set.cmdUpdateChamadoChamadoId",
      "set.cmdUpdateChamadoTitulo",
      "set.cmdUpdateChamadoDescricao",
      "set.cmdUpdateChamadoStatus",
      "set.cmdDeleteChamadoChamadoId",
      "set.qryGetChamadoChamadoId",
      "set.cmdCloseChamadoChamadoId",
      "set.cmdCloseChamadoStatus"
    ]
  }
};

export const pipeline = [
  {
    "id": "chamadoCatalogue__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102039_/l2/controleChamados/web/shared/chamadoCatalogue.ts",
    "defPath": "_102039_/l2/controleChamados/web/shared/chamadoCatalogue.defs.ts",
    "dependsFiles": [
      "_102039_/l2/controleChamados/web/contracts/chamadoCatalogue.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [
      "comentariosPermitidosSomenteEmChamadosAbertos",
      "fechamentoExigeChamadoAberto",
      "chamadoFechadoNaoPodeSerReaberto"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
