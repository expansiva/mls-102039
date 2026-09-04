/// <mls fileReference="_102039_/l4/controleChamados/usecases/locateChamado.defs.ts" enhancement="_blank"/>

import type { Ns4UseCaseArtifactV3 } from '/_102020_/l2/agentNewSolution/types.js';

export const locateChamadoUseCase = {
  "schemaVersion": "2026-08-10-ns4-usecase-v3",
  "moduleName": "controleChamados",
  "useCaseId": "locateChamado",
  "title": "Localizar o chamado aberto",
  "kind": "query",
  "compiledFrom": [
    "fecharChamado.locateChamado",
    "registrarComentarioChamado.locateChamado"
  ],
  "description": "Localiza um chamado em estado aberto e o disponibiliza como chamado selecionado para acompanhamento ou conclusão.",
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
  "useCaseHash": "sha256:3cc120ee57605990934856f5f64a463a72b15e41e1f71017dab764cbdc941026"
} as const satisfies Ns4UseCaseArtifactV3;

export type LocateChamadoUseCaseType = typeof locateChamadoUseCase;

export default locateChamadoUseCase;
