/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/closeChamado.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IChamadoRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/chamadoRepository.js';
import { canTransitionChamado } from '/_102039_/l1/controleChamados/layer_3_domain/entities/chamado.js';

export interface CloseChamadoInput {
  chamadoId: string;
  status: 'closed';
}

export interface CloseChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export async function closeChamado(
  ctx: RequestContext,
  input: CloseChamadoInput,
): Promise<CloseChamadoOutput> {
  const chamados = resolveRepository<IChamadoRepository>(ctx, 'Chamado');
  const saved = await ctx.data.runInTransaction(async () => {
    const chamado = await chamados.getById(input.chamadoId);
    if (!chamado) {
      throw new AppError('NOT_FOUND', `Chamado not found: ${input.chamadoId}`, 404, {
        chamadoId: input.chamadoId,
      });
    }

    if (input.status !== 'closed') {
      throw new AppError('VALIDATION_ERROR', 'The requested status must be closed.', 400, {
        field: 'status',
        allowedValues: ['closed'],
      });
    }

    if (chamado.status !== 'open') {
      throw new AppError(
        'VALIDATION_ERROR',
        'A Chamado can only be closed when its status is open.',
        400,
        { ruleId: 'fechamentoExigeChamadoAberto', chamadoId: input.chamadoId },
      );
    }

    const nextStatus = 'closed' as const;
    if (!canTransitionChamado(chamado.status, nextStatus)) {
      throw new AppError(
        'CONFLICT',
        'The Chamado cannot transition to closed from its current status.',
        409,
        { chamadoId: input.chamadoId, from: chamado.status, to: nextStatus },
      );
    }

    const updated = { ...chamado, status: nextStatus };
    await chamados.save(updated);
    return updated;
  });

  return {
    chamadoId: saved.chamadoId,
    titulo: saved.titulo,
    descricao: saved.descricao,
    status: saved.status,
  };
}
