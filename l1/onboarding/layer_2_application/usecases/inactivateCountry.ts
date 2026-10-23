/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/inactivateCountry.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { CountryRepository } from '/_102039_/l1/onboarding/layer_2_application/ports/countryRepository.js';
import type { Country } from '/_102039_/l1/onboarding/layer_3_domain/entities/country.js';

export interface InactivateCountryInput extends Record<string, unknown> {
  id: string;
  version: number;
}

export interface InactivateCountryOutput extends Record<string, unknown> {
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
  const actorId = session.actorId ?? session.actorSession?.actorId;
  if (actorId === 'companyOwner') return true;
  const scope: string[] = session.actorScope ?? session.actorSession?.scope ?? [];
  return scope.some((entry) => entry === 'companyOwner' || entry.endsWith(':companyOwner'));
}

export async function inactivateCountry(input: InactivateCountryInput, ctx: RequestContext): Promise<InactivateCountryOutput> {
  if (!isCompanyOwner(ctx)) {
    throw new AppError('FORBIDDEN', 'Only the company owner can inactivate countries.', 403, { ruleId: 'onlyOwnerMaintainsCountries' });
  }

  const id = String(input.id ?? '');
  if (!id) throw new AppError('VALIDATION_ERROR', 'Country id is required.', 400);
  const version = Number(input.version);
  if (!Number.isFinite(version)) throw new AppError('VALIDATION_ERROR', 'Country version is required.', 400);

  const repository = resolveRepository<CountryRepository>(ctx, 'CountryRepository');
  const found = await repository.list({ id });
  const current = found[0];
  if (!current) throw new AppError('NOT_FOUND', 'Country not found.', 404);

  if (Number(current.version) !== version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Country version does not match the stored record.', 409);
  }

  if (current.status !== 'active') {
    throw new AppError('INVALID_STATE', 'Only an active country can be inactivated.', 409, { ruleId: 'onlyActiveCountryOffered' });
  }

  const next: Country = {
    id: current.id,
    version: current.version,
    isoCode: current.isoCode,
    name: current.name,
    status: 'inactive',
    details: { ...(current.details ?? {}) },
  };

  const saved = await repository.transition(next, 'inactivateCountry');

  const details: { displayName?: string } = {};
  if (saved.details?.displayName !== undefined) details.displayName = saved.details.displayName;

  return {
    id: saved.id,
    version: saved.version,
    isoCode: saved.isoCode,
    name: saved.name,
    status: saved.status,
    details,
  };
}
