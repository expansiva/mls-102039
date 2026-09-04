/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/inactivateAtendente.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface InactivateAtendenteInput {
  atendenteId: string;
}

export interface InactivateAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}

interface AtendenteDetails {
  atendenteId?: unknown;
  platformUserId?: unknown;
}

export async function inactivateAtendente(
  ctx: RequestContext,
  input: InactivateAtendenteInput,
): Promise<InactivateAtendenteOutput> {
  return ctx.data.runInTransaction(async () => {
    const atendente = await ctx.mdm.entity.get({ mdmId: input.atendenteId });
    const details = atendente.details as unknown as AtendenteDetails;
    const platformUserId = details.platformUserId;

    if (typeof platformUserId !== 'string') {
      throw new AppError(
        'VALIDATION_ERROR',
        'The Atendente record does not contain a valid platform user identifier.',
        400,
        { atendenteId: input.atendenteId, field: 'platformUserId' },
      );
    }

    // The canonical MDM type is controleChamados.Atendente; the platform facade derives it from the record.
    await ctx.mdm.entity.inactivate({
      mdmId: input.atendenteId,
      expectedVersion: atendente.version,
    });

    return {
      atendenteId: typeof details.atendenteId === 'string' ? details.atendenteId : input.atendenteId,
      platformUserId,
    };
  });
}
