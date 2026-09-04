/// <mls fileReference="_102039_/l1/controleChamados/layer_1_external/adapters/http/controllers/registrarComentarioChamado.ts" enhancement="_blank"/>

import { ok, fail, AppError, type BffHandler, type BffResponse, type ControllerRoute, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { locateChamado, type LocateChamadoInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/locateChamado.js';
import { registerComentario, type RegisterComentarioInput } from '/_102039_/l1/controleChamados/layer_2_application/usecases/registerComentario.js';
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

function isIdentifier(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && !/\s/.test(value) && /^[A-Za-z0-9_-]+$/.test(value);
}

export const registrarComentarioChamadoQryLocateChamadoHandler: BffHandler = async ({ ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.registrarComentarioChamado.qryLocateChamado');
  if (denial) return denial;
  const input: LocateChamadoInput = {};
  const result = await locateChamado(ctx, input);
  return ok(result.map((row) => ({
    chamadoId: row.chamadoId,
    titulo: row.titulo,
    descricao: row.descricao,
    status: row.status,
  })));
};

export const registrarComentarioChamadoCmdRegisterComentarioHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.registrarComentarioChamado.cmdRegisterComentario');
  if (denial) return denial;
  const params = (request.params ?? {}) as {
    atendenteId?: unknown;
    chamadoId?: unknown;
    conteudo?: unknown;
  };
  if (!isIdentifier(params.atendenteId)) {
    throw new AppError('VALIDATION_ERROR', 'atendenteId is required and must be a valid identifier', 400, { field: 'atendenteId' });
  }
  if (!isIdentifier(params.chamadoId)) {
    throw new AppError('VALIDATION_ERROR', 'chamadoId is required and must be a valid identifier', 400, { field: 'chamadoId' });
  }
  if (typeof params.conteudo !== 'string' || params.conteudo.length === 0) {
    throw new AppError('VALIDATION_ERROR', 'conteudo is required', 400, { field: 'conteudo' });
  }
  const input: RegisterComentarioInput = {
    atendenteId: params.atendenteId,
    chamadoId: params.chamadoId,
    conteudo: params.conteudo,
  };
  const result = await registerComentario(ctx, input);
  return ok({
    comentarioId: result.comentarioId,
    chamadoId: result.chamadoId,
    atendenteId: result.atendenteId,
    conteudo: result.conteudo,
  });
};

export const registrarComentarioChamadoQryAtendentePickerHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'controleChamados.registrarComentarioChamado.qryAtendentePicker');
  if (denial) return denial;
  const params = (request.params ?? {}) as { includeInactive?: unknown };
  if (params.includeInactive !== undefined && typeof params.includeInactive !== 'boolean') {
    throw new AppError('VALIDATION_ERROR', 'includeInactive must be a boolean', 400, { field: 'includeInactive' });
  }
  const input: ListAtendenteInput = {
    includeInactive: typeof params.includeInactive === 'boolean' ? params.includeInactive : undefined,
  };
  const result = await listAtendente(ctx, input);
  return ok(result.map((row) => ({
    atendenteId: row.atendenteId,
    platformUserId: row.platformUserId,
  })));
};

export const routes: ControllerRoute[] = [
  { key: 'controleChamados.registrarComentarioChamado.qryLocateChamado', handler: registrarComentarioChamadoQryLocateChamadoHandler },
  { key: 'controleChamados.registrarComentarioChamado.cmdRegisterComentario', handler: registrarComentarioChamadoCmdRegisterComentarioHandler },
  { key: 'controleChamados.registrarComentarioChamado.qryAtendentePicker', handler: registrarComentarioChamadoQryAtendentePickerHandler },
];
