/// <mls fileReference="_102039_/l4/controleChamados/journeys/registrarComentarioChamado.defs.ts" enhancement="_blank"/>

import type { Ns4JourneyArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const registrarComentarioChamadoJourney = {
  "schemaVersion": "2026-08-14-ns4-journey-realized-v5",
  "journeyId": "registrarComentarioChamado",
  "revision": 1,
  "business": {
    "actorRef": "atendente",
    "title": "Registrar comentário em chamado aberto",
    "goal": "Manter o acompanhamento de um chamado aberto por meio de um comentário vinculado.",
    "entry": {
      "mode": "contextOrLookup"
    },
    "steps": [
      {
        "stepId": "locateChamado",
        "kind": "locate",
        "entity": "Chamado",
        "title": "Localizar o chamado aberto",
        "description": "Um chamado aberto, disponível no catálogo de chamados, está selecionado.",
        "featureRefs": [
          "acompanhamentoChamados"
        ]
      },
      {
        "stepId": "registerComentario",
        "kind": "act",
        "entity": "Comentario",
        "title": "Registrar comentário",
        "description": "Um comentário fica registrado e vinculado ao chamado selecionado.",
        "featureRefs": [
          "acompanhamentoChamados"
        ]
      }
    ],
    "outcome": {
      "statement": "O acompanhamento do chamado passa a contar com um comentário registrado pelo atendente.",
      "evidence": [
        "O comentário permanece vinculado ao chamado selecionado.",
        "O comentário identifica seu conteúdo e o atendente que o registrou."
      ]
    },
    "useRules": [
      "comentariosPermitidosSomenteEmChamadosAbertos"
    ]
  },
  "businessHash": "sha256:5d02ae674902d80323c1ed7b60fc17d313a6a4a972e6bae90150ed0d5f901395",
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
          "registrarComentarioChamado.entry",
          "registrarComentarioChamado.locateChamado"
        ],
        "consumerStepRefs": [
          "registrarComentarioChamado.registerComentario"
        ]
      },
      "selectedComentario": {
        "contextId": "selectedComentario",
        "businessObject": "Comentario",
        "cardinality": "one",
        "required": true,
        "idFieldRef": "comentarioId",
        "sourceRefs": [
          "registrarComentarioChamado.registerComentario"
        ],
        "consumerStepRefs": []
      }
    }
  },
  "realization": {
    "status": "compiled",
    "compiledFromBusinessHash": "sha256:5d02ae674902d80323c1ed7b60fc17d313a6a4a972e6bae90150ed0d5f901395",
    "steps": [
      {
        "stepId": "locateChamado",
        "useCaseRefs": [
          "locateChamado"
        ]
      },
      {
        "stepId": "registerComentario",
        "useCaseRefs": [
          "registerComentario"
        ]
      }
    ],
    "transitionRefs": [],
    "realizationHash": "sha256:7a0725141290b149b58fb15714d2e22be9efb52a15f558716ada34b0a2fe96b3"
  }
} as const satisfies Ns4JourneyArtifact;

export type RegistrarComentarioChamadoJourneyType = typeof registrarComentarioChamadoJourney;

export default registrarComentarioChamadoJourney;
