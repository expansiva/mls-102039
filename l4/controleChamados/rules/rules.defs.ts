/// <mls fileReference="_102039_/l4/controleChamados/rules/rules.defs.ts" enhancement="_blank"/>

import type { Ns4RulesArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosRules = {
  "schemaVersion": "2026-08-09-ns4-rules-v2",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "rules": [
    {
      "id": "chamadoFechadoNaoPodeSerReaberto",
      "description": "Um chamado fechado não pode voltar ao status aberto."
    },
    {
      "id": "comentariosPermitidosSomenteEmChamadosAbertos",
      "description": "Comentários só podem ser registrados em chamados com status aberto."
    },
    {
      "id": "fechamentoExigeChamadoAberto",
      "description": "Um chamado só pode ser fechado quando estiver com status aberto."
    }
  ],
  "rulesHash": "sha256:4137fabbb0184526410eb8e712b7cb5f09420d1227ff372f286d86b52b5eebf9",
  "approvedBy": "auto",
  "approvedAt": "2026-09-04T01:39:57.034Z",
  "realization": {
    "status": "pending",
    "compiledFromRulesHash": "sha256:4137fabbb0184526410eb8e712b7cb5f09420d1227ff372f286d86b52b5eebf9"
  }
} as const satisfies Ns4RulesArtifact;

export type ControleChamadosRulesType = typeof controleChamadosRules;

export default controleChamadosRules;
