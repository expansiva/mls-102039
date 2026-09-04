/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/registerComentario.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IComentarioRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/comentarioRepository';
import type { IChamadoRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/chamadoRepository';
import type { Comentario } from '/_102039_/l1/controleChamados/layer_3_domain/entities/comentario';
import { isComentarioConteudoValido } from '/_102039_/l1/controleChamados/layer_3_domain/entities/comentario';

export interface RegisterComentarioInput {
  atendenteId: string;
  chamadoId: string;
  conteudo: string;
}

export interface RegisterComentarioOutput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export async function registerComentario(
  ctx: RequestContext,
  input: RegisterComentarioInput,
): Promise<RegisterComentarioOutput> {
  const chamados = resolveRepository<IChamadoRepository>(ctx, 'Chamado');
  await ctx.mdm.entity.get({ mdmId: input.atendenteId });

  if (!isComentarioConteudoValido(input.conteudo)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Comment content must not be empty.',
      400,
      { field: 'conteudo' },
    );
  }

  const chamado = await chamados.getById(input.chamadoId);
  if (!chamado) {
    throw new AppError('NOT_FOUND', `Chamado not found: ${input.chamadoId}`, 404, {
      chamadoId: input.chamadoId,
    });
  }

  // rule: comentariosPermitidosSomenteEmChamadosAbertos
  if (chamado.status !== 'open') {
    throw new AppError(
      'VALIDATION_ERROR',
      'comentariosPermitidosSomenteEmChamadosAbertos: comments may only be registered for open tickets.',
      400,
      {
        ruleId: 'comentariosPermitidosSomenteEmChamadosAbertos',
        chamadoId: input.chamadoId,
        status: chamado.status,
      },
    );
  }

  const comentario = await ctx.data.runInTransaction(async (tx) => {
    const transactionContext: RequestContext = { ...ctx, data: tx };
    const comentarios = resolveRepository<IComentarioRepository>(transactionContext, 'Comentario');
    const aggregate: Comentario = {
      comentarioId: ctx.idGenerator.newId(),
      chamadoId: input.chamadoId,
      atendenteId: input.atendenteId,
      conteudo: input.conteudo,
    };
    await comentarios.save(aggregate);
    return aggregate;
  });

  return {
    comentarioId: comentario.comentarioId,
    chamadoId: comentario.chamadoId,
    atendenteId: comentario.atendenteId,
    conteudo: comentario.conteudo,
  };
}
