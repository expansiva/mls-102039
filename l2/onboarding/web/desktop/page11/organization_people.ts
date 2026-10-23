/// <mls fileReference="_102039_/l2/onboarding/web/desktop/page11/organization_people.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {
  OnboardingOrganization_peopleShared,
  type PersonStatus,
} from '/_102039_/l2/onboarding/web/shared/organization_people.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-card.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-filters.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102040_/l2/molecules/groupviewcard/ml-profile-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-view-table.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';

function formatNumber(value: number) {
  return new Intl.NumberFormat(document.documentElement.lang || undefined).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(document.documentElement.lang || undefined, {
    dateStyle: 'medium',
  }).format(new Date(value));
}

/// **collab_i18n_start**
const pageMessage_en = {
  pageTitle: 'Organization people',
  pageDescription: 'Review access completion and follow up on what people still need.',
  completeAccess: 'Complete access',
  completeAccessHelper: 'People ready to use the module',
  pendingAccess: 'Pending access',
  pendingAccessHelper: 'People with something still to complete',
  validConsent: 'Valid consent',
  validConsentHelper: 'People with current privacy acceptance',
  invalidConsent: 'Consent needs attention',
  invalidConsentHelper: 'People without valid current consent',
  people: 'People',
  peopleDescription: 'Search by name or login e-mail, then select a person to review their access.',
  searchLabel: 'Find a person',
  searchPlaceholder: 'Search by name or login e-mail',
  statusLabel: 'Platform status',
  allStatuses: 'All statuses',
  statusActive: 'Active',
  statusInactive: 'Inactive',
  statusMerged: 'Merged',
  statusBlocked: 'Blocked',
  name: 'Name',
  loginEmail: 'Login e-mail',
  country: 'Country',
  accessComplete: 'Access complete',
  whatIsStillMissing: 'What is still missing',
  yes: 'Yes',
  no: 'No',
  noPeople: 'No people match this search.',
  loadingPeople: 'Loading people',
  peopleUnavailable: 'People could not be loaded. Try again.',
  retry: 'Try again',
  personDetails: 'Person details',
  selectPerson: 'Select a person to see their login e-mail, consent situation and pending items.',
  loadingPerson: 'Loading person details',
  personUnavailable: 'This person’s details could not be loaded. Select them again to retry.',
  consentValid: 'Consent valid',
  updatedAt: 'Updated at',
  currentPrivacyText: 'Current privacy text',
  publishedAt: 'Published',
  currentVersion: 'Current version',
  accessNeedsAttention: 'Access needs attention',
  accessNeedsAttentionMessage: 'Review what is still missing so the right person can complete it.',
  privacyText: 'View privacy text',
  missingItems: 'Pending items',
  noPendingItems: 'There are no pending items for this person.',
  preconditionMissing: 'Organization information is needed before people can be reviewed.',
};
type PageMessageType = typeof pageMessage_en;
const pageMessages: Record<string, PageMessageType> = {
  en: pageMessage_en,
};
/// **collab_i18n_end**

const STATUS_KEY: Record<PersonStatus, keyof PageMessageType> = {
  Active: 'statusActive',
  Inactive: 'statusInactive',
  Merged: 'statusMerged',
  Blocked: 'statusBlocked',
};

@customElement('onboarding--web--desktop--page11--organization_people-102039')
export class OnboardingDesktopPage11Organization_peoplePage extends OnboardingOrganization_peopleShared {
  private msg: PageMessageType = pageMessage_en;

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const loadingPeople = this.qryOrganizationPeopleOverviewStatus === 'loading'
      || this.qrySearchOrganizationPeopleStatus === 'loading';
    const peopleError = this.qryOrganizationPeopleOverviewError || this.qrySearchOrganizationPeopleError;
    const personLoading = this.qryOrganizationPersonStatus === 'loading';

