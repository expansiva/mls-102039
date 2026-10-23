/// <mls fileReference="_102039_/l2/onboarding/web/contracts/my_access.defs.ts" enhancement="_blank"/>

/** The signed-in person’s own access record: identity data, read-only login e-mail and the computed access status. */
export interface AccessMember {
  id: string;
  version: number;
  details: {
    identification: {
      name?: string;
      countryCode?: string;
    };
    onboarding: {
      readonly loginEmail: string;
      readonly missingItems: string;
      readonly accessComplete: boolean;
    };
  };
}

/** An active country of the module list, with its ISO code, English name and name in the user language. */
export interface CountryOption {
  isoCode: string;
  name: string;
  details: {
    readonly displayName: string;
  };
}

/** The current published privacy text version with its code, publication moment and provisional flag. */
export interface PrivacyText {
  readonly versionCode: string;
  readonly publishedAt: string;
  details: {
    text: string;
    isProvisional: boolean;
    readonly isCurrent: boolean;
  };
}

/** The privacy consent situation of the person for a given country: whether consent is required, whether the person already holds a valid consent, and the current privacy text when required. */
export interface ConsentState {
  details: {
    onboarding: {
      readonly consentRequired: boolean;
      readonly consentValid: boolean;
    };
  };
  privacyText?: PrivacyText;
}

