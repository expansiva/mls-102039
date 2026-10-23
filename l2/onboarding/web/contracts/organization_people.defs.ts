/// <mls fileReference="_102039_/l2/onboarding/web/contracts/organization_people.defs.ts" enhancement="_blank"/>

/** Counts of the organization people by access situation. */
export interface AccessHighlights {
  readonly completeCount: number;
  readonly pendingCount: number;
  readonly consentValidCount: number;
  readonly consentInvalidCount: number;
}

/** An organization person with status, country, access completion and what is still missing. */
export interface PersonRow {
  id: string;
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      countryCode?: string;
    };
    onboarding: {
      readonly loginEmail: string;
      readonly accessComplete: boolean;
      readonly missingItems: string;
    };
  };
  country: {
    details: {
      readonly displayName?: string;
    };
  };
}

/** A published privacy text version with its code, publication moment and whether it is current. */
export interface PrivacyVersionRef {
  readonly versionCode: string;
  readonly publishedAt: string;
  details: {
    readonly isCurrent: boolean;
  };
}

/** One organization person with login e-mail, country, consent situation, missing items with who resolves each, and the current privacy text version. */
export interface PersonPendingDetail {
  id: string;
  details: {
    identification: {
      name: string;
      readonly status: 'Active' | 'Inactive' | 'Merged' | 'Blocked';
      countryCode?: string;
      readonly updatedAt: string;
    };
    onboarding: {
      readonly loginEmail: string;
      readonly consentValid: boolean;
      readonly missingItems: string;
      readonly accessComplete: boolean;
    };
  };
  country: {
    details: {
      readonly displayName?: string;
    };
  };
  currentPrivacyVersion?: PrivacyVersionRef;
}

export interface Organization_peopleContracts {
  /**
   * Purpose: Opens the organization people page: access indicators and the first page of organization people.
   * Input: page and pageSize: the page of the people list to return (normally the first).
   * Processing: Lists the organization users of the caller’s organization from the platform user list, ordered by name. Country names are resolved in one batch from the country codes (Country.details.displayName in the user language, English name as fallback; an unknown country stays empty, never defaulted). accessComplete, consentValid and missingItems are computed per person, never stored: accessCompleteByPlatformRule (name, country and, when required, a valid consent), reacceptOnNewPrivacyVersion with currentVersionIsLatestPublished and newCurrentVersionRequiresReacceptance (a consent for an earlier version is not valid). The indicators count, over the whole organization, people with complete and pending access and with valid and invalid consent. loginEmail is read from the platform login (loginEmailReadOnly). Being listed proves no invitation nor authority (listingProvesNoInvitation).
   * Output: highlights with the computed counts, and people as a page { items, page, pageSize, hasMore } of person rows with name, login e-mail, status, country code and name, access completion and missing items; an empty page when the organization has no people.
   */
  'onboarding.organization_people.qryOrganizationPeopleOverview': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { highlights: AccessHighlights; people: { items: PersonRow[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['accessCompleteByPlatformRule', 'reacceptOnNewPrivacyVersion', 'currentVersionIsLatestPublished', 'newCurrentVersionRequiresReacceptance', 'loginEmailReadOnly', 'listingProvesNoInvitation'];
    access: { actors: ['companyOwner']; grants: ['ownerOwnAccess', 'ownerMaintainCountries', 'ownerPublishPrivacyText', 'ownerReviewPeople']; scope: 'own' };
  };
  /**
   * Purpose: Searches and pages the organization people by name or login e-mail and by status.
   * Input: search: text contained in the name or the login e-mail; status: optional platform status filter; page and pageSize: the requested page.
   * Processing: Filters the organization users by name or login e-mail containing the text and by status, ordered by name, and resolves country names in one batch. accessComplete and missingItems are computed per person by accessCompleteByPlatformRule and reacceptOnNewPrivacyVersion, never stored. loginEmail comes from the platform login (loginEmailReadOnly); listingProvesNoInvitation applies.
   * Output: people as a page { items, page, pageSize, hasMore } of matching person rows; an empty page when nothing matches.
   */
  'onboarding.organization_people.qrySearchOrganizationPeople': {
    kind: 'qry';
    input: { search?: string; status?: 'Active' | 'Inactive' | 'Merged' | 'Blocked'; page: number; pageSize: number };
    output: { people: { items: PersonRow[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['accessCompleteByPlatformRule', 'reacceptOnNewPrivacyVersion', 'loginEmailReadOnly', 'listingProvesNoInvitation'];
    access: { actors: ['companyOwner']; grants: ['ownerOwnAccess', 'ownerMaintainCountries', 'ownerPublishPrivacyText', 'ownerReviewPeople']; scope: 'own' };
  };
  /**
   * Purpose: Loads one organization person with each pending item and who resolves it.
   * Input: memberId: id of the person selected in the people list.
   * Processing: Reads the person of the caller’s organization by id, resolves the country name in the user language (unknownCountryNeverDefaulted: an unknown country stays empty) and the current privacy text version (currentVersionIsLatestPublished). Computes consentValid (reacceptOnNewPrivacyVersion, newCurrentVersionRequiresReacceptance), accessComplete (accessCompleteByPlatformRule) and missingItems, each item saying whether the person completes it or the owner must release access on the platform (dataEntryGrantsNoAuthority); none is stored. loginEmail comes from the platform login (loginEmailReadOnly).
   * Output: person with name, login e-mail, status, country code and name, last update, consent validity, missing items with who resolves each, access completion and the current privacy text version (code, publication moment, current flag).
   */
  'onboarding.organization_people.qryOrganizationPerson': {
    kind: 'qry';
    input: { memberId: string };
    output: { person: PersonPendingDetail };
    rules: ['accessCompleteByPlatformRule', 'reacceptOnNewPrivacyVersion', 'currentVersionIsLatestPublished', 'newCurrentVersionRequiresReacceptance', 'loginEmailReadOnly', 'unknownCountryNeverDefaulted', 'dataEntryGrantsNoAuthority', 'listingProvesNoInvitation'];
    access: { actors: ['companyOwner']; grants: ['ownerOwnAccess', 'ownerMaintainCountries', 'ownerPublishPrivacyText', 'ownerReviewPeople']; scope: 'own' };
  };
}
