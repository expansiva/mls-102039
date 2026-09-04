/// <mls fileReference="_102039_/l1/controleChamados/layer_1_external/adapters/persistence/comentarioRepositoryAdapter.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type {
  ComentarioListFilter,
  IComentarioRepository,
} from '/_102039_/l1/controleChamados/layer_2_application/ports/comentarioRepository';
import type { Comentario } from '/_102039_/l1/controleChamados/layer_3_domain/entities/comentario';

interface ComentarioRow {
  comentario_id: string;
  chamado_id: string;
  atendente_id: string;
  details: Record<string, unknown> | string | null;
}

interface ComentarioDetails {
  conteudo: string;
}

function toRow(comentario: Comentario): ComentarioRow {
  const details: ComentarioDetails = {
    conteudo: comentario.conteudo,
  };
  return {
    comentario_id: comentario.comentarioId,
    chamado_id: comentario.chamadoId,
    atendente_id: comentario.atendenteId,
    details: JSON.stringify(details),
  };
}

function detailsDefaults(): ComentarioDetails {
  return { conteudo: '' };
}

function parseDetails(row: ComentarioRow): ComentarioDetails {
  let parsed: Partial<ComentarioDetails> = {};
  try {
    const raw = typeof row.details === 'string' ? JSON.parse(row.details) : (row.details ?? {});
    if (raw && typeof raw === 'object') {
      const value = raw as Record<string, unknown>;
      if (typeof value.conteudo === 'string') parsed.conteudo = value.conteudo;
    }
  } catch (error) {
    console.warn(
      `[parseDetails] controlechamados_comentario ${row.comentario_id}: details is not JSON`,
      error,
    );
    parsed = {};
  }
  return { ...detailsDefaults(), ...parsed };
}

function toDomain(row: ComentarioRow): Comentario {
  const details = parseDetails(row);
  return {
    comentarioId: row.comentario_id,
    chamadoId: row.chamado_id,
    atendenteId: row.atendente_id,
    conteudo: details.conteudo,
  };
}

function isInputFormatError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const message = error.message.toLowerCase();
  return (
    message.includes('invalid input syntax') ||
    message.includes('invalid uuid') ||
    message.includes('malformed uuid') ||
    message.includes('invalid identifier') ||
    message.includes('invalid id')
  );
}

async function resolveAtendentes(ctx: RequestContext, atendenteIds: string[]): Promise<void> {
  const mdmIds = [...new Set(atendenteIds.filter((id) => id.length > 0))];
  if (mdmIds.length > 0) {
    await ctx.mdm.collection.getMany({ mdmIds });
  }
}

export function createComentarioRepositoryAdapter(ctx: RequestContext): IComentarioRepository {
  const getTable = () => ctx.data.moduleData.getTable<ComentarioRow>('controlechamados_comentario');

  return {
    async delete(id: string): Promise<void> {
      await (await getTable()).delete({ where: { comentario_id: id } });
    },

    async getById(id: string): Promise<Comentario | null> {
      let row: ComentarioRow | null;
      try {
        row = await (await getTable()).findOne({ where: { comentario_id: id } });
      } catch (error) {
        if (isInputFormatError(error)) {
          throw new AppError('NOT_FOUND', `Comentario ${id} not found`, 404, { comentarioId: id });
        }
        throw error;
      }
      if (!row) return null;
      await resolveAtendentes(ctx, [row.atendente_id]);
      return toDomain(row);
    },

    async list(filter: ComentarioListFilter): Promise<Comentario[]> {
      const where: Partial<ComentarioRow> = {};
      if (filter?.comentarioId) where.comentario_id = filter.comentarioId;
      if (filter?.chamadoId) where.chamado_id = filter.chamadoId;
      if (filter?.atendenteId) where.atendente_id = filter.atendenteId;

      const sortColumns: Record<NonNullable<ComentarioListFilter['sortBy']>, keyof ComentarioRow> = {
        comentarioId: 'comentario_id',
        chamadoId: 'chamado_id',
        atendenteId: 'atendente_id',
      };
      const sortBy = filter?.sortBy;
      const orderBy = sortBy
        ? {
            field: sortColumns[sortBy],
            direction: filter?.sortOrder === 'asc' ? ('asc' as const) : ('desc' as const),
          }
        : undefined;
      const rows = await (await getTable()).findMany({
        where,
        ...(orderBy ? { orderBy } : {}),
      });
      await resolveAtendentes(ctx, rows.map((row) => row.atendente_id));
      return rows.map(toDomain);
    },

    async save(aggregate: Comentario): Promise<void> {
      const repository = await getTable();
      const record = toRow(aggregate);
      const existing = await repository.findOne({ where: { comentario_id: aggregate.comentarioId } });
      if (existing) {
        await repository.update({
          where: { comentario_id: aggregate.comentarioId },
          patch: record,
        });
      } else {
        await repository.insert({ record });
      }
    },
  };
}
