/// <mls fileReference="_{project}_/l4/controleChamados/contracts/chamadoCatalogue--cmdCloseChamado.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/chamadoCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdCloseChamado (command); Output kind=object; route controleChamados.chamadoCatalogue.cmdCloseChamado.

export interface CmdCloseChamadoInput {
  chamadoId: string;
  status: 'closed';
}

export interface CmdCloseChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export const cmdCloseChamadoRoute = 'controleChamados.chamadoCatalogue.cmdCloseChamado' as const;
