/// <mls fileReference="_102039_/l2/onboarding/web/shared/organization_people.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { auraNavigate } from '/_102033_/l2/shared/layout/auraNavigate.js';
import type { Organization_peopleContracts, AccessHighlights, PersonRow, PrivacyVersionRef, PersonPendingDetail } from '/_102039_/l2/onboarding/web/contracts/organization_people.defs.js';

export type { Organization_peopleContracts, AccessHighlights, PersonRow, PrivacyVersionRef, PersonPendingDetail } from '/_102039_/l2/onboarding/web/contracts/organization_people.defs.js';

export type ErrorState = { code: string; message: string; details?: unknown } | null;

type Input<R extends keyof Organization_peopleContracts> = Organization_peopleContracts[R]['input'];
type Output<R extends keyof Organization_peopleContracts> = Organization_peopleContracts[R]['output'];

/** Platform status of a person, as filtered in the people list. */
export type PersonStatus = 'Active' | 'Inactive' | 'Merged' | 'Blocked';

type PeoplePage = Output<'onboarding.organization_people.qryOrganizationPeopleOverview'>['people'];

type StateMember =
  | 'highlights'
  | 'people'
  | 'person'
  | 'selectedOrganizationMember'
  | 'searchText'
  | 'statusFilter'
  | 'pageStatus'
  | 'qryOrganizationPeopleOverviewStatus'
  | 'qryOrganizationPeopleOverviewError'
  | 'qrySearchOrganizationPeopleStatus'
  | 'qrySearchOrganizationPeopleError'
  | 'qryOrganizationPersonStatus'
  | 'qryOrganizationPersonError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.onboarding.organization_people.highlights': 'highlights',
  'ui.onboarding.organization_people.people': 'people',
  'ui.onboarding.organization_people.person': 'person',
  'ui.onboarding.organization_people.selectedOrganizationMember': 'selectedOrganizationMember',
  'ui.onboarding.organization_people.searchText': 'searchText',
  'ui.onboarding.organization_people.statusFilter': 'statusFilter',
  'ui.onboarding.organization_people.pageStatus': 'pageStatus',
  'ui.onboarding.organization_people.qryOrganizationPeopleOverviewStatus': 'qryOrganizationPeopleOverviewStatus',
  'ui.onboarding.organization_people.qryOrganizationPeopleOverviewError': 'qryOrganizationPeopleOverviewError',
  'ui.onboarding.organization_people.qrySearchOrganizationPeopleStatus': 'qrySearchOrganizationPeopleStatus',
  'ui.onboarding.organization_people.qrySearchOrganizationPeopleError': 'qrySearchOrganizationPeopleError',
  'ui.onboarding.organization_people.qryOrganizationPersonStatus': 'qryOrganizationPersonStatus',
  'ui.onboarding.organization_people.qryOrganizationPersonError': 'qryOrganizationPersonError',
  'ui.onboarding.organization_people.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

const PAGE_SIZE = 20;

export class OnboardingOrganization_peopleShared extends StateLitElement {
  /** state highlights — counts of the organization people by access situation (complete, pending, valid and invalid consent); source qryOrganizationPeopleOverview.highlights; organism accessHighlights */
  @property({ attribute: false }) highlights: AccessHighlights | null = null;

  /** state people — the page of organization people with status, country, access completion and what is still missing; source qryOrganizationPeopleOverview.people (also written by qrySearchOrganizationPeople); organism peopleList */
  @property({ attribute: false }) people: PeoplePage | null = null;

  /** state person — one organization person with login e-mail, country, consent situation, missing items with who resolves each and the current privacy text version; source qryOrganizationPerson.person; organism personPendingDetail */
  @property({ attribute: false }) person: PersonPendingDetail | null = null;

  /** state selectedOrganizationMember — the id of the organization member selected in peopleList (the record is in person); source entry.params.organizationMemberId; organism peopleList, personPendingDetail; lives in the URL */
  @property({ attribute: false }) selectedOrganizationMember: string | null = null;

  /** state searchText — text typed to search people by name or login e-mail; filter of qrySearchOrganizationPeople; organism peopleList */
  @property({ attribute: false }) searchText = '';

  /** state statusFilter — platform status chosen to filter the people list, null for every status; filter of qrySearchOrganizationPeople; organism peopleList */
  @property({ attribute: false }) statusFilter: PersonStatus | null = null;

  /** state pageStatus — overall page situation: loading while the initial load runs, empty when no person was loaded, success or error */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state qryOrganizationPeopleOverviewStatus — status of the initial load of indicators and first page of people */
  @property({ attribute: false }) qryOrganizationPeopleOverviewStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state qryOrganizationPeopleOverviewError — error of the initial load, null when none */
  @property({ attribute: false }) qryOrganizationPeopleOverviewError: ErrorState = null;

