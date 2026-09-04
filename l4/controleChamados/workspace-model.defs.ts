/// <mls fileReference="_102039_/l4/controleChamados/workspace-model.defs.ts" enhancement="_blank"/>

export const controleChamadosWorkspaceModel = {
  "planId": "e8-workspace-model",
  "schemaVersion": "2026-08-14-ns4-e8-model-v1",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "title": "Workspaces",
  "reviewRound": 1,
  "hubEntity": "Chamado",
  "workspaces": [
    {
      "workspaceId": "atendenteCatalogue",
      "tier": "recordCatalogue",
      "title": "Atendente",
      "purpose": "Cadastro de Atendente.",
      "kind": "operation",
      "entity": "Atendente",
      "actors": [
        "atendente"
      ],
      "profileRefs": [
        "atendente"
      ],
      "featureRefs": [],
      "hostedStepRefs": [],
      "categoryRef": "entityRecordManagement",
      "bffCalls": [
        {
          "bffId": "qryListAtendente",
          "kind": "query",
          "operationId": "listAtendente",
          "outputKind": "paginated",
          "entityRef": "Atendente"
        },
        {
          "bffId": "cmdCreateAtendente",
          "kind": "command",
          "operationId": "createAtendente",
          "outputKind": "object",
          "entityRef": "Atendente"
        },
        {
          "bffId": "cmdUpdateAtendente",
          "kind": "command",
          "operationId": "updateAtendente",
          "outputKind": "object",
          "entityRef": "Atendente"
        },
        {
          "bffId": "cmdInactivateAtendente",
          "kind": "command",
          "operationId": "inactivateAtendente",
          "outputKind": "object",
          "entityRef": "Atendente"
        },
        {
          "bffId": "cmdReactivateAtendente",
          "kind": "command",
          "operationId": "reactivateAtendente",
          "outputKind": "object",
          "entityRef": "Atendente"
        },
        {
          "bffId": "qryGetAtendente",
          "kind": "query",
          "operationId": "getAtendente",
          "outputKind": "object",
          "entityRef": "Atendente"
        }
      ],
      "sections": [
        {
          "sectionId": "recordList",
          "intent": "Localizar Atendente.",
          "organisms": [
            {
              "role": "primarySurface",
              "dataSource": "qryListAtendente"
            },
            {
              "role": "contextualAction",
              "action": "cmdInactivateAtendente"
            },
            {
              "role": "contextualAction",
              "action": "cmdReactivateAtendente"
            }
          ]
        },
        {
          "sectionId": "recordForm",
          "intent": "Criar ou corrigir Atendente.",
          "organisms": [
            {
              "role": "primarySurface",
              "action": "cmdCreateAtendente"
            },
            {
              "role": "contextualAction",
              "action": "cmdUpdateAtendente"
            }
          ]
        }
      ]
    },
    {
      "workspaceId": "chamadoCatalogue",
      "tier": "recordCatalogue",
      "title": "Chamado",
      "purpose": "Cadastro de Chamado.",
      "kind": "operation",
      "entity": "Chamado",
      "actors": [
        "atendente"
      ],
      "profileRefs": [
        "atendente"
      ],
      "featureRefs": [
        "acompanhamentoChamados"
      ],
      "hostedStepRefs": [
        "fecharChamado.locateChamado",
        "fecharChamado.closeChamado"
      ],
      "categoryRef": "entityRecordManagement",
      "bffCalls": [
        {
          "bffId": "qryListChamado",
          "kind": "query",
          "operationId": "listChamado",
          "outputKind": "paginated",
          "entityRef": "Chamado"
        },
        {
          "bffId": "cmdCreateChamado",
          "kind": "command",
          "operationId": "createChamado",
          "outputKind": "object",
          "entityRef": "Chamado"
        },
        {
          "bffId": "cmdUpdateChamado",
          "kind": "command",
          "operationId": "updateChamado",
          "outputKind": "object",
          "entityRef": "Chamado"
        },
        {
          "bffId": "cmdDeleteChamado",
          "kind": "command",
          "operationId": "deleteChamado",
          "outputKind": "object",
          "entityRef": "Chamado"
        },
        {
          "bffId": "qryGetChamado",
          "kind": "query",
          "operationId": "getChamado",
          "outputKind": "object",
          "entityRef": "Chamado"
        },
        {
          "bffId": "qryLocateChamado",
          "kind": "query",
          "operationId": "locateChamado",
          "outputKind": "paginated",
          "entityRef": "Chamado"
        },
        {
          "bffId": "cmdCloseChamado",
          "kind": "command",
          "operationId": "closeChamado",
          "outputKind": "object",
          "entityRef": "Chamado"
        }
      ],
      "sections": [
        {
          "sectionId": "recordList",
          "intent": "Localizar Chamado.",
          "organisms": [
            {
              "role": "primarySurface",
              "dataSource": "qryListChamado"
            },
            {
              "role": "filterControl",
              "attachTo": "qryListChamado"
            },
            {
              "role": "contextualAction",
              "action": "cmdDeleteChamado"
            }
          ]
        },
        {
          "sectionId": "recordForm",
          "intent": "Criar ou corrigir Chamado.",
          "organisms": [
            {
              "role": "primarySurface",
              "action": "cmdCreateChamado"
            },
            {
              "role": "contextualAction",
              "action": "cmdUpdateChamado"
            }
          ]
        },
        {
          "sectionId": "closeChamado",
          "intent": "O chamado selecionado passa a ter o status fechado.",
          "organisms": [
            {
              "role": "primarySurface",
              "action": "cmdCloseChamado"
            }
          ]
        }
      ]
    },
    {
      "workspaceId": "chamadoHub",
      "tier": "hub",
      "title": "Chamado",
      "purpose": "Painel de Chamado.",
      "kind": "landing",
      "entity": "Chamado",
      "actors": [
        "atendente"
      ],
      "profileRefs": [
        "atendente"
      ],
      "featureRefs": [],
      "hostedStepRefs": [],
      "categoryRef": "dashboardCommandCenter",
      "bffCalls": [
        {
          "bffId": "qryListChamado",
          "kind": "query",
          "operationId": "listChamado",
          "outputKind": "paginated",
          "entityRef": "Chamado"
        },
        {
          "bffId": "qryListComentario",
          "kind": "query",
          "operationId": "listComentario",
          "outputKind": "paginated",
          "entityRef": "Comentario"
        }
      ],
      "sections": [
        {
          "sectionId": "collection",
          "intent": "Carteira e busca.",
          "organisms": [
            {
              "role": "primarySurface",
              "dataSource": "qryListChamado"
            }
          ]
        },
        {
          "sectionId": "record",
          "intent": "Registro selecionado e o que gira em volta dele.",
          "organisms": [
            {
              "role": "detailPanel",
              "dataSource": "qryListComentario"
            }
          ]
        }
      ],
      "hubCatalogue": {
        "anchorEntity": "Chamado",
        "items": [
          {
            "itemId": "actionRegistrarComentarioChamado",
            "kind": "action",
            "label": "Registrar comentário em chamado aberto",
            "entityRef": "Comentario",
            "targetRef": "registrarComentarioChamado",
            "score": 2
          },
          {
            "itemId": "relatedComentario",
            "kind": "relatedList",
            "label": "Comentário",
            "entityRef": "Comentario",
            "targetRef": "comentarioCatalogue",
            "sourceOperationId": "listComentario",
            "sourceBffId": "qryListComentario",
            "sourceOutputKind": "paginated",
            "score": 2
          }
        ]
      },
      "navigation": [
        {
          "targetWorkspaceId": "registrarComentarioChamado",
          "label": "Registrar comentário em chamado aberto",
          "prominence": "primary",
          "order": 0
        }
      ]
    },
    {
      "workspaceId": "comentarioCatalogue",
      "tier": "recordCatalogue",
      "title": "Comentário",
      "purpose": "Cadastro de Comentário.",
      "kind": "operation",
      "entity": "Comentario",
      "actors": [
        "atendente"
      ],
      "profileRefs": [
        "atendente"
      ],
      "featureRefs": [],
      "hostedStepRefs": [],
      "categoryRef": "entityRecordManagement",
      "bffCalls": [
        {
          "bffId": "qryListComentario",
          "kind": "query",
          "operationId": "listComentario",
          "outputKind": "paginated",
          "entityRef": "Comentario"
        },
        {
          "bffId": "cmdCreateComentario",
          "kind": "command",
          "operationId": "createComentario",
          "outputKind": "object",
          "entityRef": "Comentario",
          "inputSources": [
            {
              "inputId": "atendenteId",
              "bffId": "qryAtendentePicker"
            },
            {
              "inputId": "chamadoId",
              "bffId": "qryChamadoPicker"
            }
          ]
        },
        {
          "bffId": "cmdUpdateComentario",
          "kind": "command",
          "operationId": "updateComentario",
          "outputKind": "object",
          "entityRef": "Comentario",
          "inputSources": [
            {
              "inputId": "atendenteId",
              "bffId": "qryAtendentePicker"
            },
            {
              "inputId": "chamadoId",
              "bffId": "qryChamadoPicker"
            }
          ]
        },
        {
          "bffId": "cmdDeleteComentario",
          "kind": "command",
          "operationId": "deleteComentario",
          "outputKind": "object",
          "entityRef": "Comentario"
        },
        {
          "bffId": "qryGetComentario",
          "kind": "query",
          "operationId": "getComentario",
          "outputKind": "object",
          "entityRef": "Comentario"
        },
        {
          "bffId": "qryChamadoPicker",
          "kind": "query",
          "operationId": "listChamado",
          "outputKind": "paginated",
          "entityRef": "Chamado"
        },
        {
          "bffId": "qryAtendentePicker",
          "kind": "query",
          "operationId": "listAtendente",
          "outputKind": "paginated",
          "entityRef": "Atendente"
        }
      ],
      "sections": [
        {
          "sectionId": "recordList",
          "intent": "Localizar Comentário.",
          "organisms": [
            {
              "role": "primarySurface",
              "dataSource": "qryListComentario"
            },
            {
              "role": "contextualAction",
              "action": "cmdDeleteComentario"
            }
          ]
        },
        {
          "sectionId": "recordForm",
          "intent": "Criar ou corrigir Comentário.",
          "organisms": [
            {
              "role": "primarySurface",
              "action": "cmdCreateComentario"
            },
            {
              "role": "contextualAction",
              "action": "cmdUpdateComentario"
            },
            {
              "role": "filterControl",
              "dataSource": "qryChamadoPicker",
              "usage": "picker"
            },
            {
              "role": "filterControl",
              "dataSource": "qryAtendentePicker",
              "usage": "picker"
            }
          ]
        }
      ]
    },
    {
      "workspaceId": "registrarComentarioChamado",
      "tier": "journey",
      "title": "Registrar comentário em chamado aberto",
      "purpose": "Manter o acompanhamento de um chamado aberto por meio de um comentário vinculado.",
      "kind": "operation",
      "entity": "Comentario",
      "actors": [
        "atendente"
      ],
      "profileRefs": [
        "atendente"
      ],
      "featureRefs": [
        "acompanhamentoChamados"
      ],
      "hostedStepRefs": [
        "registrarComentarioChamado.locateChamado",
        "registrarComentarioChamado.registerComentario"
      ],
      "journeyRef": "registrarComentarioChamado",
      "categoryRef": "processWizard",
      "bffCalls": [
        {
          "bffId": "qryLocateChamado",
          "kind": "query",
          "operationId": "locateChamado",
          "outputKind": "paginated",
          "entityRef": "Chamado"
        },
        {
          "bffId": "cmdRegisterComentario",
          "kind": "command",
          "operationId": "registerComentario",
          "outputKind": "object",
          "entityRef": "Comentario",
          "inputSources": [
            {
              "inputId": "atendenteId",
              "bffId": "qryAtendentePicker"
            }
          ]
        },
        {
          "bffId": "qryAtendentePicker",
          "kind": "query",
          "operationId": "listAtendente",
          "outputKind": "paginated",
          "entityRef": "Atendente"
        }
      ],
      "sections": [
        {
          "sectionId": "locateChamado",
          "intent": "Um chamado aberto, disponível no catálogo de chamados, está selecionado.",
          "organisms": [
            {
              "role": "primarySurface",
              "dataSource": "qryLocateChamado",
              "usage": "picker"
            }
          ]
        },
        {
          "sectionId": "registerComentario",
          "intent": "Um comentário fica registrado e vinculado ao chamado selecionado.",
          "organisms": [
            {
              "role": "primarySurface",
              "action": "cmdRegisterComentario"
            },
            {
              "role": "filterControl",
              "dataSource": "qryAtendentePicker",
              "usage": "picker"
            }
          ]
        }
      ]
    }
  ],
  "operations": [
    {
      "operationId": "listAtendente",
      "title": "Listar Atendente",
      "kind": "query",
      "entityRef": "Atendente",
      "entityRefs": [
        "Atendente"
      ],
      "accessPattern": {
        "kind": "list",
        "pagination": "optional"
      },
      "inputs": [],
      "outputRefs": [
        "Atendente.atendenteId",
        "Atendente.platformUserId"
      ],
      "useRules": [],
      "transitionRefs": [],
      "story": [
        "Encontrar o registro."
      ],
      "mdm": {
        "activeFilterInput": "includeInactive",
        "situationOutput": "active"
      }
    },
    {
      "operationId": "createAtendente",
      "title": "Criar Atendente",
      "kind": "command",
      "entityRef": "Atendente",
      "entityRefs": [
        "Atendente"
      ],
      "accessPattern": {
        "kind": "create"
      },
      "inputs": [
        {
          "inputId": "platformUserId",
          "fieldRef": {
            "entityId": "Atendente",
            "fieldId": "platformUserId"
          },
          "description": "Referência ao usuário correspondente no diretório da plataforma, sem duplicar dados de login.",
          "source": "userInput",
          "required": true
        }
      ],
      "outputRefs": [
        "Atendente.atendenteId"
      ],
      "useRules": [],
      "transitionRefs": [],
      "story": [
        "Informar os dados do novo registro."
      ]
    },
    {
      "operationId": "updateAtendente",
      "title": "Atualizar Atendente",
      "kind": "command",
      "entityRef": "Atendente",
      "entityRefs": [
        "Atendente"
      ],
      "accessPattern": {
        "kind": "update"
      },
      "inputs": [
        {
          "inputId": "atendenteId",
          "fieldRef": {
            "entityId": "Atendente",
            "fieldId": "atendenteId"
          },
          "description": "Identificador estável do atendente reutilizado entre os módulos da organização.",
          "source": "selectedEntity",
          "required": true
        },
        {
          "inputId": "platformUserId",
          "fieldRef": {
            "entityId": "Atendente",
            "fieldId": "platformUserId"
          },
          "description": "Referência ao usuário correspondente no diretório da plataforma, sem duplicar dados de login.",
          "source": "userInput",
          "required": true
        }
      ],
      "outputRefs": [
        "Atendente.atendenteId"
      ],
      "useRules": [],
      "transitionRefs": [],
      "story": [
        "Corrigir os dados do registro escolhido."
      ]
    },
    {
      "kind": "command",
      "entityRef": "Atendente",
      "entityRefs": [
        "Atendente"
      ],
      "inputs": [
        {
          "inputId": "atendenteId",
          "fieldRef": {
            "entityId": "Atendente",
            "fieldId": "atendenteId"
          },
          "description": "Identificador estável do atendente reutilizado entre os módulos da organização.",
          "source": "selectedEntity",
          "required": true
        }
      ],
      "outputRefs": [
        "Atendente.atendenteId"
      ],
      "useRules": [],
      "transitionRefs": [],
      "operationId": "inactivateAtendente",
      "title": "Desativar Atendente",
      "accessPattern": {
        "kind": "update"
      },
      "mdm": {
        "lifecycle": "inactivate"
      },
      "story": [
        "Desativar o registro (preserva o histórico e as referências)."
      ]
    },
    {
      "kind": "command",
      "entityRef": "Atendente",
      "entityRefs": [
        "Atendente"
      ],
      "inputs": [
        {
          "inputId": "atendenteId",
          "fieldRef": {
            "entityId": "Atendente",
            "fieldId": "atendenteId"
          },
          "description": "Identificador estável do atendente reutilizado entre os módulos da organização.",
          "source": "selectedEntity",
          "required": true
        }
      ],
      "outputRefs": [
        "Atendente.atendenteId"
      ],
      "useRules": [],
      "transitionRefs": [],
      "operationId": "reactivateAtendente",
      "title": "Reativar Atendente",
      "accessPattern": {
        "kind": "update"
      },
      "mdm": {
        "lifecycle": "reactivate"
      },
      "story": [
        "Reativar um registro desativado."
      ]
    },
    {
      "operationId": "getAtendente",
      "title": "Obter Atendente",
      "kind": "query",
      "entityRef": "Atendente",
      "entityRefs": [
        "Atendente"
      ],
      "accessPattern": {
        "kind": "getById"
      },
      "inputs": [
        {
          "inputId": "atendenteId",
          "fieldRef": {
            "entityId": "Atendente",
            "fieldId": "atendenteId"
          },
          "description": "Identificador estável do atendente reutilizado entre os módulos da organização.",
          "source": "selectedEntity",
          "required": true
        }
      ],
      "outputRefs": [
        "Atendente.atendenteId",
        "Atendente.platformUserId"
      ],
      "useRules": [],
      "transitionRefs": [],
      "story": [
        "Ler o registro pelo identificador."
      ],
      "mdm": {
        "situationOutput": "active"
      }
    },
    {
      "operationId": "listChamado",
      "title": "Listar Chamado",
      "kind": "query",
      "entityRef": "Chamado",
      "entityRefs": [
        "Chamado"
      ],
      "accessPattern": {
        "kind": "list",
        "pagination": "optional"
      },
      "inputs": [
        {
          "inputId": "sortBy",
          "fieldRef": {
            "entityId": "Chamado",
            "fieldId": "status"
          },
          "source": "userInput",
          "required": false,
          "enumValues": [
            "status"
          ],
          "description": "Campo de ordenação da listagem."
        },
        {
          "inputId": "sortOrder",
          "fieldRef": {
            "entityId": "Chamado",
            "fieldId": "status"
          },
          "source": "userInput",
          "required": false,
          "enumValues": [
            "asc",
            "desc"
          ],
          "description": "Direção da ordenação."
        }
      ],
      "outputRefs": [
        "Chamado.chamadoId",
        "Chamado.titulo",
        "Chamado.descricao",
        "Chamado.status"
      ],
      "useRules": [],
      "transitionRefs": [],
      "story": [
        "Encontrar o registro."
      ]
    },
    {
      "operationId": "createChamado",
      "title": "Criar Chamado",
      "kind": "command",
      "entityRef": "Chamado",
      "entityRefs": [
        "Chamado"
      ],
      "accessPattern": {
        "kind": "create"
      },
      "inputs": [
        {
          "inputId": "titulo",
          "fieldRef": {
            "entityId": "Chamado",
            "fieldId": "titulo"
          },
          "description": "Resumo do assunto ou solicitação de atendimento registrada no chamado.",
          "source": "userInput",
          "required": true
        },
        {
          "inputId": "descricao",
          "fieldRef": {
            "entityId": "Chamado",
            "fieldId": "descricao"
          },
          "description": "Detalhamento da solicitação de atendimento registrada no chamado.",
          "source": "userInput",
          "required": true
        },
        {
          "inputId": "status",
          "fieldRef": {
            "entityId": "Chamado",
            "fieldId": "status"
          },
          "description": "Situação atual do acompanhamento do chamado.",
          "enumValues": [
            "open",
            "closed"
          ],
          "source": "systemDefault",
          "required": true
        }
      ],
      "outputRefs": [
        "Chamado.chamadoId"
      ],
      "useRules": [
        "comentariosPermitidosSomenteEmChamadosAbertos",
        "fechamentoExigeChamadoAberto",
        "chamadoFechadoNaoPodeSerReaberto"
      ],
      "transitionRefs": [],
      "story": [
        "Informar os dados do novo registro."
      ]
    },
    {
      "operationId": "updateChamado",
      "title": "Atualizar Chamado",
      "kind": "command",
      "entityRef": "Chamado",
      "entityRefs": [
        "Chamado"
      ],
      "accessPattern": {
        "kind": "update"
      },
      "inputs": [
        {
          "inputId": "chamadoId",
          "fieldRef": {
            "entityId": "Chamado",
            "fieldId": "chamadoId"
          },
          "description": "Identificador estável do chamado, transportado entre as etapas de acompanhamento.",
          "source": "selectedEntity",
          "required": true
        },
        {
          "inputId": "titulo",
          "fieldRef": {
            "entityId": "Chamado",
            "fieldId": "titulo"
          },
          "description": "Resumo do assunto ou solicitação de atendimento registrada no chamado.",
          "source": "userInput",
          "required": true
        },
        {
          "inputId": "descricao",
          "fieldRef": {
            "entityId": "Chamado",
            "fieldId": "descricao"
          },
          "description": "Detalhamento da solicitação de atendimento registrada no chamado.",
          "source": "userInput",
          "required": true
        },
        {
          "inputId": "status",
          "fieldRef": {
            "entityId": "Chamado",
            "fieldId": "status"
          },
          "description": "Situação atual do acompanhamento do chamado.",
          "enumValues": [
            "open",
            "closed"
          ],
          "source": "systemDefault",
          "required": true
        }
      ],
      "outputRefs": [
        "Chamado.chamadoId"
      ],
      "useRules": [
        "comentariosPermitidosSomenteEmChamadosAbertos",
        "fechamentoExigeChamadoAberto",
        "chamadoFechadoNaoPodeSerReaberto"
      ],
      "transitionRefs": [],
      "story": [
        "Corrigir os dados do registro escolhido."
      ]
    },
    {
      "kind": "command",
      "entityRef": "Chamado",
      "entityRefs": [
        "Chamado"
      ],
      "inputs": [
        {
          "inputId": "chamadoId",
          "fieldRef": {
            "entityId": "Chamado",
            "fieldId": "chamadoId"
          },
          "description": "Identificador estável do chamado, transportado entre as etapas de acompanhamento.",
          "source": "selectedEntity",
          "required": true
        }
      ],
      "outputRefs": [
        "Chamado.chamadoId"
      ],
      "useRules": [],
      "transitionRefs": [],
      "operationId": "deleteChamado",
      "title": "Excluir Chamado",
      "accessPattern": {
        "kind": "delete"
      },
      "story": [
        "Remover o registro escolhido."
      ]
    },
    {
      "operationId": "getChamado",
      "title": "Obter Chamado",
      "kind": "query",
      "entityRef": "Chamado",
      "entityRefs": [
        "Chamado"
      ],
      "accessPattern": {
        "kind": "getById"
      },
      "inputs": [
        {
          "inputId": "chamadoId",
          "fieldRef": {
            "entityId": "Chamado",
            "fieldId": "chamadoId"
          },
          "description": "Identificador estável do chamado, transportado entre as etapas de acompanhamento.",
          "source": "selectedEntity",
          "required": true
        }
      ],
      "outputRefs": [
        "Chamado.chamadoId",
        "Chamado.titulo",
        "Chamado.descricao",
        "Chamado.status"
      ],
      "useRules": [],
      "transitionRefs": [],
      "story": [
        "Ler o registro pelo identificador."
      ]
    },
    {
      "operationId": "listComentario",
      "title": "Listar Comentário",
      "kind": "query",
      "entityRef": "Comentario",
      "entityRefs": [
        "Comentario"
      ],
      "accessPattern": {
        "kind": "list",
        "pagination": "optional"
      },
      "inputs": [],
      "outputRefs": [
        "Comentario.comentarioId",
        "Comentario.chamadoId",
        "Comentario.atendenteId",
        "Comentario.conteudo"
      ],
      "useRules": [],
      "transitionRefs": [],
      "story": [
        "Encontrar o registro."
      ]
    },
    {
      "operationId": "createComentario",
      "title": "Criar Comentário",
      "kind": "command",
      "entityRef": "Comentario",
      "entityRefs": [
        "Atendente",
        "Chamado",
        "Comentario"
      ],
      "accessPattern": {
        "kind": "create"
      },
      "inputs": [
        {
          "inputId": "chamadoId",
          "fieldRef": {
            "entityId": "Comentario",
            "fieldId": "chamadoId"
          },
          "description": "Chamado aberto selecionado ao qual o comentário pertence.",
          "source": "selectedEntity",
          "required": true
        },
        {
          "inputId": "atendenteId",
          "fieldRef": {
            "entityId": "Comentario",
            "fieldId": "atendenteId"
          },
          "description": "Atendente autenticado identificado como responsável pelo registro do comentário.",
          "source": "selectedEntity",
          "required": true
        },
        {
          "inputId": "conteudo",
          "fieldRef": {
            "entityId": "Comentario",
            "fieldId": "conteudo"
          },
          "description": "Texto de acompanhamento escrito pelo atendente para o chamado.",
          "source": "userInput",
          "required": true
        }
      ],
      "outputRefs": [
        "Comentario.comentarioId"
      ],
      "useRules": [
        "comentariosPermitidosSomenteEmChamadosAbertos"
      ],
      "transitionRefs": [],
      "story": [
        "Informar os dados do novo registro."
      ]
    },
    {
      "operationId": "updateComentario",
      "title": "Atualizar Comentário",
      "kind": "command",
      "entityRef": "Comentario",
      "entityRefs": [
        "Atendente",
        "Chamado",
        "Comentario"
      ],
      "accessPattern": {
        "kind": "update"
      },
      "inputs": [
        {
          "inputId": "comentarioId",
          "fieldRef": {
            "entityId": "Comentario",
            "fieldId": "comentarioId"
          },
          "description": "Identificador estável do comentário persistido no histórico de acompanhamento.",
          "source": "selectedEntity",
          "required": true
        },
        {
          "inputId": "chamadoId",
          "fieldRef": {
            "entityId": "Comentario",
            "fieldId": "chamadoId"
          },
          "description": "Chamado aberto selecionado ao qual o comentário pertence.",
          "source": "selectedEntity",
          "required": true
        },
        {
          "inputId": "atendenteId",
          "fieldRef": {
            "entityId": "Comentario",
            "fieldId": "atendenteId"
          },
          "description": "Atendente autenticado identificado como responsável pelo registro do comentário.",
          "source": "selectedEntity",
          "required": true
        },
        {
          "inputId": "conteudo",
          "fieldRef": {
            "entityId": "Comentario",
            "fieldId": "conteudo"
          },
          "description": "Texto de acompanhamento escrito pelo atendente para o chamado.",
          "source": "userInput",
          "required": true
        }
      ],
      "outputRefs": [
        "Comentario.comentarioId"
      ],
      "useRules": [
        "comentariosPermitidosSomenteEmChamadosAbertos"
      ],
      "transitionRefs": [],
      "story": [
        "Corrigir os dados do registro escolhido."
      ]
    },
    {
      "kind": "command",
      "entityRef": "Comentario",
      "entityRefs": [
        "Comentario"
      ],
      "inputs": [
        {
          "inputId": "comentarioId",
          "fieldRef": {
            "entityId": "Comentario",
            "fieldId": "comentarioId"
          },
          "description": "Identificador estável do comentário persistido no histórico de acompanhamento.",
          "source": "selectedEntity",
          "required": true
        }
      ],
      "outputRefs": [
        "Comentario.comentarioId"
      ],
      "useRules": [],
      "transitionRefs": [],
      "operationId": "deleteComentario",
      "title": "Excluir Comentário",
      "accessPattern": {
        "kind": "delete"
      },
      "story": [
        "Remover o registro escolhido."
      ]
    },
    {
      "operationId": "getComentario",
      "title": "Obter Comentário",
      "kind": "query",
      "entityRef": "Comentario",
      "entityRefs": [
        "Comentario"
      ],
      "accessPattern": {
        "kind": "getById"
      },
      "inputs": [
        {
          "inputId": "comentarioId",
          "fieldRef": {
            "entityId": "Comentario",
            "fieldId": "comentarioId"
          },
          "description": "Identificador estável do comentário persistido no histórico de acompanhamento.",
          "source": "selectedEntity",
          "required": true
        }
      ],
      "outputRefs": [
        "Comentario.comentarioId",
        "Comentario.chamadoId",
        "Comentario.atendenteId",
        "Comentario.conteudo"
      ],
      "useRules": [],
      "transitionRefs": [],
      "story": [
        "Ler o registro pelo identificador."
      ]
    },
    {
      "operationId": "locateChamado",
      "title": "Localizar o chamado aberto",
      "kind": "query",
      "entityRef": "Chamado",
      "entityRefs": [
        "Chamado"
      ],
      "accessPattern": {
        "kind": "list",
        "pagination": "optional"
      },
      "inputs": [],
      "outputRefs": [
        "Chamado.chamadoId",
        "Chamado.titulo",
        "Chamado.descricao",
        "Chamado.status"
      ],
      "useRules": [],
      "transitionRefs": [],
      "story": [
        "Localizar o chamado aberto",
        "Um chamado aberto, disponível no catálogo de chamados, está selecionado para conclusão."
      ],
      "useCaseId": "locateChamado"
    },
    {
      "operationId": "registerComentario",
      "title": "Registrar comentário",
      "kind": "command",
      "entityRef": "Comentario",
      "entityRefs": [
        "Atendente",
        "Chamado",
        "Comentario"
      ],
      "accessPattern": {
        "kind": "commandInput"
      },
      "inputs": [
        {
          "inputId": "atendenteId",
          "fieldRef": {
            "entityId": "Atendente",
            "fieldId": "atendenteId"
          },
          "source": "selectedEntity",
          "required": true,
          "description": "Atendente"
        },
        {
          "inputId": "chamadoId",
          "fieldRef": {
            "entityId": "Chamado",
            "fieldId": "chamadoId"
          },
          "source": "routeParam",
          "required": true,
          "description": "Chamado"
        },
        {
          "inputId": "conteudo",
          "fieldRef": {
            "entityId": "Comentario",
            "fieldId": "conteudo"
          },
          "source": "userInput",
          "required": true,
          "description": "Texto de acompanhamento escrito pelo atendente para o chamado."
        }
      ],
      "outputRefs": [
        "Comentario.comentarioId",
        "Comentario.chamadoId",
        "Comentario.atendenteId",
        "Comentario.conteudo"
      ],
      "useRules": [
        "comentariosPermitidosSomenteEmChamadosAbertos"
      ],
      "transitionRefs": [],
      "story": [
        "Registrar comentário",
        "Um comentário fica registrado e vinculado ao chamado selecionado."
      ],
      "useCaseId": "registerComentario"
    },
    {
      "operationId": "closeChamado",
      "title": "Confirmar o fechamento do chamado",
      "kind": "command",
      "entityRef": "Chamado",
      "entityRefs": [
        "Chamado"
      ],
      "accessPattern": {
        "kind": "transition"
      },
      "inputs": [
        {
          "inputId": "chamadoId",
          "fieldRef": {
            "entityId": "Chamado",
            "fieldId": "chamadoId"
          },
          "source": "routeParam",
          "required": true,
          "description": "Chamado"
        },
        {
          "inputId": "status",
          "fieldRef": {
            "entityId": "Chamado",
            "fieldId": "status"
          },
          "source": "userInput",
          "required": true,
          "description": "Decisão tomada.",
          "enumValues": [
            "closed"
          ]
        }
      ],
      "outputRefs": [
        "Chamado.chamadoId",
        "Chamado.titulo",
        "Chamado.descricao",
        "Chamado.status"
      ],
      "useRules": [
        "fechamentoExigeChamadoAberto"
      ],
      "transitionRefs": [
        "closeChamado"
      ],
      "story": [
        "Confirmar o fechamento do chamado",
        "O chamado selecionado passa a ter o status fechado."
      ],
      "useCaseId": "closeChamado"
    }
  ],
  "menu": [
    {
      "workspaceId": "atendenteCatalogue",
      "label": "Atendente",
      "featureRef": "",
      "tier": "recordCatalogue",
      "profileRefs": [
        "atendente"
      ]
    },
    {
      "workspaceId": "chamadoCatalogue",
      "label": "Chamado",
      "featureRef": "acompanhamentoChamados",
      "tier": "recordCatalogue",
      "profileRefs": [
        "atendente"
      ]
    },
    {
      "workspaceId": "chamadoHub",
      "label": "Chamado",
      "featureRef": "",
      "tier": "hub",
      "profileRefs": [
        "atendente"
      ]
    },
    {
      "workspaceId": "comentarioCatalogue",
      "label": "Comentário",
      "featureRef": "",
      "tier": "recordCatalogue",
      "profileRefs": [
        "atendente"
      ]
    }
  ],
  "landings": [
    {
      "profileRef": "atendente",
      "workspaceId": "chamadoHub"
    }
  ],
  "systemDecisions": [
    {
      "decisionId": "catalogueAudienceAtendente",
      "stage": "e8-workspaces",
      "question": "Nenhuma jornada opera Atendente: quem mantém esse cadastro?",
      "chosen": "internalProfiles",
      "alternatives": [
        "internalProfiles",
        "restrictToNamedProfile"
      ],
      "decidedBy": "system",
      "findingRef": "NS4_E8_CATALOGUE_AUDIENCE:atendenteCatalogue",
      "changeHint": "Adicione no E3 uma autoridade sobre Atendente para restringir esse cadastro a um perfil específico."
    },
    {
      "decisionId": "hubCompositionChamadoHub",
      "stage": "e8-workspaces",
      "question": "A composição proposta para o painel de Chamado não respeitou o catálogo; usar a ordem padrão?",
      "chosen": "keepDerivedComposition",
      "alternatives": [
        "keepDerivedComposition",
        "reviewDashboardComposition"
      ],
      "decidedBy": "system",
      "findingRef": "NS4_E8_HUB_COMPOSITION:chamadoHub",
      "changeHint": "Revisar a ordem e os destaques do painel de Chamado no próximo round."
    }
  ]
} as const;

export default controleChamadosWorkspaceModel;
