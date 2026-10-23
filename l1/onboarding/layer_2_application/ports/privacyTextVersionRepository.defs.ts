/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/ports/privacyTextVersionRepository.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryPort",
  "artifactId": "PrivacyTextVersionRepository",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_3_domain/entities/privacyTextVersion.defs.ts"
  ],
  "data": {
    "entityId": "PrivacyTextVersion",
    "interfaceName": "PrivacyTextVersionRepository",
    "methods": [
      {
        "name": "create",
        "params": [
          "PrivacyTextVersion"
        ],
        "returns": "PrivacyTextVersion"
      },
      {
        "name": "list",
        "params": [
          "PrivacyTextVersionFilter"
        ],
        "returns": "PrivacyTextVersion[]"
      },
      {
        "name": "transition",
        "params": [
          "PrivacyTextVersion",
          "transitionId"
        ],
        "returns": "PrivacyTextVersion"
      }
    ]
  }
} as const;

export default definition;
