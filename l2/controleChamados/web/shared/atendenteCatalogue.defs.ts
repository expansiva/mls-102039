/// <mls fileReference="_102039_/l2/controleChamados/web/shared/atendenteCatalogue.defs.ts" enhancement="_blank"/>

/**
 * uiScenary contract (page skeleton reads `scenaries[].value` as <Scene value>):
 *   scenaries[]: { value, kind: "base"|"detail"|"command", commandName?, preconditions: stateKey[] }
 *   preconditions = required route/selection inputs (skill rule 8). Unsatisfied → base, silently.
 *   URL `?scenary=` is a request; the shared setter is the source of truth.
 *   destructiveCommandIds never become scenes (confirmation stays a modal).
 */
export const definition = {
  "pageId": "atendenteCatalogue",
  "pageName": "Atendente",
  "moduleName": "controleChamados",
  "baseClassName": "ControleChamadosAtendenteCatalogueBase",
  "routePattern": "/controleChamados/atendenteCatalogue",
  "sourceKind": "operation",
  "ownerIds": [
    "workspace:atendenteCatalogue",
    "contract:controleChamados.atendenteCatalogue.qryListAtendente",
    "contract:controleChamados.atendenteCatalogue.cmdCreateAtendente",
    "contract:controleChamados.atendenteCatalogue.cmdUpdateAtendente",
    "contract:controleChamados.atendenteCatalogue.cmdInactivateAtendente",
    "contract:controleChamados.atendenteCatalogue.cmdReactivateAtendente",
    "contract:controleChamados.atendenteCatalogue.qryGetAtendente"
  ],
  "operationIds": [
    "createAtendente",
    "getAtendente",
    "inactivateAtendente",
    "listAtendente",
    "reactivateAtendente",
    "updateAtendente"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "atendenteCatalogue",
    "workspaceKind": "operation",
    "actor": "atendente",
    "entity": "Atendente",
    "owners": [
      {
        "kind": "operation",
        "id": "createAtendente",
        "defPath": "_102039_/l4/controleChamados/operations/createAtendente.defs.ts"
      },
      {
        "kind": "operation",
        "id": "getAtendente",
        "defPath": "_102039_/l4/controleChamados/operations/getAtendente.defs.ts"
      },
      {
        "kind": "operation",
        "id": "inactivateAtendente",
        "defPath": "_102039_/l4/controleChamados/operations/inactivateAtendente.defs.ts"
      },
      {
        "kind": "operation",
        "id": "listAtendente",
        "defPath": "_102039_/l4/controleChamados/operations/listAtendente.defs.ts"
      },
      {
        "kind": "operation",
        "id": "reactivateAtendente",
        "defPath": "_102039_/l4/controleChamados/operations/reactivateAtendente.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateAtendente",
        "defPath": "_102039_/l4/controleChamados/operations/updateAtendente.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "createAtendente",
          "commandName": "cmdCreateAtendente",
          "steps": [
            "Informar os dados do novo registro."
          ]
        },
        {
          "operationId": "getAtendente",
          "commandName": "qryGetAtendente",
          "steps": [
            "Ler o registro pelo identificador."
          ]
        },
        {
          "operationId": "inactivateAtendente",
          "commandName": "cmdInactivateAtendente",
          "steps": [
            "Desativar o registro (preserva o histórico e as referências)."
          ]
        },
        {
          "operationId": "listAtendente",
          "commandName": "qryListAtendente",
          "steps": [
            "Encontrar o registro."
          ]
        },
        {
          "operationId": "reactivateAtendente",
          "commandName": "cmdReactivateAtendente",
          "steps": [
            "Reativar um registro desativado."
          ]
        },
        {
          "operationId": "updateAtendente",
          "commandName": "cmdUpdateAtendente",
          "steps": [
            "Corrigir os dados do registro escolhido."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "tsPath": "_102039_/l2/controleChamados/web/contracts/atendenteCatalogue.ts",
    "contracts": [
      {
        "commandName": "qryListAtendente",
        "routeConst": "qryListAtendenteRoute"
      },
      {
        "commandName": "cmdCreateAtendente",
        "routeConst": "cmdCreateAtendenteRoute"
      },
      {
        "commandName": "cmdUpdateAtendente",
        "routeConst": "cmdUpdateAtendenteRoute"
      },
      {
        "commandName": "cmdInactivateAtendente",
        "routeConst": "cmdInactivateAtendenteRoute"
      },
      {
        "commandName": "cmdReactivateAtendente",
        "routeConst": "cmdReactivateAtendenteRoute"
      },
      {
        "commandName": "qryGetAtendente",
        "routeConst": "qryGetAtendenteRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102039_/l2/controleChamados/web/desktop/page11/atendenteCatalogue.defs.ts",
    "layoutId": "atendente-catalogue-pos-workspace"
  },
  "states": [
    {
      "stateKey": "ui.atendenteCatalogue.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.atendenteCatalogue.scenary",
      "name": "uiScenary",
      "kind": "uiScenary",
      "valueSet": [
        "base",
        "detail",
        "createAtendente",
        "updateAtendente",
        "inactivateAtendente",
        "reactivateAtendente"
      ],
      "defaultValue": "base"
    },
    {
      "stateKey": "ui.atendenteCatalogue.action.qryListAtendente.status",
      "name": "qryListAtendenteState",
      "kind": "actionStatus",
      "actionRef": "qryListAtendente",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.atendenteCatalogue.data.qryListAtendente",
      "name": "qryListAtendenteData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryListAtendente",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    },
    {
      "stateKey": "ui.atendenteCatalogue.action.cmdCreateAtendente.status",
      "name": "cmdCreateAtendenteState",
      "kind": "actionStatus",
      "actionRef": "cmdCreateAtendente",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.atendenteCatalogue.input.cmdCreateAtendente.platformUserId",
      "name": "cmdCreateAtendentePlatformUserId",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateAtendente",
        "direction": "input",
        "field": "platformUserId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.atendenteCatalogue.output.cmdCreateAtendente",
      "name": "cmdCreateAtendenteOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdCreateAtendente",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.atendenteCatalogue.action.cmdCreateAtendente.error",
      "name": "cmdCreateAtendenteError",
      "kind": "actionError",
      "actionRef": "cmdCreateAtendente",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.atendenteCatalogue.action.cmdUpdateAtendente.status",
      "name": "cmdUpdateAtendenteState",
      "kind": "actionStatus",
      "actionRef": "cmdUpdateAtendente",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId",
      "name": "cmdUpdateAtendenteAtendenteId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdUpdateAtendente",
        "direction": "input",
        "field": "atendenteId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId",
      "name": "cmdUpdateAtendentePlatformUserId",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdUpdateAtendente",
        "direction": "input",
        "field": "platformUserId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.atendenteCatalogue.output.cmdUpdateAtendente",
      "name": "cmdUpdateAtendenteOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdUpdateAtendente",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.atendenteCatalogue.action.cmdUpdateAtendente.error",
      "name": "cmdUpdateAtendenteError",
      "kind": "actionError",
      "actionRef": "cmdUpdateAtendente",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.atendenteCatalogue.action.cmdInactivateAtendente.status",
      "name": "cmdInactivateAtendenteState",
      "kind": "actionStatus",
      "actionRef": "cmdInactivateAtendente",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId",
      "name": "cmdInactivateAtendenteAtendenteId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdInactivateAtendente",
        "direction": "input",
        "field": "atendenteId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.atendenteCatalogue.output.cmdInactivateAtendente",
      "name": "cmdInactivateAtendenteOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdInactivateAtendente",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.atendenteCatalogue.action.cmdInactivateAtendente.error",
      "name": "cmdInactivateAtendenteError",
      "kind": "actionError",
      "actionRef": "cmdInactivateAtendente",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.atendenteCatalogue.action.cmdReactivateAtendente.status",
      "name": "cmdReactivateAtendenteState",
      "kind": "actionStatus",
      "actionRef": "cmdReactivateAtendente",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId",
      "name": "cmdReactivateAtendenteAtendenteId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdReactivateAtendente",
        "direction": "input",
        "field": "atendenteId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.atendenteCatalogue.output.cmdReactivateAtendente",
      "name": "cmdReactivateAtendenteOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdReactivateAtendente",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.atendenteCatalogue.action.cmdReactivateAtendente.error",
      "name": "cmdReactivateAtendenteError",
      "kind": "actionError",
      "actionRef": "cmdReactivateAtendente",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.atendenteCatalogue.action.qryGetAtendente.status",
      "name": "qryGetAtendenteState",
      "kind": "actionStatus",
      "actionRef": "qryGetAtendente",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.atendenteCatalogue.input.qryGetAtendente.atendenteId",
      "name": "qryGetAtendenteAtendenteId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "qryGetAtendente",
        "direction": "input",
        "field": "atendenteId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.atendenteCatalogue.data.qryGetAtendente",
      "name": "qryGetAtendenteData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryGetAtendente",
        "direction": "output"
      },
      "outputShape": "object",
      "collection": false,
      "defaultValue": null
    }
  ],
  "actions": [
    {
      "actionId": "qryListAtendente",
      "kind": "query",
      "commandRef": "qryListAtendente",
      "routeKey": "controleChamados.atendenteCatalogue.qryListAtendente",
      "purpose": "Listar Atendente",
      "methodName": "loadQryListAtendente",
      "handlerName": "handleQryListAtendenteClick",
      "inputStateKeys": [],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.atendenteCatalogue.data.qryListAtendente"
      ],
      "statusStateKey": "ui.atendenteCatalogue.action.qryListAtendente.status"
    },
    {
      "actionId": "cmdCreateAtendente",
      "kind": "command",
      "commandRef": "cmdCreateAtendente",
      "routeKey": "controleChamados.atendenteCatalogue.cmdCreateAtendente",
      "purpose": "Criar Atendente",
      "methodName": "cmdCreateAtendente",
      "handlerName": "handleCmdCreateAtendenteClick",
      "inputStateKeys": [
        "ui.atendenteCatalogue.input.cmdCreateAtendente.platformUserId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.atendenteCatalogue.output.cmdCreateAtendente"
      ],
      "statusStateKey": "ui.atendenteCatalogue.action.cmdCreateAtendente.status",
      "errorStateKey": "ui.atendenteCatalogue.action.cmdCreateAtendente.error",
      "feedback": {
        "successMessageKey": "action.cmdCreateAtendente.success",
        "errorMessageKey": "action.cmdCreateAtendente.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.atendenteCatalogue.input.cmdCreateAtendente.platformUserId"
      ],
      "refreshActionIds": [
        "qryListAtendente",
        "qryGetAtendente"
      ]
    },
    {
      "actionId": "cmdUpdateAtendente",
      "kind": "command",
      "commandRef": "cmdUpdateAtendente",
      "routeKey": "controleChamados.atendenteCatalogue.cmdUpdateAtendente",
      "purpose": "Atualizar Atendente",
      "methodName": "cmdUpdateAtendente",
      "handlerName": "handleCmdUpdateAtendenteClick",
      "inputStateKeys": [
        "ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId",
        "ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId"
      ],
      "outputStateKeys": [
        "ui.atendenteCatalogue.output.cmdUpdateAtendente"
      ],
      "statusStateKey": "ui.atendenteCatalogue.action.cmdUpdateAtendente.status",
      "errorStateKey": "ui.atendenteCatalogue.action.cmdUpdateAtendente.error",
      "feedback": {
        "successMessageKey": "action.cmdUpdateAtendente.success",
        "errorMessageKey": "action.cmdUpdateAtendente.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId",
        "ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId"
      ],
      "refreshActionIds": [
        "qryListAtendente",
        "qryGetAtendente"
      ]
    },
    {
      "actionId": "cmdInactivateAtendente",
      "kind": "command",
      "commandRef": "cmdInactivateAtendente",
      "routeKey": "controleChamados.atendenteCatalogue.cmdInactivateAtendente",
      "purpose": "Desativar Atendente",
      "methodName": "cmdInactivateAtendente",
      "handlerName": "handleCmdInactivateAtendenteClick",
      "inputStateKeys": [
        "ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId"
      ],
      "outputStateKeys": [
        "ui.atendenteCatalogue.output.cmdInactivateAtendente"
      ],
      "statusStateKey": "ui.atendenteCatalogue.action.cmdInactivateAtendente.status",
      "errorStateKey": "ui.atendenteCatalogue.action.cmdInactivateAtendente.error",
      "feedback": {
        "successMessageKey": "action.cmdInactivateAtendente.success",
        "errorMessageKey": "action.cmdInactivateAtendente.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId"
      ],
      "refreshActionIds": [
        "qryListAtendente",
        "qryGetAtendente"
      ]
    },
    {
      "actionId": "cmdReactivateAtendente",
      "kind": "command",
      "commandRef": "cmdReactivateAtendente",
      "routeKey": "controleChamados.atendenteCatalogue.cmdReactivateAtendente",
      "purpose": "Reativar Atendente",
      "methodName": "cmdReactivateAtendente",
      "handlerName": "handleCmdReactivateAtendenteClick",
      "inputStateKeys": [
        "ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId"
      ],
      "outputStateKeys": [
        "ui.atendenteCatalogue.output.cmdReactivateAtendente"
      ],
      "statusStateKey": "ui.atendenteCatalogue.action.cmdReactivateAtendente.status",
      "errorStateKey": "ui.atendenteCatalogue.action.cmdReactivateAtendente.error",
      "feedback": {
        "successMessageKey": "action.cmdReactivateAtendente.success",
        "errorMessageKey": "action.cmdReactivateAtendente.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId"
      ],
      "refreshActionIds": [
        "qryListAtendente",
        "qryGetAtendente"
      ]
    },
    {
      "actionId": "qryGetAtendente",
      "kind": "query",
      "commandRef": "qryGetAtendente",
      "routeKey": "controleChamados.atendenteCatalogue.qryGetAtendente",
      "purpose": "Obter Atendente",
      "methodName": "loadQryGetAtendente",
      "handlerName": "handleQryGetAtendenteClick",
      "inputStateKeys": [
        "ui.atendenteCatalogue.input.qryGetAtendente.atendenteId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.atendenteCatalogue.input.qryGetAtendente.atendenteId"
      ],
      "outputStateKeys": [
        "ui.atendenteCatalogue.data.qryGetAtendente"
      ],
      "statusStateKey": "ui.atendenteCatalogue.action.qryGetAtendente.status"
    },
    {
      "actionId": "set.cmdCreateAtendentePlatformUserId",
      "kind": "stateSetter",
      "stateKey": "ui.atendenteCatalogue.input.cmdCreateAtendente.platformUserId",
      "methodName": "setCmdCreateAtendentePlatformUserId",
      "handlerName": "handleCmdCreateAtendentePlatformUserIdChange"
    },
    {
      "actionId": "set.cmdUpdateAtendenteAtendenteId",
      "kind": "stateSetter",
      "stateKey": "ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId",
      "methodName": "setCmdUpdateAtendenteAtendenteId",
      "handlerName": "handleCmdUpdateAtendenteAtendenteIdChange",
      "prefill": {
        "command": "cmdUpdateAtendente",
        "sourceStateKey": "ui.atendenteCatalogue.data.qryListAtendente",
        "sourceOutputShape": "array",
        "matchField": "atendenteId",
        "fields": [
          {
            "itemField": "platformUserId",
            "targetStateKey": "ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId"
          }
        ]
      }
    },
    {
      "actionId": "set.cmdUpdateAtendentePlatformUserId",
      "kind": "stateSetter",
      "stateKey": "ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId",
      "methodName": "setCmdUpdateAtendentePlatformUserId",
      "handlerName": "handleCmdUpdateAtendentePlatformUserIdChange"
    },
    {
      "actionId": "set.cmdInactivateAtendenteAtendenteId",
      "kind": "stateSetter",
      "stateKey": "ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId",
      "methodName": "setCmdInactivateAtendenteAtendenteId",
      "handlerName": "handleCmdInactivateAtendenteAtendenteIdChange"
    },
    {
      "actionId": "set.cmdReactivateAtendenteAtendenteId",
      "kind": "stateSetter",
      "stateKey": "ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId",
      "methodName": "setCmdReactivateAtendenteAtendenteId",
      "handlerName": "handleCmdReactivateAtendenteAtendenteIdChange"
    },
    {
      "actionId": "set.qryGetAtendenteAtendenteId",
      "kind": "stateSetter",
      "stateKey": "ui.atendenteCatalogue.input.qryGetAtendente.atendenteId",
      "methodName": "setQryGetAtendenteAtendenteId",
      "handlerName": "handleQryGetAtendenteAtendenteIdChange"
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "commandName": "qryListAtendente",
      "preconditions": []
    },
    {
      "value": "detail",
      "kind": "detail",
      "commandName": "qryGetAtendente",
      "preconditions": [
        "ui.atendenteCatalogue.input.qryGetAtendente.atendenteId"
      ]
    },
    {
      "value": "createAtendente",
      "kind": "command",
      "commandName": "cmdCreateAtendente",
      "preconditions": []
    },
    {
      "value": "updateAtendente",
      "kind": "command",
      "commandName": "cmdUpdateAtendente",
      "preconditions": [
        "ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId"
      ]
    },
    {
      "value": "inactivateAtendente",
      "kind": "command",
      "commandName": "cmdInactivateAtendente",
      "preconditions": [
        "ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId"
      ]
    },
    {
      "value": "reactivateAtendente",
      "kind": "command",
      "commandName": "cmdReactivateAtendente",
      "preconditions": [
        "ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId"
      ]
    }
  ],
  "destructiveCommandIds": [],
  "initialLoads": [
    {
      "actionId": "qryListAtendente",
      "stateKey": "ui.atendenteCatalogue.data.qryListAtendente"
    }
  ],
  "dataBindings": [
    {
      "id": "binding.atendenteCatalogue.qryListAtendente",
      "source": "bff.qryListAtendente",
      "command": "qryListAtendente",
      "description": "Listar Atendente",
      "kind": "query",
      "stateKey": "ui.atendenteCatalogue.data.qryListAtendente",
      "inputStateKeys": [],
      "inputs": [],
      "selection": "single"
    },
    {
      "id": "binding.atendenteCatalogue.cmdCreateAtendente",
      "source": "bff.cmdCreateAtendente",
      "command": "cmdCreateAtendente",
      "description": "Criar Atendente",
      "kind": "command",
      "stateKey": "ui.atendenteCatalogue.output.cmdCreateAtendente",
      "inputStateKeys": [
        "ui.atendenteCatalogue.input.cmdCreateAtendente.platformUserId"
      ],
      "inputs": [
        {
          "name": "platformUserId",
          "stateKey": "ui.atendenteCatalogue.input.cmdCreateAtendente.platformUserId",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.atendenteCatalogue.cmdUpdateAtendente",
      "source": "bff.cmdUpdateAtendente",
      "command": "cmdUpdateAtendente",
      "description": "Atualizar Atendente",
      "kind": "command",
      "stateKey": "ui.atendenteCatalogue.output.cmdUpdateAtendente",
      "inputStateKeys": [
        "ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId",
        "ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId"
      ],
      "inputs": [
        {
          "name": "atendenteId",
          "stateKey": "ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        },
        {
          "name": "platformUserId",
          "stateKey": "ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.atendenteCatalogue.cmdInactivateAtendente",
      "source": "bff.cmdInactivateAtendente",
      "command": "cmdInactivateAtendente",
      "description": "Desativar Atendente",
      "kind": "command",
      "stateKey": "ui.atendenteCatalogue.output.cmdInactivateAtendente",
      "inputStateKeys": [
        "ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId"
      ],
      "inputs": [
        {
          "name": "atendenteId",
          "stateKey": "ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.atendenteCatalogue.cmdReactivateAtendente",
      "source": "bff.cmdReactivateAtendente",
      "command": "cmdReactivateAtendente",
      "description": "Reativar Atendente",
      "kind": "command",
      "stateKey": "ui.atendenteCatalogue.output.cmdReactivateAtendente",
      "inputStateKeys": [
        "ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId"
      ],
      "inputs": [
        {
          "name": "atendenteId",
          "stateKey": "ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.atendenteCatalogue.qryGetAtendente",
      "source": "bff.qryGetAtendente",
      "command": "qryGetAtendente",
      "description": "Obter Atendente",
      "kind": "query",
      "stateKey": "ui.atendenteCatalogue.data.qryGetAtendente",
      "inputStateKeys": [
        "ui.atendenteCatalogue.input.qryGetAtendente.atendenteId"
      ],
      "inputs": [
        {
          "name": "atendenteId",
          "stateKey": "ui.atendenteCatalogue.input.qryGetAtendente.atendenteId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
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
    "section.recordList.title": "Atendentes",
    "organism.qryListAtendente.title": "Listar Atendente",
    "intent.qryListAtendente.list.title": "Listar Atendente",
    "intent.qryListAtendente.list.empty": "Nenhum registro encontrado",
    "intent.qryListAtendente.list.column.atendenteId.label": "Identificador do atendente",
    "intent.qryListAtendente.list.column.platformUserId.label": "Usuário da plataforma",
    "organism.qryGetAtendente.title": "Obter Atendente",
    "intent.qryGetAtendente.list.title": "Obter Atendente",
    "intent.qryGetAtendente.list.empty": "Nenhum registro encontrado",
    "intent.qryGetAtendente.list.column.atendenteId.label": "Identificador do atendente",
    "intent.qryGetAtendente.list.column.platformUserId.label": "Usuário da plataforma",
    "organism.cmdInactivateAtendente.title": "Desativar Atendente",
    "intent.cmdInactivateAtendente.form.title": "Desativar Atendente",
    "intent.cmdInactivateAtendente.form.action.cmdInactivateAtendente": "Desativar Atendente",
    "organism.cmdReactivateAtendente.title": "Reativar Atendente",
    "intent.cmdReactivateAtendente.form.title": "Reativar Atendente",
    "intent.cmdReactivateAtendente.form.action.cmdReactivateAtendente": "Reativar Atendente",
    "section.recordForm.title": "Cadastro e correção",
    "organism.cmdCreateAtendente.title": "Criar Atendente",
    "intent.cmdCreateAtendente.form.title": "Criar Atendente",
    "intent.cmdCreateAtendente.form.action.cmdCreateAtendente": "Criar Atendente",
    "intent.cmdCreateAtendente.form.field.platformUserId.label": "Usuário da plataforma",
    "organism.cmdUpdateAtendente.title": "Atualizar Atendente",
    "intent.cmdUpdateAtendente.form.title": "Atualizar Atendente",
    "intent.cmdUpdateAtendente.form.action.cmdUpdateAtendente": "Atualizar Atendente",
    "intent.cmdUpdateAtendente.form.field.platformUserId.label": "Usuário da plataforma",
    "action.cmdCreateAtendente.success": "Criar Atendente: OK",
    "action.cmdCreateAtendente.error": "Criar Atendente: falhou",
    "action.cmdUpdateAtendente.success": "Atualizar Atendente: OK",
    "action.cmdUpdateAtendente.error": "Atualizar Atendente: falhou",
    "action.cmdInactivateAtendente.success": "Desativar Atendente: OK",
    "action.cmdInactivateAtendente.error": "Desativar Atendente: falhou",
    "action.cmdReactivateAtendente.success": "Reativar Atendente: OK",
    "action.cmdReactivateAtendente.error": "Reativar Atendente: falhou"
  },
  "automation": {
    "statePrefix": "ui.atendenteCatalogue",
    "stateKeys": [
      "ui.atendenteCatalogue.status",
      "ui.atendenteCatalogue.scenary",
      "ui.atendenteCatalogue.action.qryListAtendente.status",
      "ui.atendenteCatalogue.data.qryListAtendente",
      "ui.atendenteCatalogue.action.cmdCreateAtendente.status",
      "ui.atendenteCatalogue.input.cmdCreateAtendente.platformUserId",
      "ui.atendenteCatalogue.output.cmdCreateAtendente",
      "ui.atendenteCatalogue.action.cmdCreateAtendente.error",
      "ui.atendenteCatalogue.action.cmdUpdateAtendente.status",
      "ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId",
      "ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId",
      "ui.atendenteCatalogue.output.cmdUpdateAtendente",
      "ui.atendenteCatalogue.action.cmdUpdateAtendente.error",
      "ui.atendenteCatalogue.action.cmdInactivateAtendente.status",
      "ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId",
      "ui.atendenteCatalogue.output.cmdInactivateAtendente",
      "ui.atendenteCatalogue.action.cmdInactivateAtendente.error",
      "ui.atendenteCatalogue.action.cmdReactivateAtendente.status",
      "ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId",
      "ui.atendenteCatalogue.output.cmdReactivateAtendente",
      "ui.atendenteCatalogue.action.cmdReactivateAtendente.error",
      "ui.atendenteCatalogue.action.qryGetAtendente.status",
      "ui.atendenteCatalogue.input.qryGetAtendente.atendenteId",
      "ui.atendenteCatalogue.data.qryGetAtendente"
    ],
    "actionIds": [
      "qryListAtendente",
      "cmdCreateAtendente",
      "cmdUpdateAtendente",
      "cmdInactivateAtendente",
      "cmdReactivateAtendente",
      "qryGetAtendente",
      "set.cmdCreateAtendentePlatformUserId",
      "set.cmdUpdateAtendenteAtendenteId",
      "set.cmdUpdateAtendentePlatformUserId",
      "set.cmdInactivateAtendenteAtendenteId",
      "set.cmdReactivateAtendenteAtendenteId",
      "set.qryGetAtendenteAtendenteId"
    ]
  }
};

export const pipeline = [
  {
    "id": "atendenteCatalogue__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102039_/l2/controleChamados/web/shared/atendenteCatalogue.ts",
    "defPath": "_102039_/l2/controleChamados/web/shared/atendenteCatalogue.defs.ts",
    "dependsFiles": [
      "_102039_/l2/controleChamados/web/contracts/atendenteCatalogue.ts",
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
