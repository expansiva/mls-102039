/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/getOrganizationMember.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface GetOrganizationMemberInput extends Record<string, unknown> {
id: string;
}

export interface GetOrganizationMemberOutput extends Record<string, unknown> {
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

function asRecord(value: unknown): Record<string, unknown> {
return value !== null && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function text(value: unknown): string | undefined {
return value == null || value === '' ? undefined : String(value);
}

export async function getOrganizationMember(input: GetOrganizationMemberInput, ctx: RequestContext): Promise<GetOrganizationMemberOutput> {
const id = text(input.id);
if (id === undefined) {
throw new AppError('VALIDATION_ERROR', 'The member id is required.', 400);
}

const found = await ctx.mdm.entity.get({ mdmId: id });
if (!found || found.mdmId == null) {
throw new AppError('NOT_FOUND', 'Organization member was not found.', 404);
}

const flat = asRecord(found.details);
const nestedConsent = asRecord(flat.privacyConsent ?? asRecord(flat.person).privacyConsent);

const consent: { consentVersion?: string; consentedAt?: string; channel?: string; revokedAt?: string } = {};
const consentVersion = text(flat.consentVersion) ?? text(nestedConsent.consentVersion);
const consentedAt = text(flat.consentedAt) ?? text(nestedConsent.consentedAt);
const channel = text(flat.channel) ?? text(nestedConsent.channel);
const revokedAt = text(flat.revokedAt) ?? text(nestedConsent.revokedAt);
if (consentVersion !== undefined) consent.consentVersion = consentVersion;
if (consentedAt !== undefined) consent.consentedAt = consentedAt;
if (channel !== undefined) consent.channel = channel;
if (revokedAt !== undefined) consent.revokedAt = revokedAt;

const output: GetOrganizationMemberOutput = {
id: String(found.mdmId),
version: Number(found.version),
details: {
identification: {
subtype: text(flat.subtype) ?? 'Person',
name: text(flat.name) ?? '',
status: text(flat.status) ?? '',
countryCode: text(flat.countryCode) ?? '',
createdAt: text(flat.createdAt) ?? '',
updatedAt: text(flat.updatedAt) ?? '',
},
},
};

if (flat.base != null) output.details.base = asRecord(flat.base);
if (Object.keys(consent).length > 0) output.details.person = { privacyConsent: consent };
if (flat.general != null) output.details.general = asRecord(flat.general);

const loginEmail = await ctx.mdm.identity.getLoginEmail(String(found.mdmId));
if (loginEmail != null) output.details.onboarding = { loginEmail };

return output;
}
