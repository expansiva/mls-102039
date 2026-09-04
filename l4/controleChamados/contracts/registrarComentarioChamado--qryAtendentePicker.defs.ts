/// <mls fileReference="_{project}_/l4/controleChamados/contracts/registrarComentarioChamado--qryAtendentePicker.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/registrarComentarioChamado.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryAtendentePicker (query); Output kind=list; route controleChamados.registrarComentarioChamado.qryAtendentePicker.

export interface QryAtendentePickerInput {
  // sem inputs públicos (resolvidos por contexto)
}

export interface QryAtendentePickerOutput {
  atendenteId: string;
  platformUserId: string;
}

export const qryAtendentePickerRoute = 'controleChamados.registrarComentarioChamado.qryAtendentePicker' as const;
