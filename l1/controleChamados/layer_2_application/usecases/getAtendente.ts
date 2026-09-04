/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/getAtendente.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface GetAtendenteInput {
  atendenteId: string;
}

export interface GetAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}

export async function getAtendente(
  ctx: RequestContext,
  input: GetAtendenteInput,
): Promise<GetAtendenteOutput> {
  const atendente = await ctx.mdm.entity.get({ mdmId: input.atendenteId });
  if (!atendente) {
    throw new AppError('NOT_FOUND', 'Atendente not found.', 404, {
      atendenteId: input.atendenteId,
    });
  }

  const details = atendente.details as unknown as Record<string, unknown>;
  const atendenteId = details.atendenteId;
  const platformUserId = details.platformUserId;
  if (typeof atendenteId !== 'string' || typeof platformUserId !== 'string') {
    throw new AppError('NOT_FOUND', 'Atendente data is incomplete.', 404, {
      atendenteId: input.atendenteId,
    });
  }

  return { atendenteId, platformUserId };
}
