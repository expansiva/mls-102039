/// <mls fileReference="_102039_/l4/controleChamados/journeys/index.defs.ts" enhancement="_blank"/>

import type { Ns4JourneyIndex } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosJourneyIndex = {
  "schemaVersion": "2026-08-15-ns4-journey-index-v7",
  "moduleName": "controleChamados",
  "approvedAt": "2026-09-04T01:37:46.174Z",
  "approvedBy": "auto",
  "journeys": [
    {
      "journeyId": "registrarComentarioChamado",
      "actorRef": "atendente",
      "title": "Registrar comentário em chamado aberto",
      "goal": "Manter o acompanhamento de um chamado aberto por meio de um comentário vinculado.",
      "entryMode": "contextOrLookup",
      "businessHash": "sha256:5d02ae674902d80323c1ed7b60fc17d313a6a4a972e6bae90150ed0d5f901395",
      "artifactPath": "l4/controleChamados/journeys/registrarComentarioChamado.defs.ts",
      "useCaseRefs": [
        "locateChamado",
        "registerComentario"
      ]
    },
    {
      "journeyId": "fecharChamado",
      "actorRef": "atendente",
      "title": "Fechar chamado aberto",
      "goal": "Concluir o atendimento de um chamado aberto, alterando seu status para fechado.",
      "entryMode": "contextOrLookup",
      "businessHash": "sha256:65b1b28dd1c7c349261f5cadf1ea2eccca8394522ee802ca6910241b7bfee449",
      "artifactPath": "l4/controleChamados/journeys/fecharChamado.defs.ts",
      "useCaseRefs": [
        "closeChamado",
        "locateChamado"
      ]
    },
    {
      "journeyId": "registrarChamado",
      "actorRef": "atendente",
      "title": "Registrar chamado",
      "goal": "Cadastrar um novo chamado com título, descrição e status inicial.",
      "entryMode": "coldStart",
      "businessHash": "sha256:7843bec8f6e0eda2307bd451a4ba6c4ae2a6408532e3db6317bd45c3620b3e55",
      "artifactPath": "l4/controleChamados/journeys/registrarChamado.defs.ts",
      "useCaseRefs": [
        "registerChamado"
      ]
    }
  ],
  "features": [
    {
      "featureId": "acompanhamentoChamados",
      "title": "Acompanhamento e fechamento de chamados",
      "priority": "now",
      "journeyStepRefs": [
        "registrarChamado.registerChamado",
        "registrarComentarioChamado.locateChamado",
        "registrarComentarioChamado.registerComentario",
        "fecharChamado.locateChamado",
        "fecharChamado.closeChamado"
      ]
    }
  ],
  "policyDecisions": [
    {
      "decisionId": "commentingAfterClosurePolicy",
      "question": "Comentários podem ser registrados após o fechamento do chamado?",
      "chosen": "Somente chamados abertos podem receber comentários.",
      "alternatives": [
        "Somente chamados abertos podem receber comentários.",
        "Chamados fechados também podem receber comentários."
      ],
      "journeyRef": "registrarComentarioChamado"
    },
    {
      "decisionId": "closedChamadoFinalityPolicy",
      "question": "Um chamado fechado pode voltar a ser aberto?",
      "chosen": "O fechamento é definitivo e o chamado não pode ser reaberto.",
      "alternatives": [
        "O fechamento é definitivo e o chamado não pode ser reaberto.",
        "O atendente pode reabrir um chamado fechado."
      ],
      "journeyRef": "fecharChamado"
    },
    {
      "decisionId": "demoteRegistrarChamadoToRecordCatalogue",
      "question": "Registrar chamado não tem decisão nem repasse: vira a tela de cadastro padrão de Chamado?",
      "chosen": "Tela de cadastro padrão de Chamado",
      "alternatives": [
        "Tela de cadastro padrão de Chamado",
        "Manter Registrar chamado como jornada própria"
      ],
      "journeyRef": "registrarChamado"
    }
  ],
  "policyDecisionSelections": [
    {
      "decisionId": "commentingAfterClosurePolicy",
      "generatedChoice": "Somente chamados abertos podem receber comentários.",
      "selectedChoice": "Somente chamados abertos podem receber comentários.",
      "selectedBy": "auto",
      "selectedAt": "2026-09-04T01:37:46.174Z"
    },
    {
      "decisionId": "closedChamadoFinalityPolicy",
      "generatedChoice": "O fechamento é definitivo e o chamado não pode ser reaberto.",
      "selectedChoice": "O fechamento é definitivo e o chamado não pode ser reaberto.",
      "selectedBy": "auto",
      "selectedAt": "2026-09-04T01:37:46.174Z"
    },
    {
      "decisionId": "demoteRegistrarChamadoToRecordCatalogue",
      "generatedChoice": "Tela de cadastro padrão de Chamado",
      "selectedChoice": "Tela de cadastro padrão de Chamado",
      "selectedBy": "auto",
      "selectedAt": "2026-09-04T01:37:46.174Z"
    }
  ],
  "systemDecisions": [],
  "realizationHash": "sha256:98c31ea95551bf572fc4346c7ac514aa0c89f0fcbf98864cb98beafac1dc23cb"
} as const satisfies Ns4JourneyIndex;

export type ControleChamadosJourneyIndexType = typeof controleChamadosJourneyIndex;

export default controleChamadosJourneyIndex;
