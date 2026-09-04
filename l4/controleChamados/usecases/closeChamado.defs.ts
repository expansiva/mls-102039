/// <mls fileReference="_102039_/l4/controleChamados/usecases/closeChamado.defs.ts" enhancement="_blank"/>

import type { Ns4UseCaseArtifactV3 } from '/_102020_/l2/agentNewSolution/types.js';

export const closeChamadoUseCase = {
  "schemaVersion": "2026-08-10-ns4-usecase-v3",
  "moduleName": "controleChamados",
  "useCaseId": "closeChamado",
  "title": "Confirmar o fechamento do chamado",
  "kind": "command",
  "compiledFrom": [
    "fecharChamado.closeChamado"
  ],
  "description": "Confirma o fechamento do chamado selecionado, alterando seu status de aberto para fechado.",
  "contexts": {
    "requires": [
      "selectedChamado"
    ],
    "provides": [
      "selectedChamado"
    ]
  },
  "entityRefs": [
    "Chamado"
  ],
  "useRules": [
    "fechamentoExigeChamadoAberto"
  ],
  "transitionRefs": [
    "closeChamado"
  ],
  "useCaseHash": "sha256:1981488d5cb965289d9f4a75ee3077790117563e9f544ce5e1fc5beac3180989"
} as const satisfies Ns4UseCaseArtifactV3;

export type CloseChamadoUseCaseType = typeof closeChamadoUseCase;

export default closeChamadoUseCase;
