/// <mls fileReference="_102039_/l1/controleChamados/layer_1_external/adapters/persistence/seeds.ts" enhancement="_blank"/>

// Deterministic initial data for controleChamados. Scenario planned by agentCbSeeds; rows and ids compiled locally from seeds.defs.ts.
// TableSeedRows exports are discovered by shape and merged by the persistence registry.

/* <agentCbSeedsPlan>
{
  "version": 1,
  "moduleName": "controleChamados",
  "language": "en",
  "plan": {
    "summary": "Three coherent comments linked to the three previously seeded open support tickets and assigned attendants.",
    "localTables": [
      {
        "tableId": "Chamado",
        "rows": [
          {
            "key": "chamado-1",
            "columns": [
              {
                "name": "status",
                "value": "open"
              }
            ],
            "details": [
              {
                "name": "titulo",
                "value": "Unable to access customer portal"
              },
              {
                "name": "descricao",
                "value": "The customer receives an authentication error after entering valid credentials and cannot reach the portal dashboard."
              }
            ],
            "children": []
          },
          {
            "key": "chamado-2",
            "columns": [
              {
                "name": "status",
                "value": "open"
              }
            ],
            "details": [
              {
                "name": "titulo",
                "value": "Invoice download fails"
              },
              {
                "name": "descricao",
                "value": "The invoice page loads, but selecting the PDF download action returns an empty response."
              }
            ],
            "children": []
          },
          {
            "key": "chamado-3",
            "columns": [
              {
                "name": "status",
                "value": "open"
              }
            ],
            "details": [
              {
                "name": "titulo",
                "value": "Request to update contact email"
              },
              {
                "name": "descricao",
                "value": "The customer asked support to replace the primary contact email address on the account."
              }
            ],
            "children": []
          }
        ]
      },
      {
        "tableId": "Comentario",
        "rows": [
          {
            "key": "comentario-1",
            "columns": [
              {
                "name": "chamado_id",
                "value": {
                  "ref": "local:Chamado.chamado-1"
                }
              },
              {
                "name": "atendente_id",
                "value": {
                  "ref": "mdm:Atendente.atendente-1"
                }
              }
            ],
            "details": [
              {
                "name": "conteudo",
                "value": "We are investigating the reported access issue and will provide an update shortly."
              }
            ],
            "children": []
          },
          {
            "key": "comentario-2",
            "columns": [
              {
                "name": "chamado_id",
                "value": {
                  "ref": "local:Chamado.chamado-2"
                }
              },
              {
                "name": "atendente_id",
                "value": {
                  "ref": "mdm:Atendente.atendente-2"
                }
              }
            ],
            "details": [
              {
                "name": "conteudo",
                "value": "The support team requested additional diagnostic information from the requester."
              }
            ],
            "children": []
          },
          {
            "key": "comentario-3",
            "columns": [
              {
                "name": "chamado_id",
                "value": {
                  "ref": "local:Chamado.chamado-3"
                }
              },
              {
                "name": "atendente_id",
                "value": {
                  "ref": "mdm:Atendente.atendente-3"
                }
              }
            ],
            "details": [
              {
                "name": "conteudo",
                "value": "The ticket remains in progress while the proposed configuration change is being validated."
              }
            ],
            "children": []
          }
        ]
      }
    ],
    "mdmEntities": [
      {
        "entityId": "Atendente",
        "rows": [
          {
            "key": "atendente-1",
            "fields": [
              {
                "name": "name",
                "value": "Atendente 1"
              },
              {
                "name": "atendenteId",
                "value": "atendente-1"
              },
              {
                "name": "platformUserId",
                "value": {
                  "ref": "actor:atendente.u1"
                }
              }
            ],
            "relationships": []
          },
          {
            "key": "atendente-2",
            "fields": [
              {
                "name": "name",
                "value": "Atendente 2"
              },
              {
                "name": "atendenteId",
                "value": "atendente-2"
              },
              {
                "name": "platformUserId",
                "value": {
                  "ref": "actor:atendente.u2"
                }
              }
            ],
            "relationships": []
          },
          {
            "key": "atendente-3",
            "fields": [
              {
                "name": "name",
                "value": "Atendente 3"
              },
              {
                "name": "atendenteId",
                "value": "atendente-3"
              },
              {
                "name": "platformUserId",
                "value": {
                  "ref": "actor:atendente.u3"
                }
              }
            ],
            "relationships": []
          }
        ]
      }
    ]
  }
}
</agentCbSeedsPlan> */

