/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/updateOrganizationMember.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { isProtectedPrivacyCountry } from '/_102034_/l1/mdm/module.js';
import type { PrivacyConsentValue } from '/_102034_/l1/mdm/module.js';
import type { CountryRepository } from '/_102039_/l1/onboarding/layer_2_application/ports/countryRepository.js';
import type { PrivacyTextVersionRepository } from '/_102039_/l1/onboarding/layer_2_application/ports/privacyTextVersionRepository.js';

export interface UpdateOrganizationMemberInput extends Record<string, unknown> {
  details: {
    identification: {
      name: string;
      countryCode: string;
    };
    base?: Record<string, unknown>;
    person?: {
      privacyConsent?: {
        consentVersion?: string;
        consentedAt?: string;
        channel?: string;
        revokedAt?: string;
      };
    };
    general?: Record<string, unknown>;
    onboarding?: Record<string, unknown>;
  };
  id: string;
  version: number;
}

export interface UpdateOrganizationMemberOutput extends Record<string, unknown> {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: string;
      name: string;
      status: string;
      countryCode: string;
      createdAt: string;
      updatedAt: string;
    };
    base?: Record<string, unknown>;
    person?: {
      privacyConsent?: {
        consentVersion?: string;
        consentedAt?: string;
        channel?: string;
        revokedAt?: string;
      };
    };
    general?: Record<string, unknown>;
    onboarding?: {
      loginEmail?: string;
      consentRequired?: boolean;
      consentValid?: boolean;
      missingItems?: string;
      accessComplete?: boolean;
    };
  };
}

interface ConsentShape {
  consentVersion?: string;
  consentedAt?: string;
  channel?: string;
  revokedAt?: string;
}

function str(value: unknown): string {
  return value == null ? '' : String(value);
}

function asBoolean(value: unknown): boolean {
  return value === true || value === 'true';
}

function readConsent(flat: Record<string, unknown>): ConsentShape | undefined {
  let raw: unknown = flat.privacyConsent;
  if (raw == null) {
    const person = flat.person;
    if (person != null && typeof person === 'object') {
      raw = (person as Record<string, unknown>).privacyConsent;
    }
  }
  if (raw == null || typeof raw !== 'object') return undefined;
  const source = raw as Record<string, unknown>;
  const consent: ConsentShape = {};
  if (source.consentVersion != null) consent.consentVersion = String(source.consentVersion);
  if (source.consentedAt != null) consent.consentedAt = String(source.consentedAt);
  if (source.channel != null) consent.channel = String(source.channel);
  if (source.revokedAt != null) consent.revokedAt = String(source.revokedAt);
  if (consent.consentVersion == null && consent.consentedAt == null && consent.channel == null && consent.revokedAt == null) {
    return undefined;
  }
  return consent;
}

