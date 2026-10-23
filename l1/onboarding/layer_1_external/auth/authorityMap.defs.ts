/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/auth/authorityMap.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "authorityMap",
  "artifactId": "authorityMap",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_2_application/scope/accessScope.defs.ts"
  ],
  "data": {
    "mapId": "authorityMap",
    "entries": [
      {
        "grantId": "memberChooseCountry",
        "actorRef": "organizationMember"
      },
      {
        "grantId": "memberOwnAccess",
        "actorRef": "organizationMember"
      },
      {
        "grantId": "memberReadPrivacyText",
        "actorRef": "organizationMember"
      },
      {
        "grantId": "ownerMaintainCountries",
        "actorRef": "companyOwner"
      },
      {
        "grantId": "ownerOwnAccess",
        "actorRef": "companyOwner"
      },
      {
        "grantId": "ownerPrepareCompany",
        "actorRef": "companyOwner"
      },
      {
        "grantId": "ownerPublishPrivacyText",
        "actorRef": "companyOwner"
      },
      {
        "grantId": "ownerReviewPeople",
        "actorRef": "companyOwner"
      }
    ]
  }
} as const;

export default definition;
