/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/getComentario.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IComentarioRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/comentarioRepository.js';

export interface GetComentarioInput {
  comentarioId: string;
}

export interface GetComentarioOutput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export async function getComentario(
  ctx: RequestContext,
  input: GetComentarioInput,
): Promise<GetComentarioOutput> {
  const comentarios = resolveRepository<IComentarioRepository>(ctx, 'Comentario');
  const comentario = await comentarios.getById(input.comentarioId);
  if (!comentario) {
    throw new AppError(
      'NOT_FOUND',
      `Comentario not found: ${input.comentarioId}`,
      404,
      { comentarioId: input.comentarioId },
    );
  }
  return {
    comentarioId: comentario.comentarioId,
    chamadoId: comentario.chamadoId,
    atendenteId: comentario.atendenteId,
    conteudo: comentario.conteudo,
  };
}
