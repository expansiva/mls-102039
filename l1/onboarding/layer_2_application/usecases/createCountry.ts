/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/createCountry.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { CountryRepository } from '/_102039_/l1/onboarding/layer_2_application/ports/countryRepository.js';
import type { Country } from '/_102039_/l1/onboarding/layer_3_domain/entities/country.js';

export interface CreateCountryInput extends Record<string, unknown> {
  isoCode: string;
  name: string;
}

export interface CreateCountryOutput extends Record<string, unknown> {
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
  if (session.actorId === 'companyOwner' || session.actorSession.actorId === 'companyOwner') return true;
  const scopes: string[] = [];
  if (Array.isArray(session.actorScope)) scopes.push(...session.actorScope);
  if (Array.isArray(session.actorSession.scope)) scopes.push(...session.actorSession.scope);
  return scopes.some((s) => s === 'companyOwner' || s.endsWith(':companyOwner'));
}

export async function createCountry(input: CreateCountryInput, ctx: RequestContext): Promise<CreateCountryOutput> {
  if (!isCompanyOwner(ctx)) {
    throw new AppError('FORBIDDEN', 'Only the company owner can add countries to the country list.', 403, { ruleId: 'onlyOwnerMaintainsCountries' });
  }

  const isoCode = typeof input.isoCode === 'string' ? input.isoCode.trim() : '';
  if (!/^[A-Z]{2}$/.test(isoCode)) {
    throw new AppError('INVALID_ISO_CODE', 'The country code must be a two-letter ISO 3166-1 alpha-2 code in upper case.', 400, { ruleId: 'countryIsoCodeFormat' });
  }

  const name = typeof input.name === 'string' ? input.name.trim() : '';
  if (name.length === 0 || name.length > 120) {
    throw new AppError('INVALID_COUNTRY_NAME', 'The country must have an English name of up to 120 characters.', 400, { ruleId: 'countryIsoCodeFormat' });
  }

  const repository = resolveRepository<CountryRepository>(ctx, 'CountryRepository');

  const existing = await repository.list({ isoCode });
  if (existing.some((c) => c.isoCode === isoCode)) {
    throw new AppError('COUNTRY_ISO_CODE_DUPLICATED', 'A country with this ISO code already exists in the country list.', 409, { ruleId: 'countryIsoCodeUnique' });
  }

  const country: Country = {
    id: ctx.idGenerator.newId(),
    version: 1,
    isoCode,
    name,
    status: 'active',
    details: {},
  };

  const created = await repository.create(country);

  const output: CreateCountryOutput = {
    id: created.id,
    version: created.version,
    isoCode: created.isoCode,
    name: created.name,
    status: created.status,
    details: {},
  };
  if (created.details && created.details.displayName !== undefined) {
    output.details.displayName = created.details.displayName;
  }
  return output;
}
