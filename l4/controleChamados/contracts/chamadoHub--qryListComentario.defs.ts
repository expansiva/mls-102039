/// <mls fileReference="_{project}_/l4/controleChamados/contracts/chamadoHub--qryListComentario.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/chamadoHub.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryListComentario (query); Output kind=list; route controleChamados.chamadoHub.qryListComentario.

export interface QryListComentarioInput {
  // sem inputs públicos (resolvidos por contexto)
}

export interface QryListComentarioOutput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export const qryListComentarioRoute = 'controleChamados.chamadoHub.qryListComentario' as const;
