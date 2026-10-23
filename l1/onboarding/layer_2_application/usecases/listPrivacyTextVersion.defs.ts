/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/listPrivacyTextVersion.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "listPrivacyTextVersion",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_2_application/ports/privacyTextVersionRepository.defs.ts",
    "_102039_/l1/onboarding/layer_3_domain/entities/privacyTextVersion.defs.ts"
  ],
  "data": {
    "usecaseId": "listPrivacyTextVersion",
    "entityId": "PrivacyTextVersion",
    "operation": "list",
    "rulesApplied": [],
    "effects": []
  }
} as const;

export default definition;
