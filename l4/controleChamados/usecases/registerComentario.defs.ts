/// <mls fileReference="_102039_/l4/controleChamados/usecases/registerComentario.defs.ts" enhancement="_blank"/>

import type { Ns4UseCaseArtifactV3 } from '/_102020_/l2/agentNewSolution/types.js';

export const registerComentarioUseCase = {
  "schemaVersion": "2026-08-10-ns4-usecase-v3",
  "moduleName": "controleChamados",
  "useCaseId": "registerComentario",
  "title": "Registrar comentário",
  "kind": "command",
  "compiledFrom": [
    "registrarComentarioChamado.registerComentario"
  ],
  "description": "Registra um comentário vinculado ao chamado selecionado e identifica o atendente responsável pelo registro.",
  "contexts": {
    "requires": [
      "selectedAtendente",
      "selectedChamado"
    ],
    "provides": [
      "selectedComentario"
    ]
  },
  "entityRefs": [
    "Atendente",
    "Chamado",
    "Comentario"
  ],
  "useRules": [
    "comentariosPermitidosSomenteEmChamadosAbertos"
  ],
  "transitionRefs": [],
  "useCaseHash": "sha256:38a6fe5d4329ffbca4e615bfa629c4d17ed13f83a26610bb228b777e46dc5503"
} as const satisfies Ns4UseCaseArtifactV3;

export type RegisterComentarioUseCaseType = typeof registerComentarioUseCase;

export default registerComentarioUseCase;
