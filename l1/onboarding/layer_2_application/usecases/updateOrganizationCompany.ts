/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/updateOrganizationCompany.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { CountryRepository } from '/_102039_/l1/onboarding/layer_2_application/ports/countryRepository.js';

export interface UpdateOrganizationCompanyInput extends Record<string, unknown> {
  details: {
    identification: {
      name: string;
      docType?: string;
      docId?: string;
      countryCode: string;
    };
    base: {
      addresses: Record<string, unknown>[];
    };
    company: {
      companyKind: string;
      legalName: string;
    };
    general?: Record<string, unknown>;
    onboarding?: Record<string, unknown>;
  };
  id: string;
  version: number;
}

export interface UpdateOrganizationCompanyOutput extends Record<string, unknown> {
  id: string;
  version: number;
  details: {
    identification: {
      subtype: string;
      name: string;
      status: string;
      docType?: string;
      docId?: string;
      countryCode: string;
    };
    base: {
      addresses: Record<string, unknown>[];
      contacts: Record<string, unknown>[];
    };
    company: {
      companyKind: string;
      legalName: string;
    };
    general?: Record<string, unknown>;
    onboarding?: {
      missingData?: string;
      isPrepared?: boolean;
    };
  };
}

function str(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() !== '' ? value : undefined;
}

function addressList(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
}

function computeMissing(flat: Record<string, unknown>, contactCount: number): string[] {
  const missing: string[] = [];
  if (str(flat.name) === undefined) missing.push('name');
  if (str(flat.legalName) === undefined) missing.push('legal name');
  if (str(flat.countryCode) === undefined) missing.push('country');
  if (str(flat.docType) === undefined || str(flat.docId) === undefined) missing.push('document');
  if (addressList(flat.addresses).length === 0) missing.push('address');
  if (contactCount === 0) missing.push('contact');
  return missing;
}

