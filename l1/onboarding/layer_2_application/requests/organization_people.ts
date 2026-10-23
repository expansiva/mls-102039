/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/requests/organization_people.ts" enhancement="_blank"/>

import type { Organization_peopleContracts, PersonRow, PrivacyVersionRef, PersonPendingDetail } from '/_102039_/l2/onboarding/web/contracts/organization_people.defs.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { isProtectedPrivacyCountry } from '/_102034_/l1/mdm/module.js';
import { listOrganizationMember } from '/_102039_/l1/onboarding/layer_2_application/usecases/listOrganizationMember.js';
import type { ListOrganizationMemberOutput } from '/_102039_/l1/onboarding/layer_2_application/usecases/listOrganizationMember.js';
import { getOrganizationMember } from '/_102039_/l1/onboarding/layer_2_application/usecases/getOrganizationMember.js';
import { listCountry } from '/_102039_/l1/onboarding/layer_2_application/usecases/listCountry.js';
import { listPrivacyTextVersion } from '/_102039_/l1/onboarding/layer_2_application/usecases/listPrivacyTextVersion.js';

type MemberItem = ListOrganizationMemberOutput['items'][number];
type PersonStatus = 'Active' | 'Inactive' | 'Merged' | 'Blocked';

interface CurrentVersion {
  versionCode: string;
  publishedAt: string;
}

interface AccessSituation {
  consentRequired: boolean;
  consentValid: boolean;
  accessComplete: boolean;
  missingItems: string;
}

const MAX_PAGE_SIZE = 200;

function resolvePage(input: { page: number; pageSize: number }): { page: number; pageSize: number } {
  const page = input.page >= 1 ? Math.floor(input.page) : 1;
  const pageSize = input.pageSize >= 1 ? Math.min(MAX_PAGE_SIZE, Math.floor(input.pageSize)) : 20;
  return { page, pageSize };
}

function toStatus(value: string, memberName: string): PersonStatus {
  if (value === 'Active' || value === 'Inactive' || value === 'Merged' || value === 'Blocked') return value;
  throw new AppError('INVALID_STATUS', `Unknown platform status "${value}" for ${memberName}`, 500, { status: value });
}

function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

async function loadAllMembers(ctx: RequestContext): Promise<MemberItem[]> {
  const all: MemberItem[] = [];
  let page = 1;
  for (;;) {
    const res = await listOrganizationMember({ page, pageSize: MAX_PAGE_SIZE }, ctx);
    all.push(...res.items);
    if (!res.hasMore || res.items.length === 0) break;
    page += 1;
  }
  return all;
}

// One batch: every country of the module list, keyed by ISO code.
async function loadCountryNames(ctx: RequestContext): Promise<Map<string, string>> {
  const names = new Map<string, string>();
  let page = 1;
  for (;;) {
    const res = await listCountry({ page, pageSize: MAX_PAGE_SIZE }, ctx);
    for (const country of res.items) {
      const display = country.details?.displayName;
      // displayName in the user language, English name as fallback
      names.set(country.isoCode, display != null && display !== '' ? display : country.name);
    }
    if (!res.hasMore || res.items.length === 0) break;
    page += 1;
  }
  return names;
}

// currentVersionIsLatestPublished: the current privacy text is the most recently published version.
async function loadCurrentVersion(ctx: RequestContext): Promise<CurrentVersion | null> {
  let current: CurrentVersion | null = null;
  let page = 1;
  for (;;) {
    const res = await listPrivacyTextVersion({ status: 'published', page, pageSize: MAX_PAGE_SIZE }, ctx);
    for (const v of res.items) {
      if (v.publishedAt == null || v.publishedAt === '') continue;
      if (current == null || v.publishedAt > current.publishedAt) {
        current = { versionCode: v.versionCode, publishedAt: v.publishedAt };
      }
    }
    if (!res.hasMore || res.items.length === 0) break;
    page += 1;
  }
  return current;
}

