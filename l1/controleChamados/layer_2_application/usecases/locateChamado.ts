/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/locateChamado.ts" enhancement="_blank"/>

import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Chamado } from '/_102039_/l1/controleChamados/layer_3_domain/entities/chamado.d.ts';
import type { IChamadoRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/chamadoRepository.d.ts';

export interface LocateChamadoInput {}

export interface LocateChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export async function locateChamado(
  ctx: RequestContext,
  _input: LocateChamadoInput,
): Promise<LocateChamadoOutput[]> {
  const chamados = resolveRepository<IChamadoRepository>(ctx, 'Chamado');
  const openChamados: Chamado[] = await chamados.list({ status: 'open' });
  return openChamados.map((chamado) => ({
    chamadoId: chamado.chamadoId,
    titulo: chamado.titulo,
    descricao: chamado.descricao,
    status: chamado.status,
  }));
}
