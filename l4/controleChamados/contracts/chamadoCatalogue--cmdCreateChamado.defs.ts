/// <mls fileReference="_{project}_/l4/controleChamados/contracts/chamadoCatalogue--cmdCreateChamado.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/chamadoCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdCreateChamado (command); Output kind=object; route controleChamados.chamadoCatalogue.cmdCreateChamado.

export interface CmdCreateChamadoInput {
  titulo: string;
  descricao: string;
  status: 'open' | 'closed';
}

export interface CmdCreateChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export const cmdCreateChamadoRoute = 'controleChamados.chamadoCatalogue.cmdCreateChamado' as const;
