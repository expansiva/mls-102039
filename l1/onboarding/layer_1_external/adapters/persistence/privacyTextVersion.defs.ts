/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/adapters/persistence/privacyTextVersion.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "table",
  "artifactId": "privacyTextVersion",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_3_domain/entities/privacyTextVersion.defs.ts"
  ],
  "data": {
    "tableId": "privacyTextVersion",
    "entityId": "PrivacyTextVersion",
    "physicalName": "onboarding_privacytextversion",
    "primaryKey": [
      "id"
    ],
    "uniqueKeys": [
      [
        "versionCode"
      ]
    ],
    "indexes": [
      {
        "name": "onboarding_privacytextversion_versionCode",
        "columns": [
          "versionCode"
        ],
        "unique": true
      },
      {
        "name": "onboarding_privacytextversion_status",
        "columns": [
          "status"
        ],
        "unique": false
      },
      {
        "name": "onboarding_privacytextversion_publishedAt",
        "columns": [
          "publishedAt"
        ],
        "unique": false
      }
    ]
  }
} as const;

export default definition;
