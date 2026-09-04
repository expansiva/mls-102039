/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/updateComentario.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IComentarioRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/comentarioRepository';
import type { IChamadoRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/chamadoRepository';
import type { Comentario } from '/_102039_/l1/controleChamados/layer_3_domain/entities/comentario';
import { isComentarioConteudoValido } from '/_102039_/l1/controleChamados/layer_3_domain/entities/comentario';

export interface UpdateComentarioInput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export interface ComentarioOutput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export async function updateComentario(
  ctx: RequestContext,
  input: UpdateComentarioInput,
): Promise<ComentarioOutput> {
  const updated = await ctx.data.runInTransaction(async (tx) => {
    const transactionContext: RequestContext = { ...ctx, data: tx };
    const comentarios = resolveRepository<IComentarioRepository>(transactionContext, 'Comentario');
    const chamados = resolveRepository<IChamadoRepository>(transactionContext, 'Chamado');

    const comentario = await comentarios.getById(input.comentarioId);
    if (!comentario) {
      throw new AppError('NOT_FOUND', 'Comentario was not found.', 404, {
        comentarioId: input.comentarioId,
      });
    }

    const chamado = await chamados.getById(input.chamadoId);
    if (!chamado) {
      throw new AppError('NOT_FOUND', 'Chamado was not found.', 404, {
        chamadoId: input.chamadoId,
      });
    }

    // rule: comentariosPermitidosSomenteEmChamadosAbertos
    if (chamado.status !== 'open') {
      throw new AppError(
        'VALIDATION_ERROR',
        'Comments are permitted only on open tickets.',
        400,
        {
          ruleId: 'comentariosPermitidosSomenteEmChamadosAbertos',
          chamadoId: input.chamadoId,
        },
      );
    }

    if (!isComentarioConteudoValido(input.conteudo)) {
      throw new AppError('VALIDATION_ERROR', 'Comment content must not be empty.', 400, {
        field: 'conteudo',
      });
    }

    await ctx.mdm.entity.get({ mdmId: input.atendenteId });

    const nextComentario: Comentario = {
      ...comentario,
      comentarioId: comentario.comentarioId,
      chamadoId: input.chamadoId,
      atendenteId: input.atendenteId,
      conteudo: input.conteudo,
    };
    await comentarios.save(nextComentario);
    return nextComentario;
  });

  return {
    comentarioId: updated.comentarioId,
    chamadoId: updated.chamadoId,
    atendenteId: updated.atendenteId,
    conteudo: updated.conteudo,
  };
}
