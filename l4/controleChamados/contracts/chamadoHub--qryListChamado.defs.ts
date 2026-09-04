/// <mls fileReference="_{project}_/l4/controleChamados/contracts/chamadoHub--qryListChamado.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/chamadoHub.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryListChamado (query); Output kind=list; route controleChamados.chamadoHub.qryListChamado.

export interface QryListChamadoInput {
  sortBy?: 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface QryListChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export const qryListChamadoRoute = 'controleChamados.chamadoHub.qryListChamado' as const;
