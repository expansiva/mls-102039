/// <mls fileReference="_102039_/l2/onboarding/web/shared/countries.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { CountriesContracts, CountryItem } from '/_102039_/l2/onboarding/web/contracts/countries.defs.js';

export type { CountriesContracts, CountryDetails, CountryItem } from '/_102039_/l2/onboarding/web/contracts/countries.defs.js';

type Input<R extends keyof CountriesContracts> = CountriesContracts[R]['input'];
type Output<R extends keyof CountriesContracts> = CountriesContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;
export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';
export type PageStatus = 'idle' | 'loading' | 'empty' | 'success' | 'error';
export type CountryStatusFilter = 'active' | 'inactive';
export type CountriesPage = Output<'onboarding.countries.listCountries'>['countries'];

/** Form draft of the add-country command: every leaf is null until typed. */
export type AddCountryDraft = {
  isoCode: string | null;
  name: string | null;
};

/** Form draft of the edit-country command: id and version come from the selected record, the person types isoCode and name. */
export type SaveCountryChangesDraft = {
  id: string | null;
  version: number | null;
  isoCode: string | null;
  name: string | null;
};

function emptyAddCountryDraft(): AddCountryDraft {
  return { isoCode: null, name: null };
}

function emptySaveCountryChangesDraft(): SaveCountryChangesDraft {
  return { id: null, version: null, isoCode: null, name: null };
}

type StateMember =
  | 'countries'
  | 'selectedCountry'
  | 'searchTerm'
  | 'statusFilter'
  | 'addCountryDraft'
  | 'saveCountryChangesDraft'
  | 'pageStatus'
  | 'listCountriesStatus'
  | 'listCountriesError'
  | 'searchCountriesStatus'
  | 'searchCountriesError'
  | 'addCountryStatus'
  | 'addCountryError'
  | 'saveCountryChangesStatus'
  | 'saveCountryChangesError'
  | 'inactivateCountryStatus'
  | 'inactivateCountryError'
  | 'reactivateCountryStatus'
  | 'reactivateCountryError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.onboarding.countries.countries': 'countries',
  'ui.onboarding.countries.selectedCountry': 'selectedCountry',
  'ui.onboarding.countries.searchTerm': 'searchTerm',
  'ui.onboarding.countries.statusFilter': 'statusFilter',
  'ui.onboarding.countries.addCountryDraft': 'addCountryDraft',
  'ui.onboarding.countries.saveCountryChangesDraft': 'saveCountryChangesDraft',
  'ui.onboarding.countries.pageStatus': 'pageStatus',
  'ui.onboarding.countries.listCountriesStatus': 'listCountriesStatus',
  'ui.onboarding.countries.listCountriesError': 'listCountriesError',
  'ui.onboarding.countries.searchCountriesStatus': 'searchCountriesStatus',
  'ui.onboarding.countries.searchCountriesError': 'searchCountriesError',
  'ui.onboarding.countries.addCountryStatus': 'addCountryStatus',
  'ui.onboarding.countries.addCountryError': 'addCountryError',
  'ui.onboarding.countries.saveCountryChangesStatus': 'saveCountryChangesStatus',
  'ui.onboarding.countries.saveCountryChangesError': 'saveCountryChangesError',
  'ui.onboarding.countries.inactivateCountryStatus': 'inactivateCountryStatus',
  'ui.onboarding.countries.inactivateCountryError': 'inactivateCountryError',
  'ui.onboarding.countries.reactivateCountryStatus': 'reactivateCountryStatus',
  'ui.onboarding.countries.reactivateCountryError': 'reactivateCountryError',
  'ui.onboarding.countries.scenary': 'scenary',
};

const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

const PAGE_SIZE = 20;

export class OnboardingCountriesShared extends StateLitElement {
  /** state countries — the paged list of countries of the module (ISO code, English name, status, name in the user language, version); source listCountries.countries; organism countryActions, countryForm, countryList */
  @property({ attribute: false }) countries: CountriesPage | null = null;

  /** state selectedCountry — the id of the country selected in countryList (the record is the getter countryForm); source entry.params.countryId; organism countryForm, countryList; lives in the URL query */
  @property({ attribute: false }) selectedCountry: string | null = null;

  /** state searchTerm — draft of the text typed in the country search (ISO code or English name); filter of searchCountries, '' means all; source searchCountries.input; organism countryList */
  @property({ attribute: false }) searchTerm = '';

  /** state statusFilter — draft of the status filter of the country search, null means both statuses; source searchCountries.input; organism countryList */
  @property({ attribute: false }) statusFilter: CountryStatusFilter | null = null;

