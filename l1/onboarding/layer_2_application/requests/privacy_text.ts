/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/requests/privacy_text.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listPrivacyTextVersion, type ListPrivacyTextVersionOutput } from '/_102039_/l1/onboarding/layer_2_application/usecases/listPrivacyTextVersion.js';
import { createPrivacyTextVersion } from '/_102039_/l1/onboarding/layer_2_application/usecases/createPrivacyTextVersion.js';
import { publishPrivacyVersion } from '/_102039_/l1/onboarding/layer_2_application/usecases/publishPrivacyVersion.js';
import type { Privacy_textContracts, PrivacyTextVersionRecord } from '/_102039_/l2/onboarding/web/contracts/privacy_text.defs.js';

type VersionItem = ListPrivacyTextVersionOutput['items'][number];

interface VersionSource {
  id: string;
  version: number;
  versionCode: string;
  status: string;
  publishedAt?: string | null;
  details: { text: string; isProvisional: boolean; changeNote?: string | null };
}

const PAGE_SIZE = 200;

function requireOwner(ctx: RequestContext): void {
  const scope = ctx.sessionContext.actorScope ?? [];
  const isOwner = scope.some((item) => item === 'companyOwner' || item.endsWith(':companyOwner'));
  if (!isOwner) {
    throw new AppError('FORBIDDEN', 'Only the company owner can create and publish privacy text versions.', 403, { ruleId: 'onlyOwnerMaintainsPrivacyText' });
  }
}

async function loadAllVersions(ctx: RequestContext): Promise<VersionItem[]> {
  const all: VersionItem[] = [];
  let page = 1;
  for (;;) {
    const result = await listPrivacyTextVersion({ page, pageSize: PAGE_SIZE }, ctx);
    all.push(...result.items);
    if (!result.hasMore) break;
    page += 1;
  }
  return all;
}

function hasPublishedAt(item: VersionSource): boolean {
  return item.status === 'published' && item.publishedAt != null;
}

// currentVersionIsLatestPublished: the current version is the published version with the latest publishedAt.
function findCurrent<T extends VersionSource>(items: T[]): T | undefined {
  let best: T | undefined;
  for (const item of items) {
    if (!hasPublishedAt(item)) continue;
    if (best === undefined) {
      best = item;
      continue;
    }
    const left = String(item.publishedAt);
    const right = String(best.publishedAt);
    if (left > right || (left === right && item.version > best.version)) best = item;
  }
  return best;
}

function toRecord(source: VersionSource, isCurrent: boolean): PrivacyTextVersionRecord {
  if (source.status !== 'draft' && source.status !== 'published') {
    throw new AppError('INVALID_STATE', `Privacy text version ${source.versionCode} has an unknown status: ${source.status}`, 500, { id: source.id });
  }
  const details: PrivacyTextVersionRecord['details'] = {
    text: source.details.text,
    isProvisional: source.details.isProvisional,
    isCurrent,
  };
  if (source.details.changeNote != null) details.changeNote = source.details.changeNote;
  const record: PrivacyTextVersionRecord = {
    id: source.id,
    version: source.version,
    versionCode: source.versionCode,
    status: source.status,
    details,
    ...(source.publishedAt != null ? { publishedAt: source.publishedAt } : {}),
  };
  return record;
}

export const requests: { [K in keyof Privacy_textContracts]: (input: Privacy_textContracts[K]['input'], ctx: RequestContext) => Promise<Privacy_textContracts[K]['output']> } = {
  "onboarding.privacy_text.getPrivacyTextPage": async function (input, ctx) {
    const all = await loadAllVersions(ctx);
    const currentItem = findCurrent(all);
    const currentId = currentItem ? currentItem.id : undefined;
    // Drafts at the top (most recent first), then published by publishedAt, newest first.
    const drafts = all.filter((item) => item.status === 'draft').sort((a, b) => b.version - a.version);
    const published = all
      .filter((item) => item.status !== 'draft')
      .sort((a, b) => {
        const left = String(a.publishedAt ?? '');
        const right = String(b.publishedAt ?? '');
        if (left === right) return b.version - a.version;
        return left < right ? 1 : -1;
      });
    const ordered = [...drafts, ...published];
    // initialProvisionalPrivacyText: isProvisional is returned exactly as stored (never recalculated),
    // so the initial version 1 keeps isProvisional true and the owner sees it must be replaced.
    const versions = ordered.map((item) => toRecord(item, item.id === currentId));
    const output: Privacy_textContracts['onboarding.privacy_text.getPrivacyTextPage']['output'] = { versions };
    // initialProvisionalPrivacyText: the current record carries the stored provisional flag of version 1.
    if (currentItem) output.current = toRecord(currentItem, true);
    if (drafts.length > 0) output.draft = toRecord(drafts[0], false);
    return output;
  },

  "onboarding.privacy_text.createPrivacyVersion": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      requireOwner(bound);
      const details: { text: string; isProvisional: boolean; changeNote?: string } = {
        text: input.details.text,
        isProvisional: false,
      };
      if (input.details.changeNote != null) details.changeNote = input.details.changeNote;
      // publishedVersionImmutable: only a new draft version is created; no published version is touched.
      const created = await createPrivacyTextVersion({ status: 'draft', details }, bound);
      // privacyVersionCodeFromSequence: the new version must carry the version code issued by the platform sequence.
      if (created.versionCode == null || String(created.versionCode) === '') {
        throw new AppError('INVALID_STATE', 'The new privacy text version did not receive a version code from the number sequence.', 500, { ruleId: 'privacyVersionCodeFromSequence', id: created.id });
      }
      // A new version is a draft: isCurrent is computed and false for a draft.
      return { version: toRecord(created, false) };
    });
  },

  "onboarding.privacy_text.publishPrivacyVersion": async function (input, ctx) {
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      requireOwner(bound);
      const before = await loadAllVersions(bound);
      const target = before.find((item) => item.id === String(input.id));
      if (!target) {
        throw new AppError('NOT_FOUND', 'Privacy text version not found.', 404, { id: input.id });
      }
      if (target.status !== 'draft') {
        throw new AppError('INVALID_STATE', `Privacy text version ${target.versionCode} is not a draft and cannot be published.`, 409, { ruleId: 'publishedVersionImmutable', id: input.id });
      }
      if (target.version !== Number(input.version)) {
        throw new AppError('CONFLICT', `Privacy text version ${target.versionCode} was changed by someone else; reload it and try again.`, 409, { id: input.id, expectedVersion: Number(input.version), currentVersion: target.version });
      }
      const published = await publishPrivacyVersion({ id: String(input.id), version: Number(input.version) }, bound);
      // currentVersionIsLatestPublished: computed from the versions after the transition.
      const after = await loadAllVersions(bound);
      const current = findCurrent(after);
      // newCurrentVersionRequiresReacceptance: the published version must now be the current one,
      // so every acceptance of an earlier version code stops being valid for completing access.
      if (current === undefined || current.id !== published.id) {
        throw new AppError('INVALID_STATE', `Privacy text version ${published.versionCode} did not become the current privacy text after publishing.`, 500, { ruleId: 'newCurrentVersionRequiresReacceptance', id: published.id });
      }
      // reacceptOnNewPrivacyVersion: consentValid is computed against the current version code (now the one just published),
      // so earlier acceptances need to be renewed; no person record is written here.
      if (current.versionCode !== published.versionCode) {
        throw new AppError('INVALID_STATE', `The current privacy text code does not match the published version ${published.versionCode}.`, 500, { ruleId: 'reacceptOnNewPrivacyVersion', id: published.id });
      }
      return { version: toRecord(published, true) };
    });
  },
};
