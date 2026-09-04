/// <mls fileReference="_102039_/l4/controleChamados/ontology/index.defs.ts" enhancement="_blank"/>

import type { Ns4OntologyIndexArtifact } from '/_102020_/l2/agentNewSolution/types.js';

export const controleChamadosOntologyIndex = {
  "schemaVersion": "2026-08-11-ns4-ontology-v6",
  "moduleName": "controleChamados",
  "userLanguage": "pt-BR",
  "solutionMode": "new",
  "title": "Ontologia de negócios do Controle de Chamados",
  "businessDomain": "Registro, acompanhamento, comentários e fechamento de chamados",
  "entities": [
    {
      "entityId": "Chamado",
      "title": "Chamado",
      "kind": "core",
      "storage": {
        "target": "moduleDatabase",
        "scope": "module",
        "idField": "chamadoId"
      },
      "definitionRef": "l4/controleChamados/ontology/Chamado.defs.ts"
    },
    {
      "entityId": "Comentario",
      "title": "Comentário",
      "kind": "core",
      "storage": {
        "target": "moduleDatabase",
        "scope": "module",
        "idField": "comentarioId"
      },
      "definitionRef": "l4/controleChamados/ontology/Comentario.defs.ts"
    },
    {
      "entityId": "Atendente",
      "title": "Atendente",
      "kind": "mdm",
      "storage": {
        "target": "mdm",
        "scope": "organization",
        "idField": "atendenteId",
        "mdmType": "controleChamados.Atendente"
      },
      "definitionRef": "l4/controleChamados/ontology/Atendente.defs.ts"
    }
  ],
  "relationships": [
    {
      "relationshipId": "comentarioSobreChamado",
      "fromEntity": "Comentario",
      "toEntity": "Chamado",
      "type": "manyToOne",
      "required": true,
      "description": "Cada comentário pertence a um único chamado previamente selecionado no acompanhamento.",
      "persistence": {
        "mode": "moduleReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Comentario",
        "from": {
          "entityId": "Comentario",
          "fieldIds": [
            "chamadoId"
          ]
        },
        "to": {
          "entityId": "Chamado",
          "fieldIds": [
            "chamadoId"
          ]
        },
        "description": "Comentario.chamadoId referencia o identificador do Chamado ao qual o comentário pertence."
      }
    },
    {
      "relationshipId": "comentarioRegistradoPorAtendente",
      "fromEntity": "Comentario",
      "toEntity": "Atendente",
      "type": "manyToOne",
      "required": true,
      "description": "Cada comentário identifica o atendente autenticado que o registrou.",
      "persistence": {
        "mode": "crossStoreReference"
      },
      "realization": {
        "kind": "fieldReference",
        "ownerEntity": "Comentario",
        "from": {
          "entityId": "Comentario",
          "fieldIds": [
            "atendenteId"
          ]
        },
        "to": {
          "entityId": "Atendente",
          "fieldIds": [
            "atendenteId"
          ]
        },
        "description": "Comentario.atendenteId referencia o identificador MDM do Atendente que registrou o comentário."
      }
    }
  ],
  "ontologyHash": "sha256:db66c55cfead4b983d579fbe9bf6b5467c976164c1965b365179468c886515bb",
  "approvedBy": "auto",
  "approvedAt": "2026-09-04T01:39:45.367Z",
  "realization": {
    "status": "pending",
    "compiledFromOntologyHash": "sha256:db66c55cfead4b983d579fbe9bf6b5467c976164c1965b365179468c886515bb"
  }
} as const satisfies Ns4OntologyIndexArtifact;

export type ControleChamadosOntologyIndexType = typeof controleChamadosOntologyIndex;

export default controleChamadosOntologyIndex;
