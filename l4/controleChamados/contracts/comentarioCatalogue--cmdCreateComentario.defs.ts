/// <mls fileReference="_{project}_/l4/controleChamados/contracts/comentarioCatalogue--cmdCreateComentario.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/comentarioCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdCreateComentario (command); Output kind=object; route controleChamados.comentarioCatalogue.cmdCreateComentario.

export interface CmdCreateComentarioInput {
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export interface CmdCreateComentarioOutput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export const cmdCreateComentarioRoute = 'controleChamados.comentarioCatalogue.cmdCreateComentario' as const;
