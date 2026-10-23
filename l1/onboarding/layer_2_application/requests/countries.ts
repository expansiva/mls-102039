/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/requests/countries.ts" enhancement="_blank"/>

import type { CountriesContracts } from '/_102039_/l2/onboarding/web/contracts/countries.defs.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { createCountry } from '/_102039_/l1/onboarding/layer_2_application/usecases/createCountry.js';
import { inactivateCountry } from '/_102039_/l1/onboarding/layer_2_application/usecases/inactivateCountry.js';
import { listCountry } from '/_102039_/l1/onboarding/layer_2_application/usecases/listCountry.js';
import { reactivateCountry } from '/_102039_/l1/onboarding/layer_2_application/usecases/reactivateCountry.js';
import { updateCountry } from '/_102039_/l1/onboarding/layer_2_application/usecases/updateCountry.js';

type CountryItem = CountriesContracts['onboarding.countries.addCountry']['output']['country'];
type CountryPage = CountriesContracts['onboarding.countries.listCountries']['output']['countries'];

interface CountryRecord {
  id: string;
  version: number;
  isoCode: string;
  name: string;
  status: string;
}

const OWNER_ACTOR = 'companyOwner';
const MAX_PAGE_SIZE = 200;
const DEFAULT_PAGE_SIZE = 20;
const ISO_PATTERN = /^[A-Z]{2}$/;

// onlyOwnerMaintainsCountries
function requireOwner(ctx: RequestContext): void {
  const scope = ctx.sessionContext.actorScope ?? [];
  const isOwner = scope.some((item) => item === OWNER_ACTOR || item.endsWith(':' + OWNER_ACTOR));
  if (!isOwner) {
    throw new AppError('FORBIDDEN', 'Only the company owner can maintain the country list', 403, {
      ruleId: 'onlyOwnerMaintainsCountries',
    });
  }
}

function resolvePage(page: number | undefined, pageSize: number | undefined): { page: number; pageSize: number } {
  const p = page != null && Number.isFinite(page) && page >= 1 ? Math.floor(page) : 1;
  const s = pageSize != null && Number.isFinite(pageSize) && pageSize >= 1 ? Math.floor(pageSize) : DEFAULT_PAGE_SIZE;
  return { page: p, pageSize: Math.min(s, MAX_PAGE_SIZE) };
}

// Derived field details.displayName: never stored; translated from the ISO code, English name as fallback.
function displayNameOf(isoCode: string, englishName: string): string {
  if (!ISO_PATTERN.test(isoCode)) return englishName;
  const names = new Intl.DisplayNames(['en'], { type: 'region', fallback: 'none' });
  const translated = names.of(isoCode);
  return translated != null && translated !== '' ? translated : englishName;
}

function toItem(record: CountryRecord): CountryItem {
  if (record.status !== 'active' && record.status !== 'inactive') {
    throw new AppError('INVALID_STATE', 'Country ' + record.name + ' has an unknown status', 500, {
      id: record.id,
      status: record.status,
    });
  }
  return {
    id: record.id,
    version: record.version,
    isoCode: record.isoCode,
    name: record.name,
    status: record.status,
    details: { displayName: displayNameOf(record.isoCode, record.name) },
  };
}

