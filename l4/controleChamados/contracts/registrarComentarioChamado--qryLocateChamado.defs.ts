/// <mls fileReference="_{project}_/l4/controleChamados/contracts/registrarComentarioChamado--qryLocateChamado.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from l4/controleChamados/workspaces/registrarComentarioChamado.defs.ts — DO NOT EDIT.
// Contract of record: bffCall qryLocateChamado (query); Output kind=list; route controleChamados.registrarComentarioChamado.qryLocateChamado.

export interface QryLocateChamadoInput {
  // sem inputs públicos (resolvidos por contexto)
}

export interface QryLocateChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: string;
}

export const qryLocateChamadoRoute = 'controleChamados.registrarComentarioChamado.qryLocateChamado' as const;
