/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/adapters/persistence/countryRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryAdapter",
  "artifactId": "CountryRepository",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_1_external/adapters/persistence/country.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/ports/countryRepository.defs.ts"
  ],
  "data": {
    "entityId": "Country",
    "portId": "CountryRepository",
    "tableId": "country",
    "columns": [
      {
        "field": "id",
        "column": "id"
      },
      {
        "field": "version",
        "column": "json:version"
      },
      {
        "field": "isoCode",
        "column": "isoCode"
      },
      {
        "field": "name",
        "column": "name"
      },
      {
        "field": "status",
        "column": "status"
      },
      {
        "field": "details.displayName",
        "column": "json:details.displayName"
      }
    ]
  }
} as const;

export default definition;
