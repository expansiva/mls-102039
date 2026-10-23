/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/adapters/http/controllers/company_setup.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "company_setup",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_1_external/auth/authorityMap.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/requests/company_setup.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "company_setup",
    "handlers": [
      {
        "route": "onboarding.company_setup.getCompanySetup",
        "kind": "query",
        "grantIds": [
          "ownerPrepareCompany",
          "ownerMaintainCountries"
        ],
        "serviceFunction": "onboarding.company_setup.getCompanySetup",
        "contractPath": "l2/onboarding/web/contracts/company_setup.defs.ts",
        "contractInterface": "Company_setupContracts"
      },
      {
        "route": "onboarding.company_setup.saveCompany",
        "kind": "command",
        "grantIds": [
          "ownerPrepareCompany"
        ],
        "serviceFunction": "onboarding.company_setup.saveCompany",
        "contractPath": "l2/onboarding/web/contracts/company_setup.defs.ts",
        "contractInterface": "Company_setupContracts"
      }
    ]
  }
} as const;

export default definition;
