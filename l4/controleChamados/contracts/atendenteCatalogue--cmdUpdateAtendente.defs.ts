/// <mls fileReference="_{project}_/l4/controleChamados/contracts/atendenteCatalogue--cmdUpdateAtendente.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/atendenteCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdUpdateAtendente (command); Output kind=object; route controleChamados.atendenteCatalogue.cmdUpdateAtendente.

export interface CmdUpdateAtendenteInput {
  atendenteId: string;
  platformUserId: string;
}

export interface CmdUpdateAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}

export const cmdUpdateAtendenteRoute = 'controleChamados.atendenteCatalogue.cmdUpdateAtendente' as const;