// <agentCbSeedAssetUrls>
const seedAssetUrls: Record<string, string> = {};
const seedAssetWarnings: string[] = [];
// </agentCbSeedAssetUrls>

function seedAssetUrl(assetId: string): string | null { return seedAssetUrls[assetId] ?? null; }

function seedSparesPassing(check: (value: string) => boolean, planned: string, used: readonly string[], count = 3, attempts = 100): string[] {
  const spares: string[] = [];
  const taken = new Set(used);
  const match = planned.match(/^(.*?)(\d+)$/u);
  const prefix = match ? match[1] : planned;
  const width = match ? match[2].length : 0;
  const start = match ? Number.parseInt(match[2], 10) : 0;
  if (match && !Number.isFinite(start)) return spares;
  const budget = Math.max(attempts, count * 100);
  for (let i = 1; i <= budget && spares.length < count; i += 1) {
    const candidate = match ? prefix + String(start + i).padStart(width, '0') : planned + String(i);
    if (taken.has(candidate) || !check(candidate)) continue;
    taken.add(candidate);
    spares.push(candidate);
  }
  return spares;
}

import type { TableSeedRows } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';
import type { Chamado } from '/_102039_/l1/controleChamados/layer_3_domain/entities/chamado.js';
import type { Comentario } from '/_102039_/l1/controleChamados/layer_3_domain/entities/comentario.js';

const chamado1: Chamado = {
  "chamadoId": "bedd04d6-bfdd-4669-8cdd-01b0bddd0343",
  "titulo": "Unable to access customer portal",
  "descricao": "The customer receives an authentication error after entering valid credentials and cannot reach the portal dashboard.",
  "status": "open"
};

const chamado2: Chamado = {
  "chamadoId": "1bb92a07-1ab9-4874-8db9-2d2d1cb92b9a",
  "titulo": "Invoice download fails",
  "descricao": "The invoice page loads, but selecting the PDF download action returns an empty response.",
  "status": "open"
};

const chamado3: Chamado = {
  "chamadoId": "a5174318-a617-44ab-8717-463ea81747d1",
  "titulo": "Request to update contact email",
  "descricao": "The customer asked support to replace the primary contact email address on the account.",
  "status": "open"
};

const chamadoRows: Chamado[] = [chamado1, chamado2, chamado3];

const comentario1: Comentario = {
  "comentarioId": "fd147c20-fe14-4db3-8f14-7f46001480d9",
  "chamadoId": "bedd04d6-bfdd-4669-8cdd-01b0bddd0343",
  "atendenteId": "78eb6489-77eb-42f6-86eb-616375eb5fd0",
  "conteudo": "We are investigating the reported access issue and will provide an update shortly."
};

const comentario2: Comentario = {
  "comentarioId": "9d672345-9c67-41b2-8b67-201f9a671e8c",
  "chamadoId": "1bb92a07-1ab9-4874-8db9-2d2d1cb92b9a",
  "atendenteId": "f782cab4-f882-4c47-8982-cddafa82cf6d",
  "conteudo": "The support team requested additional diagnostic information from the requester."
};

const comentario3: Comentario = {
  "comentarioId": "b6d9a6be-b7d9-4851-84d9-a398b5d9a52b",
  "chamadoId": "a5174318-a617-44ab-8717-463ea81747d1",
  "atendenteId": "4f391153-4e39-4fc0-8139-1479503912e6",
  "conteudo": "The ticket remains in progress while the proposed configuration change is being validated."
};

const comentarioRows: Comentario[] = [comentario1, comentario2, comentario3];

export const seedIds = {
  chamado1: chamado1.chamadoId,
  chamado2: chamado2.chamadoId,
  chamado3: chamado3.chamadoId,
  comentario1: comentario1.comentarioId,
  comentario2: comentario2.comentarioId,
  comentario3: comentario3.comentarioId,
  atendente1: "78eb6489-77eb-42f6-86eb-616375eb5fd0",
  atendente2: "f782cab4-f882-4c47-8982-cddafa82cf6d",
  atendente3: "4f391153-4e39-4fc0-8139-1479503912e6",
} as const;

