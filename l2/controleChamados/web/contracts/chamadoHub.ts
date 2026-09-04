/// <mls fileReference="_102039_/l2/controleChamados/web/contracts/chamadoHub.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace chamadoHub; one contract file per workspace, all bffCalls).

// bffCall qryListChamado (query) — Output kind=array; route controleChamados.chamadoHub.qryListChamado.
export interface QryListChamadoInput {
  sortBy?: 'open' | 'closed';
  sortOrder?: 'asc' | 'desc';
}
export interface QryListChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: 'open' | 'closed';
}
export const qryListChamadoRoute = 'controleChamados.chamadoHub.qryListChamado' as const;

// bffCall qryListComentario (query) — Output kind=array; route controleChamados.chamadoHub.qryListComentario.
export interface QryListComentarioInput {}
export interface QryListComentarioOutput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}
export const qryListComentarioRoute = 'controleChamados.chamadoHub.qryListComentario' as const;
