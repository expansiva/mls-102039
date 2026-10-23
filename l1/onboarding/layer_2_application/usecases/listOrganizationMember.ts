/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/listOrganizationMember.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { OrganizationMember } from '/_102039_/l1/onboarding/layer_3_domain/entities/organizationMember.js';

export interface ListOrganizationMemberInput extends Record<string, unknown> {
  id?: string;
  details?: {
    identification?: {
      subtype?: string;
      name?: string;
      status?: string;
      countryCode?: string;
      createdAt?: string;
      updatedAt?: string;
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
  page: number;
  pageSize: number;
}

export interface ListOrganizationMemberOutput extends Record<string, unknown> {
  items: OrganizationMember[];
  hasMore: boolean;
}

type MemberStatus = 'Active' | 'Inactive' | 'Merged' | 'Blocked';
const STATUSES: ReadonlyArray<MemberStatus> = ['Active', 'Inactive', 'Merged', 'Blocked'];

interface IndexRow {
  mdmId: string;
  version?: unknown;
  details: unknown;
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value as Record<string, unknown>;
  return {};
}

function text(value: unknown): string | undefined {
  return value == null || value === '' ? undefined : String(value);
}

function toStatus(value: unknown): MemberStatus {
  const raw = text(value);
  const found = STATUSES.find((status) => status === raw);
  if (!found) throw new AppError('INVALID_STATUS', 'The person has an unknown platform status.', 400);
  return found;
}

function toMember(mdmId: string, version: number, flatDetails: unknown): OrganizationMember {
  const d = asRecord(flatDetails);
  const member: OrganizationMember = {
    id: mdmId,
    version,
    details: {
      identification: {
        subtype: 'Person',
        name: text(d.name) ?? '',
        status: toStatus(d.status),
        countryCode: text(d.countryCode) ?? '',
        createdAt: text(d.createdAt) ?? '',
        updatedAt: text(d.updatedAt) ?? '',
      },
    },
  };
  if (d.base != null) member.details.base = asRecord(d.base);
  if (d.general != null) member.details.general = asRecord(d.general);
  const nested = asRecord(d.privacyConsent ?? asRecord(d.person).privacyConsent);
  const consentVersion = text(d.consentVersion) ?? text(nested.consentVersion);
  const consentedAt = text(d.consentedAt) ?? text(nested.consentedAt);
  const channel = text(d.channel) ?? text(nested.channel);
  const revokedAt = text(d.revokedAt) ?? text(nested.revokedAt);
  if (consentVersion || consentedAt || channel || revokedAt) {
    const privacyConsent: { consentVersion?: string; consentedAt?: string; channel?: string; revokedAt?: string } = {};
    if (consentVersion) privacyConsent.consentVersion = consentVersion;
    if (consentedAt) privacyConsent.consentedAt = consentedAt;
    if (channel) privacyConsent.channel = channel;
    if (revokedAt) privacyConsent.revokedAt = revokedAt;
    member.details.person = { privacyConsent };
  }
  if (d.onboarding != null) {
    const o = asRecord(d.onboarding);
    const onboarding: NonNullable<OrganizationMember['details']['onboarding']> = {};
    const loginEmail = text(o.loginEmail);
    const missingItems = text(o.missingItems);
    if (loginEmail) onboarding.loginEmail = loginEmail;
    if (missingItems) onboarding.missingItems = missingItems;
    if (typeof o.consentRequired === 'boolean') onboarding.consentRequired = o.consentRequired;
    if (typeof o.consentValid === 'boolean') onboarding.consentValid = o.consentValid;
    if (typeof o.accessComplete === 'boolean') onboarding.accessComplete = o.accessComplete;
    member.details.onboarding = onboarding;
  }
  return member;
}

export async function listOrganizationMember(input: ListOrganizationMemberInput, ctx: RequestContext): Promise<ListOrganizationMemberOutput> {
  const id = text(input.id);
  if (id) {
    const found = await ctx.mdm.entity.get({ mdmId: id });
    if (!found || found.mdmId == null) {
      throw new AppError('NOT_FOUND', 'Organization member was not found.', 404);
    }
    return { items: [toMember(String(found.mdmId), Number(found.version), found.details)], hasMore: false };
  }

  const rawPage = Number(input.page);
  const rawSize = Number(input.pageSize);
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;
  const pageSize = Number.isFinite(rawSize) && rawSize >= 1 ? Math.min(200, Math.floor(rawSize)) : 20;

  const ident = input.details?.identification;
  const name = text(ident?.name);
  const statusText = text(ident?.status);
  const status = statusText ? toStatus(statusText) : undefined;
  const countryCode = text(ident?.countryCode);

  const hydrate = async (row: IndexRow): Promise<OrganizationMember> => {
    const rowId = String(row.mdmId);
    if (typeof row.version === 'number') return toMember(rowId, row.version, row.details);
    const full = await ctx.mdm.entity.get({ mdmId: rowId });
    return toMember(String(full.mdmId), Number(full.version), full.details);
  };

  if (!countryCode) {
    const result = await ctx.mdm.collection.listByType({
      type: 'onboarding.OrganizationMember',
      ...(name ? { name } : {}),
      ...(status ? { status } : {}),
      page,
      pageSize,
    });
    const items: OrganizationMember[] = [];
    for (const item of result.items) items.push(await hydrate(item));
    return { items, hasMore: page * pageSize < result.total };
  }

  // countryCode is not a filter of the platform list: narrow here and paginate what was kept.
  const kept: IndexRow[] = [];
  let cursor = 1;
  for (;;) {
    const result = await ctx.mdm.collection.listByType({
      type: 'onboarding.OrganizationMember',
      ...(name ? { name } : {}),
      ...(status ? { status } : {}),
      page: cursor,
      pageSize: 200,
    });
    for (const item of result.items) {
      if (text(asRecord(item.details).countryCode) === countryCode) kept.push(item);
    }
    if (cursor * 200 >= result.total || result.items.length === 0) break;
    cursor += 1;
  }
  const start = (page - 1) * pageSize;
  const slice = kept.slice(start, start + pageSize);
  const items: OrganizationMember[] = [];
  for (const row of slice) items.push(await hydrate(row));
  return { items, hasMore: start + pageSize < kept.length };
}
