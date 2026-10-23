/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/listCountry.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Country } from '/_102039_/l1/onboarding/layer_3_domain/entities/country.js';
import type { CountryRepository } from '/_102039_/l1/onboarding/layer_2_application/ports/countryRepository.js';

export interface ListCountryInput extends Record<string, unknown> {
  id?: string;
  isoCode?: string;
  name?: string;
  status?: string;
  page: number;
  pageSize: number;
}

export interface ListCountryOutput extends Record<string, unknown> {
  items: Country[];
  hasMore: boolean;
}

function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function filled(value: unknown): boolean {
  return value !== undefined && value !== null && value !== '';
}

export async function listCountry(input: ListCountryInput, ctx: RequestContext): Promise<ListCountryOutput> {
  const repository = resolveRepository<CountryRepository>(ctx, 'CountryRepository');

  // Exact-match filters. The display name is derived (never stored), so it is not a filter.
  const where: Record<string, unknown> = {};
  if (filled(input.id)) where.id = String(input.id);
  if (filled(input.isoCode)) where.isoCode = String(input.isoCode);
  if (filled(input.status)) {
    const status = String(input.status);
    if (status !== 'active' && status !== 'inactive') {
      throw new AppError('INVALID_STATUS', 'status must be active or inactive.', 400);
    }
    where.status = status;
  }

  const found = await repository.list(where);

  // Text search: ISO code or English name contains the term, ignoring case and accents.
  let kept: Country[] = found;
  if (filled(input.name)) {
    const term = normalizeText(String(input.name).trim());
    kept = found.filter((country) =>
      normalizeText(String(country.name ?? '')).includes(term) ||
      normalizeText(String(country.isoCode ?? '')).includes(term));
  }

  const sorted = [...kept].sort((a, b) => String(a.name ?? '').localeCompare(String(b.name ?? '')));

  const page = Math.max(1, Math.trunc(Number(input.page)) || 1);
  const size = Math.min(200, Math.max(1, Math.trunc(Number(input.pageSize)) || 20));
  const start = (page - 1) * size;
  const items = sorted.slice(start, start + size);
  return { items, hasMore: start + size < sorted.length };
}