export async function updateOrganizationCompany(input: UpdateOrganizationCompanyInput, ctx: RequestContext): Promise<UpdateOrganizationCompanyOutput> {
  // onlyOwnerPreparesCompany (authority error: 403, distinct from validation 400 and not found 404)
  const scope = ctx.sessionContext.actorScope ?? [];
  const actorId = ctx.sessionContext.actorId;
  const isOwner = actorId === 'companyOwner'
    || scope.some((s) => s === 'companyOwner' || s.endsWith(':companyOwner'));
  if (!isOwner) {
    throw new AppError('FORBIDDEN', 'Only the company owner can prepare the company.', 403, { ruleId: 'onlyOwnerPreparesCompany' });
  }

  const mdmId = str(input.id);
  if (mdmId === undefined) {
    throw new AppError('VALIDATION_ERROR', 'The company id is required.', 400, { ruleId: 'authorityErrorDistinctFromValidation' });
  }
  const expectedVersion = Number(input.version);
  if (!Number.isFinite(expectedVersion)) {
    throw new AppError('VALIDATION_ERROR', 'The company version is required.', 400, { ruleId: 'authorityErrorDistinctFromValidation' });
  }

  const existing = await ctx.mdm.entity.get({ mdmId });
  if (existing == null) {
    throw new AppError('NOT_FOUND', 'Company not found.', 404, { ruleId: 'authorityErrorDistinctFromValidation' });
  }
  if (existing.version !== expectedVersion) {
    throw new AppError('CONCURRENCY_CONFLICT', 'Version does not match the stored row.', 409);
  }

  const current: Record<string, unknown> = { ...existing.details };
  const inIdent = input.details?.identification;
  const inCompany = input.details?.company;
  const inAddresses = input.details?.base?.addresses;

  const patch: Record<string, unknown> = {};

  // companyNotAskedAgainForExistingData: data the platform already has is kept; it is not asked or overwritten again
  const keepExisting = (field: string, given: string | undefined, label: string): void => {
    if (given === undefined) return;
    const stored = str(current[field]);
    if (stored === undefined) {
      patch[field] = given;
      return;
    }
    if (stored !== given) {
      throw new AppError(
        'CONFLICT',
        `The platform already has the company ${label}; it is not asked again.`,
        409,
        { ruleId: 'companyNotAskedAgainForExistingData' },
      );
    }
  };
  keepExisting('name', str(inIdent?.name), 'name');
  keepExisting('docType', str(inIdent?.docType), 'document type');
  keepExisting('docId', str(inIdent?.docId), 'document number');

  const legalName = str(inCompany?.legalName);
  if (legalName !== undefined) patch.legalName = legalName;
  const companyKind = str(inCompany?.companyKind);
  if (companyKind !== undefined) patch.companyKind = companyKind;
  if (Array.isArray(inAddresses) && inAddresses.length > 0) patch.addresses = inAddresses;

  // companyCountryNeverDefaulted: the country must be an active one of the module list; never replaced by a default
  const countryCode = str(inIdent?.countryCode);
  if (countryCode !== undefined) {
    const countryRepo = resolveRepository<CountryRepository>(ctx, 'CountryRepository');
    const found = await countryRepo.list({ isoCode: countryCode });
    const active = found.some((c) => c.isoCode === countryCode && c.status === 'active');
    if (!active) {
      throw new AppError('VALIDATION_ERROR', 'The company country must be an active country of the country list.', 400, { ruleId: 'companyCountryNeverDefaulted' });
    }
    patch.countryCode = countryCode;
  }

  // companyPreparedWhenRequiredSaved: the company is prepared only when everything required is saved
  const contactIds = existing.related('contacts');
  const claimedPrepared = input.details?.onboarding?.isPrepared === true;
  if (claimedPrepared) {
    const projected = computeMissing({ ...current, ...patch }, contactIds.length);
    if (projected.length > 0) {
      throw new AppError(
        'CONFLICT',
        `The company is not prepared; still missing: ${projected.join(', ')}.`,
        409,
        { ruleId: 'companyPreparedWhenRequiredSaved' },
      );
    }
  }

  type Patch = Parameters<typeof ctx.mdm.entity.update>[0]['patch'];
  const written = Object.keys(patch).length > 0
    ? await ctx.mdm.entity.update({ mdmId, expectedVersion, patch: patch as Patch })
    : existing;

  const d: Record<string, unknown> = { ...written.details };
  const writtenContactIds = written.related('contacts');
  const contacts: Record<string, unknown>[] = [];
  if (writtenContactIds.length > 0) {
    const records = await ctx.mdm.collection.getMany({ mdmIds: writtenContactIds });
    for (const r of records) {
      const rd: Record<string, unknown> = { ...r.details };
      contacts.push({ mdmId: r.mdmId, title: str(rd.name) ?? r.mdmId });
    }
  }

  const addresses = addressList(d.addresses);
  const outDocType = str(d.docType);
  const outDocId = str(d.docId);
  // Derived: computed every time, never stored
  const missing = computeMissing(d, writtenContactIds.length);

  const identification: UpdateOrganizationCompanyOutput['details']['identification'] = {
    subtype: str(d.subtype) ?? 'Company',
    name: str(d.name) ?? '',
    status: str(d.status) ?? '',
    countryCode: str(d.countryCode) ?? '',
  };
  if (outDocType !== undefined) identification.docType = outDocType;
  if (outDocId !== undefined) identification.docId = outDocId;

  const output: UpdateOrganizationCompanyOutput = {
    id: written.mdmId,
    version: written.version,
    details: {
      identification,
      base: { addresses, contacts },
      company: {
        companyKind: str(d.companyKind) ?? 'LegalEntity',
        legalName: str(d.legalName) ?? '',
      },
      onboarding: { missingData: missing.join(', '), isPrepared: missing.length === 0 },
    },
  };
  const general = d.general;
  if (general != null && typeof general === 'object' && !Array.isArray(general)) {
    output.details.general = general as Record<string, unknown>;
  }
  return output;
}