    return html`
      <main class="min-h-full bg-[var(--page-bg,transparent)] px-8 py-8 text-[var(--text-default,currentColor)]">
        <header class="mb-8 flex max-w-[1540px] items-end justify-between gap-6">
          <div>
            <h1 class="text-2xl font-semibold tracking-tight text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
            <p class="mt-2 max-w-2xl text-sm text-[var(--text-muted,currentColor)]">${this.msg.pageDescription}</p>
          </div>
        </header>

        <section data-organism-id="accessHighlights" class="mx-auto max-w-[1540px]" aria-label="${this.msg.pageTitle}">
          <div class="grid grid-cols-4 gap-4">
            <groupviewmetric--ml-metric-card .loading=${this.highlights === null && this.qryOrganizationPeopleOverviewStatus === 'loading'}>
              <Label>${this.msg.completeAccess}</Label>
              <Value>${this.highlights ? formatNumber(this.highlights.completeCount) : ''}</Value>
              <Helper>${this.msg.completeAccessHelper}</Helper>
            </groupviewmetric--ml-metric-card>
            <groupviewmetric--ml-metric-card .loading=${this.highlights === null && this.qryOrganizationPeopleOverviewStatus === 'loading'}>
              <Label>${this.msg.pendingAccess}</Label>
              <Value>${this.highlights ? formatNumber(this.highlights.pendingCount) : ''}</Value>
              <Helper>${this.msg.pendingAccessHelper}</Helper>
            </groupviewmetric--ml-metric-card>
            <groupviewmetric--ml-metric-card .loading=${this.highlights === null && this.qryOrganizationPeopleOverviewStatus === 'loading'}>
              <Label>${this.msg.validConsent}</Label>
              <Value>${this.highlights ? formatNumber(this.highlights.consentValidCount) : ''}</Value>
              <Helper>${this.msg.validConsentHelper}</Helper>
            </groupviewmetric--ml-metric-card>
            <groupviewmetric--ml-metric-card .loading=${this.highlights === null && this.qryOrganizationPeopleOverviewStatus === 'loading'}>
              <Label>${this.msg.invalidConsent}</Label>
              <Value>${this.highlights ? formatNumber(this.highlights.consentInvalidCount) : ''}</Value>
              <Helper>${this.msg.invalidConsentHelper}</Helper>
            </groupviewmetric--ml-metric-card>
          </div>
        </section>

        <div class="mx-auto mt-8 grid max-w-[1540px] grid-cols-[minmax(0,1fr)_390px] gap-6">
          <section data-organism-id="peopleList" class="min-w-0 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5">
            <div class="mb-5 flex items-start justify-between gap-6">
              <div>
                <h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.people}</h2>
                <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.peopleDescription}</p>
              </div>
              <label class="shrink-0 text-sm font-medium text-[var(--text-default,currentColor)]">
                <span class="mb-1.5 block">${this.msg.statusLabel}</span>
                <select
                  class="h-10 min-w-36 rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
                  .value=${this.statusFilter ?? ''}
                  ?disabled=${loadingPeople}
                  @change=${(event: Event) => this.qrySearchOrganizationPeople(this.searchText, ((event.target as HTMLSelectElement).value || null) as PersonStatus | null)}>
                  <option value="">${this.msg.allStatuses}</option>
                  <option value="Active">${this.msg.statusActive}</option>
                  <option value="Inactive">${this.msg.statusInactive}</option>
                  <option value="Merged">${this.msg.statusMerged}</option>
                  <option value="Blocked">${this.msg.statusBlocked}</option>
                </select>
              </label>
            </div>

            <groupsearchcontent--ml-search-filters
              class="mb-5 block"
              name="organization-people-search"
              .value=${this.searchText || null}
              .placeholder=${this.msg.searchPlaceholder}
              .error=${this.qrySearchOrganizationPeopleError ? this.msg.peopleUnavailable : ''}
              .loading=${this.qrySearchOrganizationPeopleStatus === 'loading'}
              .disabled=${this.qryOrganizationPeopleOverviewStatus === 'loading'}
              @search=${(event: CustomEvent<{ query: string }>) => this.qrySearchOrganizationPeople(event.detail.query, this.statusFilter)}
              @change=${(event: CustomEvent<{ value: string | null }>) => this.qrySearchOrganizationPeople(event.detail.value ?? '', this.statusFilter)}
              @clear=${() => this.qrySearchOrganizationPeople('', this.statusFilter)}>
              <Label>${this.msg.searchLabel}</Label>
            </groupsearchcontent--ml-search-filters>

            ${peopleError ? html`
              <groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false} .duration=${0}>
                <Message>${peopleError.code === 'client.preconditionMissing' ? this.msg.preconditionMissing : this.msg.peopleUnavailable}</Message>
                <Action><button type="button" class="font-medium underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.qryOrganizationPeopleOverview()}>${this.msg.retry}</button></Action>
              </groupnotifyuser--ml-contextual-feedback>
            ` : ''}

            <groupviewtable--ml-data-table
              .value=${''}
              .selectable=${false}
              .page=${1}
              .pageSize=${0}
              .totalItems=${0}
              .error=${''}
              .disabled=${loadingPeople}
              .loading=${loadingPeople}
              @rowClick=${(event: CustomEvent<{ index: number }>) => {
                const row = this.people?.items[event.detail.index];
                if (row) this.selectOrganizationMember(row.id);
              }}>
              <TableHeader>
                <TableRow>
                  <TableHead key="name" sortable>${this.msg.name}</TableHead>
                  <TableHead key="email">${this.msg.loginEmail}</TableHead>
                  <TableHead key="status" sortable>${this.msg.statusLabel}</TableHead>
                  <TableHead key="access">${this.msg.accessComplete}</TableHead>
                  <TableHead key="missing">${this.msg.whatIsStillMissing}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                ${(this.people?.items ?? []).map((row) => html`
                  <TableRow key=${row.id}>
                    <TableCell>${row.details.identification.name}</TableCell>
                    <TableCell>${row.details.onboarding.loginEmail}</TableCell>
                    <TableCell><span class="inline-flex rounded-full bg-[var(--status-neutral-bg,transparent)] px-2.5 py-1 text-xs font-medium text-[var(--status-neutral-text,currentColor)]">${this.msg[STATUS_KEY[row.details.identification.status]]}</span></TableCell>
                    <TableCell><span class="inline-flex rounded-full ${row.details.onboarding.accessComplete ? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]' : 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]'} px-2.5 py-1 text-xs font-medium">${row.details.onboarding.accessComplete ? this.msg.yes : this.msg.no}</span></TableCell>
                    <TableCell>${row.details.onboarding.missingItems}</TableCell>
                  </TableRow>
                `)}
              </TableBody>
              <Empty>${this.msg.noPeople}</Empty>
              <Loading>${this.msg.loadingPeople}</Loading>
            </groupviewtable--ml-data-table>
          </section>

          <aside data-organism-id="personPendingDetail" class="min-h-[520px] rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-5">
            ${personLoading ? html`
              <groupviewcard--ml-profile-card .loading=${true}></groupviewcard--ml-profile-card>
            ` : this.person ? html`
              <groupviewcard--ml-profile-card .loading=${false}>
                <CardHeader>
                  <CardTitle>${this.person.details.identification.name}</CardTitle>
                  <CardDescription>${this.person.details.onboarding.loginEmail}</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl class="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                    <div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.statusLabel}</dt><dd class="mt-1 font-medium text-[var(--text-strong,currentColor)]">${this.msg[STATUS_KEY[this.person.details.identification.status]]}</dd></div>
                    <div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.country}</dt><dd class="mt-1 font-medium text-[var(--text-strong,currentColor)]">${this.person.country.details.displayName ?? ''}</dd></div>
                    <div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.accessComplete}</dt><dd class="mt-1 font-medium text-[var(--text-strong,currentColor)]">${this.person.details.onboarding.accessComplete ? this.msg.yes : this.msg.no}</dd></div>
                    <div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.consentValid}</dt><dd class="mt-1 font-medium text-[var(--text-strong,currentColor)]">${this.person.details.onboarding.consentValid ? this.msg.yes : this.msg.no}</dd></div>
                    <div class="col-span-2"><dt class="text-[var(--text-muted,currentColor)]">${this.msg.updatedAt}</dt><dd class="mt-1 font-medium text-[var(--text-strong,currentColor)]">${formatDate(this.person.details.identification.updatedAt)}</dd></div>
                  </dl>
                </CardContent>
              </groupviewcard--ml-profile-card>

              ${(!this.person.details.onboarding.accessComplete || !this.person.details.onboarding.consentValid) ? html`
                <groupnotifyuser--ml-contextual-feedback class="mt-5 block" type="warning" .visible=${true} .dismissible=${false} .duration=${0}>
                  <Title>${this.msg.accessNeedsAttention}</Title>
                  <Message>${this.msg.accessNeedsAttentionMessage}</Message>
                </groupnotifyuser--ml-contextual-feedback>
              ` : ''}

              <div class="mt-6">
                <groupviewtable--ml-view-table .value=${''} .selectable=${false} .page=${1} .pageSize=${0} .totalItems=${0} .error=${''} .disabled=${false} .loading=${false}>
                  <TableCaption>${this.msg.missingItems}</TableCaption>
                  <TableHeader><TableRow><TableHead key="missing">${this.msg.whatIsStillMissing}</TableHead></TableRow></TableHeader>
                  <TableBody><TableRow key=${this.person.id}><TableCell>${this.person.details.onboarding.missingItems}</TableCell></TableRow></TableBody>
                  <Empty>${this.msg.noPendingItems}</Empty>
                </groupviewtable--ml-view-table>
              </div>

              ${this.person.currentPrivacyVersion ? html`
                <div class="mt-6 border-t border-[var(--border-subtle,currentColor)] pt-5">
                  <p class="text-sm font-medium text-[var(--text-strong,currentColor)]">${this.msg.currentPrivacyText}</p>
                  <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.person.currentPrivacyVersion.versionCode} · ${this.msg.publishedAt} ${formatDate(this.person.currentPrivacyVersion.publishedAt)}</p>
                  <button type="button" class="mt-3 text-sm font-medium text-[var(--link-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.openPrivacyText()}>${this.msg.privacyText}</button>
                </div>
              ` : ''}
            ` : html`
              <div class="flex h-full min-h-[470px] flex-col justify-center">
                <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.personDetails}</h2>
                <p class="mt-2 text-sm leading-6 text-[var(--text-muted,currentColor)]">${this.qryOrganizationPersonError ? this.msg.personUnavailable : this.msg.selectPerson}</p>
              </div>
            `}
          </aside>
        </div>
      </main>
    `;
  }
}