export const seedSpares = {
  Chamado: {
    titulo: seedSparesPassing((_value: string) => true, "Unable to access customer portal", [chamado1.titulo, chamado2.titulo, chamado3.titulo], 3),
  },
} as const;

export const chamadoSeeds: TableSeedRows = {
  "seedFor": "controleChamadosChamado",
  "rows": [
    {
      "chamado_id": "bedd04d6-bfdd-4669-8cdd-01b0bddd0343",
      "status": "open",
      "details": {
        "titulo": "Unable to access customer portal",
        "descricao": "The customer receives an authentication error after entering valid credentials and cannot reach the portal dashboard."
      }
    },
    {
      "chamado_id": "1bb92a07-1ab9-4874-8db9-2d2d1cb92b9a",
      "status": "open",
      "details": {
        "titulo": "Invoice download fails",
        "descricao": "The invoice page loads, but selecting the PDF download action returns an empty response."
      }
    },
    {
      "chamado_id": "a5174318-a617-44ab-8717-463ea81747d1",
      "status": "open",
      "details": {
        "titulo": "Request to update contact email",
        "descricao": "The customer asked support to replace the primary contact email address on the account."
      }
    }
  ]
};

export const comentarioSeeds: TableSeedRows = {
  "seedFor": "controleChamadosComentario",
  "rows": [
    {
      "comentario_id": "fd147c20-fe14-4db3-8f14-7f46001480d9",
      "chamado_id": "bedd04d6-bfdd-4669-8cdd-01b0bddd0343",
      "atendente_id": "78eb6489-77eb-42f6-86eb-616375eb5fd0",
      "details": {
        "conteudo": "We are investigating the reported access issue and will provide an update shortly."
      }
    },
    {
      "comentario_id": "9d672345-9c67-41b2-8b67-201f9a671e8c",
      "chamado_id": "1bb92a07-1ab9-4874-8db9-2d2d1cb92b9a",
      "atendente_id": "f782cab4-f882-4c47-8982-cddafa82cf6d",
      "details": {
        "conteudo": "The support team requested additional diagnostic information from the requester."
      }
    },
    {
      "comentario_id": "b6d9a6be-b7d9-4851-84d9-a398b5d9a52b",
      "chamado_id": "a5174318-a617-44ab-8717-463ea81747d1",
      "atendente_id": "4f391153-4e39-4fc0-8139-1479503912e6",
      "details": {
        "conteudo": "The ticket remains in progress while the proposed configuration change is being validated."
      }
    }
  ]
};

export const mdmEntityIndexSeeds: TableSeedRows = {
  "seedFor": "mdmEntityIndex",
  "rows": [
    {
      "mdmId": "78eb6489-77eb-42f6-86eb-616375eb5fd0",
      "subtype": "Product",
      "name": "Atendente 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Atendente",
        "controleChamados",
        "Atendente"
      ],
      "searchVector": "atendente 1 atendente controlechamados",
      "mergedInto": null,
      "dynamoPk": "78eb6489-77eb-42f6-86eb-616375eb5fd0"
    },
    {
      "mdmId": "f782cab4-f882-4c47-8982-cddafa82cf6d",
      "subtype": "Product",
      "name": "Atendente 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Atendente",
        "controleChamados",
        "Atendente"
      ],
      "searchVector": "atendente 2 atendente controlechamados",
      "mergedInto": null,
      "dynamoPk": "f782cab4-f882-4c47-8982-cddafa82cf6d"
    },
    {
      "mdmId": "4f391153-4e39-4fc0-8139-1479503912e6",
      "subtype": "Product",
      "name": "Atendente 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Atendente",
        "controleChamados",
        "Atendente"
      ],
      "searchVector": "atendente 3 atendente controlechamados",
      "mergedInto": null,
      "dynamoPk": "4f391153-4e39-4fc0-8139-1479503912e6"
    },
    {
      "mdmId": "aadc458a-abdc-471d-88dc-4264a9dc43f7",
      "subtype": "Person",
      "name": "Atendente 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Person",
        "controleChamados",
        "actor",
        "atendente"
      ],
      "searchVector": "atendente 1 atendente controlechamados",
      "mergedInto": null,
      "dynamoPk": "aadc458a-abdc-471d-88dc-4264a9dc43f7",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "e7b8385b-e6b8-46c8-89b8-3b81e8b839ee",
      "subtype": "Person",
      "name": "Atendente 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Person",
        "controleChamados",
        "actor",
        "atendente"
      ],
      "searchVector": "atendente 2 atendente controlechamados",
      "mergedInto": null,
      "dynamoPk": "e7b8385b-e6b8-46c8-89b8-3b81e8b839ee",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "713ef3dc-723e-456f-833e-f702743ef895",
      "subtype": "Person",
      "name": "Atendente 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "controleChamados.Person",
        "controleChamados",
        "actor",
        "atendente"
      ],
      "searchVector": "atendente 3 atendente controlechamados",
      "mergedInto": null,
      "dynamoPk": "713ef3dc-723e-456f-833e-f702743ef895",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    }
  ]
};

