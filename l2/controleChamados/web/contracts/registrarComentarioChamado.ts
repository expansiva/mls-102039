/// <mls fileReference="_102039_/l2/controleChamados/web/contracts/registrarComentarioChamado.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace registrarComentarioChamado; one contract file per workspace, all bffCalls).

// bffCall qryLocateChamado (query) — Output kind=array; route controleChamados.registrarComentarioChamado.qryLocateChamado.
export interface QryLocateChamadoInput {}
export interface QryLocateChamadoOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: 'open' | 'closed';
}
export const qryLocateChamadoRoute = 'controleChamados.registrarComentarioChamado.qryLocateChamado' as const;

// bffCall cmdRegisterComentario (command) — Output kind=object; route controleChamados.registrarComentarioChamado.cmdRegisterComentario.
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

// bffCall qryAtendentePicker (query) — Output kind=array; route controleChamados.registrarComentarioChamado.qryAtendentePicker.
export interface QryAtendentePickerInput {}
export interface QryAtendentePickerOutput {
  atendenteId: string;
  platformUserId: string;
}
export const qryAtendentePickerRoute = 'controleChamados.registrarComentarioChamado.qryAtendentePicker' as const;
