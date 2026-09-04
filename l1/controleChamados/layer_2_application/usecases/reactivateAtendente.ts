/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/reactivateAtendente.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface ReactivateAtendenteInput {
  atendenteId: string;
}

export interface ReactivateAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}

export async function reactivateAtendente(
  ctx: RequestContext,
  input: ReactivateAtendenteInput,
): Promise<ReactivateAtendenteOutput> {
  if (!input.atendenteId) {
    throw new AppError('VALIDATION_ERROR', 'The atendenteId is required.', 400, {
      field: 'atendenteId',
    });
  }

  const reactivated = await ctx.data.runInTransaction(async () => {
    const entity = await ctx.mdm.entity.get({ mdmId: input.atendenteId });
    if (!entity) {
      throw new AppError('NOT_FOUND', 'Atendente was not found.', 404, {
        atendenteId: input.atendenteId,
      });
    }

    const updated = await ctx.mdm.entity.reactivate({
      mdmId: input.atendenteId,
      expectedVersion: entity.version,
    });
    return updated;
  });

  const details = reactivated.details as unknown as Record<string, unknown>;
  const moduleDetails = details.controleChamados as unknown as Record<string, unknown> | undefined;
  const atendenteId = (moduleDetails?.atendenteId ?? details.atendenteId ?? reactivated.mdmId) as string;
  const platformUserId = (moduleDetails?.platformUserId ?? details.platformUserId) as string | undefined;

  if (!platformUserId) {
    throw new AppError('VALIDATION_ERROR', 'The reactivated Atendente has no platform user.', 400, {
      atendenteId,
      field: 'platformUserId',
    });
  }

  return {
    atendenteId,
    platformUserId,
  };
}
