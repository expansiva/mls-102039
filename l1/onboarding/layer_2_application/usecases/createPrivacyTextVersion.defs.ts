/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/createPrivacyTextVersion.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "createPrivacyTextVersion",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_2_application/ports/privacyTextVersionRepository.defs.ts",
    "_102039_/l1/onboarding/layer_3_domain/entities/privacyTextVersion.defs.ts",
    "_102039_/l4/onboarding/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "createPrivacyTextVersion",
    "entityId": "PrivacyTextVersion",
    "operation": "create",
    "rulesApplied": [
      "initialProvisionalPrivacyText",
      "privacyVersionCodeFromSequence"
    ],
    "effects": []
  }
} as const;

export default definition;
