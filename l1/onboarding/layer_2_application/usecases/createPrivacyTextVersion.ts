/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/createPrivacyTextVersion.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { PrivacyTextVersionRepository } from '/_102039_/l1/onboarding/layer_2_application/ports/privacyTextVersionRepository.js';
import type { PrivacyTextVersion } from '/_102039_/l1/onboarding/layer_3_domain/entities/privacyTextVersion.js';

export interface CreatePrivacyTextVersionInput extends Record<string, unknown> {
  status: string;
  details: {
    text: string;
    isProvisional: boolean;
    changeNote?: string;
  };
}

export interface CreatePrivacyTextVersionOutput extends Record<string, unknown> {
  id: string;
  version: number;
  versionCode: string;
  status: string;
  publishedAt?: string;
  details: {
    text: string;
    isProvisional: boolean;
    changeNote?: string;
    isCurrent?: boolean;
  };
}

function isCompanyOwner(ctx: RequestContext): boolean {
  const session = ctx.sessionContext;
  const scope: string[] = [];
  if (Array.isArray(session.actorScope)) scope.push(...session.actorScope);
  if (Array.isArray(session.actorSession?.scope)) scope.push(...(session.actorSession.scope as string[]));
  const actorId = session.actorId ?? session.actorSession?.actorId;
  if (actorId === 'companyOwner' || actorId === 'onboarding:companyOwner') return true;
  return scope.some((s) => s === 'companyOwner' || s === 'onboarding:companyOwner');
}

export async function createPrivacyTextVersion(input: CreatePrivacyTextVersionInput, ctx: RequestContext): Promise<CreatePrivacyTextVersionOutput> {
  if (!isCompanyOwner(ctx)) {
    throw new AppError('FORBIDDEN', 'Only the company owner can create privacy text versions.', 403, { ruleId: 'onlyOwnerMaintainsPrivacyText' });
  }
  const repository = resolveRepository<PrivacyTextVersionRepository>(ctx, 'PrivacyTextVersionRepository');

  const text = typeof input.details?.text === 'string' ? input.details.text.trim() : '';
  if (text.length === 0) {
    throw new AppError('INVALID_TEXT', 'The privacy text is required.', 400);
  }
  const rawNote = input.details?.changeNote;
  let changeNote: string | undefined;
  if (rawNote !== undefined && rawNote !== null) {
    changeNote = String(rawNote);
    if (changeNote.length > 500) {
      throw new AppError('INVALID_CHANGE_NOTE', 'The change note must have at most 500 characters.', 400);
    }
  }
  const requestedProvisional = input.details?.isProvisional === true;

  const existing = await repository.list({});

  // Next version code from the platform number sequence: highest stored code plus one (1 when there is none).
  let highest = 0;
  for (const item of existing) {
    const n = Number(item.versionCode);
    if (!Number.isInteger(n) || n < 1) {
      throw new AppError('INVALID_VERSION_SEQUENCE', 'A stored privacy version has a version code that is not a sequence number, so the next code cannot be issued.', 409, { ruleId: 'privacyVersionCodeFromSequence' });
    }
    if (n > highest) highest = n;
  }
  const versionCode = String(highest + 1);
  if (existing.some((item) => item.versionCode === versionCode)) {
    throw new AppError('VERSION_CODE_TAKEN', 'The next version code from the sequence is already used by another version.', 409, { ruleId: 'privacyVersionCodeFromSequence' });
  }

  const isFirst = existing.length === 0;
  let status: 'draft' | 'published';
  let isProvisional: boolean;
  let publishedAt: string | undefined;

  if (isFirst) {
    // The module starts with the initial provisional text, published as version 1.
    status = 'published';
    isProvisional = true;
    publishedAt = ctx.clock.nowIso();
  } else {
    if (requestedProvisional) {
      throw new AppError('PROVISIONAL_ONLY_INITIAL', 'Only the initial version 1 can be marked as provisional.', 400, { ruleId: 'initialProvisionalPrivacyText' });
    }
    const requestedStatus = input.status === undefined || input.status === null ? 'draft' : String(input.status);
    if (requestedStatus !== 'draft') {
      throw new AppError('INVALID_STATUS', 'A new privacy text version is created as a draft and published afterwards.', 400);
    }
    status = 'draft';
    isProvisional = false;
  }

  const record: PrivacyTextVersion = {
    id: ctx.idGenerator.newId(),
    version: 1,
    versionCode,
    status,
    details: {
      text,
      isProvisional,
    },
  };
  if (publishedAt !== undefined) record.publishedAt = publishedAt;
  if (changeNote !== undefined) record.details.changeNote = changeNote;

  const created = await repository.create(record);

  const output: CreatePrivacyTextVersionOutput = {
    id: created.id,
    version: created.version,
    versionCode: created.versionCode,
    status: created.status,
    details: {
      text: created.details.text,
      isProvisional: created.details.isProvisional,
      isCurrent: created.status === 'published',
    },
  };
  if (created.publishedAt !== undefined) output.publishedAt = created.publishedAt;
  if (created.details.changeNote !== undefined) output.details.changeNote = created.details.changeNote;
  return output;
}
