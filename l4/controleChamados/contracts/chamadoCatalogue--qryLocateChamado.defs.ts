/// <mls fileReference="_{project}_/l4/controleChamados/contracts/chamadoCatalogue--qryLocateChamado.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/chamadoCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryLocateChamado (query); Output kind=list; route controleChamados.chamadoCatalogue.qryLocateChamado.

export interface QryLocateChamadoInput {
  // sem inputs públicos (resolvidos por contexto)
}

export interface QryLocateChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export const qryLocateChamadoRoute = 'controleChamados.chamadoCatalogue.qryLocateChamado' as const;
