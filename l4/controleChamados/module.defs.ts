/// <mls fileReference="_102039_/l4/controleChamados/module.defs.ts" enhancement="_blank"/>

import type { Ns4ModuleArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosModule = {
  "schemaVersion": "2026-08-06-ns4-module-v4",
  "presentation": {
    "userLanguage": "pt-BR",
    "stepTitles": {
      "e1-clarification": "Definir o ponto de partida",
      "e1-compile": "Organizar a ideia",
      "e2-journeys": "Visualizar as jornadas",
      "e3-access-matrix": "Revisar os acessos",
      "e4-ontology": "Confirmar os conceitos",
      "e5-rules": "Conferir as regras",
      "e6-behaviors": "Revisar módulos e extensões",
      "e7-realization": "Montar a solução",
      "e8-workspaces": "Preparar os espaços de trabalho",
      "e9-navigation-compiler": "Organizar a navegação",
      "e10-validation": "Validar o resultado"
    }
  },
  "module": {
    "moduleName": "controleChamados",
    "title": "Controle de Chamados",
    "purpose": "Permitir que o atendente registre, comente e feche chamados com título, descrição e status.",
    "languages": [
      "pt-BR"
    ]
  },
  "designContext": {
    "initialPrompt": "criar um site chamado controleChamados , em portugues. cada chamado tem titulo, descricao e status (aberto ou fechado). o atendente registra o chamado, escreve comentarios no chamado, e depois fecha o chamado. um unico perfil de acesso: atendente.",
    "clarification": {
      "mainActors": "Atendente",
      "mainGoal": "Registrar e acompanhar chamados até o fechamento, mantendo comentários e o status de cada atendimento.",
      "boundaries": "in: Cadastro de chamados com título, descrição e status aberto ou fechado; in: Registro de comentários no chamado; in: Fechamento do chamado pelo atendente; in: Uso exclusivo do perfil de acesso atendente; out: Outros perfis de acesso; out: Integrações com sistemas externos; out: Recursos não mencionados na solicitação"
    }
  },
  "reviewPolicy": {
    "mode": "smart"
  },
  "solutionStrategy": {
    "mode": "newSolution",
    "rationale": "A solicitação descreve um site novo, sem sistema legado, preservação de banco ou migração de dados.",
    "databaseChangePolicy": "new"
  },
  "businessScope": {
    "mainGoal": "Registrar e acompanhar chamados até o fechamento, mantendo comentários e o status de cada atendimento.",
    "actors": [
      {
        "actorId": "atendente",
        "title": "Atendente",
        "kind": "internal",
        "expectedOutcome": "Registrar o chamado, escrever comentários e fechá-lo."
      }
    ],
    "expectedOutcomes": [
      {
        "outcomeId": "chamadoRegistrado",
        "title": "Chamado registrado",
        "description": "O atendente registra o chamado com título, descrição e status aberto ou fechado."
      },
      {
        "outcomeId": "chamadoComentado",
        "title": "Comentários no chamado",
        "description": "O atendente escreve comentários no chamado durante o acompanhamento."
      },
      {
        "outcomeId": "chamadoFechado",
        "title": "Chamado fechado",
        "description": "O atendente fecha o chamado após o atendimento."
      }
    ],
    "inScope": [
      "Cadastro de chamados com título, descrição e status aberto ou fechado",
      "Registro de comentários no chamado",
      "Fechamento do chamado pelo atendente",
      "Uso exclusivo do perfil de acesso atendente"
    ],
    "outOfScope": [
      "Outros perfis de acesso",
      "Integrações com sistemas externos",
      "Recursos não mencionados na solicitação"
    ]
  },
  "localization": {
    "productLanguages": [
      "pt-BR"
    ],
    "defaultLanguage": "pt-BR",
    "defaultLocale": "",
    "currency": "",
    "timeZone": "",
    "primaryMarket": ""
  },
  "declaredConstraints": {
    "mandatoryIntegrations": [],
    "regulatoryNotes": "",
    "criticalNotes": ""
  },
  "specStatus": {
    "flowId": "agentNewSolution",
    "flowVersion": "2026-08-14-ns4-flow-v40",
    "state": "complete",
    "artifactCompleteness": "full",
    "completedSteps": [
      {
        "stepId": "e1",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-04T01:36:02.812Z"
      },
      {
        "stepId": "e2-journeys",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-04T01:37:46.174Z"
      },
      {
        "stepId": "e3-access-matrix",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-04T01:38:02.883Z"
      },
      {
        "stepId": "e4-ontology",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-04T01:39:45.367Z"
      },
      {
        "stepId": "e5-rules",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-04T01:39:57.034Z"
      },
      {
        "stepId": "e6-behaviors",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-04T01:40:08.339Z"
      },
      {
        "stepId": "e7-realization",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-04T01:40:21.030Z"
      },
      {
        "stepId": "e8-workspaces",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-04T01:40:43.871Z"
      },
      {
        "stepId": "e9-navigation-compiler",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-04T01:40:44.208Z"
      },
      {
        "stepId": "e10-validation",
        "status": "approved",
        "approvedBy": "auto",
        "approvedAt": "2026-09-04T01:40:44.406Z"
      }
    ],
    "nextStep": "complete",
    "updatedAt": "2026-09-04T01:40:44.406Z"
  }
} as const satisfies Ns4ModuleArtifact;

export type ControleChamadosModuleType = typeof controleChamadosModule;

export default controleChamadosModule;
