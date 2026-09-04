/// <mls fileReference="_{project}_/l4/controleChamados/contracts/comentarioCatalogue--qryChamadoPicker.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/comentarioCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryChamadoPicker (query); Output kind=list; route controleChamados.comentarioCatalogue.qryChamadoPicker.

export interface QryChamadoPickerInput {
  sortBy?: 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface QryChamadoPickerOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export const qryChamadoPickerRoute = 'controleChamados.comentarioCatalogue.qryChamadoPicker' as const;
