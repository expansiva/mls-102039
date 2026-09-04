/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/updateChamado.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IChamadoRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/chamadoRepository.d.ts';
import type { Chamado } from '/_102039_/l1/controleChamados/layer_3_domain/entities/chamado.d.ts';
import { canTransitionChamado } from '/_102039_/l1/controleChamados/layer_3_domain/entities/chamado.js';

export interface UpdateChamadoInput {
  chamadoId: string;
  titulo: string;
  descricao: string;
}

export interface UpdateChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export async function updateChamado(
  ctx: RequestContext,
  input: UpdateChamadoInput,
): Promise<UpdateChamadoOutput> {
  const chamados = resolveRepository<IChamadoRepository>(ctx, 'Chamado');
  const updatedChamado = await ctx.data.runInTransaction(async () => {
    const existing = await chamados.getById(input.chamadoId);
    if (!existing) {
      throw new AppError(
        'NOT_FOUND',
        `Chamado not found: ${input.chamadoId}`,
        404,
        { chamadoId: input.chamadoId },
      );
    }

    // Status is resolved server-side from the current Chamado state; it is not public input.
    const resolvedStatus = existing.status;
    // rule: fechamentoExigeChamadoAberto
    // rule: chamadoFechadoNaoPodeSerReaberto
    // The update preserves the current status, so neither closing nor reopening is requested.
    if (
      resolvedStatus !== existing.status &&
      !canTransitionChamado(existing.status, resolvedStatus)
    ) {
      throw new AppError(
        'VALIDATION_ERROR',
        `Invalid Chamado status transition from ${existing.status} to ${resolvedStatus}.`,
        400,
        {
          chamadoId: input.chamadoId,
          from: existing.status,
          to: resolvedStatus,
        },
      );
    }

    const next: Chamado = {
      ...existing,
      titulo: input.titulo,
      descricao: input.descricao,
      status: resolvedStatus,
    };
    await chamados.save(next);
    return next;
  });

  return {
    chamadoId: updatedChamado.chamadoId,
    titulo: updatedChamado.titulo,
    descricao: updatedChamado.descricao,
    status: updatedChamado.status,
  };
}
