/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page11/chamadoCatalogue.test.ts" enhancement="_blank"/>

// GENERATED — declarative BFF test cases run server-side by the monitor Tests runner (wherever
// TESTS_ENABLED is on).
// Data, not a runnable test module: no node:test import, so scripts/run-tests.mjs never captures it.
// Params valued "<seedRef>" are ENTITY IDS this page itself reads: the runner resolves them at
// run time from the harvested output of this page's read queries (including the rows of any array in
// the envelope). "<seedValue>" is the value of that field on a seeded row; "<seedSpare>"
// is a leftover valid value for a create command (reusing a seeded unique value would collide).
// paramFieldRefs maps those params to the l4 fieldRef so the pool can match by ontology field, not by
// the input's wire name. Literals stay for free input with no entity counterpart (pagination, typed
// format, closed enum). expect.itemsKey names the collection the wire returns
// for a paginated query (the runner assumes "items" when it is absent). "actor" is this page's l4 actor:
// the run executes these cases as the seeded platform identity of that actor, so a route that reads the
// actor id from the session is runnable headless.
export const pageTests = {
  "moduleName": "controleChamados",
  "page": "chamadoCatalogue",
  "variant": "page11",
  "actor": "atendente",
  "cases": [
    {
      "id": "qryListChamado.ok",
      "routine": "controleChamados.chamadoCatalogue.qryListChamado",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "array",
        "minItems": 1
      }
    },
    {
      "id": "cmdCreateChamado.ok",
      "routine": "controleChamados.chamadoCatalogue.cmdCreateChamado",
      "params": {
        "titulo": "<seedSpare>",
        "descricao": "<seedSpare>"
      },
      "paramFieldRefs": {
        "titulo": "Chamado.titulo",
        "descricao": "Chamado.descricao"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdCreateChamado.titulo.required",
      "routine": "controleChamados.chamadoCatalogue.cmdCreateChamado",
      "params": {
        "descricao": "teste"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdCreateChamado.descricao.required",
      "routine": "controleChamados.chamadoCatalogue.cmdCreateChamado",
      "params": {
        "titulo": "teste"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdUpdateChamado.ok",
      "routine": "controleChamados.chamadoCatalogue.cmdUpdateChamado",
      "params": {
        "chamadoId": "<seedRef>",
        "titulo": "<seedValue>",
        "descricao": "<seedValue>"
      },
      "paramFieldRefs": {
        "chamadoId": "Chamado.chamadoId",
        "titulo": "Chamado.titulo",
        "descricao": "Chamado.descricao"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdUpdateChamado.titulo.required",
      "routine": "controleChamados.chamadoCatalogue.cmdUpdateChamado",
      "params": {
        "chamadoId": "<seedRef>",
        "descricao": "teste"
      },
      "paramFieldRefs": {
        "chamadoId": "Chamado.chamadoId"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdUpdateChamado.descricao.required",
      "routine": "controleChamados.chamadoCatalogue.cmdUpdateChamado",
      "params": {
        "chamadoId": "<seedRef>",
        "titulo": "teste"
      },
      "paramFieldRefs": {
        "chamadoId": "Chamado.chamadoId"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "qryGetChamado.ok",
      "routine": "controleChamados.chamadoCatalogue.qryGetChamado",
      "params": {
        "chamadoId": "<seedRef>"
      },
      "paramFieldRefs": {
        "chamadoId": "Chamado.chamadoId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      }
    },
    {
      "id": "qryLocateChamado.ok",
      "routine": "controleChamados.chamadoCatalogue.qryLocateChamado",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "array",
        "minItems": 1
      }
    },
    {
      "id": "cmdCloseChamado.ok",
      "routine": "controleChamados.chamadoCatalogue.cmdCloseChamado",
      "params": {
        "chamadoId": "<seedRef>",
        "status": "closed"
      },
      "paramFieldRefs": {
        "chamadoId": "Chamado.chamadoId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdCloseChamado.status.required",
      "routine": "controleChamados.chamadoCatalogue.cmdCloseChamado",
      "params": {
        "chamadoId": "<seedRef>"
      },
      "paramFieldRefs": {
        "chamadoId": "Chamado.chamadoId"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdDeleteChamado.ok",
      "routine": "controleChamados.chamadoCatalogue.cmdDeleteChamado",
      "params": {
        "chamadoId": "<seedRef>"
      },
      "paramFieldRefs": {
        "chamadoId": "Chamado.chamadoId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdDeleteChamado.gone",
      "routine": "controleChamados.chamadoCatalogue.qryGetChamado",
      "params": {
        "chamadoId": "<seedRef>"
      },
      "paramFieldRefs": {
        "chamadoId": "Chamado.chamadoId"
      },
      "mutating": false,
      "expect": {
        "ok": false,
        "errorCode": "NOT_FOUND"
      }
    }
  ]
} as const;
