/// <mls fileReference="_102039_/l4/controleChamados/siteMap.defs.ts" enhancement="_blank"/>

export const controleChamadosSiteMap = {
  "moduleName": "controleChamados",
  "note": "Site map (permanent page index) — workspaces, landings and advisory edges. Detail (sections/organisms/bffCalls) lives per-workspace under workspaces/.",
  "workspaces": [
    {
      "workspaceId": "atendenteCatalogue",
      "title": "Atendente",
      "actors": [
        "atendente"
      ],
      "kind": "operation",
      "entity": "Atendente",
      "operationIds": [
        "createAtendente",
        "getAtendente",
        "inactivateAtendente",
        "listAtendente",
        "reactivateAtendente",
        "updateAtendente"
      ],
      "purpose": "Cadastro de Atendente."
    },
    {
      "workspaceId": "chamadoCatalogue",
      "title": "Chamado",
      "actors": [
        "atendente"
      ],
      "kind": "operation",
      "entity": "Chamado",
      "operationIds": [
        "closeChamado",
        "createChamado",
        "deleteChamado",
        "getChamado",
        "listChamado",
        "locateChamado",
        "updateChamado"
      ],
      "purpose": "Cadastro de Chamado."
    },
    {
      "workspaceId": "chamadoHub",
      "title": "Chamado",
      "actors": [
        "atendente"
      ],
      "kind": "landing",
      "entity": "Chamado",
      "operationIds": [
        "listChamado",
        "listComentario"
      ],
      "purpose": "Painel de Chamado."
    },
    {
      "workspaceId": "comentarioCatalogue",
      "title": "Comentário",
      "actors": [
        "atendente"
      ],
      "kind": "operation",
      "entity": "Comentario",
      "operationIds": [
        "createComentario",
        "deleteComentario",
        "getComentario",
        "listAtendente",
        "listChamado",
        "listComentario",
        "updateComentario"
      ],
      "purpose": "Cadastro de Comentário."
    },
    {
      "workspaceId": "registrarComentarioChamado",
      "title": "Registrar comentário em chamado aberto",
      "actors": [
        "atendente"
      ],
      "kind": "operation",
      "entity": "Comentario",
      "operationIds": [
        "listAtendente",
        "locateChamado",
        "registerComentario"
      ],
      "purpose": "Manter o acompanhamento de um chamado aberto por meio de um comentário vinculado."
    }
  ],
  "landings": [
    {
      "actorId": "atendente",
      "workspaceId": "chamadoHub",
      "reason": "Painel de Chamado."
    }
  ],
  "navigationEdges": [
    {
      "from": "chamadoHub",
      "to": "registrarComentarioChamado",
      "operationId": "",
      "description": "Registrar comentário em chamado aberto",
      "prominence": "primary",
      "order": 0
    },
    {
      "from": "chamadoHub",
      "to": "comentarioCatalogue",
      "operationId": "",
      "description": "Comentário"
    }
  ],
  "workspaceIds": [
    "atendenteCatalogue",
    "chamadoCatalogue",
    "chamadoHub",
    "comentarioCatalogue",
    "registrarComentarioChamado"
  ]
} as const;

export default controleChamadosSiteMap;
