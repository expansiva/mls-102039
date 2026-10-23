/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/requests/my_access.ts" enhancement="_blank"/>

import type { My_accessContracts, AccessMember, ConsentState, CountryOption, PrivacyText } from '/_102039_/l2/onboarding/web/contracts/my_access.defs.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { isProtectedPrivacyCountry } from '/_102034_/l1/mdm/module.js';
import { getOrganizationMember } from '/_102039_/l1/onboarding/layer_2_application/usecases/getOrganizationMember.js';
import type { GetOrganizationMemberOutput } from '/_102039_/l1/onboarding/layer_2_application/usecases/getOrganizationMember.js';
import { listCountry } from '/_102039_/l1/onboarding/layer_2_application/usecases/listCountry.js';
import type { ListCountryOutput } from '/_102039_/l1/onboarding/layer_2_application/usecases/listCountry.js';
import { listPrivacyTextVersion } from '/_102039_/l1/onboarding/layer_2_application/usecases/listPrivacyTextVersion.js';
import { updateOrganizationMember } from '/_102039_/l1/onboarding/layer_2_application/usecases/updateOrganizationMember.js';
import type { UpdateOrganizationMemberInput } from '/_102039_/l1/onboarding/layer_2_application/usecases/updateOrganizationMember.js';

type MemberRecord = GetOrganizationMemberOutput;
type CountryRecord = ListCountryOutput['items'][number];
type PrivacyConsentRecord = NonNullable<NonNullable<MemberRecord['details']['person']>['privacyConsent']>;

interface CurrentPrivacy {
  versionCode: string;
  publishedAt: string;
  text: string;
  isProvisional: boolean;
}

interface ConsentSituation {
  state: ConsentState;
  required: boolean;
  valid: boolean;
}

interface AccessStatus {
  missingItems: string;
  accessComplete: boolean;
}

function presentText(value: string | null | undefined): string | undefined {
  if (value == null) return undefined;
  if (value.trim() === '') return undefined;
  return value;
}

/** noSecondPerson: the module works only on the person the platform session resolved. */
function sessionPersonId(ctx: RequestContext): string {
  const person = ctx.sessionContext.person;
  if (person == null) {
    throw new AppError('PERSON_NOT_RESOLVED', 'The signed-in person was not resolved by the platform session', 401, { ruleId: 'noSecondPerson' });
  }
  return person.mdmId;
}

/** loginEmailReadOnly: the e-mail comes from the platform login, never from the input and never stored. */
function loginEmailOf(member: MemberRecord, ctx: RequestContext): string {
  const email = presentText(ctx.sessionContext.person?.email) ?? presentText(member.details.onboarding?.loginEmail);
  if (email == null) {
    throw new AppError('LOGIN_EMAIL_NOT_FOUND', 'The platform login has no e-mail for the signed-in person', 404, { ruleId: 'loginEmailReadOnly' });
  }
  return email;
}

async function listActiveCountries(ctx: RequestContext): Promise<CountryRecord[]> {
  const all: CountryRecord[] = [];
  let page = 1;
  for (;;) {
    const result = await listCountry({ status: 'active', page, pageSize: 200 }, ctx);
    for (const item of result.items) all.push(item);
    if (!result.hasMore) break;
    page += 1;
  }
  return all;
}

/** currentVersionIsLatestPublished: the current privacy text is the most recently published version. */
async function loadCurrentPrivacy(ctx: RequestContext): Promise<CurrentPrivacy | null> {
  let best: CurrentPrivacy | null = null;
  let bestMoment = Number.NEGATIVE_INFINITY;
  let page = 1;
  for (;;) {
    const result = await listPrivacyTextVersion({ status: 'published', page, pageSize: 200 }, ctx);
    for (const item of result.items) {
      const publishedAt = presentText(item.publishedAt);
      if (publishedAt == null) continue;
      const moment = Date.parse(publishedAt);
      if (Number.isNaN(moment)) continue;
      if (moment > bestMoment) {
        bestMoment = moment;
        best = {
          versionCode: item.versionCode,
          publishedAt,
          text: item.details.text,
          isProvisional: item.details.isProvisional,
        };
      }
    }
    if (!result.hasMore) break;
    page += 1;
  }
  return best;
}

function toPrivacyText(current: CurrentPrivacy): PrivacyText {
  return {
    versionCode: current.versionCode,
    publishedAt: current.publishedAt,
    details: {
      text: current.text,
      isProvisional: current.isProvisional,
      isCurrent: true,
    },
  };
}

