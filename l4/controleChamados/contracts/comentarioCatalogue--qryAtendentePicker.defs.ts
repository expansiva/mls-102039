/// <mls fileReference="_{project}_/l4/controleChamados/contracts/comentarioCatalogue--qryAtendentePicker.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/comentarioCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryAtendentePicker (query); Output kind=list; route controleChamados.comentarioCatalogue.qryAtendentePicker.

export interface QryAtendentePickerInput {
  // sem inputs públicos (resolvidos por contexto)
}

export interface QryAtendentePickerOutput {
  atendenteId: string;
  platformUserId: string;
}

export const qryAtendentePickerRoute = 'controleChamados.comentarioCatalogue.qryAtendentePicker' as const;
