/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/adapters/http/controllers/organization_people.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "httpController",
  "artifactId": "organization_people",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_1_external/auth/authorityMap.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/requests/organization_people.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "pageId": "organization_people",
    "handlers": [
      {
        "route": "onboarding.organization_people.qryOrganizationPeopleOverview",
        "kind": "query",
        "grantIds": [
          "ownerOwnAccess",
          "ownerReviewPeople"
        ],
        "serviceFunction": "onboarding.organization_people.qryOrganizationPeopleOverview",
        "contractPath": "l2/onboarding/web/contracts/organization_people.defs.ts",
        "contractInterface": "Organization_peopleContracts"
      },
      {
        "route": "onboarding.organization_people.qryOrganizationPerson",
        "kind": "query",
        "grantIds": [
          "ownerOwnAccess",
          "ownerReviewPeople"
        ],
        "serviceFunction": "onboarding.organization_people.qryOrganizationPerson",
        "contractPath": "l2/onboarding/web/contracts/organization_people.defs.ts",
        "contractInterface": "Organization_peopleContracts"
      },
      {
        "route": "onboarding.organization_people.qrySearchOrganizationPeople",
        "kind": "query",
        "grantIds": [
          "ownerOwnAccess",
          "ownerReviewPeople"
        ],
        "serviceFunction": "onboarding.organization_people.qrySearchOrganizationPeople",
        "contractPath": "l2/onboarding/web/contracts/organization_people.defs.ts",
        "contractInterface": "Organization_peopleContracts"
      }
    ]
  }
} as const;

export default definition;
