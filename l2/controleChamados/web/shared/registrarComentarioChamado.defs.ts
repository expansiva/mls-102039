/// <mls fileReference="_102039_/l2/controleChamados/web/shared/registrarComentarioChamado.defs.ts" enhancement="_blank"/>

/**
 * uiScenary contract (page skeleton reads `scenaries[].value` as <Scene value>):
 *   scenaries[]: { value, kind: "base"|"detail"|"command", commandName?, preconditions: stateKey[] }
 *   preconditions = required route/selection inputs (skill rule 8). Unsatisfied → base, silently.
 *   URL `?scenary=` is a request; the shared setter is the source of truth.
 *   destructiveCommandIds never become scenes (confirmation stays a modal).
 */
export const definition = {
  "pageId": "registrarComentarioChamado",
  "pageName": "Registrar comentário em chamado aberto",
  "moduleName": "controleChamados",
  "baseClassName": "ControleChamadosRegistrarComentarioChamadoBase",
  "routePattern": "/controleChamados/registrarComentarioChamado/:chamadoId?",
  "sourceKind": "operation",
  "ownerIds": [
    "workspace:registrarComentarioChamado",
    "contract:controleChamados.registrarComentarioChamado.qryLocateChamado",
    "contract:controleChamados.registrarComentarioChamado.cmdRegisterComentario",
    "contract:controleChamados.registrarComentarioChamado.qryAtendentePicker"
  ],
  "operationIds": [
    "listAtendente",
    "locateChamado",
    "registerComentario"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "registrarComentarioChamado",
    "workspaceKind": "operation",
    "actor": "atendente",
    "entity": "Comentario",
    "owners": [
      {
        "kind": "operation",
        "id": "listAtendente",
        "defPath": "_102039_/l4/controleChamados/operations/listAtendente.defs.ts"
      },
      {
        "kind": "operation",
        "id": "locateChamado",
        "defPath": "_102039_/l4/controleChamados/operations/locateChamado.defs.ts"
      },
      {
        "kind": "operation",
        "id": "registerComentario",
        "defPath": "_102039_/l4/controleChamados/operations/registerComentario.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "listAtendente",
          "commandName": "qryListAtendente",
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
          "operationId": "registerComentario",
          "commandName": "cmdRegisterComentario",
          "steps": [
            "Registrar comentário",
            "Um comentário fica registrado e vinculado ao chamado selecionado."
          ]
        }
      ]
    }
  },
  "contractRef": {
    "tsPath": "_102039_/l2/controleChamados/web/contracts/registrarComentarioChamado.ts",
    "contracts": [
      {
        "commandName": "qryLocateChamado",
        "routeConst": "qryLocateChamadoRoute"
      },
      {
        "commandName": "cmdRegisterComentario",
        "routeConst": "cmdRegisterComentarioRoute"
      },
      {
        "commandName": "qryAtendentePicker",
        "routeConst": "qryAtendentePickerRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102039_/l2/controleChamados/web/desktop/page11/registrarComentarioChamado.defs.ts",
    "layoutId": "pos_workspace"
  },
  "states": [
    {
      "stateKey": "ui.registrarComentarioChamado.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.registrarComentarioChamado.scenary",
      "name": "uiScenary",
      "kind": "uiScenary",
      "valueSet": [
        "base",
        "registerComentario"
      ],
      "defaultValue": "base"
    },
    {
      "stateKey": "ui.registrarComentarioChamado.action.qryLocateChamado.status",
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
      "stateKey": "ui.registrarComentarioChamado.data.qryLocateChamado",
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
      "stateKey": "ui.registrarComentarioChamado.action.cmdRegisterComentario.status",
      "name": "cmdRegisterComentarioState",
      "kind": "actionStatus",
      "actionRef": "cmdRegisterComentario",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId",
      "name": "cmdRegisterComentarioAtendenteId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdRegisterComentario",
        "direction": "input",
        "field": "atendenteId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId",
      "name": "cmdRegisterComentarioChamadoId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "cmdRegisterComentario",
        "direction": "input",
        "field": "chamadoId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.registrarComentarioChamado.input.cmdRegisterComentario.conteudo",
      "name": "cmdRegisterComentarioConteudo",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdRegisterComentario",
        "direction": "input",
        "field": "conteudo"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.registrarComentarioChamado.output.cmdRegisterComentario",
      "name": "cmdRegisterComentarioOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdRegisterComentario",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.registrarComentarioChamado.action.cmdRegisterComentario.error",
      "name": "cmdRegisterComentarioError",
      "kind": "actionError",
      "actionRef": "cmdRegisterComentario",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.registrarComentarioChamado.action.qryAtendentePicker.status",
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
      "stateKey": "ui.registrarComentarioChamado.data.qryAtendentePicker",
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
      "actionId": "qryLocateChamado",
      "kind": "query",
      "commandRef": "qryLocateChamado",
      "routeKey": "controleChamados.registrarComentarioChamado.qryLocateChamado",
      "purpose": "Localizar o chamado aberto",
      "methodName": "loadQryLocateChamado",
      "handlerName": "handleQryLocateChamadoClick",
      "inputStateKeys": [],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.registrarComentarioChamado.data.qryLocateChamado"
      ],
      "statusStateKey": "ui.registrarComentarioChamado.action.qryLocateChamado.status"
    },
    {
      "actionId": "cmdRegisterComentario",
      "kind": "command",
      "commandRef": "cmdRegisterComentario",
      "routeKey": "controleChamados.registrarComentarioChamado.cmdRegisterComentario",
      "purpose": "Registrar comentário",
      "methodName": "cmdRegisterComentario",
      "handlerName": "handleCmdRegisterComentarioClick",
      "inputStateKeys": [
        "ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId",
        "ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId",
        "ui.registrarComentarioChamado.input.cmdRegisterComentario.conteudo"
      ],
      "routeParamInputStateKeys": [
        "ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId"
      ],
      "selectedEntityInputStateKeys": [
        "ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId"
      ],
      "outputStateKeys": [
        "ui.registrarComentarioChamado.output.cmdRegisterComentario"
      ],
      "statusStateKey": "ui.registrarComentarioChamado.action.cmdRegisterComentario.status",
      "errorStateKey": "ui.registrarComentarioChamado.action.cmdRegisterComentario.error",
      "feedback": {
        "successMessageKey": "action.cmdRegisterComentario.success",
        "errorMessageKey": "action.cmdRegisterComentario.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId",
        "ui.registrarComentarioChamado.input.cmdRegisterComentario.conteudo"
      ],
      "refreshActionIds": [
        "qryLocateChamado",
        "qryAtendentePicker"
      ]
    },
    {
      "actionId": "qryAtendentePicker",
      "kind": "query",
      "commandRef": "qryAtendentePicker",
      "routeKey": "controleChamados.registrarComentarioChamado.qryAtendentePicker",
      "purpose": "Listar Atendente",
      "methodName": "loadQryAtendentePicker",
      "handlerName": "handleQryAtendentePickerClick",
      "inputStateKeys": [],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.registrarComentarioChamado.data.qryAtendentePicker"
      ],
      "statusStateKey": "ui.registrarComentarioChamado.action.qryAtendentePicker.status"
    },
    {
      "actionId": "set.cmdRegisterComentarioAtendenteId",
      "kind": "stateSetter",
      "stateKey": "ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId",
      "methodName": "setCmdRegisterComentarioAtendenteId",
      "handlerName": "handleCmdRegisterComentarioAtendenteIdChange"
    },
    {
      "actionId": "set.cmdRegisterComentarioChamadoId",
      "kind": "stateSetter",
      "stateKey": "ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId",
      "methodName": "setCmdRegisterComentarioChamadoId",
      "handlerName": "handleCmdRegisterComentarioChamadoIdChange"
    },
    {
      "actionId": "set.cmdRegisterComentarioConteudo",
      "kind": "stateSetter",
      "stateKey": "ui.registrarComentarioChamado.input.cmdRegisterComentario.conteudo",
      "methodName": "setCmdRegisterComentarioConteudo",
      "handlerName": "handleCmdRegisterComentarioConteudoChange"
    }
  ],
  "scenaries": [
    {
      "value": "base",
      "kind": "base",
      "commandName": "qryLocateChamado",
      "preconditions": []
    },
    {
      "value": "registerComentario",
      "kind": "command",
      "commandName": "cmdRegisterComentario",
      "preconditions": [
        "ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId",
        "ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId"
      ]
    }
  ],
  "destructiveCommandIds": [],
  "initialLoads": [
    {
      "actionId": "qryLocateChamado",
      "stateKey": "ui.registrarComentarioChamado.data.qryLocateChamado"
    },
    {
      "actionId": "qryAtendentePicker",
      "stateKey": "ui.registrarComentarioChamado.data.qryAtendentePicker"
    }
  ],
  "dataBindings": [
    {
      "id": "binding.registrarComentarioChamado.qryLocateChamado",
      "source": "bff.qryLocateChamado",
      "command": "qryLocateChamado",
      "description": "Localizar o chamado aberto",
      "kind": "query",
      "stateKey": "ui.registrarComentarioChamado.data.qryLocateChamado",
      "inputStateKeys": [],
      "inputs": [],
      "selection": "single"
    },
    {
      "id": "binding.registrarComentarioChamado.cmdRegisterComentario",
      "source": "bff.cmdRegisterComentario",
      "command": "cmdRegisterComentario",
      "description": "Registrar comentário",
      "kind": "command",
      "stateKey": "ui.registrarComentarioChamado.output.cmdRegisterComentario",
      "inputStateKeys": [
        "ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId",
        "ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId",
        "ui.registrarComentarioChamado.input.cmdRegisterComentario.conteudo"
      ],
      "inputs": [
        {
          "name": "atendenteId",
          "stateKey": "ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId",
          "source": "selectedEntity",
          "required": true,
          "presentation": "selection"
        },
        {
          "name": "chamadoId",
          "stateKey": "ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId",
          "source": "routeParam",
          "required": true,
          "presentation": "route"
        },
        {
          "name": "conteudo",
          "stateKey": "ui.registrarComentarioChamado.input.cmdRegisterComentario.conteudo",
          "source": "userInput",
          "required": true,
          "presentation": "form"
        }
      ],
      "selection": "none"
    },
    {
      "id": "binding.registrarComentarioChamado.qryAtendentePicker",
      "source": "bff.qryAtendentePicker",
      "command": "qryAtendentePicker",
      "description": "Listar Atendente",
      "kind": "query",
      "stateKey": "ui.registrarComentarioChamado.data.qryAtendentePicker",
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
    "section.locateChamado.title": "Chamado selecionado",
    "organism.qryLocateChamado.title": "Localizar o chamado aberto",
    "intent.qryLocateChamado.list.title": "Localizar o chamado aberto",
    "intent.qryLocateChamado.list.empty": "Nenhum registro encontrado",
    "intent.qryLocateChamado.list.column.chamadoId.label": "Chamado",
    "intent.qryLocateChamado.list.column.titulo.label": "Título",
    "intent.qryLocateChamado.list.column.descricao.label": "Descrição",
    "intent.qryLocateChamado.list.column.status.label": "Status",
    "section.registerComentario.title": "Registrar comentário",
    "organism.cmdRegisterComentario.title": "Registrar comentário",
    "intent.cmdRegisterComentario.form.title": "Registrar comentário",
    "intent.cmdRegisterComentario.form.action.cmdRegisterComentario": "Registrar comentário",
    "intent.cmdRegisterComentario.form.field.conteudo.label": "Comentário",
    "organism.qryAtendentePicker.title": "Listar Atendente",
    "intent.qryAtendentePicker.list.title": "Listar Atendente",
    "intent.qryAtendentePicker.list.empty": "Nenhum registro encontrado",
    "intent.qryAtendentePicker.list.column.atendenteId.label": "Atendente que registrou",
    "intent.qryAtendentePicker.list.column.platformUserId.label": "Usuário da plataforma",
    "action.cmdRegisterComentario.success": "Registrar comentário: OK",
    "action.cmdRegisterComentario.error": "Registrar comentário: falhou"
  },
  "automation": {
    "statePrefix": "ui.registrarComentarioChamado",
    "stateKeys": [
      "ui.registrarComentarioChamado.status",
      "ui.registrarComentarioChamado.scenary",
      "ui.registrarComentarioChamado.action.qryLocateChamado.status",
      "ui.registrarComentarioChamado.data.qryLocateChamado",
      "ui.registrarComentarioChamado.action.cmdRegisterComentario.status",
      "ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId",
      "ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId",
      "ui.registrarComentarioChamado.input.cmdRegisterComentario.conteudo",
      "ui.registrarComentarioChamado.output.cmdRegisterComentario",
      "ui.registrarComentarioChamado.action.cmdRegisterComentario.error",
      "ui.registrarComentarioChamado.action.qryAtendentePicker.status",
      "ui.registrarComentarioChamado.data.qryAtendentePicker"
    ],
    "actionIds": [
      "qryLocateChamado",
      "cmdRegisterComentario",
      "qryAtendentePicker",
      "set.cmdRegisterComentarioAtendenteId",
      "set.cmdRegisterComentarioChamadoId",
      "set.cmdRegisterComentarioConteudo"
    ]
  }
};

export const pipeline = [
  {
    "id": "registrarComentarioChamado__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102039_/l2/controleChamados/web/shared/registrarComentarioChamado.ts",
    "defPath": "_102039_/l2/controleChamados/web/shared/registrarComentarioChamado.defs.ts",
    "dependsFiles": [
      "_102039_/l2/controleChamados/web/contracts/registrarComentarioChamado.ts",
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
