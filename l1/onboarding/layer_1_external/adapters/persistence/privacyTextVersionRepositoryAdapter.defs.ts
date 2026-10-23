/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/adapters/persistence/privacyTextVersionRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryAdapter",
  "artifactId": "PrivacyTextVersionRepository",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_1_external/adapters/persistence/privacyTextVersion.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/ports/privacyTextVersionRepository.defs.ts"
  ],
  "data": {
    "entityId": "PrivacyTextVersion",
    "portId": "PrivacyTextVersionRepository",
    "tableId": "privacyTextVersion",
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
        "field": "versionCode",
        "column": "versionCode"
      },
      {
        "field": "status",
        "column": "status"
      },
      {
        "field": "publishedAt",
        "column": "publishedAt"
      },
      {
        "field": "details.text",
        "column": "json:details.text"
      },
      {
        "field": "details.isProvisional",
        "column": "json:details.isProvisional"
      },
      {
        "field": "details.changeNote",
        "column": "json:details.changeNote"
      },
      {
        "field": "details.isCurrent",
        "column": "json:details.isCurrent"
      }
    ]
  }
} as const;

export default definition;
