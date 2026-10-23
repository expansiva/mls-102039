/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/updateCountry.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { CountryRepository } from '/_102039_/l1/onboarding/layer_2_application/ports/countryRepository.js';
import type { Country } from '/_102039_/l1/onboarding/layer_3_domain/entities/country.js';

export interface UpdateCountryInput extends Record<string, unknown> {
  isoCode: string;
  name: string;
  status: string;
  details: Record<string, unknown>;
  id: string;
  version: number;
}

export interface UpdateCountryOutput extends Record<string, unknown> {
  id: string;
  version: number;
  isoCode: string;
  name: string;
  status: string;
  details: {
    displayName?: string;
  };
}

const OWNER_ACTOR = 'companyOwner';

function isCompanyOwner(ctx: RequestContext): boolean {
  const session = ctx.sessionContext;
  const scope: string[] = [
    ...(session.actorScope ?? []),
    ...(session.actorSession?.scope ?? []),
  ];
  const actorId = session.actorId ?? session.actorSession?.actorId;
  if (actorId === OWNER_ACTOR || (actorId !== undefined && actorId.endsWith(':' + OWNER_ACTOR))) return true;
  return scope.some((entry) => entry === OWNER_ACTOR || entry.endsWith(':' + OWNER_ACTOR));
}

export async function updateCountry(input: UpdateCountryInput, ctx: RequestContext): Promise<UpdateCountryOutput> {
  const repository = resolveRepository<CountryRepository>(ctx, 'CountryRepository');

  if (!isCompanyOwner(ctx)) {
    throw new AppError('FORBIDDEN', 'Only the company owner can edit countries.', 403, { ruleId: 'onlyOwnerMaintainsCountries' });
  }

  const id = String(input.id ?? '');
  if (id === '') {
    throw new AppError('VALIDATION_ERROR', 'The country id is required.', 400);
  }

  const found = await repository.list({ id });
  const existing: Country | undefined = found.find((item) => item.id === id);
  if (!existing) {
    throw new AppError('NOT_FOUND', 'Country not found.', 404);
  }

  if (input.version !== undefined && input.version !== null && Number(input.version) !== existing.version) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  const isoCode = input.isoCode === undefined ? existing.isoCode : String(input.isoCode);
  const name = input.name === undefined ? existing.name : String(input.name).trim();

  if (!/^[A-Z]{2}$/.test(isoCode)) {
    throw new AppError('INVALID_ISO_CODE', 'The country code must be a two-letter upper case ISO 3166-1 alpha-2 code.', 400, { ruleId: 'countryIsoCodeFormat' });
  }
  if (name === '' || name.length > 120) {
    throw new AppError('INVALID_COUNTRY_NAME', 'Every country must have an English name of up to 120 characters.', 400, { ruleId: 'countryIsoCodeFormat' });
  }

  if (isoCode !== existing.isoCode) {
    const sameCode = await repository.list({ isoCode });
    if (sameCode.some((item) => item.id !== existing.id && item.isoCode === isoCode)) {
      throw new AppError('DUPLICATE_ISO_CODE', 'A country with this ISO code already exists.', 409, { ruleId: 'countryIsoCodeUnique' });
    }
  }

  const record: Country = {
    id: existing.id,
    version: existing.version,
    isoCode,
    name,
    status: existing.status,
    details: {},
  };

  const saved = await repository.update(record);

  const output: UpdateCountryOutput = {
    id: saved.id,
    version: saved.version,
    isoCode: saved.isoCode,
    name: saved.name,
    status: saved.status,
    details: {},
  };
  if (saved.details && saved.details.displayName !== undefined) {
    output.details.displayName = saved.details.displayName;
  }
  return output;
}
