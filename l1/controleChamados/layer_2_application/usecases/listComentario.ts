/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/usecases/listComentario.ts" enhancement="_blank"/>

import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IComentarioRepository } from '/_102039_/l1/controleChamados/layer_2_application/ports/comentarioRepository';

export interface ListComentarioInput {}

export interface ListComentarioItem {
  comentarioId: string;
  chamadoId: string;
  atendenteId: string;
  conteudo: string;
}

export type ListComentarioOutput = ListComentarioItem[];

export async function listComentario(
  ctx: RequestContext,
  input: ListComentarioInput,
): Promise<ListComentarioOutput> {
  void input;
  const comentarios = resolveRepository<IComentarioRepository>(ctx, 'Comentario');
  const records = await comentarios.list({});
  return records.map((comentario) => ({
    comentarioId: comentario.comentarioId,
    chamadoId: comentario.chamadoId,
    atendenteId: comentario.atendenteId,
    conteudo: comentario.conteudo,
  }));
}
