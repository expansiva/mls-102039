/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/requests/company_setup.ts" enhancement="_blank"/>

import type { Company_setupContracts } from '/_102039_/l2/onboarding/web/contracts/company_setup.defs.js';
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { AppError } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { getOrganizationCompany } from '/_102039_/l1/onboarding/layer_2_application/usecases/getOrganizationCompany.js';
import type { GetOrganizationCompanyOutput } from '/_102039_/l1/onboarding/layer_2_application/usecases/getOrganizationCompany.js';
import { listCountry } from '/_102039_/l1/onboarding/layer_2_application/usecases/listCountry.js';
import { updateOrganizationCompany } from '/_102039_/l1/onboarding/layer_2_application/usecases/updateOrganizationCompany.js';
import type { UpdateOrganizationCompanyOutput } from '/_102039_/l1/onboarding/layer_2_application/usecases/updateOrganizationCompany.js';

type Contracts = Company_setupContracts;
type CompanyOut = Contracts['onboarding.company_setup.getCompanySetup']['output']['company'];
type CountryOut = Contracts['onboarding.company_setup.getCompanySetup']['output']['countries'][number];
type AddressOut = NonNullable<CompanyOut['details']['base']['addresses']>[number];
type ContactOut = NonNullable<CompanyOut['details']['base']['contacts']>[number];
type ChannelOut = NonNullable<CompanyOut['companyContact']>;
type DocType = NonNullable<CompanyOut['details']['identification']['docType']>;
type CompanyRecord = GetOrganizationCompanyOutput | UpdateOrganizationCompanyOutput;

const DOC_TYPES: readonly string[] = ['EIN', 'CNPJ', 'VAT', 'NationalId', 'Other'];
const ADDRESS_TYPES: readonly string[] = ['Residential', 'Commercial', 'Billing', 'Delivery', 'Other'];

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function isDocType(value: unknown): value is DocType {
  return typeof value === 'string' && DOC_TYPES.includes(value);
}

function isAddressType(value: unknown): value is AddressOut['type'] {
  return typeof value === 'string' && ADDRESS_TYPES.includes(value);
}

/** onlyOwnerPreparesCompany / authorityErrorDistinctFromValidation: an authority error, never a validation error. */
function requireOwner(ctx: RequestContext): void {
  const scope = ctx.sessionContext.actorScope ?? [];
  const isOwner = scope.some((item) => item === 'companyOwner' || item.endsWith(':companyOwner'));
  if (!isOwner) {
    throw new AppError('FORBIDDEN', 'Only the company owner can prepare the company.', 403, {
      ruleId: 'onlyOwnerPreparesCompany',
      kind: 'authority',
    });
  }
}

function resolveCompanyId(ctx: RequestContext): string {
  const id = ctx.sessionContext.activeCompanyId ?? ctx.sessionContext.businessContext.activeCompanyId;
  if (id == null || id === '') {
    throw new AppError('NOT_FOUND', 'The company of the signed-in login was not found.', 404, {
      reason: 'no company in the session',
    });
  }
  return id;
}

function toAddress(r: Record<string, unknown>): AddressOut {
  const type = r.type;
  if (!isAddressType(type) || typeof r.line1 !== 'string' || typeof r.countryCode !== 'string' || typeof r.isPrimary !== 'boolean') {
    throw new AppError('INVALID_STORED_ADDRESS', 'A stored company address does not have the expected shape.', 500, {
      address: r,
    });
  }
  const geo = asRecord(r.geolocation);
  const address: AddressOut = {
    type,
    line1: r.line1,
    countryCode: r.countryCode,
    isPrimary: r.isPrimary,
    ...(typeof r.label === 'string' ? { label: r.label } : {}),
    ...(typeof r.line2 === 'string' ? { line2: r.line2 } : {}),
    ...(typeof r.line3 === 'string' ? { line3: r.line3 } : {}),
    ...(typeof r.city === 'string' ? { city: r.city } : {}),
    ...(typeof r.stateOrProvince === 'string' ? { stateOrProvince: r.stateOrProvince } : {}),
    ...(typeof r.postalCode === 'string' ? { postalCode: r.postalCode } : {}),
    ...(typeof r.formatted === 'string' ? { formatted: r.formatted } : {}),
    ...(geo !== null && typeof geo.lat === 'number' && typeof geo.lng === 'number'
      ? { geolocation: { lat: geo.lat, lng: geo.lng } }
      : {}),
  };
  return address;
}

function contactFromRecord(r: Record<string, unknown>): ContactOut | null {
  const mdmId = typeof r.mdmId === 'string' ? r.mdmId : typeof r.id === 'string' ? r.id : null;
  if (mdmId === null) return null;
  const title = typeof r.title === 'string' ? r.title : typeof r.name === 'string' ? r.name : '';
  return { mdmId, title };
}

