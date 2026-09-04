/// <mls fileReference="_102039_/l4/controleChamados/workflows/chamadoLifecycle.defs.ts" enhancement="_blank"/>

import type { Ns4WorkflowArtifactV2 } from '/_102020_/l2/agentNewSolution/types.js';

export const chamadoLifecycleWorkflow = {
  "schemaVersion": "2026-08-11-ns4-workflow-v4",
  "moduleName": "controleChamados",
  "workflowId": "chamadoLifecycle",
  "entityRef": "Chamado",
  "initialState": "open",
  "terminalStates": [
    "closed"
  ],
  "states": [
    "open",
    "closed"
  ],
  "transitions": [
    {
      "transitionId": "closeChamado",
      "entityRef": "Chamado",
      "fromStates": [
        "open"
      ],
      "toState": "closed",
      "useRules": [
        "fechamentoExigeChamadoAberto"
      ],
      "useCaseId": "closeChamado"
    }
  ],
  "workflowHash": "sha256:889a8c8e71457ecdc8211376bb1234e716796d80549471a5f18d9b8732eb1aa6"
} as const satisfies Ns4WorkflowArtifactV2;

export type ChamadoLifecycleWorkflowType = typeof chamadoLifecycleWorkflow;

export default chamadoLifecycleWorkflow;
