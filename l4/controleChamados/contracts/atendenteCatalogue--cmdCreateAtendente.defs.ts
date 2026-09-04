/// <mls fileReference="_{project}_/l4/controleChamados/contracts/atendenteCatalogue--cmdCreateAtendente.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/atendenteCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdCreateAtendente (command); Output kind=object; route controleChamados.atendenteCatalogue.cmdCreateAtendente.

export interface CmdCreateAtendenteInput {
  platformUserId: string;
}

export interface CmdCreateAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}

export const cmdCreateAtendenteRoute = 'controleChamados.atendenteCatalogue.cmdCreateAtendente' as const;