interface MemberLike {
  details: {
    identification: { name: string; countryCode: string };
    person?: { privacyConsent?: { consentVersion?: string; consentedAt?: string; revokedAt?: string } };
  };
}

// Computed, never stored: accessCompleteByPlatformRule, reacceptOnNewPrivacyVersion, newCurrentVersionRequiresReacceptance.
function computeAccess(member: MemberLike, current: CurrentVersion | null): AccessSituation {
  const name = member.details.identification.name;
  const countryCode = member.details.identification.countryCode;
  const hasName = name != null && name.trim() !== '';
  const hasCountry = countryCode != null && countryCode !== '';
  const consentRequired = hasCountry && isProtectedPrivacyCountry(countryCode);
  const consent = member.details.person?.privacyConsent;
  // a consent that is empty, revoked or for an earlier version is not valid
  const consentValid =
    consent != null &&
    consent.consentVersion != null && consent.consentVersion !== '' &&
    consent.consentedAt != null && consent.consentedAt !== '' &&
    (consent.revokedAt == null || consent.revokedAt === '') &&
    current != null &&
    consent.consentVersion === current.versionCode;
  const accessComplete = hasName && hasCountry && (!consentRequired || consentValid);
  // dataEntryGrantsNoAuthority: filling these data grants no role or permission; the owner releases module access on the platform.
  const missing: string[] = [];
  if (!hasName) missing.push('name (the person completes it)');
  if (!hasCountry) missing.push('country (the person completes it)');
  if (consentRequired && !consentValid) missing.push('acceptance of the current privacy text (the person completes it)');
  return { consentRequired, consentValid, accessComplete, missingItems: missing.join('; ') };
}

async function resolveLoginEmail(member: MemberItem, ctx: RequestContext): Promise<string> {
  // loginEmailReadOnly: read from the platform login, never typed nor stored here.
  const given = member.details.onboarding?.loginEmail;
  if (given != null && given !== '') return given;
  const email = await ctx.mdm.identity.getLoginEmail(member.id);
  return email == null ? '' : email;
}

function buildRow(member: MemberItem, loginEmail: string, access: AccessSituation, countryNames: Map<string, string>): PersonRow {
  const ident = member.details.identification;
  const hasCountry = ident.countryCode != null && ident.countryCode !== '';
  const countryName = hasCountry ? countryNames.get(ident.countryCode) : undefined;
  // unknownCountryNeverDefaulted: an unknown country stays empty.
  return {
    id: member.id,
    details: {
      identification: {
        name: ident.name,
        status: toStatus(ident.status, ident.name),
        ...(hasCountry ? { countryCode: ident.countryCode } : {}),
      },
      onboarding: {
        loginEmail,
        accessComplete: access.accessComplete,
        missingItems: access.missingItems,
      },
    },
    country: { details: countryName != null && countryName !== '' ? { displayName: countryName } : {} },
  };
}

function sortByName(members: MemberItem[]): MemberItem[] {
  return [...members].sort((a, b) => a.details.identification.name.localeCompare(b.details.identification.name));
}

async function buildRows(members: MemberItem[], current: CurrentVersion | null, countryNames: Map<string, string>, ctx: RequestContext): Promise<PersonRow[]> {
  return Promise.all(
    members.map(async (m) => {
      const email = await resolveLoginEmail(m, ctx);
      return buildRow(m, email, computeAccess(m, current), countryNames);
    }),
  );
}

