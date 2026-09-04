/// <mls fileReference="_102039_/l2/controleChamados/web/shared/comentarioCatalogue.defs.ts" enhancement="_blank"/>

/**
 * uiScenary contract (page skeleton reads `scenaries[].value` as <Scene value>):
 *   scenaries[]: { value, kind: "base"|"detail"|"command", commandName?, preconditions: stateKey[] }
 *   preconditions = required route/selection inputs (skill rule 8). Unsatisfied → base, silently.
 *   URL `?scenary=` is a request; the shared setter is the source of truth.
 *   destructiveCommandIds never become scenes (confirmation stays a modal).
 */
export const definition = {
  "pageId": "comentarioCatalogue",
  "pageName": "Comentário",
  "moduleName": "controleChamados",
  "baseClassName": "ControleChamadosComentarioCatalogueBase",
  "routePattern": "/controleChamados/comentarioCatalogue",
  "sourceKind": "operation",
  "ownerIds": [
    "workspace:comentarioCatalogue",
    "contract:controleChamados.comentarioCatalogue.qryListComentario",
    "contract:controleChamados.comentarioCatalogue.cmdCreateComentario",
    "contract:controleChamados.comentarioCatalogue.cmdUpdateComentario",
    "contract:controleChamados.comentarioCatalogue.cmdDeleteComentario",
    "contract:controleChamados.comentarioCatalogue.qryGetComentario",
    "contract:controleChamados.comentarioCatalogue.qryChamadoPicker",
    "contract:controleChamados.comentarioCatalogue.qryAtendentePicker"
  ],
  "operationIds": [
    "createComentario",
    "deleteComentario",
    "getComentario",
    "listAtendente",
    "listChamado",
    "listComentario",
    "updateComentario"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "comentarioCatalogue",
    "workspaceKind": "operation",
    "actor": "atendente",
    "entity": "Comentario",
    "owners": [
      {
        "kind": "operation",
        "id": "createComentario",
        "defPath": "_102039_/l4/controleChamados/operations/createComentario.defs.ts"
      },
      {
        "kind": "operation",
        "id": "deleteComentario",
        "defPath": "_102039_/l4/controleChamados/operations/deleteComentario.defs.ts"
      },
      {
        "kind": "operation",
        "id": "getComentario",
        "defPath": "_102039_/l4/controleChamados/operations/getComentario.defs.ts"
      },
      {
        "kind": "operation",
        "id": "listAtendente",
        "defPath": "_102039_/l4/controleChamados/operations/listAtendente.defs.ts"
      },
      {
        "kind": "operation",
        "id": "listChamado",
        "defPath": "_102039_/l4/controleChamados/operations/listChamado.defs.ts"
      },
      {
        "kind": "operation",
        "id": "listComentario",
        "defPath": "_102039_/l4/controleChamados/operations/listComentario.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateComentario",
        "defPath": "_102039_/l4/controleChamados/operations/updateComentario.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "createComentario",
          "commandName": "cmdCreateComentario",
          "steps": [
            "Informar os dados do novo registro."
          ]
        },
        {
          "operationId": "deleteComentario",
          "commandName": "cmdDeleteComentario",
          "steps": [
            "Remover o registro escolhido."
          ]
        },
        {
          "operationId": "getComentario",
          "commandName": "qryGetComentario",
          "steps": [
            "Ler o registro pelo identificador."
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
        },
        {
          "operationId": "updateComentario",
          "commandName": "cmdUpdateComentario",
          "steps": [
            "Corrigir os dados do registro escolhido."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "tsPath": "_102039_/l2/controleChamados/web/contracts/comentarioCatalogue.ts",
    "contracts": [
      {
        "commandName": "qryListComentario",
        "routeConst": "qryListComentarioRoute"
      },
      {
        "commandName": "cmdCreateComentario",
        "routeConst": "cmdCreateComentarioRoute"
      },
      {
        "commandName": "cmdUpdateComentario",
        "routeConst": "cmdUpdateComentarioRoute"
      },
      {
        "commandName": "cmdDeleteComentario",
        "routeConst": "cmdDeleteComentarioRoute"
      },
      {
        "commandName": "qryGetComentario",
        "routeConst": "qryGetComentarioRoute"
      },
      {
        "commandName": "qryChamadoPicker",
        "routeConst": "qryChamadoPickerRoute"
      },
      {
        "commandName": "qryAtendentePicker",
        "routeConst": "qryAtendentePickerRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102039_/l2/controleChamados/web/desktop/page11/comentarioCatalogue.defs.ts",
    "layoutId": "comentarioCatalogue-pos-workspace"
  },
  "states": [
    {
      "stateKey": "ui.comentarioCatalogue.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.comentarioCatalogue.scenary",
      "name": "uiScenary",
      "kind": "uiScenary",
      "valueSet": [
        "base",
        "detail",
        "createComentario",
        "updateComentario"
      ],
      "defaultValue": "base"
    },
    {
      "stateKey": "ui.comentarioCatalogue.action.qryListComentario.status",
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
      "stateKey": "ui.comentarioCatalogue.data.qryListComentario",
      "name": "qryListComentarioData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryListComentario",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    },
    {
      "stateKey": "ui.comentarioCatalogue.action.cmdCreateComentario.status",
      "name": "cmdCreateComentarioState",
      "kind": "actionStatus",
      "actionRef": "cmdCreateComentario",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId",
      "name": "cmdCreateComentarioChamadoId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdCreateComentario",
        "direction": "input",
        "field": "chamadoId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId",
      "name": "cmdCreateComentarioAtendenteId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdCreateComentario",
        "direction": "input",
        "field": "atendenteId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.comentarioCatalogue.input.cmdCreateComentario.conteudo",
      "name": "cmdCreateComentarioConteudo",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateComentario",
        "direction": "input",
        "field": "conteudo"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.comentarioCatalogue.output.cmdCreateComentario",
      "name": "cmdCreateComentarioOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdCreateComentario",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.comentarioCatalogue.action.cmdCreateComentario.error",
      "name": "cmdCreateComentarioError",
      "kind": "actionError",
      "actionRef": "cmdCreateComentario",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.comentarioCatalogue.action.cmdUpdateComentario.status",
      "name": "cmdUpdateComentarioState",
      "kind": "actionStatus",
      "actionRef": "cmdUpdateComentario",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId",
      "name": "cmdUpdateComentarioComentarioId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdUpdateComentario",
        "direction": "input",
        "field": "comentarioId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId",
      "name": "cmdUpdateComentarioChamadoId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdUpdateComentario",
        "direction": "input",
        "field": "chamadoId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId",
      "name": "cmdUpdateComentarioAtendenteId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdUpdateComentario",
        "direction": "input",
        "field": "atendenteId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo",
      "name": "cmdUpdateComentarioConteudo",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdUpdateComentario",
        "direction": "input",
        "field": "conteudo"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.comentarioCatalogue.output.cmdUpdateComentario",
      "name": "cmdUpdateComentarioOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdUpdateComentario",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.comentarioCatalogue.action.cmdUpdateComentario.error",
      "name": "cmdUpdateComentarioError",
      "kind": "actionError",
      "actionRef": "cmdUpdateComentario",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.comentarioCatalogue.action.cmdDeleteComentario.status",
      "name": "cmdDeleteComentarioState",
      "kind": "actionStatus",
      "actionRef": "cmdDeleteComentario",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId",
      "name": "cmdDeleteComentarioComentarioId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdDeleteComentario",
        "direction": "input",
        "field": "comentarioId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.comentarioCatalogue.output.cmdDeleteComentario",
      "name": "cmdDeleteComentarioOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdDeleteComentario",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.comentarioCatalogue.action.cmdDeleteComentario.error",
      "name": "cmdDeleteComentarioError",
      "kind": "actionError",
      "actionRef": "cmdDeleteComentario",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.comentarioCatalogue.action.qryGetComentario.status",
      "name": "qryGetComentarioState",
      "kind": "actionStatus",
      "actionRef": "qryGetComentario",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.comentarioCatalogue.input.qryGetComentario.comentarioId",
      "name": "qryGetComentarioComentarioId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "qryGetComentario",
        "direction": "input",
        "field": "comentarioId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.comentarioCatalogue.data.qryGetComentario",
      "name": "qryGetComentarioData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryGetComentario",
        "direction": "output"
      },
      "outputShape": "object",
      "collection": false,
      "defaultValue": null
    },
    {
      "stateKey": "ui.comentarioCatalogue.action.qryChamadoPicker.status",
      "name": "qryChamadoPickerState",
      "kind": "actionStatus",
      "actionRef": "qryChamadoPicker",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.comentarioCatalogue.input.qryChamadoPicker.sortBy",
      "name": "qryChamadoPickerSortBy",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "qryChamadoPicker",
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
      "stateKey": "ui.comentarioCatalogue.input.qryChamadoPicker.sortOrder",
      "name": "qryChamadoPickerSortOrder",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "qryChamadoPicker",
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
      "stateKey": "ui.comentarioCatalogue.data.qryChamadoPicker",
      "name": "qryChamadoPickerData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryChamadoPicker",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    },
    {
      "stateKey": "ui.comentarioCatalogue.action.qryAtendentePicker.status",
      "name": "qryAtendentePickerState",
      "kind": "actionStatus",
      "actionRef": "qryAtendentePicker",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.comentarioCatalogue.data.qryAtendentePicker",
      "name": "qryAtendentePickerData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "qryAtendentePicker",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    }
  ],
  "actions": [
    {
      "actionId": "qryListComentario",
      "kind": "query",
      "commandRef": "qryListComentario",
      "routeKey": "controleChamados.comentarioCatalogue.qryListComentario",
      "purpose": "Listar Comentário",
      "methodName": "loadQryListComentario",
      "handlerName": "handleQryListComentarioClick",
      "inputStateKeys": [],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.comentarioCatalogue.data.qryListComentario"
      ],
      "statusStateKey": "ui.comentarioCatalogue.action.qryListComentario.status"
    },
    {
      "actionId": "cmdCreateComentario",
      "kind": "command",
      "commandRef": "cmdCreateComentario",
      "routeKey": "controleChamados.comentarioCatalogue.cmdCreateComentario",
      "purpose": "Criar Comentário",
      "methodName": "cmdCreateComentario",
      "handlerName": "handleCmdCreateComentarioClick",
      "inputStateKeys": [
        "ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId",
        "ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId",
        "ui.comentarioCatalogue.input.cmdCreateComentario.conteudo"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId",
        "ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId"
      ],
      "outputStateKeys": [
        "ui.comentarioCatalogue.output.cmdCreateComentario"
      ],
      "statusStateKey": "ui.comentarioCatalogue.action.cmdCreateComentario.status",
      "errorStateKey": "ui.comentarioCatalogue.action.cmdCreateComentario.error",
      "feedback": {
        "successMessageKey": "action.cmdCreateComentario.success",
        "errorMessageKey": "action.cmdCreateComentario.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId",
        "ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId",
        "ui.comentarioCatalogue.input.cmdCreateComentario.conteudo"
      ],
      "refreshActionIds": [
        "qryListComentario",
        "qryGetComentario",
        "qryChamadoPicker",
        "qryAtendentePicker"
      ]
    },
    {
      "actionId": "cmdUpdateComentario",
      "kind": "command",
      "commandRef": "cmdUpdateComentario",
      "routeKey": "controleChamados.comentarioCatalogue.cmdUpdateComentario",
      "purpose": "Atualizar Comentário",
      "methodName": "cmdUpdateComentario",
      "handlerName": "handleCmdUpdateComentarioClick",
      "inputStateKeys": [
        "ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId",
        "ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId",
        "ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId",
        "ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId",
        "ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId",
        "ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId"
      ],
      "outputStateKeys": [
        "ui.comentarioCatalogue.output.cmdUpdateComentario"
      ],
      "statusStateKey": "ui.comentarioCatalogue.action.cmdUpdateComentario.status",
      "errorStateKey": "ui.comentarioCatalogue.action.cmdUpdateComentario.error",
      "feedback": {
        "successMessageKey": "action.cmdUpdateComentario.success",
        "errorMessageKey": "action.cmdUpdateComentario.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId",
        "ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId",
        "ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId",
        "ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo"
      ],
      "refreshActionIds": [
        "qryListComentario",
        "qryGetComentario",
        "qryChamadoPicker",
        "qryAtendentePicker"
      ]
    },
    {
      "actionId": "cmdDeleteComentario",
      "kind": "command",
      "commandRef": "cmdDeleteComentario",
      "routeKey": "controleChamados.comentarioCatalogue.cmdDeleteComentario",
      "purpose": "Excluir Comentário",
      "methodName": "cmdDeleteComentario",
      "handlerName": "handleCmdDeleteComentarioClick",
      "inputStateKeys": [
        "ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId"
      ],
      "outputStateKeys": [
        "ui.comentarioCatalogue.output.cmdDeleteComentario"
      ],
      "statusStateKey": "ui.comentarioCatalogue.action.cmdDeleteComentario.status",
      "errorStateKey": "ui.comentarioCatalogue.action.cmdDeleteComentario.error",
      "feedback": {
        "successMessageKey": "action.cmdDeleteComentario.success",
        "errorMessageKey": "action.cmdDeleteComentario.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId"
      ],
      "refreshActionIds": [
        "qryListComentario",
        "qryGetComentario",
        "qryChamadoPicker",
        "qryAtendentePicker"
      ]
    },
    {
      "actionId": "qryGetComentario",
      "kind": "query",
      "commandRef": "qryGetComentario",
      "routeKey": "controleChamados.comentarioCatalogue.qryGetComentario",
      "purpose": "Obter Comentário",
      "methodName": "loadQryGetComentario",
      "handlerName": "handleQryGetComentarioClick",
      "inputStateKeys": [
        "ui.comentarioCatalogue.input.qryGetComentario.comentarioId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.comentarioCatalogue.input.qryGetComentario.comentarioId"
      ],
      "outputStateKeys": [
        "ui.comentarioCatalogue.data.qryGetComentario"
      ],
      "statusStateKey": "ui.comentarioCatalogue.action.qryGetComentario.status"
    },
    {
      "actionId": "qryChamadoPicker",
      "kind": "query",
      "commandRef": "qryChamadoPicker",
      "routeKey": "controleChamados.comentarioCatalogue.qryChamadoPicker",
      "purpose": "Listar Chamado",
      "methodName": "loadQryChamadoPicker",
      "handlerName": "handleQryChamadoPickerClick",
      "inputStateKeys": [
        "ui.comentarioCatalogue.input.qryChamadoPicker.sortBy",
        "ui.comentarioCatalogue.input.qryChamadoPicker.sortOrder"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.comentarioCatalogue.data.qryChamadoPicker"
      ],
      "statusStateKey": "ui.comentarioCatalogue.action.qryChamadoPicker.status"
    },
    {
      "actionId": "qryAtendentePicker",
      "kind": "query",
      "commandRef": "qryAtendentePicker",
      "routeKey": "controleChamados.comentarioCatalogue.qryAtendentePicker",
      "purpose": "Listar Atendente",
      "methodName": "loadQryAtendentePicker",
      "handlerName": "handleQryAtendentePickerClick",
      "inputStateKeys": [],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.comentarioCatalogue.data.qryAtendentePicker"
      ],
      "statusStateKey": "ui.comentarioCatalogue.action.qryAtendentePicker.status"
    },
    {
      "actionId": "set.cmdCreateComentarioChamadoId",
      "kind": "stateSetter",
      "stateKey": "ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId",
      "methodName": "setCmdCreateComentarioChamadoId",
      "handlerName": "handleCmdCreateComentarioChamadoIdChange",
      "prefill": {
        "command": "cmdCreateComentario",
        "sourceStateKey": "ui.comentarioCatalogue.data.qryListComentario",
        "sourceOutputShape": "array",
        "matchField": "chamadoId",
        "fields": [
          {
            "itemField": "conteudo",
            "targetStateKey": "ui.comentarioCatalogue.input.cmdCreateComentario.conteudo"
          }
        ]
      }
    },
    {
      "actionId": "set.cmdCreateComentarioAtendenteId",
      "kind": "stateSetter",
      "stateKey": "ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId",
      "methodName": "setCmdCreateComentarioAtendenteId",
      "handlerName": "handleCmdCreateComentarioAtendenteIdChange",
      "prefill": {
        "command": "cmdCreateComentario",
        "sourceStateKey": "ui.comentarioCatalogue.data.qryListComentario",
        "sourceOutputShape": "array",
        "matchField": "atendenteId",
        "fields": [
          {
            "itemField": "conteudo",
            "targetStateKey": "ui.comentarioCatalogue.input.cmdCreateComentario.conteudo"
          }
        ]
      }
    },
    {
      "actionId": "set.cmdCreateComentarioConteudo",
      "kind": "stateSetter",
      "stateKey": "ui.comentarioCatalogue.input.cmdCreateComentario.conteudo",
      "methodName": "setCmdCreateComentarioConteudo",
      "handlerName": "handleCmdCreateComentarioConteudoChange"
    },
    {
      "actionId": "set.cmdUpdateComentarioComentarioId",
      "kind": "stateSetter",
      "stateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId",
      "methodName": "setCmdUpdateComentarioComentarioId",
      "handlerName": "handleCmdUpdateComentarioComentarioIdChange",
      "prefill": {
        "command": "cmdUpdateComentario",
        "sourceStateKey": "ui.comentarioCatalogue.data.qryListComentario",
        "sourceOutputShape": "array",
        "matchField": "comentarioId",
        "fields": [
          {
            "itemField": "conteudo",
            "targetStateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo"
          }
        ]
      }
    },
    {
      "actionId": "set.cmdUpdateComentarioChamadoId",
      "kind": "stateSetter",
      "stateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId",
      "methodName": "setCmdUpdateComentarioChamadoId",
      "handlerName": "handleCmdUpdateComentarioChamadoIdChange",
      "prefill": {
        "command": "cmdUpdateComentario",
        "sourceStateKey": "ui.comentarioCatalogue.data.qryListComentario",
        "sourceOutputShape": "array",
        "matchField": "chamadoId",
        "fields": [
          {
            "itemField": "conteudo",
            "targetStateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo"
          }
        ]
      }
    },
    {
      "actionId": "set.cmdUpdateComentarioAtendenteId",
      "kind": "stateSetter",
      "stateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId",
      "methodName": "setCmdUpdateComentarioAtendenteId",
      "handlerName": "handleCmdUpdateComentarioAtendenteIdChange",
      "prefill": {
        "command": "cmdUpdateComentario",
        "sourceStateKey": "ui.comentarioCatalogue.data.qryListComentario",
        "sourceOutputShape": "array",
        "matchField": "atendenteId",
        "fields": [
          {
            "itemField": "conteudo",
            "targetStateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo"
          }
        ]
      }
    },
    {
      "actionId": "set.cmdUpdateComentarioConteudo",
      "kind": "stateSetter",
      "stateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo",
      "methodName": "setCmdUpdateComentarioConteudo",
      "handlerName": "handleCmdUpdateComentarioConteudoChange"
    },
    {
      "actionId": "set.cmdDeleteComentarioComentarioId",
      "kind": "stateSetter",
      "stateKey": "ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId",
      "methodName": "setCmdDeleteComentarioComentarioId",
      "handlerName": "handleCmdDeleteComentarioComentarioIdChange"
    },
    {
      "actionId": "set.qryGetComentarioComentarioId",
      "kind": "stateSetter",
      "stateKey": "ui.comentarioCatalogue.input.qryGetComentario.comentarioId",
      "methodName": "setQryGetComentarioComentarioId",
      "handlerName": "handleQryGetComentarioComentarioIdChange"
    },
    {
      "actionId": "set.qryChamadoPickerSortBy",
      "kind": "stateSetter",
      "stateKey": "ui.comentarioCatalogue.input.qryChamadoPicker.sortBy",
      "methodName": "setQryChamadoPickerSortBy",
      "handlerName": "handleQryChamadoPickerSortByChange"
    },
    {
      "actionId": "set.qryChamadoPickerSortOrder",
      "kind": "stateSetter",
      "stateKey": "ui.comentarioCatalogue.input.qryChamadoPicker.sortOrder",
      "methodName": "setQryChamadoPickerSortOrder",
      "handlerName": "handleQryChamadoPickerSortOrderChange"
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "commandName": "qryListComentario",
      "preconditions": []
    },
    {
      "value": "detail",
      "kind": "detail",
      "commandName": "qryGetComentario",
      "preconditions": [
        "ui.comentarioCatalogue.input.qryGetComentario.comentarioId"
      ]
    },
    {
      "value": "createComentario",
      "kind": "command",
      "commandName": "cmdCreateComentario",
      "preconditions": [
        "ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId",
        "ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId"
      ]
    },
    {
      "value": "updateComentario",
      "kind": "command",
      "commandName": "cmdUpdateComentario",
      "preconditions": [
        "ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId",
        "ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId",
        "ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId"
      ]
    }
  ],
  "destructiveCommandIds": [
    "cmdDeleteComentario"
  ],
  "initialLoads": [
    {
      "actionId": "qryListComentario",
      "stateKey": "ui.comentarioCatalogue.data.qryListComentario"
    },
    {
      "actionId": "qryChamadoPicker",
      "stateKey": "ui.comentarioCatalogue.data.qryChamadoPicker"
    },
    {
      "actionId": "qryAtendentePicker",
      "stateKey": "ui.comentarioCatalogue.data.qryAtendentePicker"
    }
  ],
  "dataBindings": [
    {
      "id": "binding.comentarioCatalogue.qryListComentario",
      "source": "bff.qryListComentario",
      "command": "qryListComentario",
      "description": "Listar Comentário",
      "kind": "query",
      "stateKey": "ui.comentarioCatalogue.data.qryListComentario",
      "inputStateKeys": [],
      "inputs": [],
      "selection": "single"
    },
    {
      "id": "binding.comentarioCatalogue.cmdCreateComentario",
      "source": "bff.cmdCreateComentario",
      "command": "cmdCreateComentario",
      "description": "Criar Comentário",
      "kind": "command",
      "stateKey": "ui.comentarioCatalogue.output.cmdCreateComentario",
      "inputStateKeys": [
        "ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId",
        "ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId",
        "ui.comentarioCatalogue.input.cmdCreateComentario.conteudo"
      ],
      "inputs": [
        {
          "name": "chamadoId",
          "stateKey": "ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        },
        {
          "name": "atendenteId",
          "stateKey": "ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        },
        {
          "name": "conteudo",
          "stateKey": "ui.comentarioCatalogue.input.cmdCreateComentario.conteudo",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.comentarioCatalogue.cmdUpdateComentario",
      "source": "bff.cmdUpdateComentario",
      "command": "cmdUpdateComentario",
      "description": "Atualizar Comentário",
      "kind": "command",
      "stateKey": "ui.comentarioCatalogue.output.cmdUpdateComentario",
      "inputStateKeys": [
        "ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId",
        "ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId",
        "ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId",
        "ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo"
      ],
      "inputs": [
        {
          "name": "comentarioId",
          "stateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        },
        {
          "name": "chamadoId",
          "stateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        },
        {
          "name": "atendenteId",
          "stateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        },
        {
          "name": "conteudo",
          "stateKey": "ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.comentarioCatalogue.cmdDeleteComentario",
      "source": "bff.cmdDeleteComentario",
      "command": "cmdDeleteComentario",
      "description": "Excluir Comentário",
      "kind": "command",
      "stateKey": "ui.comentarioCatalogue.output.cmdDeleteComentario",
      "inputStateKeys": [
        "ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId"
      ],
      "inputs": [
        {
          "name": "comentarioId",
          "stateKey": "ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        }
      ],
      "selection": "none",
      "destructive": true
    },
    {
      "id": "binding.comentarioCatalogue.qryGetComentario",
      "source": "bff.qryGetComentario",
      "command": "qryGetComentario",
      "description": "Obter Comentário",
      "kind": "query",
      "stateKey": "ui.comentarioCatalogue.data.qryGetComentario",
      "inputStateKeys": [
        "ui.comentarioCatalogue.input.qryGetComentario.comentarioId"
      ],
      "inputs": [
        {
          "name": "comentarioId",
          "stateKey": "ui.comentarioCatalogue.input.qryGetComentario.comentarioId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.comentarioCatalogue.qryChamadoPicker",
      "source": "bff.qryChamadoPicker",
      "command": "qryChamadoPicker",
      "description": "Listar Chamado",
      "kind": "query",
      "stateKey": "ui.comentarioCatalogue.data.qryChamadoPicker",
      "inputStateKeys": [
        "ui.comentarioCatalogue.input.qryChamadoPicker.sortBy",
        "ui.comentarioCatalogue.input.qryChamadoPicker.sortOrder"
      ],
      "inputs": [
        {
          "name": "sortBy",
          "stateKey": "ui.comentarioCatalogue.input.qryChamadoPicker.sortBy",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        },
        {
          "name": "sortOrder",
          "stateKey": "ui.comentarioCatalogue.input.qryChamadoPicker.sortOrder",
          "source": "userInput",
          "required": false,
          "presentation": "form"
        }
      ],
      "selection": "single"
    },
    {
      "id": "binding.comentarioCatalogue.qryAtendentePicker",
      "source": "bff.qryAtendentePicker",
      "command": "qryAtendentePicker",
      "description": "Listar Atendente",
      "kind": "query",
      "stateKey": "ui.comentarioCatalogue.data.qryAtendentePicker",
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
    "section.recordList.title": "Localizar Comentário",
    "organism.qryListComentario.title": "Listar Comentário",
    "intent.qryListComentario.list.title": "Listar Comentário",
    "intent.qryListComentario.list.empty": "Nenhum registro encontrado",
    "intent.qryListComentario.list.column.comentarioId.label": "Identificador do comentário",
    "intent.qryListComentario.list.column.chamadoId.label": "Chamado",
    "intent.qryListComentario.list.column.atendenteId.label": "Atendente que registrou",
    "intent.qryListComentario.list.column.conteudo.label": "Comentário",
    "organism.qryGetComentario.title": "Obter Comentário",
    "intent.qryGetComentario.list.title": "Obter Comentário",
    "intent.qryGetComentario.list.empty": "Nenhum registro encontrado",
    "intent.qryGetComentario.list.column.comentarioId.label": "Identificador do comentário",
    "intent.qryGetComentario.list.column.chamadoId.label": "Chamado",
    "intent.qryGetComentario.list.column.atendenteId.label": "Atendente que registrou",
    "intent.qryGetComentario.list.column.conteudo.label": "Comentário",
    "organism.cmdDeleteComentario.title": "Excluir Comentário",
    "intent.cmdDeleteComentario.form.title": "Excluir Comentário",
    "intent.cmdDeleteComentario.form.action.cmdDeleteComentario": "Excluir Comentário",
    "section.recordForm.title": "Criar ou corrigir Comentário",
    "organism.cmdCreateComentario.title": "Criar Comentário",
    "intent.cmdCreateComentario.form.title": "Criar Comentário",
    "intent.cmdCreateComentario.form.action.cmdCreateComentario": "Criar Comentário",
    "intent.cmdCreateComentario.form.field.conteudo.label": "Comentário",
    "organism.qryChamadoPicker.title": "Listar Chamado",
    "intent.qryChamadoPicker.list.title": "Listar Chamado",
    "intent.qryChamadoPicker.list.empty": "Nenhum registro encontrado",
    "intent.qryChamadoPicker.list.column.chamadoId.label": "Chamado",
    "intent.qryChamadoPicker.list.column.titulo.label": "Título",
    "intent.qryChamadoPicker.list.column.descricao.label": "Descrição",
    "intent.qryChamadoPicker.list.column.status.label": "Status",
    "intent.qryChamadoPicker.list.filter.sortBy.label": "Sort By",
    "intent.qryChamadoPicker.list.filter.sortOrder.label": "Sort Order",
    "organism.qryAtendentePicker.title": "Listar Atendente",
    "intent.qryAtendentePicker.list.title": "Listar Atendente",
    "intent.qryAtendentePicker.list.empty": "Nenhum registro encontrado",
    "intent.qryAtendentePicker.list.column.atendenteId.label": "Atendente que registrou",
    "intent.qryAtendentePicker.list.column.platformUserId.label": "Usuário da plataforma",
    "organism.cmdUpdateComentario.title": "Atualizar Comentário",
    "intent.cmdUpdateComentario.form.title": "Atualizar Comentário",
    "intent.cmdUpdateComentario.form.action.cmdUpdateComentario": "Atualizar Comentário",
    "intent.cmdUpdateComentario.form.field.conteudo.label": "Comentário",
    "action.cmdCreateComentario.success": "Criar Comentário: OK",
    "action.cmdCreateComentario.error": "Criar Comentário: falhou",
    "action.cmdUpdateComentario.success": "Atualizar Comentário: OK",
    "action.cmdUpdateComentario.error": "Atualizar Comentário: falhou",
    "action.cmdDeleteComentario.success": "Excluir Comentário: OK",
    "action.cmdDeleteComentario.error": "Excluir Comentário: falhou",
    "section.comentarioWorkbench.title": "Comentários",
    "section.comentarioCreation.title": "Novo comentário",
    "section.comentarioWorkspace.title": "Comentários"
  },
  "automation": {
    "statePrefix": "ui.comentarioCatalogue",
    "stateKeys": [
      "ui.comentarioCatalogue.status",
      "ui.comentarioCatalogue.scenary",
      "ui.comentarioCatalogue.action.qryListComentario.status",
      "ui.comentarioCatalogue.data.qryListComentario",
      "ui.comentarioCatalogue.action.cmdCreateComentario.status",
      "ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId",
      "ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId",
      "ui.comentarioCatalogue.input.cmdCreateComentario.conteudo",
      "ui.comentarioCatalogue.output.cmdCreateComentario",
      "ui.comentarioCatalogue.action.cmdCreateComentario.error",
      "ui.comentarioCatalogue.action.cmdUpdateComentario.status",
      "ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId",
      "ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId",
      "ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId",
      "ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo",
      "ui.comentarioCatalogue.output.cmdUpdateComentario",
      "ui.comentarioCatalogue.action.cmdUpdateComentario.error",
      "ui.comentarioCatalogue.action.cmdDeleteComentario.status",
      "ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId",
      "ui.comentarioCatalogue.output.cmdDeleteComentario",
      "ui.comentarioCatalogue.action.cmdDeleteComentario.error",
      "ui.comentarioCatalogue.action.qryGetComentario.status",
      "ui.comentarioCatalogue.input.qryGetComentario.comentarioId",
      "ui.comentarioCatalogue.data.qryGetComentario",
      "ui.comentarioCatalogue.action.qryChamadoPicker.status",
      "ui.comentarioCatalogue.input.qryChamadoPicker.sortBy",
      "ui.comentarioCatalogue.input.qryChamadoPicker.sortOrder",
      "ui.comentarioCatalogue.data.qryChamadoPicker",
      "ui.comentarioCatalogue.action.qryAtendentePicker.status",
      "ui.comentarioCatalogue.data.qryAtendentePicker"
    ],
    "actionIds": [
      "qryListComentario",
      "cmdCreateComentario",
      "cmdUpdateComentario",
      "cmdDeleteComentario",
      "qryGetComentario",
      "qryChamadoPicker",
      "qryAtendentePicker",
      "set.cmdCreateComentarioChamadoId",
      "set.cmdCreateComentarioAtendenteId",
      "set.cmdCreateComentarioConteudo",
      "set.cmdUpdateComentarioComentarioId",
      "set.cmdUpdateComentarioChamadoId",
      "set.cmdUpdateComentarioAtendenteId",
      "set.cmdUpdateComentarioConteudo",
      "set.cmdDeleteComentarioComentarioId",
      "set.qryGetComentarioComentarioId",
      "set.qryChamadoPickerSortBy",
      "set.qryChamadoPickerSortOrder"
    ]
  }
};

export const pipeline = [
  {
    "id": "comentarioCatalogue__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102039_/l2/controleChamados/web/shared/comentarioCatalogue.ts",
    "defPath": "_102039_/l2/controleChamados/web/shared/comentarioCatalogue.defs.ts",
    "dependsFiles": [
      "_102039_/l2/controleChamados/web/contracts/comentarioCatalogue.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [
      "comentariosPermitidosSomenteEmChamadosAbertos"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
