/// <mls fileReference="_{project}_/l4/controleChamados/contracts/chamadoCatalogue--cmdUpdateChamado.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/chamadoCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdUpdateChamado (command); Output kind=object; route controleChamados.chamadoCatalogue.cmdUpdateChamado.

export interface CmdUpdateChamadoInput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: 'open' | 'closed';
}

export interface CmdUpdateChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export const cmdUpdateChamadoRoute = 'controleChamados.chamadoCatalogue.cmdUpdateChamado' as const;
