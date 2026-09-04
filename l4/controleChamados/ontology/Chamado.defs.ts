/// <mls fileReference="_102039_/l4/controleChamados/ontology/Chamado.defs.ts" enhancement="_blank"/>

import type { Ns4OntologyEntityArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosEntityChamado = {
  "schemaVersion": "2026-08-11-ns4-ontology-v6",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "solutionMode": "new",
  "entityId": "Chamado",
  "title": "Chamado",
  "description": "Registro operacional de uma solicitação de atendimento, com título, descrição e status de acompanhamento aberto ou fechado.",
  "kind": "core",
  "ownership": "moduleOwned",
  "party": "none",
  "sourceRefs": {
    "journeyIds": [
      "registrarChamado",
      "registrarComentarioChamado",
      "fecharChamado"
    ],
    "featureIds": [
      "acompanhamentoChamados"
    ],
    "authorityRefs": [
      "controlechamados:gerenciar"
    ]
  },
  "fields": [
    {
      "fieldId": "chamadoId",
      "title": "Identificador do chamado",
      "type": "uuid",
      "required": true,
      "description": "Identificador estável do chamado, transportado entre as etapas de acompanhamento.",
      "constraints": [
        {
          "constraintId": "uniqueChamadoId",
          "kind": "unique",
          "value": "true",
          "description": "Cada chamado possui um identificador estável exclusivo.",
          "source": "inferred"
        }
      ]
    },
    {
      "fieldId": "titulo",
      "title": "Título",
      "type": "string",
      "required": true,
      "description": "Resumo do assunto ou solicitação de atendimento registrada no chamado.",
      "constraints": []
    },
    {
      "fieldId": "descricao",
      "title": "Descrição",
      "type": "text",
      "required": true,
      "description": "Detalhamento da solicitação de atendimento registrada no chamado.",
      "constraints": []
    },
    {
      "fieldId": "status",
      "title": "Status",
      "type": "string",
      "required": true,
      "description": "Situação atual do acompanhamento do chamado.",
      "constraints": [
        {
          "constraintId": "statusEnum",
          "kind": "enum",
          "value": "[\"open\",\"closed\"]",
          "description": "Status permitidos para o ciclo de atendimento do chamado.",
          "source": "journey"
        }
      ],
      "enum": [
        "open",
        "closed"
      ]
    }
  ],
  "lifecycleStates": [
    "open",
    "closed"
  ],
  "statusEnum": [
    "open",
    "closed"
  ],
  "lifecycleLabels": [
    {
      "code": "open",
      "label": "Aberto"
    },
    {
      "code": "closed",
      "label": "Fechado"
    }
  ],
  "initialState": "open",
  "terminalStates": [
    "closed"
  ],
  "lifecyclePredicates": [
    {
      "predicateId": "openChamado",
      "description": "Um chamado está aberto quando pode receber comentários e pode ser fechado pelo atendente.",
      "stateIds": [
        "open"
      ],
      "source": "journey"
    },
    {
      "predicateId": "closedChamado",
      "description": "Um chamado está fechado quando seu atendimento foi concluído definitivamente e não pode ser reaberto.",
      "stateIds": [
        "closed"
      ],
      "source": "journey"
    }
  ],
  "useRules": [
    "comentariosPermitidosSomenteEmChamadosAbertos",
    "fechamentoExigeChamadoAberto",
    "chamadoFechadoNaoPodeSerReaberto"
  ],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "chamadoId",
    "notes": "Chamado é um registro operacional da solução e deve ser persistido no banco transacional do módulo. O cadastro pode resultar em chamado fechado quando o fechamento for confirmado no próprio registro, sem permitir reabertura posterior."
  },
  "ontologyHash": "sha256:db66c55cfead4b983d579fbe9bf6b5467c976164c1965b365179468c886515bb",
  "approvedBy": "auto",
  "approvedAt": "2026-09-04T01:39:45.367Z"
} as const satisfies Ns4OntologyEntityArtifact;

export type ControleChamadosEntityChamadoType = typeof controleChamadosEntityChamado;

export default controleChamadosEntityChamado;
