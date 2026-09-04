/// <mls fileReference="_{project}_/l4/controleChamados/contracts/atendenteCatalogue--cmdInactivateAtendente.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/atendenteCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdInactivateAtendente (command); Output kind=object; route controleChamados.atendenteCatalogue.cmdInactivateAtendente.

export interface CmdInactivateAtendenteInput {
  atendenteId: string;
}

export interface CmdInactivateAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}

export const cmdInactivateAtendenteRoute = 'controleChamados.atendenteCatalogue.cmdInactivateAtendente' as const;
