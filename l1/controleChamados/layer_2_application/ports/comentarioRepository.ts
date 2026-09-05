/// <mls fileReference="_102039_/l1/controleChamados/layer_2_application/ports/comentarioRepository.ts" enhancement="_blank"/>

import type { Comentario } from '/_102039_/l1/controleChamados/layer_3_domain/entities/comentario.js';

export type ComentarioId = string;

export interface ComentarioListFilter {
  comentarioId?: ComentarioId;
  chamadoId?: string;
  atendenteId?: string;
  search?: string;
  sortBy?: 'comentarioId' | 'chamadoId' | 'atendenteId';
  sortOrder?: 'asc' | 'desc';
}

export interface IComentarioRepository {
  getById(id: ComentarioId): Promise<Comentario | null>;
  list(filter: ComentarioListFilter): Promise<Comentario[]>;
  save(aggregate: Comentario): Promise<void>;
  delete(id: ComentarioId): Promise<void>;
}
