/// <mls fileReference="_102039_/l4/controleChamados/journeys/fecharChamado.defs.ts" enhancement="_blank"/>

import type { Ns4JourneyArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const fecharChamadoJourney = {
  "schemaVersion": "2026-08-14-ns4-journey-realized-v5",
  "journeyId": "fecharChamado",
  "revision": 1,
  "business": {
    "actorRef": "atendente",
    "title": "Fechar chamado aberto",
    "goal": "Concluir o atendimento de um chamado aberto, alterando seu status para fechado.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "locateChamado",
        "kind": "locate",
        "entity": "Chamado",
        "title": "Localizar o chamado aberto",
        "description": "Um chamado aberto, disponível no catálogo de chamados, está selecionado para conclusão.",
        "featureRefs": [
          "acompanhamentoChamados"
        ]
      },
      {
        "stepId": "closeChamado",
        "kind": "decide",
        "entity": "Chamado",
        "title": "Confirmar o fechamento do chamado",
        "description": "O chamado selecionado passa a ter o status fechado.",
        "featureRefs": [
          "acompanhamentoChamados"
        ]
      }
    ],
    "outcome": {
      "statement": "O chamado é concluído e seu status fechado torna-se observável no acompanhamento.",
      "evidence": [
        "O status do chamado é exibido como fechado.",
        "O fechamento permanece associado ao chamado selecionado."
      ]
    },
    "useRules": [
      "fechamentoExigeChamadoAberto",
      "chamadoFechadoNaoPodeSerReaberto"
    ]
  },
  "businessHash": "sha256:65b1b28dd1c7c349261f5cadf1ea2eccca8394522ee802ca6910241b7bfee449",
  "resolution": {
    "status": "compiled",
    "contexts": {
      "selectedChamado": {
        "contextId": "selectedChamado",
        "businessObject": "Chamado",
        "cardinality": "one",
        "required": true,
        "idFieldRef": "chamadoId",
        "sourceRefs": [
          "fecharChamado.closeChamado",
          "fecharChamado.entry",
          "fecharChamado.locateChamado"
        ],
        "consumerStepRefs": [
          "fecharChamado.closeChamado"
        ]
      }
    }
  },
  "realization": {
    "status": "compiled",
    "compiledFromBusinessHash": "sha256:65b1b28dd1c7c349261f5cadf1ea2eccca8394522ee802ca6910241b7bfee449",
    "steps": [
      {
        "stepId": "locateChamado",
        "useCaseRefs": [
          "locateChamado"
        ]
      },
      {
        "stepId": "closeChamado",
        "useCaseRefs": [
          "closeChamado"
        ]
      }
    ],
    "transitionRefs": [
      "closeChamado"
    ],
    "realizationHash": "sha256:25590b0132f4f24d9a8ec8a3931093b4e97e6e401b2ac056164c8b9243d48e47"
  }
} as const satisfies Ns4JourneyArtifact;

export type FecharChamadoJourneyType = typeof fecharChamadoJourney;

export default fecharChamadoJourney;
