/// <mls fileReference="_{project}_/l4/controleChamados/contracts/chamadoCatalogue--qryGetChamado.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/chamadoCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryGetChamado (query); Output kind=object; route controleChamados.chamadoCatalogue.qryGetChamado.

export interface QryGetChamadoInput {
  chamadoId: string;
}

export interface QryGetChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export const qryGetChamadoRoute = 'controleChamados.chamadoCatalogue.qryGetChamado' as const;
