/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/adapters/persistence/country.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "table",
  "artifactId": "country",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_3_domain/entities/country.defs.ts"
  ],
  "data": {
    "tableId": "country",
    "entityId": "Country",
    "physicalName": "onboarding_country",
    "primaryKey": [
      "id"
    ],
    "uniqueKeys": [
      [
        "isoCode"
      ]
    ],
    "indexes": [
      {
        "name": "onboarding_country_isoCode",
        "columns": [
          "isoCode"
        ],
        "unique": true
      },
      {
        "name": "onboarding_country_name",
        "columns": [
          "name"
        ],
        "unique": false
      },
      {
        "name": "onboarding_country_status",
        "columns": [
          "status"
        ],
        "unique": false
      }
    ]
  }
} as const;

export default definition;
