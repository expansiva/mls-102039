/// <mls fileReference="_102039_/l1/controleChamados/layer_1_external/adapters/persistence/chamadoRepositoryAdapter.ts" enhancement="_blank"/>

import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type {
  ChamadoListFilter,
  IChamadoRepository,
} from '/_102039_/l1/controleChamados/layer_2_application/ports/chamadoRepository.d.ts';
import type {
  Chamado,
  ChamadoStatus,
} from '/_102039_/l1/controleChamados/layer_3_domain/entities/chamado.d.ts';

interface ChamadoRow {
  chamado_id: string;
  status: string;
  details: Record<string, unknown> | string | null;
}

interface ChamadoDetails {
  titulo: string;
  descricao: string;
}

function toRow(chamado: Chamado): ChamadoRow {
  const details: ChamadoDetails = {
    titulo: chamado.titulo,
    descricao: chamado.descricao,
  };
  return {
    chamado_id: chamado.chamadoId,
    status: chamado.status,
    details: JSON.stringify(details),
  };
}

function detailsDefaults(): ChamadoDetails {
  return {
    titulo: '',
    descricao: '',
  };
}

function parseDetails(row: ChamadoRow): ChamadoDetails {
  let parsed: Partial<ChamadoDetails> = {};
  try {
    const raw: unknown = typeof row.details === 'string'
      ? JSON.parse(row.details)
      : (row.details ?? {});
    if (raw !== null && typeof raw === 'object' && !Array.isArray(raw)) {
      const record = raw as Record<string, unknown>;
      parsed = {
        ...(typeof record.titulo === 'string' ? { titulo: record.titulo } : {}),
        ...(typeof record.descricao === 'string' ? { descricao: record.descricao } : {}),
      };
    }
  } catch (error) {
    console.warn(
      `[parseDetails] controlechamados_chamado ${row.chamado_id}: details is not JSON`,
      error,
    );
    parsed = {};
  }
  return { ...detailsDefaults(), ...parsed };
}

function toDomain(row: ChamadoRow): Chamado {
  const details = parseDetails(row);
  return {
    chamadoId: row.chamado_id,
    titulo: details.titulo,
    descricao: details.descricao,
    status: row.status as ChamadoStatus,
  };
}

function isDriverInputFormatError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const candidate = error as { code?: unknown; message?: unknown };
  const code = String(candidate.code ?? '').toLowerCase();
  const message = String(candidate.message ?? '').toLowerCase();
  return (
    code.includes('invalid') ||
    code.includes('format') ||
    code === '22p02' ||
    message.includes('invalid input syntax') ||
    message.includes('invalid uuid') ||
    message.includes('malformed')
  );
}

const chamadoStatusOrder: ChamadoStatus[] = ['open', 'closed'];

export function createChamadoRepositoryAdapter(ctx: RequestContext): IChamadoRepository {
  const getTable = () => ctx.data.moduleData.getTable<ChamadoRow>('controlechamados_chamado');

  return {
    async delete(id: string): Promise<void> {
      await (await getTable()).delete({ where: { chamado_id: id } });
    },

    async getById(id: string): Promise<Chamado | null> {
      let row: ChamadoRow | null;
      try {
        row = await (await getTable()).findOne({ where: { chamado_id: id } });
      } catch (error) {
        if (isDriverInputFormatError(error)) {
          throw new AppError('NOT_FOUND', `Chamado ${id} not found`, 404, { chamadoId: id });
        }
        throw error;
      }
      return row ? toDomain(row) : null;
    },

    async list(filter: ChamadoListFilter): Promise<Chamado[]> {
      const where: Partial<ChamadoRow> = {};
      if (filter?.chamadoId) where.chamado_id = filter.chamadoId;
      if (filter?.status) where.status = filter.status;

      // titulo is stored in details because the table has no title/name column. Therefore,
      // search is intentionally not delegated to the table runtime.
      let chamados = (await (await getTable()).findMany({ where })).map(toDomain);
      if (filter?.sortBy) {
        const direction = filter.sortOrder === 'desc' ? -1 : 1;
        chamados = chamados
          .map((chamado, index) => ({ chamado, index }))
          .sort((left, right) => {
            let comparison: number;
            if (filter.sortBy === 'status') {
              comparison = chamadoStatusOrder.indexOf(left.chamado.status)
                - chamadoStatusOrder.indexOf(right.chamado.status);
            } else {
              comparison = left.chamado.titulo.localeCompare(right.chamado.titulo);
            }
            return comparison * direction || left.index - right.index;
          })
          .map(({ chamado }) => chamado);
      }
      return chamados;
    },

    async save(aggregate: Chamado): Promise<void> {
      const repo = await getTable();
      const row = toRow(aggregate);
      const existing = await repo.findOne({ where: { chamado_id: aggregate.chamadoId } });
      if (existing) {
        await repo.update({ where: { chamado_id: aggregate.chamadoId }, patch: row });
      } else {
        await repo.insert({ record: row });
      }
    },
  };
}
