/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/adapters/http/controllers/my_access.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "my_access",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_1_external/auth/authorityMap.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/requests/my_access.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "my_access",
    "handlers": [
      {
        "route": "onboarding.my_access.checkCountryConsent",
        "kind": "query",
        "grantIds": [
          "memberReadPrivacyText",
          "ownerPublishPrivacyText"
        ],
        "serviceFunction": "onboarding.my_access.checkCountryConsent",
        "contractPath": "l2/onboarding/web/contracts/my_access.defs.ts",
        "contractInterface": "My_accessContracts"
      },
      {
        "route": "onboarding.my_access.getMyAccess",
        "kind": "query",
        "grantIds": [
          "memberOwnAccess",
          "ownerOwnAccess",
          "ownerReviewPeople",
          "memberChooseCountry",
          "ownerMaintainCountries",
          "memberReadPrivacyText",
          "ownerPublishPrivacyText"
        ],
        "serviceFunction": "onboarding.my_access.getMyAccess",
        "contractPath": "l2/onboarding/web/contracts/my_access.defs.ts",
        "contractInterface": "My_accessContracts"
      },
      {
        "route": "onboarding.my_access.saveMyAccess",
        "kind": "command",
        "grantIds": [
          "memberOwnAccess",
          "ownerOwnAccess",
          "ownerReviewPeople",
          "memberReadPrivacyText",
          "ownerPublishPrivacyText"
        ],
        "serviceFunction": "onboarding.my_access.saveMyAccess",
        "contractPath": "l2/onboarding/web/contracts/my_access.defs.ts",
        "contractInterface": "My_accessContracts"
      }
    ]
  }
} as const;

export default definition;
