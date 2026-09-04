/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/listChamado.ts" enhancement="_blank"/>

import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IChamadoRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/chamadoRepository.d.ts';
import type { Chamado } from '/_102039_/l1/controleChamados/layer_3_domain/entities/chamado.d.ts';

export interface ListChamadoInput {
  sortBy?: 'titulo' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface ListChamadoItem {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export type ListChamadoOutput = ListChamadoItem[];

export async function listChamado(
  ctx: RequestContext,
  input: ListChamadoInput,
): Promise<ListChamadoOutput> {
  const chamados = resolveRepository<IChamadoRepository>(ctx, 'Chamado');
  const records = await chamados.list({
    sortBy: input.sortBy,
    sortOrder: input.sortOrder,
  });

  return records.map((chamado: Chamado) => ({
    chamadoId: chamado.chamadoId,
    titulo: chamado.titulo,
    descricao: chamado.descricao,
    status: chamado.status,
  }));
}