function normalizeText(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

async function listAllCountries(ctx: RequestContext, status?: string): Promise<CountryRecord[]> {
  const all: CountryRecord[] = [];
  let page = 1;
  for (;;) {
    const result = status != null
      ? await listCountry({ status, page, pageSize: MAX_PAGE_SIZE }, ctx)
      : await listCountry({ page, pageSize: MAX_PAGE_SIZE }, ctx);
    for (const item of result.items) all.push(item);
    if (!result.hasMore || result.items.length === 0) break;
    page += 1;
  }
  all.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  return all;
}

function paginate(records: CountryRecord[], page: number, pageSize: number): CountryPage {
  const start = (page - 1) * pageSize;
  const slice = records.slice(start, start + pageSize);
  return {
    items: slice.map(toItem),
    page,
    pageSize,
    hasMore: start + pageSize < records.length,
  };
}

// countryIsoCodeFormat
function normalizeCountryData(isoCode: string, name: string): { isoCode: string; name: string } {
  const code = String(isoCode ?? '').trim().toUpperCase();
  const englishName = String(name ?? '').trim();
  if (!ISO_PATTERN.test(code)) {
    throw new AppError('VALIDATION_ERROR', 'The country code must be exactly two letters', 400, {
      ruleId: 'countryIsoCodeFormat',
      field: 'isoCode',
    });
  }
  if (englishName === '') {
    throw new AppError('VALIDATION_ERROR', 'The English name of the country is required', 400, {
      ruleId: 'countryIsoCodeFormat',
      field: 'name',
    });
  }
  return { isoCode: code, name: englishName };
}

// countryIsoCodeUnique
async function assertIsoCodeUnique(ctx: RequestContext, isoCode: string, exceptId?: string): Promise<void> {
  const all = await listAllCountries(ctx);
  const other = all.find((country) => country.isoCode === isoCode && country.id !== exceptId);
  if (other != null) {
    throw new AppError('CONFLICT', 'The code ' + isoCode + ' is already used by the country ' + other.name, 409, {
      ruleId: 'countryIsoCodeUnique',
      id: other.id,
    });
  }
}

async function loadCountry(ctx: RequestContext, id: string, version: number): Promise<CountryRecord> {
  const result = await listCountry({ id: String(id), page: 1, pageSize: 1 }, ctx);
  const found = result.items.find((item) => item.id === String(id));
  if (found == null) {
    throw new AppError('NOT_FOUND', 'Country not found', 404, { id });
  }
  if (found.version !== Number(version)) {
    throw new AppError(
      'VERSION_CONFLICT',
      'The country ' + found.name + ' was changed by someone else; reload it and try again',
      409,
      { id, expectedVersion: found.version, receivedVersion: version },
    );
  }
  return found;
}

export const requests: { [K in keyof CountriesContracts]: (input: CountriesContracts[K]['input'], ctx: RequestContext) => Promise<CountriesContracts[K]['output']> } = {
  "onboarding.countries.listCountries": async function (input, ctx) {
    requireOwner(ctx);
    const { page, pageSize } = resolvePage(input.page, input.pageSize);
    const all = await listAllCountries(ctx);
    return { countries: paginate(all, page, pageSize) };
  },

  "onboarding.countries.searchCountries": async function (input, ctx) {
    requireOwner(ctx);
    const { page, pageSize } = resolvePage(input.page, input.pageSize);
    const term = input.search != null ? normalizeText(input.search.trim()) : '';
    const all = await listAllCountries(ctx, input.status);
    const kept = term === ''
      ? all
      : all.filter((country) => normalizeText(country.isoCode).includes(term) || normalizeText(country.name).includes(term));
    return { countries: paginate(kept, page, pageSize) };
  },

  "onboarding.countries.addCountry": async function (input, ctx) {
    requireOwner(ctx);
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const data = normalizeCountryData(input.isoCode, input.name);
      await assertIsoCodeUnique(bound, data.isoCode);
      const created = await createCountry({ isoCode: data.isoCode, name: data.name }, bound);
      return { country: toItem(created) };
    });
  },

  "onboarding.countries.saveCountryChanges": async function (input, ctx) {
    requireOwner(ctx);
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const current = await loadCountry(bound, input.id, input.version);
      const data = normalizeCountryData(input.isoCode, input.name);
      await assertIsoCodeUnique(bound, data.isoCode, current.id);
      const updated = await updateCountry(
        {
          id: current.id,
          version: current.version,
          isoCode: data.isoCode,
          name: data.name,
          status: current.status,
          details: {},
        },
        bound,
      );
      return { country: toItem(updated) };
    });
  },

  "onboarding.countries.inactivateCountry": async function (input, ctx) {
    requireOwner(ctx);
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const current = await loadCountry(bound, input.id, input.version);
      if (current.status !== 'active') {
        throw new AppError('INVALID_STATE', 'The country ' + current.name + ' is not active', 409, {
          ruleId: 'onlyActiveCountryOffered',
          id: current.id,
          status: current.status,
        });
      }
      const updated = await inactivateCountry({ id: current.id, version: current.version }, bound);
      return { country: toItem(updated) };
    });
  },

  "onboarding.countries.reactivateCountry": async function (input, ctx) {
    requireOwner(ctx);
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const current = await loadCountry(bound, input.id, input.version);
      if (current.status !== 'inactive') {
        throw new AppError('INVALID_STATE', 'The country ' + current.name + ' is not inactive', 409, {
          id: current.id,
          status: current.status,
        });
      }
      const updated = await reactivateCountry({ id: current.id, version: current.version }, bound);
      return { country: toItem(updated) };
    });
  },
};
