/// <mls fileReference="_102039_/l2/controleChamados/web/contracts/chamadoCatalogue.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace chamadoCatalogue; one contract file per workspace, all bffCalls).

// bffCall qryListChamado (query) — Output kind=array; route controleChamados.chamadoCatalogue.qryListChamado.
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
export const qryListChamadoRoute = 'controleChamados.chamadoCatalogue.qryListChamado' as const;

// bffCall cmdCreateChamado (command) — Output kind=object; route controleChamados.chamadoCatalogue.cmdCreateChamado.
export interface CmdCreateChamadoInput {
  titulo: string;
  descricao: string;
  status: 'open' | 'closed';
}
export interface CmdCreateChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: 'open' | 'closed';
}
export const cmdCreateChamadoRoute = 'controleChamados.chamadoCatalogue.cmdCreateChamado' as const;

// bffCall cmdUpdateChamado (command) — Output kind=object; route controleChamados.chamadoCatalogue.cmdUpdateChamado.
export interface CmdUpdateChamadoInput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: 'open' | 'closed';
}
export interface CmdUpdateChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: 'open' | 'closed';
}
export const cmdUpdateChamadoRoute = 'controleChamados.chamadoCatalogue.cmdUpdateChamado' as const;

// bffCall cmdDeleteChamado (command) — Output kind=object; route controleChamados.chamadoCatalogue.cmdDeleteChamado.
export interface CmdDeleteChamadoInput {
  chamadoId: string;
}
export interface CmdDeleteChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: 'open' | 'closed';
}
export const cmdDeleteChamadoRoute = 'controleChamados.chamadoCatalogue.cmdDeleteChamado' as const;

// bffCall qryGetChamado (query) — Output kind=object; route controleChamados.chamadoCatalogue.qryGetChamado.
export interface QryGetChamadoInput {
  chamadoId: string;
}
export interface QryGetChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: 'open' | 'closed';
}
export const qryGetChamadoRoute = 'controleChamados.chamadoCatalogue.qryGetChamado' as const;

// bffCall qryLocateChamado (query) — Output kind=array; route controleChamados.chamadoCatalogue.qryLocateChamado.
export interface QryLocateChamadoInput {}
export interface QryLocateChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: 'open' | 'closed';
}
export const qryLocateChamadoRoute = 'controleChamados.chamadoCatalogue.qryLocateChamado' as const;

// bffCall cmdCloseChamado (command) — Output kind=object; route controleChamados.chamadoCatalogue.cmdCloseChamado.
export interface CmdCloseChamadoInput {
  chamadoId: string;
  status: 'open' | 'closed';
}
export interface CmdCloseChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: 'open' | 'closed';
}
export const cmdCloseChamadoRoute = 'controleChamados.chamadoCatalogue.cmdCloseChamado' as const;
