/// <mls fileReference="_102039_/l2/controleChamados/web/contracts/atendenteCatalogue.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace atendenteCatalogue; one contract file per workspace, all bffCalls).

// bffCall qryListAtendente (query) — Output kind=array; route controleChamados.atendenteCatalogue.qryListAtendente.
export interface QryListAtendenteInput {}
export interface QryListAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}
export const qryListAtendenteRoute = 'controleChamados.atendenteCatalogue.qryListAtendente' as const;

// bffCall cmdCreateAtendente (command) — Output kind=object; route controleChamados.atendenteCatalogue.cmdCreateAtendente.
export interface CmdCreateAtendenteInput {
  platformUserId: string;
}
export interface CmdCreateAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}
export const cmdCreateAtendenteRoute = 'controleChamados.atendenteCatalogue.cmdCreateAtendente' as const;

// bffCall cmdUpdateAtendente (command) — Output kind=object; route controleChamados.atendenteCatalogue.cmdUpdateAtendente.
export interface CmdUpdateAtendenteInput {
  atendenteId: string;
  platformUserId: string;
}
export interface CmdUpdateAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}
export const cmdUpdateAtendenteRoute = 'controleChamados.atendenteCatalogue.cmdUpdateAtendente' as const;

// bffCall cmdInactivateAtendente (command) — Output kind=object; route controleChamados.atendenteCatalogue.cmdInactivateAtendente.
export interface CmdInactivateAtendenteInput {
  atendenteId: string;
}
export interface CmdInactivateAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}
export const cmdInactivateAtendenteRoute = 'controleChamados.atendenteCatalogue.cmdInactivateAtendente' as const;

// bffCall cmdReactivateAtendente (command) — Output kind=object; route controleChamados.atendenteCatalogue.cmdReactivateAtendente.
export interface CmdReactivateAtendenteInput {
  atendenteId: string;
}
export interface CmdReactivateAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}
export const cmdReactivateAtendenteRoute = 'controleChamados.atendenteCatalogue.cmdReactivateAtendente' as const;

// bffCall qryGetAtendente (query) — Output kind=object; route controleChamados.atendenteCatalogue.qryGetAtendente.
export interface QryGetAtendenteInput {
  atendenteId: string;
}
export interface QryGetAtendenteOutput {
  atendenteId: string;
  platformUserId: string;
}
export const qryGetAtendenteRoute = 'controleChamados.atendenteCatalogue.qryGetAtendente' as const;
