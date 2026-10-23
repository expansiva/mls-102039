/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/reactivateCountry.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { Country } from '/_102039_/l1/onboarding/layer_3_domain/entities/country.js';
import type { CountryRepository } from '/_102039_/l1/onboarding/layer_2_application/ports/countryRepository.js';

export interface ReactivateCountryInput extends Record<string, unknown> {
  id: string;
  version: number;
}

export interface ReactivateCountryOutput extends Record<string, unknown> {
  id: string;
  version: number;
  isoCode: string;
  name: string;
  status: string;
  details: {
    displayName?: string;
  };
}

function isCompanyOwner(ctx: RequestContext): boolean {
  const session = ctx.sessionContext;
  const isOwnerId = (value: string): boolean => value === 'companyOwner' || value.endsWith(':companyOwner');
  if (session.actorId !== undefined && isOwnerId(session.actorId)) return true;
  const scope = session.actorScope ?? session.actorSession.scope ?? [];
  return scope.some((entry) => isOwnerId(String(entry)));
}

export async function reactivateCountry(input: ReactivateCountryInput, ctx: RequestContext): Promise<ReactivateCountryOutput> {
  if (!isCompanyOwner(ctx)) {
    throw new AppError('FORBIDDEN', 'Only the company owner can reactivate countries.', 403, { ruleId: 'onlyOwnerMaintainsCountries' });
  }

  const id = String(input.id ?? '');
  if (!id) throw new AppError('VALIDATION_ERROR', 'The country id is required.', 400);

  const repository = resolveRepository<CountryRepository>(ctx, 'CountryRepository');
  const found = await repository.list({ id });
  const current = found[0];
  if (!current) throw new AppError('NOT_FOUND', 'Country not found.', 404);

  if (input.version !== undefined && Number(input.version) !== current.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  if (current.status !== 'inactive') {
    throw new AppError('INVALID_STATE', 'Only an inactive country can be reactivated.', 409);
  }

  const next: Country = {
    id: current.id,
    version: current.version,
    isoCode: current.isoCode,
    name: current.name,
    status: 'active',
    details: current.details,
  };

  const saved = await repository.transition(next, 'reactivateCountry');

  const details: { displayName?: string } = {};
  if (saved.details && saved.details.displayName !== undefined) details.displayName = saved.details.displayName;

  return {
    id: saved.id,
    version: saved.version,
    isoCode: saved.isoCode,
    name: saved.name,
    status: saved.status,
    details,
  };
}
