/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/listPrivacyTextVersion.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { PrivacyTextVersion } from '/_102039_/l1/onboarding/layer_3_domain/entities/privacyTextVersion.js';
import type { PrivacyTextVersionRepository } from '/_102039_/l1/onboarding/layer_2_application/ports/privacyTextVersionRepository.js';
export interface ListPrivacyTextVersionInput extends Record<string, unknown> {
id?: string;
versionCode?: string;
status?: string;
publishedAt?: string;
details?: {
text?: string;
isProvisional?: boolean;
changeNote?: string;
isCurrent?: boolean;
};
page: number;
pageSize: number;
}
export interface ListPrivacyTextVersionOutput extends Record<string, unknown> {
items: PrivacyTextVersion[];
hasMore: boolean;
}
export async function listPrivacyTextVersion(input: ListPrivacyTextVersionInput, ctx: RequestContext): Promise<ListPrivacyTextVersionOutput> {
const repository = resolveRepository<PrivacyTextVersionRepository>(ctx, 'PrivacyTextVersionRepository');
const filled = (value: unknown): boolean => value !== undefined && value !== null && value !== '';

const where: Record<string, unknown> = {};
if (filled(input.id)) where.id = String(input.id);
if (filled(input.versionCode)) where.versionCode = String(input.versionCode);
if (filled(input.status)) where.status = String(input.status);
if (filled(input.publishedAt)) where.publishedAt = String(input.publishedAt);

const codeNumber = (item: PrivacyTextVersion): number => {
const n = Number(item.versionCode);
return Number.isFinite(n) ? n : 0;
};
const publishedTime = (item: PrivacyTextVersion): number => {
if (!item.publishedAt) return Number.POSITIVE_INFINITY;
const t = Date.parse(item.publishedAt);
return Number.isFinite(t) ? t : 0;
};
const newestFirst = (a: PrivacyTextVersion, b: PrivacyTextVersion): number => {
const ta = publishedTime(a);
const tb = publishedTime(b);
if (ta !== tb) return ta < tb ? 1 : -1;
return codeNumber(b) - codeNumber(a);
};

// The current version is derived: the latest published one, among all published versions.
const published = await repository.list({ status: 'published' });
const latest = [...published].sort(newestFirst)[0];
const currentId = latest ? latest.id : undefined;

const found = await repository.list(where);
const details = input.details;
const withCurrent: PrivacyTextVersion[] = found.map((item) => ({
...item,
details: { ...item.details, isCurrent: item.status === 'published' && item.id === currentId },
}));

const kept = withCurrent.filter((item) => {
if (details === undefined || details === null) return true;
if (filled(details.text) && item.details.text !== details.text) return false;
if (details.isProvisional !== undefined && details.isProvisional !== null && item.details.isProvisional !== details.isProvisional) return false;
if (filled(details.changeNote) && item.details.changeNote !== details.changeNote) return false;
if (details.isCurrent !== undefined && details.isCurrent !== null && item.details.isCurrent !== details.isCurrent) return false;
return true;
}).sort(newestFirst);

const page = Math.max(1, Math.trunc(Number(input.page)) || 1);
const size = Math.min(200, Math.max(1, Math.trunc(Number(input.pageSize)) || 20));
const start = (page - 1) * size;
const items = kept.slice(start, start + size);
return { items, hasMore: start + size < kept.length };
}
