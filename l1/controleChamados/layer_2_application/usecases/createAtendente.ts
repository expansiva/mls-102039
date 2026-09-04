/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/createAtendente.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface CreateAtendenteInput {
  platformUserId: string;
}

export interface CreateAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}

export async function createAtendente(
  ctx: RequestContext,
  input: CreateAtendenteInput,
): Promise<CreateAtendenteOutput> {
  const platformUserId = input.platformUserId?.trim();
  if (!platformUserId) {
    throw new AppError(
      'VALIDATION_ERROR',
      'platformUserId is required.',
      400,
      { field: 'platformUserId' },
    );
  }

  const created = await ctx.mdm.entity.create({
    details: {
      subtype: 'Person',
      name: platformUserId,
      status: 'Active',
      moduleTypes: ['controleChamados.Atendente'],
      tags: ['controleChamados'],
      controleChamados: {
        platformUserId,
      },
    },
  });

  return {
    atendenteId: created.mdmId,
    platformUserId,
  };
}
