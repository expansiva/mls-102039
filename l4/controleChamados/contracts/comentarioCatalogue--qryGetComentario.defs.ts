/// <mls fileReference="_{project}_/l4/controleChamados/contracts/comentarioCatalogue--qryGetComentario.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/comentarioCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryGetComentario (query); Output kind=object; route controleChamados.comentarioCatalogue.qryGetComentario.

export interface QryGetComentarioInput {
  comentarioId: string;
}

export interface QryGetComentarioOutput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export const qryGetComentarioRoute = 'controleChamados.comentarioCatalogue.qryGetComentario' as const;
