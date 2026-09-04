/// <mls fileReference="_102039_/l5/controleChamados/process.defs.ts" enhancement="_blank"/>

import type { Ns4L5ProcessArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosProcess = {
  "schemaVersion": "2026-08-13-ns4-process-v1",
  "moduleName": "controleChamados",
  "sourceHashes": {
    "journeys": [
      {
        "journeyId": "fecharChamado",
        "businessHash": "sha256:65b1b28dd1c7c349261f5cadf1ea2eccca8394522ee802ca6910241b7bfee449"
      },
      {
        "journeyId": "registrarChamado",
        "businessHash": "sha256:7843bec8f6e0eda2307bd451a4ba6c4ae2a6408532e3db6317bd45c3620b3e55"
      },
      {
        "journeyId": "registrarComentarioChamado",
        "businessHash": "sha256:5d02ae674902d80323c1ed7b60fc17d313a6a4a972e6bae90150ed0d5f901395"
      }
    ],
    "accessHash": "sha256:5a1c5d95dd8f305952cc1f782cb119ee70e9f53e8ec30cc1b14b16fefb1452b0",
    "ontologyHash": "sha256:db66c55cfead4b983d579fbe9bf6b5467c976164c1965b365179468c886515bb",
    "rulesHash": "sha256:4137fabbb0184526410eb8e712b7cb5f09420d1227ff372f286d86b52b5eebf9"
  },
  "counts": {
    "journeys": 3,
    "workspaces": 5,
    "operations": 19,
    "contracts": 25,
    "decisions": 5
  },
  "validation": {
    "status": "passed",
    "reportPath": "l4/controleChamados/pipeline/e10-validation-report.json",
    "reportHash": "sha256:b6a733821a0748e60cf72d8025c2faa6c4f710894c33a5d2806443be184acd54",
    "warningCount": 0,
    "registrarCount": 0
  },
  "next": {
    "frontend": "todoFrontend",
    "backend": "todoBackend"
  },
  "processHash": "sha256:f7755bec9fc4de794675d8fc15a4ca12bd214b9ac0012314410f0062994c7637"
} as const satisfies Ns4L5ProcessArtifact;

export type ControleChamadosProcessType = typeof controleChamadosProcess;

export default controleChamadosProcess;
