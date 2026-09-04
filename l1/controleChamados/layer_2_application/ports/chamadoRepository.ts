/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/ports/chamadoRepository.ts" enhancement="_blank"/>

import type { Chamado, ChamadoStatus } from '/_102039_/l1/controleChamados/layer_3_domain/entities/chamado.d.ts';

export type ChamadoId = string;

export interface ChamadoListFilter {
  chamadoId?: ChamadoId;
  status?: ChamadoStatus;
  search?: string;
  sortBy?: 'titulo' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface IChamadoRepository {
  getById(id: ChamadoId): Promise<Chamado | null>;
  list(filter: ChamadoListFilter): Promise<Chamado[]>;
  save(aggregate: Chamado): Promise<void>;
  delete(id: ChamadoId): Promise<void>;
}
