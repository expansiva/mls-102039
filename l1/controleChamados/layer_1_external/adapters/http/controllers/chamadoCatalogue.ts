/// <mls fileReference="_102039_/l1/controleChamados/layer_1_external/adapters/http/controllers/chamadoCatalogue.ts" enhancement="_blank"/>

import { ok, fail, AppError, type BffHandler, type BffResponse, type ControllerRoute, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listChamado, type ListChamadoInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/listChamado.js';
import { createChamado, type CreateChamadoInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/createChamado.js';
import { updateChamado, type UpdateChamadoInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/updateChamado.js';
import { deleteChamado, type DeleteChamadoInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/deleteChamado.js';
import { getChamado, type GetChamadoInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/getChamado.js';
import { locateChamado, type LocateChamadoInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/locateChamado.js';
import { closeChamado, type CloseChamadoInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/closeChamado.js';

const ALLOWED: readonly string[] = ['internal'];

function enforceActors(ctx: RequestContext, allowed: readonly string[], route: string): BffResponse | null {
  if (allowed.length === 0) return null;
  const scope = ctx.sessionContext?.actorScope ?? [];
  if (scope.length === 0) {
    ctx.log.info('bff.actor.no-scope', { route, allowed });
    return null;
  }
  if (scope.some((item) => allowed.includes(item))) return null;
  return fail(new AppError('FORBIDDEN_ACTOR', 'actor scope not permitted for ' + route, 403, { route }));
}

function requireText(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', field + ' is required', 400, { field });
  }
  return value;
}

function requireId(value: unknown, field: string): string {
  const id = requireText(value, field);
  if (!/^[A-Za-z0-9_-]+$/.test(id)) {
    throw new AppError('VALIDATION_ERROR', field + ' must be a valid identifier', 400, { field });
  }
  return id;
}

export const chamadoCatalogueQryListChamadoHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.chamadoCatalogue.qryListChamado');
  if (denial) return denial;
  const params = (request.params ?? {}) as { sortBy?: unknown; sortOrder?: unknown };
  let sortBy: ListChamadoInput['sortBy'];
  let sortOrder: ListChamadoInput['sortOrder'];
  if (params.sortBy !== undefined) {
    if (params.sortBy !== 'status') throw new AppError('VALIDATION_ERROR', 'sortBy must be status', 400, { field: 'sortBy' });
    sortBy = 'status';
  }
  if (params.sortOrder !== undefined) {
    if (params.sortOrder !== 'asc' && params.sortOrder !== 'desc') throw new AppError('VALIDATION_ERROR', 'sortOrder must be asc or desc', 400, { field: 'sortOrder' });
    sortOrder = params.sortOrder;
  }
  const result = await listChamado(ctx, { sortBy, sortOrder });
  return ok(result.map((row) => ({ chamadoId: row.chamadoId, titulo: row.titulo, descricao: row.descricao, status: row.status })));
};

export const chamadoCatalogueCmdCreateChamadoHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.chamadoCatalogue.cmdCreateChamado');
  if (denial) return denial;
  const params = (request.params ?? {}) as { titulo?: unknown; descricao?: unknown };
  const input: CreateChamadoInput = { titulo: requireText(params.titulo, 'titulo'), descricao: requireText(params.descricao, 'descricao') };
  const result = await createChamado(ctx, input);
  return ok({ chamadoId: result.chamadoId, titulo: result.titulo, descricao: result.descricao, status: result.status });
};

export const chamadoCatalogueCmdUpdateChamadoHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.chamadoCatalogue.cmdUpdateChamado');
  if (denial) return denial;
  const params = (request.params ?? {}) as { chamadoId?: unknown; titulo?: unknown; descricao?: unknown };
  const input: UpdateChamadoInput = {
    chamadoId: requireId(params.chamadoId, 'chamadoId'),
    titulo: requireText(params.titulo, 'titulo'),
    descricao: requireText(params.descricao, 'descricao'),
  };
  const result = await updateChamado(ctx, input);
  return ok({ chamadoId: result.chamadoId, titulo: result.titulo, descricao: result.descricao, status: result.status });
};

export const chamadoCatalogueCmdDeleteChamadoHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.chamadoCatalogue.cmdDeleteChamado');
  if (denial) return denial;
  const params = (request.params ?? {}) as { chamadoId?: unknown };
  const input: DeleteChamadoInput = { chamadoId: requireId(params.chamadoId, 'chamadoId') };
  const result = await deleteChamado(ctx, input);
  return ok({ chamadoId: result.chamadoId, titulo: result.titulo, descricao: result.descricao, status: result.status });
};

export const chamadoCatalogueQryGetChamadoHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.chamadoCatalogue.qryGetChamado');
  if (denial) return denial;
  const params = (request.params ?? {}) as { chamadoId?: unknown };
  const input: GetChamadoInput = { chamadoId: requireId(params.chamadoId, 'chamadoId') };
  const result = await getChamado(ctx, input);
  return ok({ chamadoId: result.chamadoId, titulo: result.titulo, descricao: result.descricao, status: result.status });
};

export const chamadoCatalogueQryLocateChamadoHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.chamadoCatalogue.qryLocateChamado');
  if (denial) return denial;
  void request;
  const input: LocateChamadoInput = {};
  const result = await locateChamado(ctx, input);
  return ok(result.map((row) => ({ chamadoId: row.chamadoId, titulo: row.titulo, descricao: row.descricao, status: row.status })));
};

export const chamadoCatalogueCmdCloseChamadoHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.chamadoCatalogue.cmdCloseChamado');
  if (denial) return denial;
  const params = (request.params ?? {}) as { chamadoId?: unknown; status?: unknown };
  const status = requireText(params.status, 'status');
  if (status !== 'closed') {
    throw new AppError('VALIDATION_ERROR', 'status must be closed', 400, { field: 'status' });
  }
  const input: CloseChamadoInput = {
    chamadoId: requireId(params.chamadoId, 'chamadoId'),
    status: 'closed',
  };
  const result = await closeChamado(ctx, input);
  return ok({ chamadoId: result.chamadoId, titulo: result.titulo, descricao: result.descricao, status: result.status });
};

export const routes: ControllerRoute[] = [
  { key: 'controleChamados.chamadoCatalogue.qryListChamado', handler: chamadoCatalogueQryListChamadoHandler },
  { key: 'controleChamados.chamadoCatalogue.cmdCreateChamado', handler: chamadoCatalogueCmdCreateChamadoHandler },
  { key: 'controleChamados.chamadoCatalogue.cmdUpdateChamado', handler: chamadoCatalogueCmdUpdateChamadoHandler },
  { key: 'controleChamados.chamadoCatalogue.cmdDeleteChamado', handler: chamadoCatalogueCmdDeleteChamadoHandler },
  { key: 'controleChamados.chamadoCatalogue.qryGetChamado', handler: chamadoCatalogueQryGetChamadoHandler },
  { key: 'controleChamados.chamadoCatalogue.qryLocateChamado', handler: chamadoCatalogueQryLocateChamadoHandler },
  { key: 'controleChamados.chamadoCatalogue.cmdCloseChamado', handler: chamadoCatalogueCmdCloseChamadoHandler },
];