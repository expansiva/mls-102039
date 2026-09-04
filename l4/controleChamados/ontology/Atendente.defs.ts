/// <mls fileReference="_102039_/l4/controleChamados/ontology/Atendente.defs.ts" enhancement="_blank"/>

import type { Ns4OntologyEntityArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosEntityAtendente = {
  "schemaVersion": "2026-08-11-ns4-ontology-v6",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "solutionMode": "new",
  "entityId": "Atendente",
  "title": "Atendente",
  "description": "Profissional interno identificado como responsável pelo registro de comentários nos chamados da organização.",
  "kind": "mdm",
  "ownership": "moduleOwned",
  "party": "person",
  "sourceRefs": {
    "journeyIds": [
      "registrarComentarioChamado"
    ],
    "featureIds": [
      "acompanhamentoChamados"
    ],
    "authorityRefs": [
      "controlechamados:gerenciar"
    ]
  },
  "fields": [
    {
      "fieldId": "atendenteId",
      "title": "Identificador do atendente",
      "type": "uuid",
      "required": true,
      "description": "Identificador estável do atendente reutilizado entre os módulos da organização.",
      "constraints": [
        {
          "constraintId": "uniqueAtendenteId",
          "kind": "unique",
          "value": "true",
          "description": "Cada atendente possui um identificador estável e exclusivo.",
          "source": "inferred"
        }
      ]
    },
    {
      "fieldId": "platformUserId",
      "title": "Usuário da plataforma",
      "type": "uuid",
      "required": true,
      "description": "Referência ao usuário correspondente no diretório da plataforma, sem duplicar dados de login.",
      "constraints": [
        {
          "constraintId": "uniquePlatformUserId",
          "kind": "unique",
          "value": "true",
          "description": "Um usuário da plataforma corresponde a apenas um atendente neste cadastro MDM.",
          "source": "inferred"
        }
      ]
    }
  ],
  "lifecycleStates": [],
  "lifecyclePredicates": [],
  "useRules": [],
  "storage": {
    "target": "mdm",
    "scope": "organization",
    "idField": "atendenteId",
    "mdmType": "controleChamados.Atendente",
    "notes": "Atendente é uma pessoa da organização reutilizável entre módulos e deve ser persistido no MDM. Seu detalhamento deverá conter a referência externa obrigatória platformUserId para o usuário correspondente no diretório da plataforma, sem duplicar o login."
  },
  "ontologyHash": "sha256:db66c55cfead4b983d579fbe9bf6b5467c976164c1965b365179468c886515bb",
  "approvedBy": "auto",
  "approvedAt": "2026-09-04T01:39:45.367Z"
} as const satisfies Ns4OntologyEntityArtifact;

export type ControleChamadosEntityAtendenteType = typeof controleChamadosEntityAtendente;

export default controleChamadosEntityAtendente;
