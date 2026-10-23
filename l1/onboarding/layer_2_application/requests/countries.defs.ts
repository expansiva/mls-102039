/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/requests/countries.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "countries",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_2_application/usecases/createCountry.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/usecases/inactivateCountry.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/usecases/listCountry.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/usecases/reactivateCountry.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/usecases/updateCountry.defs.ts"
  ],
  "data": {
    "pageId": "countries",
    "requests": [
      {
        "route": "onboarding.countries.listCountries",
        "kind": "qry",
        "uses": [
          "listCountry"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "countries",
            "entity": "Country",
            "items": "items",
            "page": "countries.page",
            "pageSize": "countries.pageSize",
            "hasMore": "countries.hasMore",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "isoCode",
                "path": "isoCode"
              },
              {
                "field": "name",
                "path": "name"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "countries",
            "pages": "countries"
          },
          {
            "name": "pageSize",
            "target": "countries",
            "pages": "countries"
          }
        ],
        "rules": [
          "onlyOwnerMaintainsCountries"
        ],
        "doc": {
          "raw": "Purpose: Loads the first page of the whole module country list, active and inactive, when the countries page opens.\nInput: page: page number to load (starts at 1). pageSize: number of countries per page.\nProcessing: Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Reads every country regardless of status, ordered by English name. Computes details.displayName for each country by translating the ISO code into the caller’s language, falling back to the English name when no translation is known; it is never stored.\nOutput: A paged list { items, page, pageSize, hasMore } of countries, each with id, version, ISO code, English name, status and name in the user language.",
          "purpose": "Loads the first page of the whole module country list, active and inactive, when the countries page opens.",
          "input": "page: page number to load (starts at 1). pageSize: number of countries per page.",
          "processing": "Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Reads every country regardless of status, ordered by English name. Computes details.displayName for each country by translating the ISO code into the caller’s language, falling back to the English name when no translation is known; it is never stored.",
          "output": "A paged list { items, page, pageSize, hasMore } of countries, each with id, version, ISO code, English name, status and name in the user language."
        }
      },
      {
        "route": "onboarding.countries.searchCountries",
        "kind": "qry",
        "uses": [
          "listCountry"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "list",
            "path": "countries",
            "entity": "Country",
            "items": "items",
            "page": "countries.page",
            "pageSize": "countries.pageSize",
            "hasMore": "countries.hasMore",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "isoCode",
                "path": "isoCode"
              },
              {
                "field": "name",
                "path": "name"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          }
        ],
        "params": [
          {
            "name": "page",
            "target": "countries",
            "pages": "countries"
          },
          {
            "name": "pageSize",
            "target": "countries",
            "pages": "countries"
          },
          {
            "name": "search",
            "target": "countries",
            "optional": true
          },
          {
            "name": "status",
            "target": "countries",
            "field": "status",
            "optional": true
          }
        ],
        "rules": [
          "onlyOwnerMaintainsCountries"
        ],
        "doc": {
          "raw": "Purpose: Finds countries by ISO code or English name, optionally limited to one status, for the owner’s search.\nInput: search: text typed by the owner, matched against ISO code or English name (contains, case-insensitive); empty means all. status: optional filter active or inactive; absent means both. page, pageSize: the page requested.\nProcessing: Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Filters countries whose ISO code or English name contains the text and, when given, by status; orders by English name. Computes details.displayName from the ISO code in the caller’s language, falling back to the English name.\nOutput: A paged list { items, page, pageSize, hasMore } of matching countries with id, version, ISO code, English name, status and name in the user language.",
          "purpose": "Finds countries by ISO code or English name, optionally limited to one status, for the owner’s search.",
          "input": "search: text typed by the owner, matched against ISO code or English name (contains, case-insensitive); empty means all. status: optional filter active or inactive; absent means both. page, pageSize: the page requested.",
          "processing": "Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Filters countries whose ISO code or English name contains the text and, when given, by status; orders by English name. Computes details.displayName from the ISO code in the caller’s language, falling back to the English name.",
          "output": "A paged list { items, page, pageSize, hasMore } of matching countries with id, version, ISO code, English name, status and name in the user language."
        }
      },
      {
        "route": "onboarding.countries.addCountry",
        "kind": "cmd",
        "uses": [
          "createCountry"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "country",
            "entity": "Country",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "isoCode",
                "path": "isoCode"
              },
              {
                "field": "name",
                "path": "name"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "onlyOwnerMaintainsCountries",
          "countryIsoCodeFormat",
          "countryIsoCodeUnique"
        ],
        "doc": {
          "raw": "Purpose: Adds a new country to the module country list.\nInput: isoCode: two-letter ISO 3166-1 alpha-2 code. name: English name of the country.\nProcessing: Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Normalizes the code to upper case and refuses it unless it is exactly two letters, and refuses an empty English name (countryIsoCodeFormat). Refuses a code already used by another country (countryIsoCodeUnique). Creates the country as active. Computes details.displayName for the response.\nOutput: The created country, active, with id, version, ISO code, English name and name in the user language.",
          "purpose": "Adds a new country to the module country list.",
          "input": "isoCode: two-letter ISO 3166-1 alpha-2 code. name: English name of the country.",
          "processing": "Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Normalizes the code to upper case and refuses it unless it is exactly two letters, and refuses an empty English name (countryIsoCodeFormat). Refuses a code already used by another country (countryIsoCodeUnique). Creates the country as active. Computes details.displayName for the response.",
          "output": "The created country, active, with id, version, ISO code, English name and name in the user language."
        }
      },
      {
        "route": "onboarding.countries.saveCountryChanges",
        "kind": "cmd",
        "uses": [
          "updateCountry"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "country",
            "entity": "Country",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "isoCode",
                "path": "isoCode"
              },
              {
                "field": "name",
                "path": "name"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "onlyOwnerMaintainsCountries",
          "countryIsoCodeFormat",
          "countryIsoCodeUnique"
        ],
        "doc": {
          "raw": "Purpose: Corrects the ISO code or English name of an existing country.\nInput: id: the country being edited. version: the version the owner saw, for optimistic concurrency. isoCode: corrected two-letter code. name: corrected English name.\nProcessing: Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Refuses when the version no longer matches. Normalizes the code to upper case and refuses it unless it is two letters, and refuses an empty English name (countryIsoCodeFormat). Refuses a code used by another country (countryIsoCodeUnique). Status is not changed. Computes details.displayName for the response.\nOutput: The updated country in its new state with its new version, ISO code, English name, status and name in the user language.",
          "purpose": "Corrects the ISO code or English name of an existing country.",
          "input": "id: the country being edited. version: the version the owner saw, for optimistic concurrency. isoCode: corrected two-letter code. name: corrected English name.",
          "processing": "Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Refuses when the version no longer matches. Normalizes the code to upper case and refuses it unless it is two letters, and refuses an empty English name (countryIsoCodeFormat). Refuses a code used by another country (countryIsoCodeUnique). Status is not changed. Computes details.displayName for the response.",
          "output": "The updated country in its new state with its new version, ISO code, English name, status and name in the user language."
        }
      },
      {
        "route": "onboarding.countries.inactivateCountry",
        "kind": "cmd",
        "uses": [
          "inactivateCountry"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "country",
            "entity": "Country",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "isoCode",
                "path": "isoCode"
              },
              {
                "field": "name",
                "path": "name"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "onlyOwnerMaintainsCountries",
          "onlyActiveCountryOffered"
        ],
        "doc": {
          "raw": "Purpose: Inactivates a country so it is no longer offered for selection.\nInput: id: the country to inactivate. version: the version the owner saw, for optimistic concurrency.\nProcessing: Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Refuses when the version no longer matches or the country is not active. Applies the inactivateCountry transition; people and companies that already point at the country keep it, it is only no longer offered (onlyActiveCountryOffered). Computes details.displayName for the response.\nOutput: The country in its new inactive state with its new version and name in the user language.",
          "purpose": "Inactivates a country so it is no longer offered for selection.",
          "input": "id: the country to inactivate. version: the version the owner saw, for optimistic concurrency.",
          "processing": "Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Refuses when the version no longer matches or the country is not active. Applies the inactivateCountry transition; people and companies that already point at the country keep it, it is only no longer offered (onlyActiveCountryOffered). Computes details.displayName for the response.",
          "output": "The country in its new inactive state with its new version and name in the user language."
        }
      },
      {
        "route": "onboarding.countries.reactivateCountry",
        "kind": "cmd",
        "uses": [
          "reactivateCountry"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "country",
            "entity": "Country",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "isoCode",
                "path": "isoCode"
              },
              {
                "field": "name",
                "path": "name"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "onlyOwnerMaintainsCountries"
        ],
        "doc": {
          "raw": "Purpose: Reactivates an inactive country so it is offered for selection again.\nInput: id: the country to reactivate. version: the version the owner saw, for optimistic concurrency.\nProcessing: Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Refuses when the version no longer matches or the country is not inactive. Applies the reactivateCountry transition. Computes details.displayName for the response.\nOutput: The country in its new active state with its new version and name in the user language.",
          "purpose": "Reactivates an inactive country so it is offered for selection again.",
          "input": "id: the country to reactivate. version: the version the owner saw, for optimistic concurrency.",
          "processing": "Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Refuses when the version no longer matches or the country is not inactive. Applies the reactivateCountry transition. Computes details.displayName for the response.",
          "output": "The country in its new active state with its new version and name in the user language."
        }
      }
    ]
  }
} as const;

export default definition;
