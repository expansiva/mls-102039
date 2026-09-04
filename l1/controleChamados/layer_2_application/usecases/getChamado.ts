/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/getChamado.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IChamadoRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/chamadoRepository.d.ts';
import type { Chamado } from '/_102039_/l1/controleChamados/layer_3_domain/entities/chamado.d.ts';

export interface GetChamadoInput {
  chamadoId: string;
}

export interface GetChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export async function getChamado(
  ctx: RequestContext,
  input: GetChamadoInput,
): Promise<GetChamadoOutput> {
  const chamados = resolveRepository<IChamadoRepository>(ctx, 'Chamado');
  const chamado: Chamado | null = await chamados.getById(input.chamadoId);
  if (!chamado) {
    throw new AppError(
      'NOT_FOUND',
      `Chamado not found: ${input.chamadoId}`,
      404,
      { chamadoId: input.chamadoId },
    );
  }
  return {
    chamadoId: chamado.chamadoId,
    titulo: chamado.titulo,
    descricao: chamado.descricao,
    status: chamado.status,
  };
}
