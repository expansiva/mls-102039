/// <mls fileReference="_102039_/l2/onboarding/web/contracts/company_setup.defs.ts" enhancement="_blank"/>

/** Identification data of the organization company. */
export interface CompanyIdentification {
  name?: string;
  docType?: 'EIN' | 'CNPJ' | 'VAT' | 'NationalId' | 'Other';
  docId?: string;
  countryCode?: string;
}

/** Address and contact summary of the organization company. */
export interface CompanyBase {
  addresses?: Address[];
  readonly contacts?: ContactSummary[];
}

/** Legal data of the organization company. */
export interface CompanyLegal {
  legalName?: string;
}

/** Computed preparation status of the organization company. */
export interface CompanyOnboarding {
  readonly missingData: string;
  readonly isPrepared: boolean;
}

/** Details of the organization company grouped as the ontology nests them. */
export interface CompanyDetails {
  identification: CompanyIdentification;
  base: CompanyBase;
  company: CompanyLegal;
  onboarding: CompanyOnboarding;
}

/** A phone or e-mail channel of the company contact. */
export interface CompanyContactChannel {
  contactType: 'Phone' | 'Email';
  value: string;
}

/** The organization company of the signed-in login with its data and its computed preparation status. */
export interface Company {
  id: string;
  version: number;
  details: CompanyDetails;
  /** The channel of the contact linked by HasContact, when there is one. */
  readonly companyContact?: CompanyContactChannel;
}

/** Computed presentation data of a country. */
export interface CountryDetails {
  readonly displayName: string;
}

/** An active country of the module country list. */
export interface CountryOption {
  isoCode: string;
  name: string;
  status: 'active' | 'inactive';
  details: CountryDetails;
}

export interface ContactSummary {
  mdmId: string;
  title: string;
}

export interface Address {
  type: 'Residential' | 'Commercial' | 'Billing' | 'Delivery' | 'Other';
  label?: string;
  line1: string;
  line2?: string;
  line3?: string;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
  countryCode: string;
  readonly formatted?: string;
  geolocation?: GeoPoint;
  isPrimary: boolean;
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Company_setupContracts {
  /**
   * Purpose: Loads in one call the company the platform has for the signed-in login, with its computed preparation status, and the active countries the owner may choose as company country.
   * Input: None: the company is resolved from the signed-in login on the server.
   * Processing: Resolves the company of the session login (read.byId) and refuses callers who are not the company owner with an authority error (onlyOwnerPreparesCompany), kept distinct from a validation error and from a missing company (authorityErrorDistinctFromValidation). Reads the linked contacts summary (listLinks) so the existing contact is not asked again (companyNotAskedAgainForExistingData). Computes missingData and isPrepared: prepared only when name, legal name, country, document, address and a contact are all saved (companyPreparedWhenRequiredSaved); these derived values are never stored. Lists only active countries ordered by name, with displayName translated from the ISO code into the user language, falling back to the English name (onlyActiveCountryOffered). The company countryCode is returned as stored; when unknown it stays empty and is never replaced by a default (companyCountryNeverDefaulted).
   * Output: company: the company record with id, version, identification (name, docType, docId, countryCode), base (addresses, contacts summary), legal name and onboarding (missingData, isPrepared). countries: the plain list of active countries with ISO code, English name, status and display name.
   */
  'onboarding.company_setup.getCompanySetup': {
    kind: 'qry';
    input: {};
    output: { company: Company; countries: CountryOption[] };
    rules: ['onlyOwnerPreparesCompany', 'companyNotAskedAgainForExistingData', 'companyPreparedWhenRequiredSaved', 'onlyActiveCountryOffered', 'companyCountryNeverDefaulted', 'authorityErrorDistinctFromValidation'];
    access: { actors: ['companyOwner']; grants: ['ownerPrepareCompany', 'ownerMaintainCountries']; scope: 'organization' };
  };
  /**
   * Purpose: Saves the missing company data of the owner’s company through the platform update.
   * Input: id and version: the company and the version the owner saw, for optimistic concurrency. details.identification.name, details.company.legalName, details.identification.docType, details.identification.docId, details.identification.countryCode, details.base.addresses: the company data typed by the owner; only the data still missing is sent.
   * Processing: Refuses callers who are not the company owner with an authority error (onlyOwnerPreparesCompany), distinct from validation errors such as a stale version, a bad document shape or a document already held by another record (authorityErrorDistinctFromValidation). Writes only the data the platform does not already have (companyNotAskedAgainForExistingData). Requires countryCode to be one of the active countries and never fills an absent country with a default (onlyActiveCountryOffered, companyCountryNeverDefaulted). Reuses the existing company contact of the same type and value instead of creating a duplicate (companyContactNotDuplicated). Recomputes missingData and isPrepared after saving (companyPreparedWhenRequiredSaved); they are derived, never stored.
   * Output: company: the company record in its new state with its new version, data, contacts summary and recomputed missingData and isPrepared.
   */
  'onboarding.company_setup.saveCompany': {
    kind: 'cmd';
    writes: 'OrganizationCompany.update';
    input: { id: string; version: number; details: { identification: { name?: string; docType?: 'EIN' | 'CNPJ' | 'VAT' | 'NationalId' | 'Other'; docId?: string; countryCode?: string }; company: { legalName?: string }; base: { addresses?: Address[] } }; companyContact?: { contactType?: 'Phone' | 'Email'; value?: string } };
    output: { company: Company };
    rules: ['onlyOwnerPreparesCompany', 'companyNotAskedAgainForExistingData', 'companyCountryNeverDefaulted', 'onlyActiveCountryOffered', 'companyContactNotDuplicated', 'companyPreparedWhenRequiredSaved', 'authorityErrorDistinctFromValidation'];
    access: { actors: ['companyOwner']; grants: ['ownerPrepareCompany', 'ownerMaintainCountries']; scope: 'organization' };
  };
}
