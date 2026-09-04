/// <mls fileReference="_102039_/l4/controleChamados/ontology/Comentario.defs.ts" enhancement="_blank"/>

import type { Ns4OntologyEntityArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosEntityComentario = {
  "schemaVersion": "2026-08-11-ns4-ontology-v6",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "solutionMode": "new",
  "entityId": "Comentario",
  "title": "Comentário",
  "description": "Registro de acompanhamento escrito por um atendente e vinculado a um chamado aberto.",
  "kind": "core",
  "ownership": "moduleOwned",
  "party": "none",
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
      "fieldId": "comentarioId",
      "title": "Identificador do comentário",
      "type": "uuid",
      "required": true,
      "description": "Identificador estável do comentário persistido no histórico de acompanhamento.",
      "constraints": [
        {
          "constraintId": "uniqueComentarioId",
          "kind": "unique",
          "value": "true",
          "description": "Cada comentário possui um identificador estável e exclusivo.",
          "source": "inferred"
        }
      ]
    },
    {
      "fieldId": "chamadoId",
      "title": "Chamado",
      "type": "uuid",
      "required": true,
      "description": "Chamado aberto selecionado ao qual o comentário pertence.",
      "constraints": []
    },
    {
      "fieldId": "atendenteId",
      "title": "Atendente que registrou",
      "type": "uuid",
      "required": true,
      "description": "Atendente autenticado identificado como responsável pelo registro do comentário.",
      "constraints": []
    },
    {
      "fieldId": "conteudo",
      "title": "Comentário",
      "type": "text",
      "required": true,
      "description": "Texto de acompanhamento escrito pelo atendente para o chamado.",
      "constraints": [
        {
          "constraintId": "conteudoMinLength",
          "kind": "minLength",
          "value": "1",
          "description": "O comentário deve conter texto.",
          "source": "journey"
        }
      ]
    }
  ],
  "lifecycleStates": [],
  "lifecyclePredicates": [],
  "useRules": [
    "comentariosPermitidosSomenteEmChamadosAbertos"
  ],
  "storage": {
    "target": "moduleDatabase",
    "scope": "module",
    "idField": "comentarioId",
    "notes": "Comentário é um evento operacional persistido para manter o histórico de acompanhamento do chamado e a identificação do atendente que o registrou."
  },
  "ontologyHash": "sha256:db66c55cfead4b983d579fbe9bf6b5467c976164c1965b365179468c886515bb",
  "approvedBy": "auto",
  "approvedAt": "2026-09-04T01:39:45.367Z"
} as const satisfies Ns4OntologyEntityArtifact;

export type ControleChamadosEntityComentarioType = typeof controleChamadosEntityComentario;

export default controleChamadosEntityComentario;
