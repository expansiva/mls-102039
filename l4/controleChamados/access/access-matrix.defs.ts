/// <mls fileReference="_102039_/l4/controleChamados/access/access-matrix.defs.ts" enhancement="_blank"/>

import type { Ns4AccessMatrixArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosAccessMatrix = {
  "schemaVersion": "2026-08-10-ns4-access-matrix-v3",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "title": "Matriz de acesso",
  "profiles": [
    {
      "profileId": "atendente",
      "title": "Atendente",
      "kind": "internal",
      "description": "Profissional interno responsável por registrar, acompanhar, comentar e concluir chamados.",
      "actorRefs": [
        "atendente"
      ],
      "landingIntent": "Acessar o catálogo de chamados para registrar novos atendimentos e acompanhar os chamados existentes."
    }
  ],
  "authorities": [
    {
      "authorityRef": "controlechamados:gerenciar",
      "title": "Gerenciar chamados e comentários",
      "description": "Permite registrar chamados, consultar chamados disponíveis, adicionar comentários em chamados abertos e confirmar o fechamento de chamados abertos.",
      "journeyStepRefs": [
        "registrarChamado.registerChamado",
        "registrarComentarioChamado.locateChamado",
        "registrarComentarioChamado.registerComentario",
        "fecharChamado.locateChamado",
        "fecharChamado.closeChamado"
      ],
      "informationNeeds": [
        "Dados completos dos chamados para acompanhamento",
        "Comentários vinculados aos chamados",
        "Status atual de cada chamado"
      ]
    }
  ],
  "grants": [
    {
      "profileRef": "atendente",
      "authorityRef": "controlechamados:gerenciar",
      "reason": "O atendente é o único perfil previsto e precisa executar todo o ciclo de atendimento, desde o registro até o fechamento do chamado.",
      "dataScope": {
        "mode": "organization",
        "description": "Todos os chamados e comentários pertencentes à organização ativa do atendente."
      },
      "disclosure": {
        "mode": "fullRecord",
        "description": "O atendente pode acessar os dados completos necessários para registrar, acompanhar, comentar e fechar chamados.",
        "allowedInformation": [
          "Título do chamado",
          "Descrição do chamado",
          "Status aberto ou fechado",
          "Comentários vinculados ao chamado",
          "Identificação do atendente que registrou o comentário"
        ],
        "deniedInformation": []
      },
      "useRules": [
        "comentariosPermitidosSomenteEmChamadosAbertos",
        "fechamentoExigeChamadoAberto",
        "chamadoFechadoNaoPodeSerReaberto"
      ]
    }
  ],
  "accessHash": "sha256:5a1c5d95dd8f305952cc1f782cb119ee70e9f53e8ec30cc1b14b16fefb1452b0",
  "approvedBy": "auto",
  "approvedAt": "2026-09-04T01:38:02.883Z",
  "realization": {
    "status": "useCasesCompiled",
    "compiledFromAccessHash": "sha256:5a1c5d95dd8f305952cc1f782cb119ee70e9f53e8ec30cc1b14b16fefb1452b0",
    "useCaseAuthorityRefs": [
      {
        "useCaseId": "closeChamado",
        "authorityRef": "controlechamados:gerenciar",
        "journeyStepRefs": [
          "fecharChamado.closeChamado"
        ]
      },
      {
        "useCaseId": "locateChamado",
        "authorityRef": "controlechamados:gerenciar",
        "journeyStepRefs": [
          "fecharChamado.locateChamado",
          "registrarComentarioChamado.locateChamado"
        ]
      },
      {
        "useCaseId": "registerChamado",
        "authorityRef": "controlechamados:gerenciar",
        "journeyStepRefs": [
          "registrarChamado.registerChamado"
        ]
      },
      {
        "useCaseId": "registerComentario",
        "authorityRef": "controlechamados:gerenciar",
        "journeyStepRefs": [
          "registrarComentarioChamado.registerComentario"
        ]
      }
    ],
    "operationAuthorityRefs": [],
    "realizationHash": "sha256:eb7bb752b3ededeeb966484f3bf28d283de964946f0f573f2ff36393aba3a842"
  }
} as const satisfies Ns4AccessMatrixArtifact;

export type ControleChamadosAccessMatrixType = typeof controleChamadosAccessMatrix;

export default controleChamadosAccessMatrix;
