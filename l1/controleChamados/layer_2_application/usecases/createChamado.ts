/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/createChamado.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IChamadoRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/chamadoRepository.d.ts';
import type { Chamado } from '/_102039_/l1/controleChamados/layer_3_domain/entities/chamado.d.ts';

export interface CreateChamadoInput {
  titulo: string;
  descricao: string;
}

export interface CreateChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export async function createChamado(
  ctx: RequestContext,
  input: CreateChamadoInput,
): Promise<CreateChamadoOutput> {
  if (typeof input.titulo !== 'string' || input.titulo.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'The title is required.', 400, { field: 'titulo' });
  }
  if (typeof input.descricao !== 'string' || input.descricao.trim().length === 0) {
    throw new AppError('VALIDATION_ERROR', 'The description is required.', 400, { field: 'descricao' });
  }

  const chamados = resolveRepository<IChamadoRepository>(ctx, 'Chamado');
  const chamado: Chamado = {
    chamadoId: ctx.idGenerator.newId(),
    titulo: input.titulo,
    descricao: input.descricao,
    status: 'open',
  };

  await ctx.data.runInTransaction(async () => {
    await chamados.save(chamado);
  });

  return {
    chamadoId: chamado.chamadoId,
    titulo: chamado.titulo,
    descricao: chamado.descricao,
    status: chamado.status,
  };
}
