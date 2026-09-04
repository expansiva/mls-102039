/// <mls fileReference="_102039_/l4/controleChamados/usecases/registerChamado.defs.ts" enhancement="_blank"/>

import type { Ns4UseCaseArtifactV3 } from '/_102020_/l2/agentNewSolution/types.js';

export const registerChamadoUseCase = {
  "schemaVersion": "2026-08-10-ns4-usecase-v3",
  "moduleName": "controleChamados",
  "useCaseId": "registerChamado",
  "title": "Registrar novo chamado",
  "kind": "command",
  "compiledFrom": [
    "registrarChamado.registerChamado"
  ],
  "description": "Registra um novo chamado com seu estado inicial aberto ou fechado, disponibilizando-o para acompanhamento.",
  "contexts": {
    "requires": [],
    "provides": [
      "selectedChamado"
    ]
  },
  "entityRefs": [
    "Chamado"
  ],
  "useRules": [],
  "transitionRefs": [],
  "useCaseHash": "sha256:a842842971d347a3670dfd83328e9bf1ec4610f31f8c5212a20f16f47d2f6aaa"
} as const satisfies Ns4UseCaseArtifactV3;

export type RegisterChamadoUseCaseType = typeof registerChamadoUseCase;

export default registerChamadoUseCase;