/** companyNotAskedAgainForExistingData: the contacts already linked (HasContact) to the company. */
async function loadContacts(ctx: RequestContext, company: CompanyRecord): Promise<ContactOut[]> {
  const fromUsecase: ContactOut[] = [];
  for (const raw of company.details.base.contacts ?? []) {
    const contact = contactFromRecord(raw);
    if (contact !== null) fromUsecase.push(contact);
  }
  if (fromUsecase.length > 0 && fromUsecase.every((contact) => contact.title !== '')) return fromUsecase;

  const companyRecord = asRecord(await ctx.mdm.entity.get({ mdmId: company.id }));
  const details = asRecord(companyRecord?.details);
  const refs = asRecord(details?.relationshipRefs)?.contacts;
  if (!Array.isArray(refs)) return [];
  const contacts: ContactOut[] = [];
  for (const ref of refs) {
    if (typeof ref !== 'string') continue;
    const contactRecord = asRecord(await ctx.mdm.entity.get({ mdmId: ref }));
    const contactDetails = asRecord(contactRecord?.details);
    const identification = asRecord(contactDetails?.identification);
    // The platform returns the record flat (details.name); identification.name is the grouped form.
    const title = typeof identification?.name === 'string' ? identification.name : typeof contactDetails?.name === 'string' ? contactDetails.name : '';
    contacts.push({ mdmId: ref, title });
  }
  return contacts;
}

/** The channel of the first linked contact, for the screen to show and edit. */
async function loadChannel(ctx: RequestContext, contacts: ContactOut[]): Promise<ChannelOut | undefined> {
  const first = contacts[0];
  if (first === undefined) return undefined;
  const details = asRecord(asRecord(await ctx.mdm.entity.get({ mdmId: first.mdmId }))?.details);
  const nested = asRecord(details?.contactChannel);
  const contactType = details?.contactType ?? nested?.contactType;
  const value = details?.value ?? nested?.value;
  if ((contactType !== 'Phone' && contactType !== 'Email') || typeof value !== 'string' || value === '') return undefined;
  return { contactType, value };
}

/** companyPreparedWhenRequiredSaved: derived, never stored. */
function computeOnboarding(
  name: string,
  legalName: string,
  countryCode: string,
  docType: string,
  docId: string,
  addressCount: number,
  contactCount: number,
): { missingData: string; isPrepared: boolean } {
  const missing: string[] = [];
  if (name === '') missing.push('name');
  if (legalName === '') missing.push('legalName');
  if (countryCode === '') missing.push('country');
  if (docType === '' || docId === '') missing.push('document');
  if (addressCount === 0) missing.push('address');
  if (contactCount === 0) missing.push('contact');
  return { missingData: missing.join(', '), isPrepared: missing.length === 0 };
}

function toCompany(record: CompanyRecord, contacts: ContactOut[], channel?: ChannelOut): CompanyOut {
  const stored = record.details.identification;
  const addresses: AddressOut[] = (record.details.base.addresses ?? []).map(toAddress);
  const docType = stored.docType;
  if (docType != null && !isDocType(docType)) {
    throw new AppError('INVALID_STORED_DOCUMENT_TYPE', 'The stored company document type is not supported.', 500, {
      docType,
    });
  }
  const legalName = record.details.company.legalName ?? '';
  const onboarding = computeOnboarding( // companyPreparedWhenRequiredSaved
    stored.name ?? '',
    legalName,
    stored.countryCode ?? '',
    docType ?? '',
    stored.docId ?? '',
    addresses.length,
    contacts.length,
  );
  return {
    id: record.id,
    version: record.version,
    details: {
      identification: {
        ...(stored.name != null && stored.name !== '' ? { name: stored.name } : {}),
        ...(docType != null ? { docType } : {}),
        ...(stored.docId != null && stored.docId !== '' ? { docId: stored.docId } : {}),
        // companyCountryNeverDefaulted: returned as stored, left out when unknown.
        ...(stored.countryCode != null && stored.countryCode !== '' ? { countryCode: stored.countryCode } : {}),
      },
      base: { addresses, contacts },
      company: { ...(legalName !== '' ? { legalName } : {}) },
      onboarding: { missingData: onboarding.missingData, isPrepared: onboarding.isPrepared },
    },
    ...(channel !== undefined ? { companyContact: channel } : {}),
  };
}

/** onlyActiveCountryOffered: lists every active country, ordered by name. */
async function listActiveCountries(ctx: RequestContext): Promise<CountryOut[]> {
  const countries: CountryOut[] = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const result = await listCountry({ status: 'active', page, pageSize: 200 }, ctx);
    for (const item of result.items) {
      if (item.status !== 'active') continue;
      const details = asRecord(item.details);
      const translated = typeof details?.displayName === 'string' && details.displayName !== '' ? details.displayName : null;
      countries.push({
        isoCode: item.isoCode,
        name: item.name,
        status: 'active',
        // displayName falls back to the English name when no translation is known.
        details: { displayName: translated ?? item.name },
      });
    }
    hasMore = result.hasMore;
    page += 1;
  }
  countries.sort((a, b) => a.name.localeCompare(b.name));
  return countries;
}