/** reacceptOnNewPrivacyVersion: valid = not empty, not revoked and for the current published version. */
function isConsentValidFor(consent: PrivacyConsentRecord | null | undefined, current: CurrentPrivacy | null): boolean {
  if (current == null) return false;
  if (consent == null) return false;
  if (presentText(consent.consentVersion) == null) return false;
  if (presentText(consent.consentedAt) == null) return false;
  if (presentText(consent.revokedAt) != null) return false;
  return consent.consentVersion === current.versionCode;
}

/** consentFollowsEditedCountry: required is decided by the platform rule for the given country. */
async function resolveConsent(ctx: RequestContext, countryCode: string | undefined, member: MemberRecord): Promise<ConsentSituation> {
  const required = countryCode == null ? false : isProtectedPrivacyCountry(countryCode);
  const current = await loadCurrentPrivacy(ctx);
  if (required && current == null) {
    throw new AppError('PRIVACY_TEXT_NOT_PUBLISHED', 'The country requires privacy consent but no privacy text version is published', 409, { ruleId: 'currentVersionIsLatestPublished' });
  }
  const valid = isConsentValidFor(member.details.person?.privacyConsent, current);
  const state: ConsentState = {
    details: { onboarding: { consentRequired: required, consentValid: valid } },
  };
  // consentNeverAutoAccepted: only the text is attached, never an acceptance.
  if (required && current != null) {
    state.privacyText = toPrivacyText(current);
  }
  return { state, required, valid };
}

/** accessCompleteByPlatformRule / onlyMissingDataAsked: computed, never stored. */
function computeAccess(member: MemberRecord, consent: ConsentSituation): AccessStatus {
  const missing: string[] = [];
  if (presentText(member.details.identification.name) == null) missing.push('name');
  if (presentText(member.details.identification.countryCode) == null) missing.push('country');
  if (consent.required && !consent.valid) missing.push('acceptance of the current privacy text');
  return { missingItems: missing.join('; '), accessComplete: missing.length === 0 };
}

function buildMember(member: MemberRecord, ctx: RequestContext, access: AccessStatus): AccessMember {
  const identification: AccessMember['details']['identification'] = {};
  const name = presentText(member.details.identification.name);
  const countryCode = presentText(member.details.identification.countryCode);
  if (name != null) identification.name = name;
  // unknownCountryNeverDefaulted: an unknown country stays empty.
  if (countryCode != null) identification.countryCode = countryCode;
  return {
    id: member.id,
    version: member.version,
    details: {
      identification,
      onboarding: {
        loginEmail: loginEmailOf(member, ctx),
        missingItems: access.missingItems,
        accessComplete: access.accessComplete,
      },
    },
  };
}

function toCountryOption(country: CountryRecord, displayNames: Intl.DisplayNames): CountryOption {
  const translated = displayNames.of(country.isoCode);
  return {
    isoCode: country.isoCode,
    name: country.name,
    details: {
      displayName: translated == null || translated === country.isoCode ? country.name : translated,
    },
  };
}

async function requireActiveCountry(ctx: RequestContext, code: string): Promise<string> {
  const isoCode = code.trim().toUpperCase();
  const result = await listCountry({ isoCode, status: 'active', page: 1, pageSize: 1 }, ctx);
  if (result.items.length === 0) {
    throw new AppError('COUNTRY_NOT_ACTIVE', `The country ${isoCode} is not an active country of the list`, 422, { ruleId: 'countryFromActiveList', isoCode });
  }
  return isoCode;
}

