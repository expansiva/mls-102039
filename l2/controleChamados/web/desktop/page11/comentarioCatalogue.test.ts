/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page11/comentarioCatalogue.test.ts" enhancement="_blank"/>

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
  "page": "comentarioCatalogue",
  "variant": "page11",
  "actor": "atendente",
  "cases": [
    {
      "id": "qryListComentario.ok",
      "routine": "controleChamados.comentarioCatalogue.qryListComentario",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "array",
        "minItems": 1
      }
    },
    {
      "id": "cmdCreateComentario.ok",
      "routine": "controleChamados.comentarioCatalogue.cmdCreateComentario",
      "params": {
        "chamadoId": "<seedRef>",
        "atendenteId": "<seedRef>",
        "conteudo": "<seedSpare>"
      },
      "paramFieldRefs": {
        "chamadoId": "Comentario.chamadoId",
        "atendenteId": "Comentario.atendenteId",
        "conteudo": "Comentario.conteudo"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdCreateComentario.conteudo.required",
      "routine": "controleChamados.comentarioCatalogue.cmdCreateComentario",
      "params": {
        "chamadoId": "<seedRef>",
        "atendenteId": "<seedRef>"
      },
      "paramFieldRefs": {
        "chamadoId": "Comentario.chamadoId",
        "atendenteId": "Comentario.atendenteId"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdUpdateComentario.ok",
      "routine": "controleChamados.comentarioCatalogue.cmdUpdateComentario",
      "params": {
        "comentarioId": "<seedRef>",
        "chamadoId": "<seedRef>",
        "atendenteId": "<seedRef>",
        "conteudo": "<seedValue>"
      },
      "paramFieldRefs": {
        "comentarioId": "Comentario.comentarioId",
        "chamadoId": "Comentario.chamadoId",
        "atendenteId": "Comentario.atendenteId",
        "conteudo": "Comentario.conteudo"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdUpdateComentario.conteudo.required",
      "routine": "controleChamados.comentarioCatalogue.cmdUpdateComentario",
      "params": {
        "comentarioId": "<seedRef>",
        "chamadoId": "<seedRef>",
        "atendenteId": "<seedRef>"
      },
      "paramFieldRefs": {
        "comentarioId": "Comentario.comentarioId",
        "chamadoId": "Comentario.chamadoId",
        "atendenteId": "Comentario.atendenteId"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "qryGetComentario.ok",
      "routine": "controleChamados.comentarioCatalogue.qryGetComentario",
      "params": {
        "comentarioId": "<seedRef>"
      },
      "paramFieldRefs": {
        "comentarioId": "Comentario.comentarioId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      }
    },
    {
      "id": "qryChamadoPicker.ok",
      "routine": "controleChamados.comentarioCatalogue.qryChamadoPicker",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "array",
        "minItems": 1
      }
    },
    {
      "id": "qryAtendentePicker.ok",
      "routine": "controleChamados.comentarioCatalogue.qryAtendentePicker",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "array",
        "minItems": 1
      }
    },
    {
      "id": "cmdDeleteComentario.ok",
      "routine": "controleChamados.comentarioCatalogue.cmdDeleteComentario",
      "params": {
        "comentarioId": "<seedRef>"
      },
      "paramFieldRefs": {
        "comentarioId": "Comentario.comentarioId"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdDeleteComentario.gone",
      "routine": "controleChamados.comentarioCatalogue.qryGetComentario",
      "params": {
        "comentarioId": "<seedRef>"
      },
      "paramFieldRefs": {
        "comentarioId": "Comentario.comentarioId"
      },
      "mutating": false,
      "expect": {
        "ok": false,
        "errorCode": "NOT_FOUND"
      }
    }
  ]
} as const;
