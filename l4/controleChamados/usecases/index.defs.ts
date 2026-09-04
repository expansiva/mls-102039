/// <mls fileReference="_102039_/l4/controleChamados/usecases/index.defs.ts" enhancement="_blank"/>

import type { Ns4UseCaseIndexArtifactV3 } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosUseCaseIndex = {
  "schemaVersion": "2026-08-10-ns4-usecase-index-v3",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "sourceHashes": {
    "journeys": [
      {
        "journeyId": "registrarComentarioChamado",
        "businessHash": "sha256:5d02ae674902d80323c1ed7b60fc17d313a6a4a972e6bae90150ed0d5f901395"
      },
      {
        "journeyId": "fecharChamado",
        "businessHash": "sha256:65b1b28dd1c7c349261f5cadf1ea2eccca8394522ee802ca6910241b7bfee449"
      },
      {
        "journeyId": "registrarChamado",
        "businessHash": "sha256:7843bec8f6e0eda2307bd451a4ba6c4ae2a6408532e3db6317bd45c3620b3e55"
      }
    ],
    "ontologyHash": "sha256:db66c55cfead4b983d579fbe9bf6b5467c976164c1965b365179468c886515bb",
    "rulesHash": "sha256:4137fabbb0184526410eb8e712b7cb5f09420d1227ff372f286d86b52b5eebf9"
  },
  "useCases": [
    {
      "useCaseId": "closeChamado",
      "title": "Confirmar o fechamento do chamado",
      "kind": "command",
      "compiledFrom": [
        "fecharChamado.closeChamado"
      ],
      "useCaseHash": "sha256:1981488d5cb965289d9f4a75ee3077790117563e9f544ce5e1fc5beac3180989",
      "artifactPath": "l4/controleChamados/usecases/closeChamado.defs.ts"
    },
    {
      "useCaseId": "locateChamado",
      "title": "Localizar o chamado aberto",
      "kind": "query",
      "compiledFrom": [
        "fecharChamado.locateChamado",
        "registrarComentarioChamado.locateChamado"
      ],
      "useCaseHash": "sha256:3cc120ee57605990934856f5f64a463a72b15e41e1f71017dab764cbdc941026",
      "artifactPath": "l4/controleChamados/usecases/locateChamado.defs.ts"
    },
    {
      "useCaseId": "registerChamado",
      "title": "Registrar novo chamado",
      "kind": "command",
      "compiledFrom": [
        "registrarChamado.registerChamado"
      ],
      "useCaseHash": "sha256:a842842971d347a3670dfd83328e9bf1ec4610f31f8c5212a20f16f47d2f6aaa",
      "artifactPath": "l4/controleChamados/usecases/registerChamado.defs.ts"
    },
    {
      "useCaseId": "registerComentario",
      "title": "Registrar comentário",
      "kind": "command",
      "compiledFrom": [
        "registrarComentarioChamado.registerComentario"
      ],
      "useCaseHash": "sha256:38a6fe5d4329ffbca4e615bfa629c4d17ed13f83a26610bb228b777e46dc5503",
      "artifactPath": "l4/controleChamados/usecases/registerComentario.defs.ts"
    }
  ],
  "realizationHash": "sha256:710705beca4bf96b089b012245a01998c080301537fb6cfa9a8dea0964e74ae1",
  "generatedAt": "2026-09-04T01:40:21.030Z"
} as const satisfies Ns4UseCaseIndexArtifactV3;

export type ControleChamadosUseCaseIndexType = typeof controleChamadosUseCaseIndex;

export default controleChamadosUseCaseIndex;
