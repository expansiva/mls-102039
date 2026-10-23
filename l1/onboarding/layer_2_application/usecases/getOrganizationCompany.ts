/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/getOrganizationCompany.ts" enhancement="_blank"/>
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface GetOrganizationCompanyInput extends Record<string, unknown> {
  id: string;
}

export interface GetOrganizationCompanyOutput extends Record<string, unknown> {
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

export async function getOrganizationCompany(input: GetOrganizationCompanyInput, ctx: RequestContext): Promise<GetOrganizationCompanyOutput> {
  const rawId = input.id;
  if (rawId == null || String(rawId).trim() === '') {
    throw new AppError('VALIDATION_ERROR', 'The company id is required.', 400);
  }
  const mdmId = String(rawId);

  const found = await ctx.mdm.entity.get({ mdmId });
  if (!found) {
    throw new AppError('NOT_FOUND', 'Organization company was not found.', 404);
  }

  const flat: Record<string, unknown> = { ...found.details };

  const text = (value: unknown): string => (value == null ? '' : String(value));
  const list = (value: unknown): Record<string, unknown>[] =>
    Array.isArray(value) ? (value as Record<string, unknown>[]) : [];

  const addresses = list(flat.addresses);
  const contacts = list(flat.contacts);
  const linkedContactIds = found.related('contacts');

  const identification: GetOrganizationCompanyOutput['details']['identification'] = {
    subtype: text(flat.subtype),
    name: text(flat.name),
    status: text(flat.status),
    countryCode: text(flat.countryCode),
  };
  if (flat.docType != null) identification.docType = String(flat.docType);
  if (flat.docId != null) identification.docId = String(flat.docId);

  const legalName = text(flat.legalName);

  // Derived: computed every time from the saved data, never read from storage.
  const missing: string[] = [];
  if (identification.name.trim() === '') missing.push('name');
  if (legalName.trim() === '') missing.push('legal name');
  if (identification.countryCode.trim() === '') missing.push('country');
  if (identification.docType == null || identification.docId == null || identification.docId.trim() === '') missing.push('document');
  if (addresses.length === 0) missing.push('address');
  if (contacts.length === 0 && linkedContactIds.length === 0) missing.push('contact');

  const details: GetOrganizationCompanyOutput['details'] = {
    identification,
    base: { addresses, contacts },
    company: {
      companyKind: text(flat.companyKind),
      legalName,
    },
    onboarding: {
      missingData: missing.join(', '),
      isPrepared: missing.length === 0,
    },
  };
  const general = flat.general;
  if (general != null && typeof general === 'object' && !Array.isArray(general)) {
    details.general = general as Record<string, unknown>;
  }

  return {
    id: found.mdmId,
    version: found.version,
    details,
  };
}
