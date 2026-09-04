/// <mls fileReference="_{project}_/l4/controleChamados/contracts/atendenteCatalogue--qryGetAtendente.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/atendenteCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryGetAtendente (query); Output kind=object; route controleChamados.atendenteCatalogue.qryGetAtendente.

export interface QryGetAtendenteInput {
  atendenteId: string;
}

export interface QryGetAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}

export const qryGetAtendenteRoute = 'controleChamados.atendenteCatalogue.qryGetAtendente' as const;
