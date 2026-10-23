/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/adapters/http/controllers/privacy_text.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "privacy_text",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_1_external/auth/authorityMap.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/requests/privacy_text.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "privacy_text",
    "handlers": [
      {
        "route": "onboarding.privacy_text.createPrivacyVersion",
        "kind": "command",
        "grantIds": [
          "ownerPublishPrivacyText"
        ],
        "serviceFunction": "onboarding.privacy_text.createPrivacyVersion",
        "contractPath": "l2/onboarding/web/contracts/privacy_text.defs.ts",
        "contractInterface": "Privacy_textContracts"
      },
      {
        "route": "onboarding.privacy_text.getPrivacyTextPage",
        "kind": "query",
        "grantIds": [
          "ownerPublishPrivacyText"
        ],
        "serviceFunction": "onboarding.privacy_text.getPrivacyTextPage",
        "contractPath": "l2/onboarding/web/contracts/privacy_text.defs.ts",
        "contractInterface": "Privacy_textContracts"
      },
      {
        "route": "onboarding.privacy_text.publishPrivacyVersion",
        "kind": "command",
        "grantIds": [
          "ownerPublishPrivacyText"
        ],
        "serviceFunction": "onboarding.privacy_text.publishPrivacyVersion",
        "contractPath": "l2/onboarding/web/contracts/privacy_text.defs.ts",
        "contractInterface": "Privacy_textContracts"
      }
    ]
  }
} as const;

export default definition;
