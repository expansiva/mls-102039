/// <mls fileReference="_{project}_/l4/controleChamados/contracts/comentarioCatalogue--qryListComentario.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/comentarioCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryListComentario (query); Output kind=list; route controleChamados.comentarioCatalogue.qryListComentario.

export interface QryListComentarioInput {
  // sem inputs públicos (resolvidos por contexto)
}

export interface QryListComentarioOutput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export const qryListComentarioRoute = 'controleChamados.comentarioCatalogue.qryListComentario' as const;
