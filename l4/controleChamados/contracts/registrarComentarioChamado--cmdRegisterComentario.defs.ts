/// <mls fileReference="_{project}_/l4/controleChamados/contracts/registrarComentarioChamado--cmdRegisterComentario.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/registrarComentarioChamado.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdRegisterComentario (command); Output kind=object; route controleChamados.registrarComentarioChamado.cmdRegisterComentario.

export interface CmdRegisterComentarioInput {
  atendenteId: string;
  chamadoId: string;
  conteudo: string;
}

export interface CmdRegisterComentarioOutput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export const cmdRegisterComentarioRoute = 'controleChamados.registrarComentarioChamado.cmdRegisterComentario' as const;
