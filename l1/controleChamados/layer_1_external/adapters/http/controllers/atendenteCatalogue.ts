/// <mls fileReference="_102039_/l1/controleChamados/layer_1_external/adapters/http/controllers/atendenteCatalogue.ts" enhancement="_blank"/>

import { ok, fail, AppError, type BffHandler, type BffResponse, type ControllerRoute, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listAtendente, type ListAtendenteInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/listAtendente';
import { createAtendente, type CreateAtendenteInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/createAtendente';
import { updateAtendente, type UpdateAtendenteInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/updateAtendente';
import { inactivateAtendente, type InactivateAtendenteInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/inactivateAtendente';
import { reactivateAtendente, type ReactivateAtendenteInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/reactivateAtendente';
import { getAtendente, type GetAtendenteInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/getAtendente';

const ALLOWED: readonly string[] = ['internal'];

function enforceActors(ctx: RequestContext, allowed: readonly string[], route: string): BffResponse | null {
  if (allowed.length === 0) return null;
  const scope = ctx.sessionContext?.actorScope ?? [];
  if (scope.length === 0) {
    ctx.log.info('bff.actor.no-scope', { route, allowed });
    return null;
  }
  if (scope.some((value) => allowed.includes(value))) return null;
  return fail(new AppError('FORBIDDEN_ACTOR', 'actor scope not permitted for ' + route, 403, { route }));
}

function isIdentifier(value: unknown): value is string {
  return typeof value === 'string'
    && value.length > 0
    && value.trim() === value
    && !/\s/.test(value)
    && /^[A-Za-z0-9_-]+$/.test(value);
}

function requireIdentifier(value: unknown, field: string): string {
  if (!isIdentifier(value)) {
    throw new AppError('VALIDATION_ERROR', field + ' must be a valid identifier', 400, { field });
  }
  return value;
}

export const atendenteCatalogueQryListAtendenteHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.atendenteCatalogue.qryListAtendente';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as { includeInactive?: unknown };
  if (params.includeInactive !== undefined && typeof params.includeInactive !== 'boolean') {
    throw new AppError('VALIDATION_ERROR', 'includeInactive must be a boolean', 400, { field: 'includeInactive' });
  }
  const input: ListAtendenteInput = {
    includeInactive: params.includeInactive === undefined ? undefined : params.includeInactive,
  };
  const result = await listAtendente(ctx, input);
  return ok(result.map((row) => ({
    atendenteId: row.atendenteId,
    platformUserId: row.platformUserId,
  })));
};

export const atendenteCatalogueCmdCreateAtendenteHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.atendenteCatalogue.cmdCreateAtendente';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as { platformUserId?: unknown };
  const input: CreateAtendenteInput = {
    platformUserId: requireIdentifier(params.platformUserId, 'platformUserId'),
  };
  const result = await createAtendente(ctx, input);
  return ok({ atendenteId: result.atendenteId, platformUserId: result.platformUserId });
};

export const atendenteCatalogueCmdUpdateAtendenteHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.atendenteCatalogue.cmdUpdateAtendente';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as { atendenteId?: unknown; platformUserId?: unknown };
  const input: UpdateAtendenteInput = {
    atendenteId: requireIdentifier(params.atendenteId, 'atendenteId'),
    platformUserId: requireIdentifier(params.platformUserId, 'platformUserId'),
  };
  const result = await updateAtendente(ctx, input);
  return ok({ atendenteId: result.atendenteId, platformUserId: result.platformUserId });
};

export const atendenteCatalogueCmdInactivateAtendenteHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.atendenteCatalogue.cmdInactivateAtendente';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as { atendenteId?: unknown };
  const input: InactivateAtendenteInput = {
    atendenteId: requireIdentifier(params.atendenteId, 'atendenteId'),
  };
  const result = await inactivateAtendente(ctx, input);
  return ok({ atendenteId: result.atendenteId, platformUserId: result.platformUserId });
};

export const atendenteCatalogueCmdReactivateAtendenteHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.atendenteCatalogue.cmdReactivateAtendente';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as { atendenteId?: unknown };
  const input: ReactivateAtendenteInput = {
    atendenteId: requireIdentifier(params.atendenteId, 'atendenteId'),
  };
  const result = await reactivateAtendente(ctx, input);
  return ok({ atendenteId: result.atendenteId, platformUserId: result.platformUserId });
};

export const atendenteCatalogueQryGetAtendenteHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.atendenteCatalogue.qryGetAtendente';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as { atendenteId?: unknown };
  const input: GetAtendenteInput = {
    atendenteId: requireIdentifier(params.atendenteId, 'atendenteId'),
  };
  const result = await getAtendente(ctx, input);
  return ok({ atendenteId: result.atendenteId, platformUserId: result.platformUserId });
};

export const routes: ControllerRoute[] = [
  { key: 'controleChamados.atendenteCatalogue.qryListAtendente', handler: atendenteCatalogueQryListAtendenteHandler },
  { key: 'controleChamados.atendenteCatalogue.cmdCreateAtendente', handler: atendenteCatalogueCmdCreateAtendenteHandler },
  { key: 'controleChamados.atendenteCatalogue.cmdUpdateAtendente', handler: atendenteCatalogueCmdUpdateAtendenteHandler },
  { key: 'controleChamados.atendenteCatalogue.cmdInactivateAtendente', handler: atendenteCatalogueCmdInactivateAtendenteHandler },
  { key: 'controleChamados.atendenteCatalogue.cmdReactivateAtendente', handler: atendenteCatalogueCmdReactivateAtendenteHandler },
  { key: 'controleChamados.atendenteCatalogue.qryGetAtendente', handler: atendenteCatalogueQryGetAtendenteHandler },
];