export async function updateOrganizationMember(input: UpdateOrganizationMemberInput, ctx: RequestContext): Promise<UpdateOrganizationMemberOutput> {
  const mdmId = String(input.id ?? '');
  if (mdmId === '') {
    throw new AppError('VALIDATION_ERROR', 'The person id is required.', 400);
  }
  const expectedVersion = Number(input.version);
  if (!Number.isFinite(expectedVersion)) {
    throw new AppError('VALIDATION_ERROR', 'The version is required.', 400);
  }

  // loginEmailReadOnly: the login e-mail is never typed nor stored by the module.
  const inputOnboarding = input.details?.onboarding;
  if (inputOnboarding != null && inputOnboarding.loginEmail != null && str(inputOnboarding.loginEmail) !== '') {
    throw new AppError('VALIDATION_ERROR', 'The login e-mail is read-only and cannot be typed or stored.', 400, { ruleId: 'loginEmailReadOnly' });
  }

  // noSecondPerson: only the person the platform already has for the signed-in login is edited.
  const sessionPerson = ctx.sessionContext.person;
  if (sessionPerson != null && sessionPerson.mdmId !== mdmId) {
    throw new AppError('FORBIDDEN', 'Only the person of the signed-in login can be completed; no other person is edited or created.', 403, { ruleId: 'noSecondPerson' });
  }

  const current = await ctx.mdm.entity.get({ mdmId });
  if (current == null) {
    throw new AppError('NOT_FOUND', 'The person was not found on the platform.', 404);
  }
  if (current.version !== expectedVersion) {
    throw new AppError('CONCURRENCY_CONFLICT', 'The person was changed by someone else; reload and try again.', 409);
  }
  const currentFlat: Record<string, unknown> = { ...current.details };

  // onlyMissingDataAsked: the name is saved only when the platform does not have it yet.
  const existingName = str(currentFlat.name).trim();
  const inputName = str(input.details?.identification?.name).trim();
  let name = existingName;
  if (existingName === '') {
    if (inputName === '') {
      throw new AppError('VALIDATION_ERROR', 'The name is required.', 400, { ruleId: 'onlyMissingDataAsked' });
    }
    if (inputName.length > 200) {
      throw new AppError('VALIDATION_ERROR', 'The name must have at most 200 characters.', 400, { ruleId: 'onlyMissingDataAsked' });
    }
    name = inputName;
  }

  // unknownCountryNeverDefaulted: a missing country is asked for, never replaced by a default.
  const countryCode = str(input.details?.identification?.countryCode).trim();
  if (countryCode === '') {
    throw new AppError('VALIDATION_ERROR', 'The country is required and is never defaulted.', 400, { ruleId: 'unknownCountryNeverDefaulted' });
  }
  if (!/^[A-Z]{2}$/.test(countryCode)) {
    throw new AppError('VALIDATION_ERROR', 'The country must be a two-letter upper case ISO code.', 400, { ruleId: 'countryFromActiveList' });
  }

  // countryFromActiveList: a new country must be an active one of the module country list.
  const existingCountry = str(currentFlat.countryCode);
  if (countryCode !== existingCountry || existingCountry === '') {
    const countryRepository = resolveRepository<CountryRepository>(ctx, 'CountryRepository');
    const countries = await countryRepository.list({ isoCode: countryCode });
    const active = countries.some((country) => country.isoCode === countryCode && country.status === 'active');
    if (!active) {
      throw new AppError('VALIDATION_ERROR', 'The country must be one of the active countries of the country list.', 400, { ruleId: 'countryFromActiveList' });
    }
  }

  // consentFollowsEditedCountry: the requirement follows the country being saved, decided by the platform rule.
  const consentRequired = isProtectedPrivacyCountry(countryCode);
  if (inputOnboarding != null && inputOnboarding.consentRequired != null && asBoolean(inputOnboarding.consentRequired) !== consentRequired) {
    throw new AppError('VALIDATION_ERROR', 'Whether consent is required is decided by the platform rule for the country being edited.', 400, { ruleId: 'consentFollowsEditedCountry' });
  }

  // Current privacy text version: the most recently published one.
  const privacyRepository = resolveRepository<PrivacyTextVersionRepository>(ctx, 'PrivacyTextVersionRepository');
  const published = (await privacyRepository.list({ status: 'published' })).filter((version) => version.status === 'published');
  published.sort((a, b) => {
    const byDate = str(a.publishedAt).localeCompare(str(b.publishedAt));
    if (byDate !== 0) return byDate;
    return a.versionCode.localeCompare(b.versionCode, undefined, { numeric: true });
  });
  const currentVersion = published.length > 0 ? published[published.length - 1] : undefined;

  // consentNeverAutoAccepted: recorded only when the caller sends the explicit acceptance (version and how).
  const inputConsent = input.details?.person?.privacyConsent;
  let newConsent: ConsentShape | undefined;
  let patchConsent: PrivacyConsentValue | undefined;
  if (inputConsent != null && (inputConsent.consentVersion != null || inputConsent.channel != null || inputConsent.consentedAt != null || inputConsent.revokedAt != null)) {
    const consentVersion = str(inputConsent.consentVersion).trim();
    const channel = str(inputConsent.channel).trim();
    if (consentVersion === '' || channel === '') {
      throw new AppError('VALIDATION_ERROR', 'The privacy acceptance must be an explicit action recording the accepted version code and how it was given.', 400, { ruleId: 'consentNeverAutoAccepted' });
    }
    if (currentVersion == null || currentVersion.versionCode !== consentVersion) {
      throw new AppError('VALIDATION_ERROR', 'The acceptance must be for the current privacy text version.', 400, { ruleId: 'reacceptOnNewPrivacyVersion' });
    }
    const consentedAt = str(inputConsent.consentedAt).trim() === '' ? ctx.clock.nowIso() : str(inputConsent.consentedAt).trim();
    const shape: ConsentShape = { consentVersion, consentedAt, channel };
    const forPatch: PrivacyConsentValue = { consentVersion, consentedAt, channel };
    if (inputConsent.revokedAt != null && str(inputConsent.revokedAt).trim() !== '') {
      const revokedAt = str(inputConsent.revokedAt).trim();
      shape.revokedAt = revokedAt;
      forPatch.revokedAt = revokedAt;
    }
    newConsent = shape;
    patchConsent = forPatch;
  }

  // reacceptOnNewPrivacyVersion: valid = not empty, not revoked and for the current published version.
  const existingConsent: ConsentShape | undefined = readConsent(currentFlat);
  const effectiveConsent: ConsentShape | undefined = newConsent !== undefined ? newConsent : existingConsent;
  const consentValid =
    effectiveConsent != null &&
    effectiveConsent.consentVersion != null &&
    effectiveConsent.consentedAt != null &&
    (effectiveConsent.revokedAt == null || effectiveConsent.revokedAt === '') &&
    currentVersion != null &&
    effectiveConsent.consentVersion === currentVersion.versionCode;

  // accessCompleteByPlatformRule: computed every time, never taken from the caller nor stored.
  const missing: string[] = [];
  if (name.trim() === '') missing.push('name');
  if (countryCode === '') missing.push('country');
  if (consentRequired && !consentValid) missing.push('acceptance of the current privacy text');
  const accessComplete = missing.length === 0;
  if (inputOnboarding != null && inputOnboarding.accessComplete != null && asBoolean(inputOnboarding.accessComplete) !== accessComplete) {
    throw new AppError('CONFLICT', 'Access completeness is decided by the platform rule from the saved name, country and consent, not by the caller.', 409, { ruleId: 'accessCompleteByPlatformRule' });
  }

  const patch: Parameters<typeof ctx.mdm.entity.update>[0]['patch'] = { countryCode };
  if (existingName === '') {
    patch.name = name;
  }
  if (patchConsent !== undefined) {
    patch.privacyConsent = patchConsent;
  }

  const updated = await ctx.mdm.entity.update({ mdmId, expectedVersion: current.version, patch });
  const flat: Record<string, unknown> = { ...updated.details };
  const savedName = str(flat.name);
  const savedCountry = str(flat.countryCode);
  const savedConsent: ConsentShape | undefined = readConsent(flat) ?? effectiveConsent;

  // loginEmailReadOnly: read from the platform login, never typed nor stored.
  const loginEmail = await ctx.mdm.identity.getLoginEmail(mdmId);
  const onboarding: NonNullable<UpdateOrganizationMemberOutput['details']['onboarding']> = {
    consentRequired,
    consentValid,
    missingItems: missing.join(', '),
    accessComplete,
  };
  if (loginEmail != null) onboarding.loginEmail = loginEmail;

  const output: UpdateOrganizationMemberOutput = {
    id: updated.mdmId,
    version: updated.version,
    details: {
      identification: {
        subtype: flat.subtype == null ? 'Person' : String(flat.subtype),
        name: savedName,
        status: str(flat.status),
        countryCode: savedCountry,
        createdAt: str(flat.createdAt),
        updatedAt: str(flat.updatedAt),
      },
      onboarding,
    },
  };
  if (savedConsent != null) {
    output.details.person = { privacyConsent: savedConsent };
  }
  return output;
}
