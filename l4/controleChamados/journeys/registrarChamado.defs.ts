/// <mls fileReference="_102039_/l4/controleChamados/journeys/registrarChamado.defs.ts" enhancement="_blank"/>

import type { Ns4JourneyArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const registrarChamadoJourney = {
  "schemaVersion": "2026-08-14-ns4-journey-realized-v5",
  "journeyId": "registrarChamado",
  "revision": 1,
  "business": {
    "actorRef": "atendente",
    "title": "Registrar chamado",
    "goal": "Cadastrar um novo chamado com título, descrição e status inicial.",
    "entry": {
      "mode": "coldStart"
    },
    "steps": [
      {
        "stepId": "registerChamado",
        "kind": "act",
        "entity": "Chamado",
        "title": "Registrar novo chamado",
        "description": "O atendente informa o título, a descrição e o status inicial aberto ou fechado; um novo chamado é criado e disponibilizado no catálogo para acompanhamento.",
        "featureRefs": [
          "acompanhamentoChamados"
        ]
      }
    ],
    "outcome": {
      "statement": "Um novo chamado é registrado com título, descrição e status inicial aberto ou fechado, ficando disponível para acompanhamento.",
      "evidence": [
        "O chamado registrado exibe título, descrição e seu status inicial.",
        "O novo chamado está disponível no catálogo de chamados para comentários e fechamento quando estiver aberto."
      ]
    },
    "useRules": []
  },
  "businessHash": "sha256:7843bec8f6e0eda2307bd451a4ba6c4ae2a6408532e3db6317bd45c3620b3e55",
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
          "registrarChamado.registerChamado"
        ],
        "consumerStepRefs": []
      }
    }
  },
  "realization": {
    "status": "compiled",
    "compiledFromBusinessHash": "sha256:7843bec8f6e0eda2307bd451a4ba6c4ae2a6408532e3db6317bd45c3620b3e55",
    "steps": [
      {
        "stepId": "registerChamado",
        "useCaseRefs": [
          "registerChamado"
        ]
      }
    ],
    "transitionRefs": [],
    "realizationHash": "sha256:8fa18055a664e5b80fc6280e8840525fd2df855b7c9c85554acbdec160c44f9e"
  }
} as const satisfies Ns4JourneyArtifact;

export type RegistrarChamadoJourneyType = typeof registrarChamadoJourney;

export default registrarChamadoJourney;
