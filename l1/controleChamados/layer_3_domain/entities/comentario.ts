/// <mls fileReference="_102039_/l1/controleChamados/layer_3_domain/entities/comentario.ts" enhancement="_blank"/>

export interface Comentario {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

/** The persisted identifier is required to remain unique and stable. */
export function hasUniqueComentarioId(comentarios: Pick<Comentario, 'comentarioId'>[]): boolean {
  const ids = comentarios.map((comentario) => comentario.comentarioId);
  return new Set(ids).size === ids.length;
}

export function isComentarioConteudoValido(conteudo: string): boolean {
  return conteudo.length >= 1;
}

/** A comment may be registered only while its associated ticket is open. */
export function canRegisterComentarioForChamadoStatus(chamadoStatus: string): boolean {
  return chamadoStatus === 'aberto';
}
