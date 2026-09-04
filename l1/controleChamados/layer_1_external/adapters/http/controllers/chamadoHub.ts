/// <mls fileReference="_102039_/l1/controleChamados/layer_1_external/adapters/http/controllers/chamadoHub.ts" enhancement="_blank"/>

import {
  ok,
  fail,
  AppError,
  type BffHandler,
  type BffResponse,
  type ControllerRoute,
  type RequestContext,
} from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import {
  listChamado,
  type ListChamadoInput,
  type ListChamadoItem,
} from '/_102039_/l1/controleChamados/layer_2_application/usecases/listChamado.js';
import {
  listComentario,
  type ListComentarioInput,
  type ListComentarioItem,
} from '/_102039_/l1/controleChamados/layer_2_application/usecases/listComentario.js';

const ALLOWED: readonly string[] = ['internal'];

function enforceActors(
  ctx: RequestContext,
  allowed: readonly string[],
  route: string,
): BffResponse | null {
  if (allowed.length === 0) return null;
  const scope = ctx.sessionContext?.actorScope ?? [];
  if (scope.length === 0) {
    ctx.log.info('bff.actor.no-scope', { route, allowed });
    return null;
  }
  if (scope.some((value) => allowed.includes(value))) return null;
  return fail(
    new AppError(
      'FORBIDDEN_ACTOR',
      'actor scope not permitted for ' + route,
      403,
      { route },
    ),
  );
}

export const chamadoHubQryListChamadoHandler: BffHandler = async ({ request, ctx }) => {
  const route = 'controleChamados.chamadoHub.qryListChamado';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    sortBy?: string;
    sortOrder?: string;
  };
  if (params.sortBy !== undefined && params.sortBy !== 'status') {
    throw new AppError('VALIDATION_ERROR', 'sortBy must be status', 400, { field: 'sortBy' });
  }
  if (params.sortOrder !== undefined && params.sortOrder !== 'asc' && params.sortOrder !== 'desc') {
    throw new AppError(
      'VALIDATION_ERROR',
      'sortOrder must be asc or desc',
      400,
      { field: 'sortOrder' },
    );
  }

  const input: ListChamadoInput = {
    sortBy: params.sortBy as 'status' | undefined,
    sortOrder: params.sortOrder as 'asc' | 'desc' | undefined,
  };
  const result = await listChamado(ctx, input);
  const items: Array<{
    chamadoId: string;
    titulo: string;
    descricao: string;
    status: string;
  }> = result.map((row: ListChamadoItem) => ({
    chamadoId: row.chamadoId,
    titulo: row.titulo,
    descricao: row.descricao,
    status: row.status,
  }));
  return ok(items);
};

export const chamadoHubQryListComentarioHandler: BffHandler = async ({ request, ctx }) => {
  void request;
  const route = 'controleChamados.chamadoHub.qryListComentario';
  const denial = enforceActors(ctx, ALLOWED, route);
  if (denial) return denial;

  const input: ListComentarioInput = {};
  const result = await listComentario(ctx, input);
  const items: Array<{
    comentarioId: string;
    chamadoId: string;
    atendenteId: string;
    conteudo: string;
  }> = result.map((row: ListComentarioItem) => ({
    comentarioId: row.comentarioId,
    chamadoId: row.chamadoId,
    atendenteId: row.atendenteId,
    conteudo: row.conteudo,
  }));
  return ok(items);
};

export const routes: ControllerRoute[] = [
  {
    key: 'controleChamados.chamadoHub.qryListChamado',
    handler: chamadoHubQryListChamadoHandler,
  },
  {
    key: 'controleChamados.chamadoHub.qryListComentario',
    handler: chamadoHubQryListComentarioHandler,
  },
];
