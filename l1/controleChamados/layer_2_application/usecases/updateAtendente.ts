/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/updateAtendente.ts" enhancement="_blank"/>

import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { MdmDetailRecord } from '/_102034_/l1/mdm/module.js';

export interface UpdateAtendenteInput {
  atendenteId: string;
  platformUserId: string;
}

export interface UpdateAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}

export async function updateAtendente(
  ctx: RequestContext,
  input: UpdateAtendenteInput,
): Promise<UpdateAtendenteOutput> {
  const atendente = await ctx.mdm.entity.get({ mdmId: input.atendenteId });

  await ctx.mdm.entity.update({
    mdmId: atendente.mdmId,
    expectedVersion: atendente.version,
    patch: {
      platformUserId: input.platformUserId,
    } as unknown as Partial<MdmDetailRecord>,
  });

  return {
    atendenteId: input.atendenteId,
    platformUserId: input.platformUserId,
  };
}