  /** state addCountryDraft — form draft of the country being added (ISO code and English name); source addCountry.input; organism countryForm */
  @property({ attribute: false }) addCountryDraft: AddCountryDraft = emptyAddCountryDraft();

  /** state saveCountryChangesDraft — form draft of the country being edited, filled from the selected record (id, version, ISO code, English name); source saveCountryChanges.input; organism countryForm */
  @property({ attribute: false }) saveCountryChangesDraft: SaveCountryChangesDraft = emptySaveCountryChangesDraft();

  /** state pageStatus — overall status of the page load: loading, empty when the list has no country, success, or error */
  @property({ attribute: false }) pageStatus: PageStatus = 'idle';

  /** state listCountriesStatus — status of the initial list request */
  @property({ attribute: false }) listCountriesStatus: RequestStatus = 'idle';

  /** state listCountriesError — error of the list request (also client.selectionInvalid when the selected id is not in the loaded list), null when none */
  @property({ attribute: false }) listCountriesError: ErrorState = null;

  /** state searchCountriesStatus — status of the search request */
  @property({ attribute: false }) searchCountriesStatus: RequestStatus = 'idle';

  /** state searchCountriesError — error of the search request, null when none */
  @property({ attribute: false }) searchCountriesError: ErrorState = null;

  /** state addCountryStatus — status of the add-country command */
  @property({ attribute: false }) addCountryStatus: RequestStatus = 'idle';

  /** state addCountryError — error of the add-country command, null when none */
  @property({ attribute: false }) addCountryError: ErrorState = null;

  /** state saveCountryChangesStatus — status of the edit-country command */
  @property({ attribute: false }) saveCountryChangesStatus: RequestStatus = 'idle';

  /** state saveCountryChangesError — error of the edit-country command, null when none */
  @property({ attribute: false }) saveCountryChangesError: ErrorState = null;

  /** state inactivateCountryStatus — status of the inactivate-country command */
  @property({ attribute: false }) inactivateCountryStatus: RequestStatus = 'idle';

  /** state inactivateCountryError — error of the inactivate-country command, null when none */
  @property({ attribute: false }) inactivateCountryError: ErrorState = null;

  /** state reactivateCountryStatus — status of the reactivate-country command */
  @property({ attribute: false }) reactivateCountryStatus: RequestStatus = 'idle';