  /** state qrySearchOrganizationPeopleStatus — status of the people search */
  @property({ attribute: false }) qrySearchOrganizationPeopleStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state qrySearchOrganizationPeopleError — error of the people search, null when none */
  @property({ attribute: false }) qrySearchOrganizationPeopleError: ErrorState = null;

  /** state qryOrganizationPersonStatus — status of loading the selected person */
  @property({ attribute: false }) qryOrganizationPersonStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state qryOrganizationPersonError — error of loading the selected person, null when none */
  @property({ attribute: false }) qryOrganizationPersonError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.onboarding.organization_people.${member}`, value);
    if (member === 'selectedOrganizationMember') {
      this.syncUrlParam(typeof value === 'string' ? value : null);
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  private syncUrlParam(value: string | null): void {
    try {
      const url = new URL(window.location.href);
      if (value !== null && value !== '') {
        url.searchParams.set('organizationMemberId', value);
      } else {
        url.searchParams.delete('organizationMemberId');
      }
      window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
    } catch {
      // the URL could not be updated; the state stays correct
    }
  }

  private unexpected(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  private popstateHandler = (): void => {
    if (!window.location.pathname.endsWith('/onboarding/organization_people')) return;
    this.startVisit();
  };

  public connectedCallback(): void {
    super.connectedCallback();
    const savedHighlights = getState('ui.onboarding.organization_people.highlights');
    if (savedHighlights !== undefined) this.assignState('ui.onboarding.organization_people.highlights', savedHighlights);
    const savedPeople = getState('ui.onboarding.organization_people.people');
    if (savedPeople !== undefined) this.assignState('ui.onboarding.organization_people.people', savedPeople);
    subscribe([...STATE_KEYS], this);
    window.addEventListener('popstate', this.popstateHandler);
    this.startVisit();
  }

  public disconnectedCallback(): void {
    window.removeEventListener('popstate', this.popstateHandler);
    unsubscribe([...STATE_KEYS], this);
    super.disconnectedCallback();
  }

  public handleIcaStateChange(key: string, value: any): void {
    if (!(key in STATE_MEMBER_BY_KEY)) {
      super.handleIcaStateChange(key, value);
      return;
    }
    if (value === undefined) return;
    this.assignState(key, value);
    this.requestUpdate();
  }

  private readEntryParams(): { organizationMemberId: string | null } {
    const raw = new URLSearchParams(window.location.search).get('organizationMemberId');
    return { organizationMemberId: raw !== null && raw !== '' ? raw : null };
  }

  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('qryOrganizationPeopleOverviewStatus', 'idle');
    this.publish('qryOrganizationPeopleOverviewError', null);
    this.publish('qrySearchOrganizationPeopleStatus', 'idle');
    this.publish('qrySearchOrganizationPeopleError', null);
    this.publish('qryOrganizationPersonStatus', 'idle');
    this.publish('qryOrganizationPersonError', null);
    this.publish('searchText', '');
    this.publish('statusFilter', null);
    this.publish('person', null);
    this.publish('selectedOrganizationMember', null);
    this.publish('scenary', '');
  }

  private startVisit(): void {
    const entry = this.readEntryParams();
    this.resetVisit();
    if (entry.organizationMemberId !== null) {
      void this.selectOrganizationMember(entry.organizationMemberId);
    }
    void this.qryOrganizationPeopleOverview();
  }

  /** publish the visible scene of the page */
  public setScenario(value: string): void {
    this.publish('scenary', value);
  }

  /** request qryOrganizationPeopleOverview — opens the page: access indicators and a page of organization people (initial load; also the method to reload the unfiltered list and to page it); redraws highlights (replace) and people (replace, or append the next page when append is true; page and hasMore follow the loaded page) and clears the search filters on a reload; page: page to load (default 1); append: add the page to the current items instead of replacing them (a "load more"), does nothing when the list has no more pages */
  public async qryOrganizationPeopleOverview(page = 1, append = false): Promise<void> {
    if (this.qryOrganizationPeopleOverviewStatus === 'loading') return;
    if (append && !(this.people !== null && this.people.hasMore)) return;
    this.publish('qryOrganizationPeopleOverviewStatus', 'loading');
    this.publish('qryOrganizationPeopleOverviewError', null);
    if (!append) this.publish('pageStatus', 'loading');
    const input: Input<'onboarding.organization_people.qryOrganizationPeopleOverview'> = { page, pageSize: PAGE_SIZE };
    try {
      const response = await execBff<Output<'onboarding.organization_people.qryOrganizationPeopleOverview'>>('onboarding.organization_people.qryOrganizationPeopleOverview', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('qryOrganizationPeopleOverviewError', response.error ?? this.unexpected(null));
        this.publish('qryOrganizationPeopleOverviewStatus', 'error');
        if (!append) this.publish('pageStatus', 'error');
        return;
      }
      const data = response.data;
      const previous = this.people;
      const merged: PeoplePage = append && previous !== null
        ? { items: [...previous.items, ...data.people.items], page: data.people.page, pageSize: data.people.pageSize, hasMore: data.people.hasMore }
        : data.people;
      this.publish('highlights', data.highlights);
      this.publish('people', merged);
      if (!append) {
        this.publish('searchText', '');
        this.publish('statusFilter', null);
      }
      this.publish('qryOrganizationPeopleOverviewStatus', 'success');
      this.publish('pageStatus', merged.items.length === 0 ? 'empty' : 'success');
    } catch (error) {
      this.publish('qryOrganizationPeopleOverviewError', this.unexpected(error));
      this.publish('qryOrganizationPeopleOverviewStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request qrySearchOrganizationPeople — searches and pages the organization people by name or login e-mail and by status; redraws people (replace with the first page of the new filter, or append the next page when append is true); search: text contained in the name or login e-mail ('' for none); status: platform status filter or null for every status (both are published into searchText and statusFilter); page: page to load (default 1); append: add the page to the current items (a "load more"), does nothing when there is no more */
  public async qrySearchOrganizationPeople(search: string, status: PersonStatus | null, page = 1, append = false): Promise<void> {
    if (this.qrySearchOrganizationPeopleStatus === 'loading') return;
    if (append && !(this.people !== null && this.people.hasMore)) return;
    this.publish('searchText', search);
    this.publish('statusFilter', status);
    this.publish('qrySearchOrganizationPeopleStatus', 'loading');
    this.publish('qrySearchOrganizationPeopleError', null);
    const trimmed = search.trim();
    const input: Input<'onboarding.organization_people.qrySearchOrganizationPeople'> = {
      ...(trimmed !== '' ? { search: trimmed } : {}),
      ...(status !== null ? { status } : {}),
      page,
      pageSize: PAGE_SIZE,
    };
    try {
      const response = await execBff<Output<'onboarding.organization_people.qrySearchOrganizationPeople'>>('onboarding.organization_people.qrySearchOrganizationPeople', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('qrySearchOrganizationPeopleError', response.error ?? this.unexpected(null));
        this.publish('qrySearchOrganizationPeopleStatus', 'error');
        return;
      }
      const data = response.data;
      const previous = this.people;
      const merged: PeoplePage = append && previous !== null
        ? { items: [...previous.items, ...data.people.items], page: data.people.page, pageSize: data.people.pageSize, hasMore: data.people.hasMore }
        : data.people;
      this.publish('people', merged);
      this.publish('qrySearchOrganizationPeopleStatus', 'success');
    } catch (error) {
      this.publish('qrySearchOrganizationPeopleError', this.unexpected(error));
      this.publish('qrySearchOrganizationPeopleStatus', 'error');
    }
  }

  /** request qryOrganizationPerson — loads one organization person with each pending item and who resolves it; redraws person (replace; cleared when the call fails); memberId: id of the person picked in the people list (null does not call and publishes client.requiredMissing) */
  public async qryOrganizationPerson(memberId: string | null): Promise<void> {
    if (this.qryOrganizationPersonStatus === 'loading') return;
    if (memberId === null || memberId === '') {
      this.publish('qryOrganizationPersonError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['selectedOrganizationMember'] } });
      this.publish('qryOrganizationPersonStatus', 'error');
      return;
    }
    this.publish('qryOrganizationPersonStatus', 'loading');
    this.publish('qryOrganizationPersonError', null);
    const input: Input<'onboarding.organization_people.qryOrganizationPerson'> = { memberId };
    try {
      const response = await execBff<Output<'onboarding.organization_people.qryOrganizationPerson'>>('onboarding.organization_people.qryOrganizationPerson', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('person', null);
        this.publish('qryOrganizationPersonError', response.error ?? this.unexpected(null));
        this.publish('qryOrganizationPersonStatus', 'error');
        return;
      }
      this.publish('person', response.data.person);
      this.publish('qryOrganizationPersonStatus', 'success');
    } catch (error) {
      this.publish('person', null);
      this.publish('qryOrganizationPersonError', this.unexpected(error));
      this.publish('qryOrganizationPersonStatus', 'error');
    }
  }

  /** select — picks the organization member (peopleList row) to inspect: publishes its id in selectedOrganizationMember (kept in the URL) and loads the record into person through qryOrganizationPerson; id: the member id, or null to clear the selection and the person; ignored while a person is loading */
  public async selectOrganizationMember(id: string | null): Promise<void> {
    if (this.qryOrganizationPersonStatus === 'loading') return;
    if (id === null || id === '') {
      this.publish('selectedOrganizationMember', null);
      this.publish('person', null);
      this.publish('qryOrganizationPersonStatus', 'idle');
      this.publish('qryOrganizationPersonError', null);
      return;
    }
    this.publish('selectedOrganizationMember', id);
    await this.qryOrganizationPerson(id);
  }

  /** navigate — opens the privacy text page from the person detail (personPendingDetail); carries nothing */
  public openPrivacyText(): void {
    auraNavigate('/onboarding/privacy_text', { basePath: '/onboarding' });
  }
}
