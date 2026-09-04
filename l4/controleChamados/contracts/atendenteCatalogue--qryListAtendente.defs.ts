/// <mls fileReference="_{project}_/l4/controleChamados/contracts/atendenteCatalogue--qryListAtendente.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/atendenteCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryListAtendente (query); Output kind=list; route controleChamados.atendenteCatalogue.qryListAtendente.

export interface QryListAtendenteInput {
  // sem inputs públicos (resolvidos por contexto)
}

export interface QryListAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}

export const qryListAtendenteRoute = 'controleChamados.atendenteCatalogue.qryListAtendente' as const;
