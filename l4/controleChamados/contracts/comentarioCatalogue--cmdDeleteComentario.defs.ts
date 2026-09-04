/// <mls fileReference="_{project}_/l4/controleChamados/contracts/comentarioCatalogue--cmdDeleteComentario.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/comentarioCatalogue.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdDeleteComentario (command); Output kind=object; route controleChamados.comentarioCatalogue.cmdDeleteComentario.

export interface CmdDeleteComentarioInput {
  comentarioId: string;
}

export interface CmdDeleteComentarioOutput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export const cmdDeleteComentarioRoute = 'controleChamados.comentarioCatalogue.cmdDeleteComentario' as const;
