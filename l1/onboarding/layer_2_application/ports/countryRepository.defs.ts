/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/ports/countryRepository.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryPort",
  "artifactId": "CountryRepository",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_3_domain/entities/country.defs.ts"
  ],
  "data": {
    "entityId": "Country",
    "interfaceName": "CountryRepository",
    "methods": [
      {
        "name": "create",
        "params": [
          "Country"
        ],
        "returns": "Country"
      },
      {
        "name": "list",
        "params": [
          "CountryFilter"
        ],
        "returns": "Country[]"
      },
      {
        "name": "update",
        "params": [
          "Country"
        ],
        "returns": "Country"
      },
      {
        "name": "transition",
        "params": [
          "Country",
          "transitionId"
        ],
        "returns": "Country"
      }
    ]
  }
} as const;

export default definition;
