/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/listAtendente.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface ListAtendenteInput {
  includeInactive?: boolean;
}

export interface ListAtendenteItem {
  atendenteId: string;
  platformUserId: string;
}

export type ListAtendenteOutput = ListAtendenteItem[];

function readString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

export async function listAtendente(
  ctx: RequestContext,
  input: ListAtendenteInput,
): Promise<ListAtendenteOutput> {
  const listed = await ctx.mdm.collection.listByType({
    type: 'controleChamados.Atendente',
    status: input.includeInactive ? undefined : 'Active',
  });

  const entities = await ctx.mdm.collection.getMany({
    mdmIds: listed.items.map((record) => record.mdmId),
  });
  const entityById = new Map(entities.map((entity) => [entity.mdmId, entity]));

  return listed.items.map((record) => {
    const entity = entityById.get(record.mdmId);
    const details = (entity?.details ?? {}) as unknown as Record<string, unknown>;
    const moduleDetails = (details.controleChamados ?? {}) as unknown as Record<string, unknown>;
    const atendenteId = readString(moduleDetails.atendenteId) ?? readString(details.atendenteId) ?? record.mdmId;
    const platformUserId = readString(moduleDetails.platformUserId) ?? readString(details.platformUserId);
    if (!platformUserId) {
      throw new AppError(
        'VALIDATION_ERROR',
        'Atendente is missing its platform user identifier.',
        400,
        { mdmId: record.mdmId, field: 'platformUserId' },
      );
    }
    return { atendenteId, platformUserId };
  });
}
