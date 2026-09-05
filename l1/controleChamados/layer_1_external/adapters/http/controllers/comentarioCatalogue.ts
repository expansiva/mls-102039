/// <mls fileReference="_102039_/l1/controleChamados/layer_1_external/adapters/http/controllers/comentarioCatalogue.ts" enhancement="_blank"/>

import { ok, fail, AppError, type BffHandler, type BffResponse, type ControllerRoute, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { listComentario, type ListComentarioInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/listComentario.js';
import { createComentario, type CreateComentarioInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/createComentario.js';
import { updateComentario, type UpdateComentarioInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/updateComentario.js';
import { deleteComentario, type DeleteComentarioInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/deleteComentario.js';
import { getComentario, type GetComentarioInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/getComentario.js';
import { listChamado, type ListChamadoInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/listChamado.js';
import { listAtendente, type ListAtendenteInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/listAtendente.js';

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

function requireId(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.length === 0 || /\s/.test(value) || !/^[A-Za-z0-9_-]+$/.test(value)) {
    throw new AppError('VALIDATION_ERROR', field + ' must be a valid identifier', 400, { field });
  }
  return value;
}

function requireText(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new AppError('VALIDATION_ERROR', field + ' is required', 400, { field });
  }
  return value;
}

function optionalEnum<T extends string>(value: unknown, field: string, values: readonly T[]): T | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'string' || !values.includes(value as T)) {
    throw new AppError('VALIDATION_ERROR', field + ' has an invalid value', 400, { field, allowedValues: values });
  }
  return value as T;
}

function optionalBoolean(value: unknown, field: string): boolean | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'boolean') {
    throw new AppError('VALIDATION_ERROR', field + ' must be a boolean', 400, { field });
  }
  return value;
}

export const comentarioCatalogueQryListComentarioHandler: BffHandler = async ({ ctx }) => {
  const route = 'controleChamados.comentarioCatalogue.qryListComentario';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const result = await listComentario(ctx, {} as ListComentarioInput);
  return ok(result.map((row) => ({
    comentarioId: row.comentarioId,
    chamadoId: row.chamadoId,
    atendenteId: row.atendenteId,
    conteudo: row.conteudo,
  })));
};

export const comentarioCatalogueCmdCreateComentarioHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.comentarioCatalogue.cmdCreateComentario';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as Record<string, unknown>;
  const input: CreateComentarioInput = {
    chamadoId: requireId(params.chamadoId, 'chamadoId'),
    atendenteId: requireId(params.atendenteId, 'atendenteId'),
    conteudo: requireText(params.conteudo, 'conteudo'),
  };
  const result = await createComentario(ctx, input);
  return ok({ comentarioId: result.comentarioId, chamadoId: result.chamadoId, atendenteId: result.atendenteId, conteudo: result.conteudo });
};

export const comentarioCatalogueCmdUpdateComentarioHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.comentarioCatalogue.cmdUpdateComentario';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as Record<string, unknown>;
  const input: UpdateComentarioInput = {
    comentarioId: requireId(params.comentarioId, 'comentarioId'),
    chamadoId: requireId(params.chamadoId, 'chamadoId'),
    atendenteId: requireId(params.atendenteId, 'atendenteId'),
    conteudo: requireText(params.conteudo, 'conteudo'),
  };
  const result = await updateComentario(ctx, input);
  return ok({ comentarioId: result.comentarioId, chamadoId: result.chamadoId, atendenteId: result.atendenteId, conteudo: result.conteudo });
};

export const comentarioCatalogueCmdDeleteComentarioHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.comentarioCatalogue.cmdDeleteComentario';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as Record<string, unknown>;
  const input: DeleteComentarioInput = { comentarioId: requireId(params.comentarioId, 'comentarioId') };
  const result = await deleteComentario(ctx, input);
  return ok({ comentarioId: result.comentarioId, chamadoId: result.chamadoId, atendenteId: result.atendenteId, conteudo: result.conteudo });
};

export const comentarioCatalogueQryGetComentarioHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.comentarioCatalogue.qryGetComentario';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as Record<string, unknown>;
  const input: GetComentarioInput = { comentarioId: requireId(params.comentarioId, 'comentarioId') };
  const result = await getComentario(ctx, input);
  return ok({ comentarioId: result.comentarioId, chamadoId: result.chamadoId, atendenteId: result.atendenteId, conteudo: result.conteudo });
};

export const comentarioCatalogueQryChamadoPickerHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.comentarioCatalogue.qryChamadoPicker';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as Record<string, unknown>;
  const input: ListChamadoInput = {
    sortBy: optionalEnum(params.sortBy, 'sortBy', ['status'] as const),
    sortOrder: optionalEnum(params.sortOrder, 'sortOrder', ['asc', 'desc'] as const),
  };
  const result = await listChamado(ctx, input);
  return ok(result.map((row) => ({ chamadoId: row.chamadoId, titulo: row.titulo, descricao: row.descricao, status: row.status })));
};

export const comentarioCatalogueQryAtendentePickerHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.comentarioCatalogue.qryAtendentePicker';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;
  const params = (request.params ?? {}) as Record<string, unknown>;
  const input: ListAtendenteInput = { includeInactive: optionalBoolean(params.includeInactive, 'includeInactive') };
  const result = await listAtendente(ctx, input);
  return ok(result.map((row) => ({ atendenteId: row.atendenteId, platformUserId: row.platformUserId })));
};

export const routes: ControllerRoute[] = [
  { key: 'controleChamados.comentarioCatalogue.qryListComentario', handler: comentarioCatalogueQryListComentarioHandler },
  { key: 'controleChamados.comentarioCatalogue.cmdCreateComentario', handler: comentarioCatalogueCmdCreateComentarioHandler },
  { key: 'controleChamados.comentarioCatalogue.cmdUpdateComentario', handler: comentarioCatalogueCmdUpdateComentarioHandler },
  { key: 'controleChamados.comentarioCatalogue.cmdDeleteComentario', handler: comentarioCatalogueCmdDeleteComentarioHandler },
  { key: 'controleChamados.comentarioCatalogue.qryGetComentario', handler: comentarioCatalogueQryGetComentarioHandler },
  { key: 'controleChamados.comentarioCatalogue.qryChamadoPicker', handler: comentarioCatalogueQryChamadoPickerHandler },
  { key: 'controleChamados.comentarioCatalogue.qryAtendentePicker', handler: comentarioCatalogueQryAtendentePickerHandler },
];