export const requests: { [K in keyof My_accessContracts]: (input: My_accessContracts[K]['input'], ctx: RequestContext) => Promise<My_accessContracts[K]['output']> } = {
  "onboarding.my_access.getMyAccess": async function (input, ctx) {
    const id = sessionPersonId(ctx);
    const member = await getOrganizationMember({ id }, ctx);

    // onlyActiveCountryOffered / countryFromActiveList: only active countries, ordered by name.
    const activeCountries = await listActiveCountries(ctx);
    activeCountries.sort((a, b) => a.name.localeCompare(b.name));
    const displayNames = new Intl.DisplayNames(undefined, { type: 'region' });
    const countries: CountryOption[] = activeCountries.map((country) => toCountryOption(country, displayNames));

    const consent = await resolveConsent(ctx, presentText(member.details.identification.countryCode), member);
    const access = computeAccess(member, consent);

    return {
      member: buildMember(member, ctx, access),
      countries,
      consent: consent.state,
    };
  },

  "onboarding.my_access.checkCountryConsent": async function (input, ctx) {
    const id = sessionPersonId(ctx);
    // countryFromActiveList: the edited country must be active.
    const isoCode = await requireActiveCountry(ctx, input.countryCode);
    const member = await getOrganizationMember({ id }, ctx);
    // consentFollowsEditedCountry, reacceptOnNewPrivacyVersion; nothing is written (consentNeverAutoAccepted).
    const consent = await resolveConsent(ctx, isoCode, member);
    return { consent: consent.state };
  },

  "onboarding.my_access.saveMyAccess": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };

      // noSecondPerson: only the session person is updated; authority error is distinct from validation.
      const personId = sessionPersonId(bound);
      if (input.id !== personId) {
        throw new AppError('FORBIDDEN', 'Only the signed-in person own access record can be saved', 403, { ruleId: 'authorityErrorDistinctFromValidation', id: input.id });
      }

      const current = await getOrganizationMember({ id: personId }, bound);
      if (current.version !== input.version) {
        throw new AppError('VERSION_CONFLICT', 'The access record was changed since it was read', 409, { ruleId: 'authorityErrorDistinctFromValidation', expected: input.version, found: current.version });
      }

      // onlyMissingDataAsked: write only the name and country that were missing.
      const currentName = presentText(current.details.identification.name);
      const currentCountry = presentText(current.details.identification.countryCode);
      const sentName = presentText(input.details.identification.name);
      const sentCountry = presentText(input.details.identification.countryCode);

      const savedName = currentName ?? sentName?.trim();
      let savedCountry: string | undefined = currentCountry;
      if (currentCountry == null && sentCountry != null) {
        // countryFromActiveList: refuse a country not active; unknownCountryNeverDefaulted: never default an empty one.
        savedCountry = await requireActiveCountry(bound, sentCountry);
      }

      // consentNeverAutoAccepted: consent only when the person explicitly sent consentVersion.
      const sentConsent = input.details.person.privacyConsent;
      const sentVersion = presentText(sentConsent.consentVersion);
      let consentToWrite: PrivacyConsentRecord | undefined = current.details.person?.privacyConsent;
      if (sentVersion != null) {
        const currentPrivacy = await loadCurrentPrivacy(bound);
        if (currentPrivacy == null) {
          throw new AppError('PRIVACY_TEXT_NOT_PUBLISHED', 'No privacy text version is published to be accepted', 409, { ruleId: 'currentVersionIsLatestPublished' });
        }
        // reacceptOnNewPrivacyVersion / newCurrentVersionRequiresReacceptance
        if (sentVersion !== currentPrivacy.versionCode) {
          throw new AppError('CONSENT_VERSION_NOT_CURRENT', `The accepted privacy text version ${sentVersion} is not the current version ${currentPrivacy.versionCode}`, 409, { ruleId: 'newCurrentVersionRequiresReacceptance', sentVersion, currentVersion: currentPrivacy.versionCode });
        }
        const sentAt = presentText(sentConsent.consentedAt);
        if (sentAt == null || Number.isNaN(Date.parse(sentAt))) {
          throw new AppError('CONSENT_MOMENT_REQUIRED', 'The moment of the privacy acceptance is missing or invalid', 422, { ruleId: 'consentNeverAutoAccepted' });
        }
        const channel = presentText(sentConsent.channel);
        if (channel == null) {
          throw new AppError('CONSENT_CHANNEL_REQUIRED', 'How the privacy acceptance was given is required', 422, { ruleId: 'consentNeverAutoAccepted' });
        }
        const nowIso = bound.clock.nowIso();
        // A future moment is capped to the save moment.
        const consentedAt = Date.parse(sentAt) > Date.parse(nowIso) ? nowIso : sentAt;
        consentToWrite = { consentVersion: sentVersion, consentedAt, channel };
      }

      // loginEmailReadOnly: no e-mail is sent; dataEntryGrantsNoAuthority: no role or permission is written.
      const details: UpdateOrganizationMemberInput['details'] = {
        identification: {
          name: savedName ?? '',
          countryCode: savedCountry ?? '',
        },
      };
      if (consentToWrite != null) {
        details.person = { privacyConsent: consentToWrite };
      }

      const saved = await updateOrganizationMember({ id: current.id, version: input.version, details }, bound);

      // consentFollowsEditedCountry: decided for the saved country.
      const consent = await resolveConsent(bound, presentText(saved.details.identification.countryCode), saved);
      // accessCompleteByPlatformRule: recomputed, never stored.
      const access = computeAccess(saved, consent);

      return {
        member: buildMember(saved, bound, access),
        consent: consent.state,
      };
    });
  },
};
