/// <mls fileReference="_{project}_/l4/controleChamados/contracts/atendenteCatalogue--cmdReactivateAtendente.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/atendenteCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdReactivateAtendente (command); Output kind=object; route controleChamados.atendenteCatalogue.cmdReactivateAtendente.

export interface CmdReactivateAtendenteInput {
  atendenteId: string;
}

export interface CmdReactivateAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}

export const cmdReactivateAtendenteRoute = 'controleChamados.atendenteCatalogue.cmdReactivateAtendente' as const;
