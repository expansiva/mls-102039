/// <mls fileReference="_{project}_/l4/controleChamados/contracts/comentarioCatalogue--cmdUpdateComentario.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/comentarioCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdUpdateComentario (command); Output kind=object; route controleChamados.comentarioCatalogue.cmdUpdateComentario.

export interface CmdUpdateComentarioInput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export interface CmdUpdateComentarioOutput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export const cmdUpdateComentarioRoute = 'controleChamados.comentarioCatalogue.cmdUpdateComentario' as const;
