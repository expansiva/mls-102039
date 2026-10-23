/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/publishPrivacyVersion.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { PrivacyTextVersion } from '/_102039_/l1/onboarding/layer_3_domain/entities/privacyTextVersion.js';
import type { PrivacyTextVersionRepository } from '/_102039_/l1/onboarding/layer_2_application/ports/privacyTextVersionRepository.js';

export interface PublishPrivacyVersionInput extends Record<string, unknown> {
  id: string;
  version: number;
}

export interface PublishPrivacyVersionOutput extends Record<string, unknown> {
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
  const scope: string[] = [
    ...(session.actorScope ?? []),
    ...(session.actorSession.scope ?? []),
  ];
  if (session.actorId === 'companyOwner' || session.actorSession.actorId === 'companyOwner') return true;
  return scope.some((entry) => entry === 'companyOwner' || entry.endsWith(':companyOwner'));
}

export async function publishPrivacyVersion(input: PublishPrivacyVersionInput, ctx: RequestContext): Promise<PublishPrivacyVersionOutput> {
  if (!isCompanyOwner(ctx)) {
    throw new AppError('FORBIDDEN', 'Only the company owner can publish privacy text versions.', 403, { ruleId: 'onlyOwnerMaintainsPrivacyText' });
  }

  const id = String(input.id ?? '');
  if (!id) throw new AppError('VALIDATION_ERROR', 'The privacy text version id is required.', 400);
  const inputVersion = Number(input.version);
  if (!Number.isFinite(inputVersion)) {
    throw new AppError('VALIDATION_ERROR', 'The version read by the caller is required.', 400);
  }

  const repository = resolveRepository<PrivacyTextVersionRepository>(ctx, 'PrivacyTextVersionRepository');
  const found = await repository.list({ id });
  const current = found[0];
  if (!current) throw new AppError('NOT_FOUND', 'Privacy text version not found.', 404);

  if (current.status !== 'draft') {
    throw new AppError('CONFLICT', 'A published privacy text version is never changed; only a draft can be published.', 409, { ruleId: 'publishedVersionImmutable' });
  }
  if (current.version !== inputVersion) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  const publishedAt = ctx.clock.nowIso();
  const publishedMoment = Date.parse(publishedAt);
  if (!Number.isFinite(publishedMoment)) {
    throw new AppError('VALIDATION_ERROR', 'The publication moment is not a valid timestamp.', 400);
  }

  const currentCode = Number(current.versionCode);
  if (!Number.isInteger(currentCode) || currentCode < 1) {
    throw new AppError('INVALID_VERSION_SEQUENCE', 'The version code of this version is not a sequence number.', 409, { ruleId: 'privacyVersionCodeFromSequence' });
  }

  const alreadyPublished = await repository.list({ status: 'published' });
  for (const other of alreadyPublished) {
    if (other.id === current.id) continue;

    // currentVersionIsLatestPublished: the version published now must come after every published one.
    if (other.publishedAt !== undefined) {
      const otherMoment = Date.parse(other.publishedAt);
      if (Number.isFinite(otherMoment) && otherMoment > publishedMoment) {
        throw new AppError(
          'CONFLICT',
          'The current privacy text must be the most recently published version; another version was published later.',
          409,
          { ruleId: 'currentVersionIsLatestPublished' },
        );
      }
    }

    // newCurrentVersionRequiresReacceptance: the version published becomes the new current one only if
    // its code is above every earlier published code; acceptances are matched by version code, so
    // earlier acceptances stop being valid only when the new code differs from and follows them.
    const otherCode = Number(other.versionCode);
    if (!Number.isInteger(otherCode) || otherCode < 1) {
      throw new AppError('INVALID_VERSION_SEQUENCE', 'A published privacy version has a version code that is not a sequence number.', 409, { ruleId: 'privacyVersionCodeFromSequence' });
    }
    if (otherCode >= currentCode) {
      throw new AppError(
        'CONFLICT',
        'This version would not become the new current version, so earlier acceptances would not be renewed; its code must be higher than every published code.',
        409,
        { ruleId: 'newCurrentVersionRequiresReacceptance' },
      );
    }
  }

  const next: PrivacyTextVersion = {
    id: current.id,
    version: current.version,
    versionCode: current.versionCode,
    status: 'published',
    publishedAt,
    details: {
      text: current.details.text,
      isProvisional: current.details.isProvisional,
      ...(current.details.changeNote !== undefined ? { changeNote: current.details.changeNote } : {}),
    },
  };

  const saved = await repository.transition(next, 'publishPrivacyVersion');

  const details: PublishPrivacyVersionOutput['details'] = {
    text: saved.details.text,
    isProvisional: saved.details.isProvisional,
    // derived: published and no other version published after it (checked above)
    isCurrent: true,
  };
  if (saved.details.changeNote !== undefined) details.changeNote = saved.details.changeNote;

  const output: PublishPrivacyVersionOutput = {
    id: saved.id,
    version: saved.version,
    versionCode: saved.versionCode,
    status: saved.status,
    details,
  };
  if (saved.publishedAt !== undefined) output.publishedAt = saved.publishedAt;
  return output;
}
