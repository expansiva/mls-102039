/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/deleteChamado.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IChamadoRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/chamadoRepository.d.ts';

export interface DeleteChamadoInput {
  chamadoId: string;
}

export interface DeleteChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export async function deleteChamado(
  ctx: RequestContext,
  input: DeleteChamadoInput,
): Promise<DeleteChamadoOutput> {
  const chamados = resolveRepository<IChamadoRepository>(ctx, 'Chamado');

  return ctx.data.runInTransaction(async () => {
    const chamado = await chamados.getById(input.chamadoId);
    if (!chamado) {
      throw new AppError(
        'NOT_FOUND',
        `Chamado not found: ${input.chamadoId}`,
        404,
        { chamadoId: input.chamadoId },
      );
    }

    const output: DeleteChamadoOutput = {
      chamadoId: chamado.chamadoId,
      titulo: chamado.titulo,
      descricao: chamado.descricao,
      status: chamado.status,
    };

    await chamados.delete(chamado.chamadoId);
    return output;
  });
}
