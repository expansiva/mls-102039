/// <mls fileReference="_{project}_/l4/controleChamados/contracts/chamadoCatalogue--cmdDeleteChamado.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/chamadoCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdDeleteChamado (command); Output kind=object; route controleChamados.chamadoCatalogue.cmdDeleteChamado.

export interface CmdDeleteChamadoInput {
  chamadoId: string;
}

export interface CmdDeleteChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export const cmdDeleteChamadoRoute = 'controleChamados.chamadoCatalogue.cmdDeleteChamado' as const;
