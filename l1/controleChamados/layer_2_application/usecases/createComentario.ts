/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/createComentario.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IComentarioRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/comentarioRepository';
import type { IChamadoRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/chamadoRepository';
import type { Comentario } from '/_102039_/l1/controleChamados/layer_3_domain/entities/comentario';
import { isComentarioConteudoValido } from '/_102039_/l1/controleChamados/layer_3_domain/entities/comentario';

export interface CreateComentarioInput {
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export interface CreateComentarioOutput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export async function createComentario(
  ctx: RequestContext,
  input: CreateComentarioInput,
): Promise<CreateComentarioOutput> {
  if (!isComentarioConteudoValido(input.conteudo)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Comment content must not be empty.',
      400,
      { field: 'conteudo' },
    );
  }

  const result = await ctx.data.runInTransaction(async (tx) => {
    const transactionContext: RequestContext = { ...ctx, data: tx };
    const chamados = resolveRepository<IChamadoRepository>(transactionContext, 'Chamado');
    const comentarios = resolveRepository<IComentarioRepository>(transactionContext, 'Comentario');
    const chamado = await chamados.getById(input.chamadoId);

    if (!chamado) {
      throw new AppError(
        'NOT_FOUND',
        'The selected ticket was not found.',
        404,
        { chamadoId: input.chamadoId },
      );
    }

    if (String(chamado.status) !== 'open') {
      throw new AppError(
        'VALIDATION_ERROR',
        'Comments can only be registered for open tickets.',
        400,
        {
          ruleId: 'comentariosPermitidosSomenteEmChamadosAbertos',
          chamadoId: input.chamadoId,
          status: chamado.status,
        },
      );
    }

    const comentario: Comentario = {
      comentarioId: ctx.idGenerator.newId(),
      chamadoId: input.chamadoId,
      atendenteId: input.atendenteId,
      conteudo: input.conteudo,
    };
    await comentarios.save(comentario);
    return comentario;
  });

  return {
    comentarioId: result.comentarioId,
    chamadoId: result.chamadoId,
    atendenteId: result.atendenteId,
    conteudo: result.conteudo,
  };
}
