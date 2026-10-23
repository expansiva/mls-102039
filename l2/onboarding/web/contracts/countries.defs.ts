/// <mls fileReference="_102039_/l2/onboarding/web/contracts/countries.defs.ts" enhancement="_blank"/>

/** Computed details of a country: its name in the language of the person using the screen. */
export interface CountryDetails {
  readonly displayName: string;
}

/** A country of the module country list with its ISO code, English name, status, name in the user language and version. */
export interface CountryItem {
  id: string;
  version: number;
  isoCode: string;
  name: string;
  status: 'active' | 'inactive';
  details: CountryDetails;
}

export interface CountriesContracts {
  /**
   * Purpose: Loads the first page of the whole module country list, active and inactive, when the countries page opens.
   * Input: page: page number to load (starts at 1). pageSize: number of countries per page.
   * Processing: Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Reads every country regardless of status, ordered by English name. Computes details.displayName for each country by translating the ISO code into the caller’s language, falling back to the English name when no translation is known; it is never stored.
   * Output: A paged list { items, page, pageSize, hasMore } of countries, each with id, version, ISO code, English name, status and name in the user language.
   */
  'onboarding.countries.listCountries': {
    kind: 'qry';
    input: { page: number; pageSize: number };
    output: { countries: { items: CountryItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['onlyOwnerMaintainsCountries'];
    access: { actors: ['companyOwner']; grants: ['ownerMaintainCountries']; scope: 'organization' };
  };
  /**
   * Purpose: Finds countries by ISO code or English name, optionally limited to one status, for the owner’s search.
   * Input: search: text typed by the owner, matched against ISO code or English name (contains, case-insensitive); empty means all. status: optional filter active or inactive; absent means both. page, pageSize: the page requested.
   * Processing: Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Filters countries whose ISO code or English name contains the text and, when given, by status; orders by English name. Computes details.displayName from the ISO code in the caller’s language, falling back to the English name.
   * Output: A paged list { items, page, pageSize, hasMore } of matching countries with id, version, ISO code, English name, status and name in the user language.
   */
  'onboarding.countries.searchCountries': {
    kind: 'qry';
    input: { search?: string; status?: 'active' | 'inactive'; page: number; pageSize: number };
    output: { countries: { items: CountryItem[]; page: number; pageSize: number; hasMore: boolean } };
    rules: ['onlyOwnerMaintainsCountries'];
    access: { actors: ['companyOwner']; grants: ['ownerMaintainCountries']; scope: 'organization' };
  };
  /**
   * Purpose: Adds a new country to the module country list.
   * Input: isoCode: two-letter ISO 3166-1 alpha-2 code. name: English name of the country.
   * Processing: Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Normalizes the code to upper case and refuses it unless it is exactly two letters, and refuses an empty English name (countryIsoCodeFormat). Refuses a code already used by another country (countryIsoCodeUnique). Creates the country as active. Computes details.displayName for the response.
   * Output: The created country, active, with id, version, ISO code, English name and name in the user language.
   */
  'onboarding.countries.addCountry': {
    kind: 'cmd';
    writes: 'Country.create';
    input: { isoCode: string; name: string };
    output: { country: CountryItem };
    rules: ['onlyOwnerMaintainsCountries', 'countryIsoCodeFormat', 'countryIsoCodeUnique'];
    access: { actors: ['companyOwner']; grants: ['ownerMaintainCountries']; scope: 'organization' };
  };
  /**
   * Purpose: Corrects the ISO code or English name of an existing country.
   * Input: id: the country being edited. version: the version the owner saw, for optimistic concurrency. isoCode: corrected two-letter code. name: corrected English name.
   * Processing: Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Refuses when the version no longer matches. Normalizes the code to upper case and refuses it unless it is two letters, and refuses an empty English name (countryIsoCodeFormat). Refuses a code used by another country (countryIsoCodeUnique). Status is not changed. Computes details.displayName for the response.
   * Output: The updated country in its new state with its new version, ISO code, English name, status and name in the user language.
   */
  'onboarding.countries.saveCountryChanges': {
    kind: 'cmd';
    writes: 'Country.update';
    input: { id: string; version: number; isoCode: string; name: string };
    output: { country: CountryItem };
    rules: ['onlyOwnerMaintainsCountries', 'countryIsoCodeFormat', 'countryIsoCodeUnique'];
    access: { actors: ['companyOwner']; grants: ['ownerMaintainCountries']; scope: 'organization' };
  };
  /**
   * Purpose: Inactivates a country so it is no longer offered for selection.
   * Input: id: the country to inactivate. version: the version the owner saw, for optimistic concurrency.
   * Processing: Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Refuses when the version no longer matches or the country is not active. Applies the inactivateCountry transition; people and companies that already point at the country keep it, it is only no longer offered (onlyActiveCountryOffered). Computes details.displayName for the response.
   * Output: The country in its new inactive state with its new version and name in the user language.
   */
  'onboarding.countries.inactivateCountry': {
    kind: 'cmd';
    writes: 'Country.inactivateCountry';
    input: { id: string; version: number };
    output: { country: CountryItem };
    rules: ['onlyOwnerMaintainsCountries', 'onlyActiveCountryOffered'];
    access: { actors: ['companyOwner']; grants: ['ownerMaintainCountries']; scope: 'organization' };
  };
  /**
   * Purpose: Reactivates an inactive country so it is offered for selection again.
   * Input: id: the country to reactivate. version: the version the owner saw, for optimistic concurrency.
   * Processing: Refuses callers who are not the company owner (onlyOwnerMaintainsCountries). Refuses when the version no longer matches or the country is not inactive. Applies the reactivateCountry transition. Computes details.displayName for the response.
   * Output: The country in its new active state with its new version and name in the user language.
   */
  'onboarding.countries.reactivateCountry': {
    kind: 'cmd';
    writes: 'Country.reactivateCountry';
    input: { id: string; version: number };
    output: { country: CountryItem };
    rules: ['onlyOwnerMaintainsCountries'];
    access: { actors: ['companyOwner']; grants: ['ownerMaintainCountries']; scope: 'organization' };
  };
}
