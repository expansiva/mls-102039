/// <mls fileReference="_102039_/l2/controleChamados/web/contracts/comentarioCatalogue.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace comentarioCatalogue; one contract file per workspace, all bffCalls).

// bffCall qryListComentario (query) — Output kind=array; route controleChamados.comentarioCatalogue.qryListComentario.
export interface QryListComentarioInput {}
export interface QryListComentarioOutput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}
export const qryListComentarioRoute = 'controleChamados.comentarioCatalogue.qryListComentario' as const;

// bffCall cmdCreateComentario (command) — Output kind=object; route controleChamados.comentarioCatalogue.cmdCreateComentario.
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

// bffCall cmdUpdateComentario (command) — Output kind=object; route controleChamados.comentarioCatalogue.cmdUpdateComentario.
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

// bffCall cmdDeleteComentario (command) — Output kind=object; route controleChamados.comentarioCatalogue.cmdDeleteComentario.
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

// bffCall qryGetComentario (query) — Output kind=object; route controleChamados.comentarioCatalogue.qryGetComentario.
export interface QryGetComentarioInput {
  comentarioId: string;
}
export interface QryGetComentarioOutput {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}
export const qryGetComentarioRoute = 'controleChamados.comentarioCatalogue.qryGetComentario' as const;

// bffCall qryChamadoPicker (query) — Output kind=array; route controleChamados.comentarioCatalogue.qryChamadoPicker.
export interface QryChamadoPickerInput {
  sortBy?: 'open' | 'closed';
  sortOrder?: 'asc' | 'desc';
}
export interface QryChamadoPickerOutput {
  chamadoId: string;
  titulo: string;
  descricao: string;
  status: 'open' | 'closed';
}
export const qryChamadoPickerRoute = 'controleChamados.comentarioCatalogue.qryChamadoPicker' as const;

// bffCall qryAtendentePicker (query) — Output kind=array; route controleChamados.comentarioCatalogue.qryAtendentePicker.
export interface QryAtendentePickerInput {}
export interface QryAtendentePickerOutput {
  atendenteId: string;
  platformUserId: string;
}
export const qryAtendentePickerRoute = 'controleChamados.comentarioCatalogue.qryAtendentePicker' as const;
