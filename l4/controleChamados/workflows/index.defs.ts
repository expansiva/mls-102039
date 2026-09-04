/// <mls fileReference="_102039_/l4/controleChamados/workflows/index.defs.ts" enhancement="_blank"/>

import type { Ns4WorkflowIndexArtifactV3 } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosWorkflowIndex = {
  "schemaVersion": "2026-08-12-ns4-workflow-index-v5",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "workflows": [
    {
      "workflowId": "chamadoLifecycle",
      "entityRef": "Chamado",
      "workflowHash": "sha256:889a8c8e71457ecdc8211376bb1234e716796d80549471a5f18d9b8732eb1aa6",
      "artifactPath": "l4/controleChamados/workflows/chamadoLifecycle.defs.ts"
    }
  ],
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
  "realizationHash": "sha256:70486b1a843f6be51b4ac09d33ac4c8f4395152687edc1e67743dfff99a89e4c",
  "generatedAt": "2026-09-04T01:40:21.030Z",
  "systemDecisions": []
} as const satisfies Ns4WorkflowIndexArtifactV3;

export type ControleChamadosWorkflowIndexType = typeof controleChamadosWorkflowIndex;

export default controleChamadosWorkflowIndex;