export const requests: { [K in keyof Organization_peopleContracts]: (input: Organization_peopleContracts[K]['input'], ctx: RequestContext) => Promise<Organization_peopleContracts[K]['output']> } = {
  "onboarding.organization_people.qryOrganizationPeopleOverview": async function (input, ctx) {
    const { page, pageSize } = resolvePage(input);
    const [members, current, countryNames] = await Promise.all([
      loadAllMembers(ctx),
      loadCurrentVersion(ctx),
      loadCountryNames(ctx),
    ]);
    const sorted = sortByName(members);

    // Indicators over the whole organization, computed per person.
    let completeCount = 0;
    let pendingCount = 0;
    let consentValidCount = 0;
    let consentInvalidCount = 0;
    for (const m of sorted) {
      const access = computeAccess(m, current);
      if (access.accessComplete) completeCount += 1; else pendingCount += 1; // accessCompleteByPlatformRule
      if (access.consentValid) consentValidCount += 1; else consentInvalidCount += 1; // reacceptOnNewPrivacyVersion
    }

    // listingProvesNoInvitation: being listed proves no invitation nor authority.
    const start = (page - 1) * pageSize;
    const pageMembers = sorted.slice(start, start + pageSize);
    const items = await buildRows(pageMembers, current, countryNames, ctx);
    return {
      highlights: { completeCount, pendingCount, consentValidCount, consentInvalidCount },
      people: { items, page, pageSize, hasMore: start + pageSize < sorted.length },
    };
  },

  "onboarding.organization_people.qrySearchOrganizationPeople": async function (input, ctx) {
    const { page, pageSize } = resolvePage(input);
    const [members, current, countryNames] = await Promise.all([
      loadAllMembers(ctx),
      loadCurrentVersion(ctx),
      loadCountryNames(ctx),
    ]);
    const term = input.search != null ? normalizeText(input.search.trim()) : '';
    const byStatus = input.status != null ? members.filter((m) => m.details.identification.status === input.status) : members;
    const sorted = sortByName(byStatus);

    // The e-mail is part of the search, so it is read for every candidate (loginEmailReadOnly).
    const candidates = await Promise.all(
      sorted.map(async (m) => ({ member: m, email: await resolveLoginEmail(m, ctx) })),
    );
    const matched = term === ''
      ? candidates
      : candidates.filter((c) =>
          normalizeText(c.member.details.identification.name).includes(term) ||
          normalizeText(c.email).includes(term));

    const start = (page - 1) * pageSize;
    const slice = matched.slice(start, start + pageSize);
    const items = slice.map((c) => buildRow(c.member, c.email, computeAccess(c.member, current), countryNames));
    return {
      people: { items, page, pageSize, hasMore: start + pageSize < matched.length },
    };
  },

  "onboarding.organization_people.qryOrganizationPerson": async function (input, ctx) {
    const member = await getOrganizationMember({ id: input.memberId }, ctx);
    const ident = member.details.identification;
    const [current, countryNames] = await Promise.all([loadCurrentVersion(ctx), loadCountryNames(ctx)]);
    const access = computeAccess(member, current);

    let loginEmail = member.details.onboarding?.loginEmail;
    if (loginEmail == null || loginEmail === '') {
      const fromLogin = await ctx.mdm.identity.getLoginEmail(member.id);
      loginEmail = fromLogin == null ? '' : fromLogin;
    }

    const hasCountry = ident.countryCode != null && ident.countryCode !== '';
    const countryName = hasCountry ? countryNames.get(ident.countryCode) : undefined;

    const person: PersonPendingDetail = {
      id: member.id,
      details: {
        identification: {
          name: ident.name,
          status: toStatus(ident.status, ident.name),
          ...(hasCountry ? { countryCode: ident.countryCode } : {}),
          updatedAt: ident.updatedAt,
        },
        onboarding: {
          loginEmail,
          consentValid: access.consentValid,
          missingItems: access.missingItems,
          accessComplete: access.accessComplete,
        },
      },
      // unknownCountryNeverDefaulted: an unknown country stays empty.
      country: { details: countryName != null && countryName !== '' ? { displayName: countryName } : {} },
    };

    if (current != null) {
      const ref: PrivacyVersionRef = {
        versionCode: current.versionCode,
        publishedAt: current.publishedAt,
        details: { isCurrent: true },
      };
      person.currentPrivacyVersion = ref;
    }
    return { person };
  },
};