  /** state reactivateCountryError — error of the reactivate-country command, null when none */
  @property({ attribute: false }) reactivateCountryError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.onboarding.countries.${member}`, value);
    if (member === 'selectedCountry') {
      try {
        const params = new URLSearchParams(window.location.search);
        if (typeof value === 'string' && value !== '') {
          params.set('countryId', value);
        } else {
          params.delete('countryId');
        }
        const query = params.toString();
        const url = `${window.location.pathname}${query !== '' ? `?${query}` : ''}${window.location.hash}`;
        history.replaceState(history.state, '', url);
      } catch {
        // the URL cannot be updated; the state stays published
      }
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  private readonly onPopState = (): void => {
    if (window.location.pathname.endsWith('/onboarding/countries')) {
      this.startVisit();
    }
  };

  public connectedCallback(): void {
    super.connectedCallback();
    const stored = getState('ui.onboarding.countries.countries');
    if (stored !== undefined) {
      this.countries = stored;
    }
    subscribe([...STATE_KEYS], this);
    window.addEventListener('popstate', this.onPopState);
    this.startVisit();
  }

  public disconnectedCallback(): void {
    window.removeEventListener('popstate', this.onPopState);
    unsubscribe([...STATE_KEYS], this);
    super.disconnectedCallback();
  }

  public handleIcaStateChange(key: string, value: any): void {
    if (STATE_MEMBER_BY_KEY[key] === undefined) {
      super.handleIcaStateChange(key, value);
      return;
    }
    if (value === undefined) return;
    this.assignState(key, value);
    this.requestUpdate();
  }

  private startVisit(): void {
    this.resetVisit();
    this.applyEntryParams();
    void this.listCountries();
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('listCountriesStatus', 'idle');
    this.publish('listCountriesError', null);
    this.publish('searchCountriesStatus', 'idle');
    this.publish('searchCountriesError', null);
    this.publish('addCountryStatus', 'idle');
    this.publish('addCountryError', null);
    this.publish('saveCountryChangesStatus', 'idle');
    this.publish('saveCountryChangesError', null);
    this.publish('inactivateCountryStatus', 'idle');
    this.publish('inactivateCountryError', null);
    this.publish('reactivateCountryStatus', 'idle');
    this.publish('reactivateCountryError', null);
    this.publish('scenary', '');
    this.publish('searchTerm', '');
    this.publish('statusFilter', null);
    this.publish('addCountryDraft', emptyAddCountryDraft());
    this.publish('saveCountryChangesDraft', emptySaveCountryChangesDraft());
  }

  private applyEntryParams(): void {
    const raw = new URLSearchParams(window.location.search).get('countryId');
    this.publish('selectedCountry', raw !== null && raw !== '' ? raw : null);
  }

  private resetCommandResults(): void {
    this.publish('addCountryStatus', 'idle');
    this.publish('addCountryError', null);
    this.publish('saveCountryChangesStatus', 'idle');
    this.publish('saveCountryChangesError', null);
    this.publish('inactivateCountryStatus', 'idle');
    this.publish('inactivateCountryError', null);
    this.publish('reactivateCountryStatus', 'idle');
    this.publish('reactivateCountryError', null);
  }

  private unexpectedError(error: unknown): ErrorState {
    return { code: 'client.unexpected', message: '', details: { name: error instanceof Error ? error.name : 'unknown' } };
  }

  private findCountry(id: string): CountryItem | null {
    const page = this.countries;
    if (!page) return null;
    return page.items.find((item) => item.id === id) ?? null;
  }

  /** The country selected in countryList/countryForm as a record: the loaded row whose id is selectedCountry, or null when nothing is selected or the row is not loaded. */
  public get countryForm(): CountryItem | null {
    if (this.selectedCountry === null) return null;
    return this.findCountry(this.selectedCountry);
  }

  private fillEditDraft(country: CountryItem | null): void {
    if (!country) {
      this.publish('saveCountryChangesDraft', emptySaveCountryChangesDraft());
      return;
    }
    this.publish('saveCountryChangesDraft', {
      id: country.id,
      version: country.version,
      isoCode: country.isoCode,
      name: country.name,
    });
  }

  private upsertCountry(country: CountryItem): void {
    const current = this.countries;
    if (!current) {
      this.publish('countries', { items: [country], page: 1, pageSize: PAGE_SIZE, hasMore: false });
      return;
    }
    const exists = current.items.some((item) => item.id === country.id);
    const items = exists
      ? current.items.map((item) => (item.id === country.id ? country : item))
      : [country, ...current.items];
    this.publish('countries', { ...current, items });
  }

  private writePage(next: CountriesPage, append: boolean): void {
    const current = this.countries;
    if (append && current) {
      this.publish('countries', {
        items: [...current.items, ...next.items],
        page: next.page,
        pageSize: next.pageSize,
        hasMore: next.hasMore,
      });
      return;
    }
    this.publish('countries', { items: [...next.items], page: next.page, pageSize: next.pageSize, hasMore: next.hasMore });
  }

  private resolveSelection(): void {
    const id = this.selectedCountry;
    if (id === null) return;
    const row = this.findCountry(id);
    if (!row) {
      this.publish('listCountriesError', { code: 'client.selectionInvalid', message: '', details: { id } });
      return;
    }
    this.fillEditDraft(row);
  }

  /** select — selects the country with this id (or clears the selection with null) for editing and for inactivate/reactivate; the record is read through the getter countryForm and the edit draft is filled from it; an id that is not in the loaded list publishes client.selectionInvalid in listCountriesError. */
  public selectCountry(id: string | null): void {
    this.resetCommandResults();
    if (id === null) {
      this.publish('selectedCountry', null);
      this.fillEditDraft(null);
      return;
    }
    const row = this.findCountry(id);
    if (!row) {
      this.publish('listCountriesError', { code: 'client.selectionInvalid', message: '', details: { id } });
      return;
    }
    this.publish('selectedCountry', id);
    this.fillEditDraft(row);
  }

  /** draft — replaces the add-country form draft (ISO code and English name typed by the owner). */
  public setAddCountryDraft(value: AddCountryDraft): void {
    this.resetCommandResults();
    this.publish('addCountryDraft', value);
  }

  /** draft — replaces the edit-country form draft (id and version come from the selected record, the owner types ISO code and English name). */
  public setSaveCountryChangesDraft(value: SaveCountryChangesDraft): void {
    this.resetCommandResults();
    this.publish('saveCountryChangesDraft', value);
  }

  /** Publishes the visible scene of the page (reset command results). */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** request listCountries — loads the whole module country list (active and inactive), the initial load and the way to reload or page the list; redraws countries (replace, or append the next page when append is true; page and hasMore stay in the list), pageStatus and listCountriesStatus/listCountriesError; arguments: page = page to load (default 1), append = add the page to the loaded items instead of replacing them (load more) */
  public async listCountries(page = 1, append = false): Promise<void> {
    if (this.listCountriesStatus === 'loading') return;
    if (append && !(this.countries && this.countries.hasMore)) return;
    this.publish('listCountriesStatus', 'loading');
    this.publish('listCountriesError', null);
    if (!append) this.publish('pageStatus', 'loading');
    try {
      const input: Input<'onboarding.countries.listCountries'> = { page, pageSize: PAGE_SIZE };
      const response = await execBff<Output<'onboarding.countries.listCountries'>>(
        'onboarding.countries.listCountries',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('listCountriesError', response.error);
        this.publish('listCountriesStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      this.writePage(response.data.countries, append);
      this.resolveSelection();
      this.publish('listCountriesStatus', 'success');
      this.publish('pageStatus', response.data.countries.items.length === 0 && !append ? 'empty' : 'success');
    } catch (error) {
      this.publish('listCountriesError', this.unexpectedError(error));
      this.publish('listCountriesStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request searchCountries — finds countries by ISO code or English name, optionally limited to one status; redraws countries (replace, or append the next page when append is true) and publishes searchTerm and statusFilter; arguments: search = text typed ('' means all), status = 'active' | 'inactive' or null for both, page = page to load (default 1), append = add the page to the loaded items (load more) */
  public async searchCountries(
    search: string,
    status: CountryStatusFilter | null,
    page = 1,
    append = false,
  ): Promise<void> {
    if (this.searchCountriesStatus === 'loading') return;
    if (append && !(this.countries && this.countries.hasMore)) return;
    this.publish('searchCountriesStatus', 'loading');
    this.publish('searchCountriesError', null);
    this.publish('searchTerm', search);
    this.publish('statusFilter', status);
    const text = search.trim();
    try {
      const input: Input<'onboarding.countries.searchCountries'> = {
        ...(text !== '' ? { search: text } : {}),
        ...(status !== null ? { status } : {}),
        page,
        pageSize: PAGE_SIZE,
      };
      const response = await execBff<Output<'onboarding.countries.searchCountries'>>(
        'onboarding.countries.searchCountries',
        input,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('searchCountriesError', response.error);
        this.publish('searchCountriesStatus', 'error');
        return;
      }
      this.writePage(response.data.countries, append);
      this.publish('searchCountriesStatus', 'success');
    } catch (error) {
      this.publish('searchCountriesError', this.unexpectedError(error));
      this.publish('searchCountriesStatus', 'error');
    }
  }

  /** request addCountry — adds a new active country from the add-country draft (ISO code and English name); redraws countries (the created row is inserted at the head of the loaded list) and resets addCountryDraft to empty; no arguments, fill the draft with setAddCountryDraft first */
  public async addCountry(): Promise<void> {
    if (this.addCountryStatus === 'loading') return;
    const draft = this.addCountryDraft;
    const isoCode = (draft.isoCode ?? '').trim();
    const name = (draft.name ?? '').trim();
    const missing: string[] = [];
    if (isoCode === '') missing.push('addCountryDraft.isoCode');
    if (name === '') missing.push('addCountryDraft.name');
    if (missing.length > 0) {
      this.publish('addCountryError', { code: 'client.requiredMissing', message: '', details: { stateKeys: missing } });
      this.publish('addCountryStatus', 'error');
      return;
    }
    this.publish('addCountryStatus', 'loading');
    this.publish('addCountryError', null);
    try {
      const input: Input<'onboarding.countries.addCountry'> = { isoCode, name };
      const response = await runBlockingUiAction((signal) =>
        execBff<Output<'onboarding.countries.addCountry'>>('onboarding.countries.addCountry', input, {
          mode: 'blocking',
          signal,
        }),
      );
      if (response === undefined) {
        this.publish('addCountryError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('addCountryStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('addCountryError', response.error);
        this.publish('addCountryStatus', 'error');
        return;
      }
      this.upsertCountry(response.data.country);
      this.publish('addCountryDraft', emptyAddCountryDraft());
      this.publish('addCountryStatus', 'success');
    } catch (error) {
      this.publish('addCountryError', this.unexpectedError(error));
      this.publish('addCountryStatus', 'error');
    }
  }

  /** request saveCountryChanges — saves the corrected ISO code and English name of the selected country from the edit draft (id and version included); redraws countries (the row is updated by id, so the getter countryForm shows it) and fills the edit draft again from the returned record; no arguments, select a country and edit the draft first */
  public async saveCountryChanges(): Promise<void> {
    if (this.saveCountryChangesStatus === 'loading') return;
    const draft = this.saveCountryChangesDraft;
    const isoCode = (draft.isoCode ?? '').trim();
    const name = (draft.name ?? '').trim();
    const missing: string[] = [];
    if (draft.id === null || draft.id === '') missing.push('saveCountryChangesDraft.id');
    if (draft.version === null) missing.push('saveCountryChangesDraft.version');
    if (isoCode === '') missing.push('saveCountryChangesDraft.isoCode');
    if (name === '') missing.push('saveCountryChangesDraft.name');
    if (missing.length > 0 || draft.id === null || draft.version === null) {
      this.publish('saveCountryChangesError', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: missing },
      });
      this.publish('saveCountryChangesStatus', 'error');
      return;
    }
    this.publish('saveCountryChangesStatus', 'loading');
    this.publish('saveCountryChangesError', null);
    try {
      const input: Input<'onboarding.countries.saveCountryChanges'> = {
        id: draft.id,
        version: draft.version,
        isoCode,
        name,
      };
      const response = await runBlockingUiAction((signal) =>
        execBff<Output<'onboarding.countries.saveCountryChanges'>>('onboarding.countries.saveCountryChanges', input, {
          mode: 'blocking',
          signal,
        }),
      );
      if (response === undefined) {
        this.publish('saveCountryChangesError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('saveCountryChangesStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('saveCountryChangesError', response.error);
        this.publish('saveCountryChangesStatus', 'error');
        return;
      }
      this.upsertCountry(response.data.country);
      this.fillEditDraft(response.data.country);
      this.publish('saveCountryChangesStatus', 'success');
    } catch (error) {
      this.publish('saveCountryChangesError', this.unexpectedError(error));
      this.publish('saveCountryChangesStatus', 'error');
    }
  }

  /** request inactivateCountry — inactivates the selected country (countryForm) so it is no longer offered; redraws countries (the row is updated by id with its new status and version) and the edit draft; no arguments, select a country first (nothing selected gives client.requiredMissing) */
  public async inactivateCountry(): Promise<void> {
    if (this.inactivateCountryStatus === 'loading') return;
    const selected = this.countryForm;
    if (!selected) {
      this.publish('inactivateCountryError', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: ['selectedCountry'] },
      });
      this.publish('inactivateCountryStatus', 'error');
      return;
    }
    this.publish('inactivateCountryStatus', 'loading');
    this.publish('inactivateCountryError', null);
    try {
      const input: Input<'onboarding.countries.inactivateCountry'> = { id: selected.id, version: selected.version };
      const response = await runBlockingUiAction((signal) =>
        execBff<Output<'onboarding.countries.inactivateCountry'>>('onboarding.countries.inactivateCountry', input, {
          mode: 'blocking',
          signal,
        }),
      );
      if (response === undefined) {
        this.publish('inactivateCountryError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('inactivateCountryStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('inactivateCountryError', response.error);
        this.publish('inactivateCountryStatus', 'error');
        return;
      }
      this.upsertCountry(response.data.country);
      this.fillEditDraft(response.data.country);
      this.publish('inactivateCountryStatus', 'success');
    } catch (error) {
      this.publish('inactivateCountryError', this.unexpectedError(error));
      this.publish('inactivateCountryStatus', 'error');
    }
  }

  /** request reactivateCountry — reactivates the selected inactive country (countryForm) so it is offered again; redraws countries (the row is updated by id with its new status and version) and the edit draft; no arguments, select a country first (nothing selected gives client.requiredMissing) */
  public async reactivateCountry(): Promise<void> {
    if (this.reactivateCountryStatus === 'loading') return;
    const selected = this.countryForm;
    if (!selected) {
      this.publish('reactivateCountryError', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: ['selectedCountry'] },
      });
      this.publish('reactivateCountryStatus', 'error');
      return;
    }
    this.publish('reactivateCountryStatus', 'loading');
    this.publish('reactivateCountryError', null);
    try {
      const input: Input<'onboarding.countries.reactivateCountry'> = { id: selected.id, version: selected.version };
      const response = await runBlockingUiAction((signal) =>
        execBff<Output<'onboarding.countries.reactivateCountry'>>('onboarding.countries.reactivateCountry', input, {
          mode: 'blocking',
          signal,
        }),
      );
      if (response === undefined) {
        this.publish('reactivateCountryError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('reactivateCountryStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('reactivateCountryError', response.error);
        this.publish('reactivateCountryStatus', 'error');
        return;
      }
      this.upsertCountry(response.data.country);
      this.fillEditDraft(response.data.country);
      this.publish('reactivateCountryStatus', 'success');
    } catch (error) {
      this.publish('reactivateCountryError', this.unexpectedError(error));
      this.publish('reactivateCountryStatus', 'error');
    }
  }
}