export interface My_accessContracts {
  /**
   * Purpose: Loads everything the Complete my access page needs in one call: the signed-in person’s access status, the active country list and the privacy consent situation for the person’s saved country.
   * Input: None. The person is resolved by the platform session from the login.
   * Processing: Reads the session person (noSecondPerson: never creates or links another person). loginEmail is read from the platform login, never stored (loginEmailReadOnly). Computes missingItems and accessComplete by the platform rule (accessCompleteByPlatformRule, onlyMissingDataAsked). Lists only active countries ordered by name with displayName translated from the ISO code into the user language (onlyActiveCountryOffered, countryFromActiveList). An unknown country stays empty, never defaulted (unknownCountryNeverDefaulted). Computes consentRequired from the saved country and consentValid as a non-revoked consent for the current version (reacceptOnNewPrivacyVersion); when required, attaches the latest published privacy text (currentVersionIsLatestPublished). No acceptance is ever pre-filled (consentNeverAutoAccepted). Derived fields are computed, never stored.
   * Output: The person’s access record with id, version, name, country, login e-mail, missing items and access status; the active countries; and the consent state with the current privacy text when the saved country requires consent.
   */
  'onboarding.my_access.getMyAccess': {
    kind: 'qry';
    input: {};
    output: { member: AccessMember; countries: CountryOption[]; consent: ConsentState };
    rules: ['noSecondPerson', 'loginEmailReadOnly', 'onlyMissingDataAsked', 'onlyActiveCountryOffered', 'countryFromActiveList', 'unknownCountryNeverDefaulted', 'currentVersionIsLatestPublished', 'reacceptOnNewPrivacyVersion', 'consentNeverAutoAccepted', 'accessCompleteByPlatformRule'];
    access: { actors: ['companyOwner', 'organizationMember']; grants: ['memberOwnAccess', 'memberChooseCountry', 'memberReadPrivacyText', 'ownerOwnAccess', 'ownerMaintainCountries', 'ownerPublishPrivacyText', 'ownerReviewPeople']; scope: 'own' };
  };
  /**
   * Purpose: Tells, for the country currently chosen on screen and before saving, whether privacy consent is required and returns the current privacy text when it is.
   * Input: countryCode: two-letter ISO code of the country the person just picked from the active list (not saved yet).
   * Processing: Applies the platform rule for the edited country (consentFollowsEditedCountry); the code must be an active country (countryFromActiveList). When consent is required, loads the latest published privacy text version (currentVersionIsLatestPublished) and computes consentValid for the session person against that version (reacceptOnNewPrivacyVersion). Never records or implies an acceptance (consentNeverAutoAccepted). Nothing is written.
   * Output: The consent state for that country: consentRequired, consentValid and, when required, the current privacy text with version code, publication date, provisional and current flags.
   */
  'onboarding.my_access.checkCountryConsent': {
    kind: 'qry';
    input: { countryCode: string };
    output: { consent: ConsentState };
    rules: ['consentFollowsEditedCountry', 'countryFromActiveList', 'currentVersionIsLatestPublished', 'reacceptOnNewPrivacyVersion', 'consentNeverAutoAccepted'];
    access: { actors: ['companyOwner', 'organizationMember']; grants: ['memberOwnAccess', 'memberChooseCountry', 'memberReadPrivacyText', 'ownerOwnAccess', 'ownerMaintainCountries', 'ownerPublishPrivacyText', 'ownerReviewPeople']; scope: 'own' };
  };
  /**
   * Purpose: Saves the signed-in person’s missing name and country and, when given, the explicit privacy acceptance, then returns the new access status.
   * Input: id and version: the session person’s record and the version read, for optimistic concurrency. details.identification.name: the missing details.identification.name, only when it was missing. details.identification.countryCode: ISO code chosen from the active list, only when it was missing. details.person.privacyConsent.consentVersion: version code of the privacy text the person explicitly ticked, absent when not ticked. details.person.privacyConsent.consentedAt: the moment the person ticked the acceptance (ISO timestamp), sent only together with details.person.privacyConsent.consentVersion. details.person.privacyConsent.channel: how the acceptance was given (checkbox on desktop or mobile).
   * Processing: Updates only the session person (noSecondPerson); the e-mail is never accepted or stored (loginEmailReadOnly). Writes only name and country that were missing (onlyMissingDataAsked); refuses a country not active in the list and never defaults an empty one (countryFromActiveList, unknownCountryNeverDefaulted). Consent is recorded only when consentVersion is sent by the person’s explicit tick (consentNeverAutoAccepted); it must equal the current published version code (reacceptOnNewPrivacyVersion, newCurrentVersionRequiresReacceptance); records consentVersion, consentedAt (refusing a missing or future moment; the server may cap it to the save moment) and channel. Consent requirement is decided for the saved country (consentFollowsEditedCountry). Recomputes missingItems and accessComplete by the platform rule (accessCompleteByPlatformRule); these derived fields are computed, never stored. Never grants roles or permissions (dataEntryGrantsNoAuthority). Version conflicts and authority errors are returned distinct from validation errors (authorityErrorDistinctFromValidation).
   * Output: The person’s access record in its new state with the new version, saved name and country, remaining missing items and access status, plus the consent state for the saved country.
   */
  'onboarding.my_access.saveMyAccess': {
    kind: 'cmd';
    writes: 'OrganizationMember.update';
    input: { id: string; version: number; details: { identification: { name?: string; countryCode?: string }; person: { privacyConsent: { consentVersion?: string; consentedAt?: string; channel?: string } } } };
    output: { member: AccessMember; consent: ConsentState };
    rules: ['noSecondPerson', 'loginEmailReadOnly', 'onlyMissingDataAsked', 'countryFromActiveList', 'unknownCountryNeverDefaulted', 'consentFollowsEditedCountry', 'consentNeverAutoAccepted', 'reacceptOnNewPrivacyVersion', 'newCurrentVersionRequiresReacceptance', 'accessCompleteByPlatformRule', 'dataEntryGrantsNoAuthority', 'authorityErrorDistinctFromValidation'];
    access: { actors: ['companyOwner', 'organizationMember']; grants: ['memberOwnAccess', 'memberChooseCountry', 'memberReadPrivacyText', 'ownerOwnAccess', 'ownerMaintainCountries', 'ownerPublishPrivacyText', 'ownerReviewPeople']; scope: 'own' };
  };
}
