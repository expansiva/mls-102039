/// <mls fileReference="_102039_/l1/controleChamados/layer_3_domain/entities/chamado.ts" enhancement="_blank"/>

export type ChamadoStatus = 'open' | 'closed';

export interface Chamado {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: ChamadoStatus;
}

export const CHAMADO_STATUS_TRANSITIONS: Record<ChamadoStatus, ChamadoStatus[]> = {
  closed: [],
  open: ['closed'],
};

export function canTransitionChamado(from: ChamadoStatus, to: ChamadoStatus): boolean {
  return CHAMADO_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}