export const requests: { [K in keyof Company_setupContracts]: (input: Company_setupContracts[K]['input'], ctx: RequestContext) => Promise<Company_setupContracts[K]['output']> } = {
  "onboarding.company_setup.getCompanySetup": async function (input, ctx) {
    // onlyOwnerPreparesCompany + authorityErrorDistinctFromValidation: authority error, not a validation or missing-company error.
    requireOwner(ctx);
    const id = resolveCompanyId(ctx);
    const record = await getOrganizationCompany({ id }, ctx);
    const contacts = await loadContacts(ctx, record);
    const company = toCompany(record, contacts, await loadChannel(ctx, contacts));
    const countries = await listActiveCountries(ctx);
    return { company, countries };
  },

  "onboarding.company_setup.saveCompany": async function (input, ctx) {
    requireOwner(ctx); // onlyOwnerPreparesCompany, authorityErrorDistinctFromValidation
    return ctx.data.moduleData.runInTransaction(async (tx) => {
      const bound: RequestContext = { ...ctx, data: { ...ctx.data, moduleData: tx } };
      const id = String(input.id);
      const existing = await getOrganizationCompany({ id }, bound);
      const sent = input.details;

      // companyNotAskedAgainForExistingData: write only what the platform does not already have.
      const existingName = existing.details.identification.name ?? '';
      const existingLegalName = existing.details.company.legalName ?? '';
      const existingDocType = existing.details.identification.docType ?? '';
      const existingDocId = existing.details.identification.docId ?? '';
      const existingCountry = existing.details.identification.countryCode ?? '';
      const existingAddresses = existing.details.base.addresses ?? [];

      const name = existingName !== '' ? existingName : (sent.identification.name ?? '');
      const legalName = existingLegalName !== '' ? existingLegalName : (sent.company.legalName ?? '');
      const docType = existingDocType !== '' ? existingDocType : (sent.identification.docType ?? '');
      const docId = existingDocId !== '' ? existingDocId : (sent.identification.docId ?? '');

      // companyCountryNeverDefaulted: an absent country stays as stored (empty), never a default.
      let countryCode = existingCountry;
      if (existingCountry === '' && sent.identification.countryCode != null && sent.identification.countryCode !== '') {
        const chosen = sent.identification.countryCode;
        // onlyActiveCountryOffered: the country must be one of the active countries.
        const active = await listCountry({ isoCode: chosen, status: 'active', page: 1, pageSize: 1 }, bound);
        if (active.items.length === 0) {
          throw new AppError('VALIDATION_ERROR', 'The chosen country is not an active country.', 422, {
            ruleId: 'onlyActiveCountryOffered',
            countryCode: chosen,
          });
        }
        countryCode = chosen;
      }

      const addresses: Record<string, unknown>[] =
        existingAddresses.length > 0
          ? existingAddresses
          : (sent.base.addresses ?? []).map((a) => ({ ...a }));

      const updated = await updateOrganizationCompany(
        {
          id,
          version: Number(input.version),
          details: {
            identification: {
              name,
              countryCode,
              ...(docType !== '' ? { docType } : {}),
              ...(docId !== '' ? { docId } : {}),
            },
            base: { addresses },
            company: { companyKind: existing.details.company.companyKind, legalName },
            ...(existing.details.general !== undefined ? { general: existing.details.general } : {}),
          },
        },
        bound,
      );

      // companyContactNotDuplicated: attach the existing channel, create only when none exists, link idempotently.
      const contactType = input.companyContact?.contactType;
      const contactValue = (input.companyContact?.value ?? '').trim();
      if ((contactType == null) !== (contactValue === '')) {
        throw new AppError('VALIDATION_ERROR', 'The contact type and the contact value must be sent together.', 422, { ruleId: 'companyContactNotDuplicated' });
      }
      if (contactType != null && contactValue !== '') {
        const found = await bound.mdm.entity.findByContact(contactType, contactValue);
        let contactId: string;
        if (found != null) {
          contactId = found.mdmId;
        } else {
          if (countryCode === '') {
            throw new AppError('VALIDATION_ERROR', 'The company country must be saved before its contact; it is never defaulted.', 422, { ruleId: 'companyCountryNeverDefaulted' });
          }
          const created = await bound.mdm.entity.create({
            details: { subtype: 'ContactChannel', name: `${name || 'Company'} ${contactType}`, countryCode, contactType, value: contactValue, isVerified: false },
          });
          contactId = created.mdmId;
        }
        await bound.mdm.entity.attachRole(contactId, 'onboarding.CompanyContact');
        const refsByCompany = await bound.mdm.collection.relatedOfMany({ mdmIds: [id], type: 'HasContact' });
        let alreadyLinked = false;
        for (const ref of refsByCompany[id] ?? []) {
          if (ref.mdmId === contactId) alreadyLinked = true;
          else if (ref.mdmId !== id) await bound.mdm.entity.unlink({ relationshipId: ref.relationshipId }); // one contact per company
        }
        if (!alreadyLinked) await bound.mdm.entity.link({ fromId: id, toId: contactId, type: 'HasContact' });
      }

      // companyPreparedWhenRequiredSaved: recomputed in toCompany from the saved state.
      const saved = await getOrganizationCompany({ id }, bound);
      const contacts = await loadContacts(bound, saved);
      return { company: toCompany(saved, contacts, await loadChannel(bound, contacts)) };
    });
  },
};
