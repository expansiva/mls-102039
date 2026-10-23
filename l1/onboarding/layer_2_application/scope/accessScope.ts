/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/scope/accessScope.ts" enhancement="_blank"/>
export interface StructureGrant {
  grantId: string;
  actorRef: string;
  scopeMode: string;
  session: string;
  pending: string;
  disclosure: string;
  recordField: string;
  /** Per entity of an own grant, the column that holds the anchor id (one direct step); a longer chain is a join. */
  recordFields: Readonly<Record<string, string>>;
  entityRefs: readonly string[];
  /** An own grant over the anchor itself (the person's own record): resolved with no column. */
  selfAnchored: boolean;
}

export const grants: readonly StructureGrant[] = [
  {"grantId":"memberChooseCountry","actorRef":"organizationMember","scopeMode":"custom","session":"verified","pending":"","disclosure":"fieldsOnly","recordField":"","recordFields":{},"entityRefs":["Country"],"selfAnchored":false},
  {"grantId":"memberOwnAccess","actorRef":"organizationMember","scopeMode":"own","session":"verified","pending":"","disclosure":"fullRecord","recordField":"","recordFields":{},"entityRefs":["OrganizationMember"],"selfAnchored":true},
  {"grantId":"memberReadPrivacyText","actorRef":"organizationMember","scopeMode":"custom","session":"verified","pending":"","disclosure":"fieldsOnly","recordField":"","recordFields":{},"entityRefs":["PrivacyTextVersion"],"selfAnchored":false},
  {"grantId":"ownerMaintainCountries","actorRef":"companyOwner","scopeMode":"organization","session":"verified","pending":"","disclosure":"fullRecord","recordField":"","recordFields":{},"entityRefs":["Country"],"selfAnchored":false},
  {"grantId":"ownerOwnAccess","actorRef":"companyOwner","scopeMode":"own","session":"verified","pending":"","disclosure":"fullRecord","recordField":"","recordFields":{},"entityRefs":["OrganizationMember"],"selfAnchored":true},
  {"grantId":"ownerPrepareCompany","actorRef":"companyOwner","scopeMode":"organization","session":"verified","pending":"","disclosure":"fullRecord","recordField":"","recordFields":{},"entityRefs":["OrganizationCompany","CompanyContact"],"selfAnchored":false},
  {"grantId":"ownerPublishPrivacyText","actorRef":"companyOwner","scopeMode":"organization","session":"verified","pending":"","disclosure":"fullRecord","recordField":"","recordFields":{},"entityRefs":["PrivacyTextVersion"],"selfAnchored":false},
  {"grantId":"ownerReviewPeople","actorRef":"companyOwner","scopeMode":"organization","session":"verified","pending":"","disclosure":"fieldsOnly","recordField":"","recordFields":{},"entityRefs":["OrganizationMember"],"selfAnchored":false}
];

export function resolveGrant(grantId: string): StructureGrant | { code: string; detail: string } {
  const grant = grants.find(item => item.grantId === grantId);
  if (!grant) return { code: 'GRANT_ABSENT', detail: `Grant ${grantId} is not declared.` };
  if (grant.session !== 'verified') return { code: 'SESSION_UNVERIFIED', detail: `Grant ${grantId} session is not verified.` };
  if (!grant.scopeMode) return { code: 'SCOPE_UNBOUND', detail: `Grant ${grantId} has no scope mode.` };
  if (grant.scopeMode === 'own' && Object.keys(grant.recordFields).length === 0 && !grant.selfAnchored) return { code: 'ACCESS_ANCHOR', detail: `Grant ${grantId} has no resolved scope path.` };
  return grant;
}
