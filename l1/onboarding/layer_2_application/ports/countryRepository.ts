/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/ports/countryRepository.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createMemoryTableRepository } from '/_102034_/l1/server/layer_1_external/data/moduleDataRuntime.js';
import type { Country } from '/_102039_/l1/onboarding/layer_3_domain/entities/country.js';

export type CountryFilter = Record<string, unknown>;

export interface CountryRepository {
  create(country: Country): Promise<Country>;
  list(countryFilter: CountryFilter): Promise<Country[]>;
  update(country: Country): Promise<Country>;
  transition(country: Country, transitionId: string): Promise<Country>;
}

let rows = createMemoryTableRepository<Country>([]);
function table() { return rows; }
export function resetMemory(seed: Country[] = []): void {
  rows = createMemoryTableRepository(seed.map(row => ({ ...row })));
}
export async function removeMemory(id: string): Promise<boolean> {
  const where = { id } as unknown as Partial<Country>;
  if (!await table().findOne({ where })) return false;
  await table().delete({ where });
  return true;
}

export const pendingCountryRepository: CountryRepository = {
  async create(record: Country): Promise<Country> { await table().insert({ record }); return record; },
  async list(filter: CountryFilter): Promise<Country[]> { return table().findMany({ where: filter as Partial<Country> }); },
  async update(country: Country): Promise<Country> {  const where = { id: country.id } as Partial<Country>; await table().update({ where, patch: country }); const saved = await table().findOne({ where }); if (!saved) throw new AppError('NOT_FOUND', 'Record not found.', 404); return saved; },
  async transition(country: Country, transitionId: string): Promise<Country> { void transitionId; const where = { id: country.id } as Partial<Country>; await table().update({ where, patch: country }); const saved = await table().findOne({ where }); if (!saved) throw new AppError('NOT_FOUND', 'Record not found.', 404); return saved; },
};