export const mdmDocumentSeeds: TableSeedRows = {
  "seedFor": "mdmDocumentCache",
  "rows": [
    {
      "mdmId": "78eb6489-77eb-42f6-86eb-616375eb5fd0",
      "version": 1,
      "details": {
        "mdmId": "78eb6489-77eb-42f6-86eb-616375eb5fd0",
        "subtype": "Product",
        "name": "Atendente 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Atendente",
          "controleChamados",
          "Atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "controleChamados": {
          "name": "Atendente 1",
          "atendenteId": "78eb6489-77eb-42f6-86eb-616375eb5fd0",
          "platformUserId": "aadc458a-abdc-471d-88dc-4264a9dc43f7"
        }
      }
    },
    {
      "mdmId": "f782cab4-f882-4c47-8982-cddafa82cf6d",
      "version": 1,
      "details": {
        "mdmId": "f782cab4-f882-4c47-8982-cddafa82cf6d",
        "subtype": "Product",
        "name": "Atendente 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Atendente",
          "controleChamados",
          "Atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "controleChamados": {
          "name": "Atendente 2",
          "atendenteId": "f782cab4-f882-4c47-8982-cddafa82cf6d",
          "platformUserId": "e7b8385b-e6b8-46c8-89b8-3b81e8b839ee"
        }
      }
    },
    {
      "mdmId": "4f391153-4e39-4fc0-8139-1479503912e6",
      "version": 1,
      "details": {
        "mdmId": "4f391153-4e39-4fc0-8139-1479503912e6",
        "subtype": "Product",
        "name": "Atendente 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Atendente",
          "controleChamados",
          "Atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "controleChamados": {
          "name": "Atendente 3",
          "atendenteId": "4f391153-4e39-4fc0-8139-1479503912e6",
          "platformUserId": "713ef3dc-723e-456f-833e-f702743ef895"
        }
      }
    },
    {
      "mdmId": "aadc458a-abdc-471d-88dc-4264a9dc43f7",
      "version": 1,
      "details": {
        "mdmId": "aadc458a-abdc-471d-88dc-4264a9dc43f7",
        "subtype": "Person",
        "name": "Atendente 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Person",
          "controleChamados",
          "actor",
          "atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "atendente"
      }
    },
    {
      "mdmId": "e7b8385b-e6b8-46c8-89b8-3b81e8b839ee",
      "version": 1,
      "details": {
        "mdmId": "e7b8385b-e6b8-46c8-89b8-3b81e8b839ee",
        "subtype": "Person",
        "name": "Atendente 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Person",
          "controleChamados",
          "actor",
          "atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "atendente"
      }
    },
    {
      "mdmId": "713ef3dc-723e-456f-833e-f702743ef895",
      "version": 1,
      "details": {
        "mdmId": "713ef3dc-723e-456f-833e-f702743ef895",
        "subtype": "Person",
        "name": "Atendente 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "controleChamados.Person",
          "controleChamados",
          "actor",
          "atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "atendente"
      }
    }
  ]
};
