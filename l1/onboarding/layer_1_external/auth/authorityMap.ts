/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/auth/authorityMap.ts" enhancement="_blank"/>
export const entries = [
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
] as const;

export function actorRefFor(grantId: string): string | null {
  const entry = entries.find(item => item.grantId === grantId);
  return entry ? entry.actorRef : null;
}
