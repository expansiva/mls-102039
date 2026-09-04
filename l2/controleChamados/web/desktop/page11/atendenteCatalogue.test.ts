/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page11/atendenteCatalogue.test.ts" enhancement="_blank"/>

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
  "page": "atendenteCatalogue",
  "variant": "page11",
  "actor": "atendente",
  "cases": [
    {
      "id": "qryListAtendente.ok",
      "routine": "controleChamados.atendenteCatalogue.qryListAtendente",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "array",
        "minItems": 1
      }
    },
    {
      "id": "cmdCreateAtendente.ok",
      "routine": "controleChamados.atendenteCatalogue.cmdCreateAtendente",
      "params": {
        "platformUserId": "<seedRef>"
      },
      "paramFieldRefs": {
        "platformUserId": "Atendente.platformUserId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdCreateAtendente.platformUserId.required",
      "routine": "controleChamados.atendenteCatalogue.cmdCreateAtendente",
      "params": {},
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdUpdateAtendente.ok",
      "routine": "controleChamados.atendenteCatalogue.cmdUpdateAtendente",
      "params": {
        "atendenteId": "<seedRef>",
        "platformUserId": "<seedRef>"
      },
      "paramFieldRefs": {
        "atendenteId": "Atendente.atendenteId",
        "platformUserId": "Atendente.platformUserId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdUpdateAtendente.platformUserId.required",
      "routine": "controleChamados.atendenteCatalogue.cmdUpdateAtendente",
      "params": {
        "atendenteId": "<seedRef>"
      },
      "paramFieldRefs": {
        "atendenteId": "Atendente.atendenteId"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdInactivateAtendente.ok",
      "routine": "controleChamados.atendenteCatalogue.cmdInactivateAtendente",
      "params": {
        "atendenteId": "<seedRef>"
      },
      "paramFieldRefs": {
        "atendenteId": "Atendente.atendenteId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdReactivateAtendente.ok",
      "routine": "controleChamados.atendenteCatalogue.cmdReactivateAtendente",
      "params": {
        "atendenteId": "<seedRef>"
      },
      "paramFieldRefs": {
        "atendenteId": "Atendente.atendenteId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "qryGetAtendente.ok",
      "routine": "controleChamados.atendenteCatalogue.qryGetAtendente",
      "params": {
        "atendenteId": "<seedRef>"
      },
      "paramFieldRefs": {
        "atendenteId": "Atendente.atendenteId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      }
    }
  ]
} as const;
