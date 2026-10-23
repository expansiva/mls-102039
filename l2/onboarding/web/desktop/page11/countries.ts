/// <mls fileReference="_102039_/l2/onboarding/web/desktop/page11/countries.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { OnboardingCountriesShared, type CountryItem } from '/_102039_/l2/onboarding/web/shared/countries.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-group.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_en = {
pageTitle: 'Countries',
searchLabel: 'Find countries',
searchPlaceholder: 'Search by ISO code or English name',
searchHelper: 'Search the module country list.',
allStatuses: 'All statuses',
active: 'Active',
inactive: 'Inactive',
newCountry: 'New country',
tableCaption: 'Country list',
isoCode: 'ISO code',
nameInYourLanguage: 'Name in your language',
status: 'Status',
englishName: 'English name',
noCountries: 'No countries match this search.',
loadingCountries: 'Loading countries…',
loadMore: 'Load more countries',
retry: 'Try again',
listUnavailable: 'The country list could not be opened because required information is missing. Return to Onboarding and open Countries again.',
listError: 'Countries could not be loaded.',
details: 'Country details',
addCountryTitle: 'Add a country',
isoPlaceholder: 'US',
namePlaceholder: 'United States',
isoHelper: 'Use a two-letter ISO 3166-1 alpha-2 code in upper case.',
nameHelper: 'Enter the country name in English.',
addCountry: 'Add country',
saveCountry: 'Save country',
saving: 'Saving country…',
addError: 'The country could not be added.',
saveError: 'The country changes could not be saved.',
availability: 'Availability',
activeExplanation: 'This country is offered for selection to people and the company.',
inactiveExplanation: 'This country is not offered for new selections. Existing people and companies keep it.',
inactivate: 'Inactivate country',
reactivate: 'Reactivate country',
inactivateError: 'The country could not be inactivated.',
reactivateError: 'The country could not be reactivated.',
confirmInactivate: 'Inactivate this country? It will no longer be offered for new selections. People and companies already using it will keep it.',
confirmReactivate: 'Reactivate this country? It will be offered for selection to people and the company.',
requiredFields: 'Enter the ISO code and English name to continue.',
selectionUnavailable: 'This country is no longer available in the loaded list.',
};
type PageMessageType = typeof pageMessage_en;
const pageMessages: Record<string, PageMessageType> = { 'en': pageMessage_en };
/// **collab_i18n_end**
function statusMessageKey(status: CountryItem['status']): keyof PageMessageType {
return status === 'active' ? 'active' : 'inactive';
}
@customElement('onboarding--web--desktop--page11--countries-102039')
export class OnboardingDesktopPage11CountriesPage extends OnboardingCountriesShared {
private msg: PageMessageType = pageMessage_en;
private renderList() {
const countries = this.countries?.items ?? [];
const selectedIndex = countries.findIndex((country) => country.id === this.selectedCountry);
const searchError = this.searchCountriesError?.message ?? '';
const listError = this.listCountriesError?.message ?? '';
const isLoading = this.listCountriesStatus === 'loading' || this.searchCountriesStatus === 'loading';
return html`
<section data-organism-id="countryList" class="min-w-0 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5">
<div class="mb-5 flex items-end gap-3">
<groupsearchcontent--ml-search-bar
class="min-w-0 flex-1"
.value=${this.searchTerm}
.error=${searchError}
name="country-search"
.placeholder=${this.msg.searchPlaceholder}
.debounce=${350}
.loading=${isLoading}
@search=${(e: CustomEvent<{ query: string }>) => this.searchCountries(e.detail.query, this.statusFilter)}
@change=${(e: CustomEvent<{ value: string | null }>) => this.searchCountries(e.detail.value ?? '', this.statusFilter)}
@clear=${() => this.searchCountries('', this.statusFilter)}>
<Label>${this.msg.searchLabel}</Label>
<Helper>${this.msg.searchHelper}</Helper>
</groupsearchcontent--ml-search-bar>
<label class="flex min-w-36 flex-col gap-1 text-sm font-medium text-[var(--text-default,currentColor)]">
<span>${this.msg.status}</span>
<select
class="h-10 rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 text-[var(--text-strong,currentColor)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
.value=${this.statusFilter ?? ''}
@change=${(e: Event) => this.searchCountries(this.searchTerm, ((e.target as HTMLSelectElement).value || null) as 'active' | 'inactive' | null)}>
<option value="">${this.msg.allStatuses}</option>
<option value="active">${this.msg.active}</option>
<option value="inactive">${this.msg.inactive}</option>
</select>
</label>
<grouptriggeraction--ml-button-standard
data-variant="primary"
size="md"
type="button"
@action=${() => { this.selectCountry(null); this.setScenario('create'); }}>
<Label>${this.msg.newCountry}</Label>
</grouptriggeraction--ml-button-standard>
</div>
${this.pageStatus === 'error' && this.listCountriesError?.code === 'client.preconditionMissing' ? html`
<div class="rounded-lg border border-[var(--status-error-text,currentColor)] bg-[var(--status-error-bg,transparent)] p-4 text-sm text-[var(--text-default,currentColor)]" role="alert">
<p>${this.msg.listUnavailable}</p>
</div>
` : html`
<groupviewtable--ml-data-table
.value=${selectedIndex >= 0 ? String(selectedIndex) : ''}
.selectable=${false}
.page=${1}
.pageSize=${0}
.totalItems=${0}
.error=${listError}
.loading=${isLoading}
@rowClick=${(e: CustomEvent<{ index: number }>) => {
const country = countries[e.detail.index];
if (country) {
this.selectCountry(country.id);
this.setScenario('edit');
}
}}
@change=${(e: CustomEvent<{ value: string }>) => {
const index = Number(e.detail.value.split(',')[0]);
const country = countries[index];
if (country) {
this.selectCountry(country.id);
this.setScenario('edit');
}
}}>
<TableCaption>${this.msg.tableCaption}</TableCaption>
<TableHeader>
<TableRow>
<TableHead key="isoCode" sortable>${this.msg.isoCode}</TableHead>
<TableHead key="displayName" sortable>${this.msg.nameInYourLanguage}</TableHead>
<TableHead key="status" sortable>${this.msg.status}</TableHead>
</TableRow>
</TableHeader>
<TableBody>
${countries.map((country) => html`
<TableRow key=${country.id}>
<TableCell>${country.isoCode}</TableCell>
<TableCell sort-value=${country.name}>${country.details.displayName}</TableCell>
<TableCell sort-value=${country.status}>
<span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${country.status === 'active' ? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]' : 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]'}">
${this.msg[statusMessageKey(country.status)]}
</span>
</TableCell>
</TableRow>
`)}
</TableBody>
<Empty>${this.msg.noCountries}</Empty>
<Loading>${this.msg.loadingCountries}</Loading>
</groupviewtable--ml-data-table>
${this.countries?.hasMore ? html`
<div class="mt-4 flex justify-center">
<grouptriggeraction--ml-button-standard
data-variant="secondary"
size="sm"
type="button"
.loading=${isLoading}
@action=${() => {
const nextPage = (this.countries?.page ?? 1) + 1;
if (this.searchTerm || this.statusFilter !== null) {
this.searchCountries(this.searchTerm, this.statusFilter, nextPage, true);
} else {
this.listCountries(nextPage, true);
}
}}>
<Label>${this.msg.loadMore}</Label>
</grouptriggeraction--ml-button-standard>
</div>
` : ''}
${this.pageStatus === 'error' && this.listCountriesError?.code !== 'client.preconditionMissing' ? html`
<div class="mt-4 flex items-center justify-between rounded-lg bg-[var(--surface-alt-bg,transparent)] p-3 text-sm text-[var(--text-default,currentColor)]" role="alert">
<span>${this.msg.listError}</span>
<grouptriggeraction--ml-button-standard data-variant="secondary" size="sm" type="button" @action=${() => this.listCountries()}>
<Label>${this.msg.retry}</Label>
</grouptriggeraction--ml-button-standard>
</div>
` : ''}
`}
</section>
`;
}
private renderCreatePanel() {
const draft = this.addCountryDraft;
const busy = this.addCountryStatus === 'loading';
const ready = !!draft.isoCode && !!draft.name;
return html`
<section data-organism-id="countryForm" class="space-y-5">
<groupentertext--ml-enter-text
.value=${draft.isoCode ?? ''}
name="iso-code"
.placeholder=${this.msg.isoPlaceholder}
.maxLength=${2}
.minLength=${2}
autocomplete="off"
inputType="text"
.required=${true}
.loading=${busy}
@input=${(e: CustomEvent<{ value: string }>) => this.setAddCountryDraft({ ...draft, isoCode: e.detail.value })}>
<Label>${this.msg.isoCode}</Label>
<Helper>${this.msg.isoHelper}</Helper>
</groupentertext--ml-enter-text>
<groupentertext--ml-enter-text
.value=${draft.name ?? ''}
name="english-name"
.placeholder=${this.msg.namePlaceholder}
.maxLength=${200}
autocomplete="off"
inputType="text"
.required=${true}
.loading=${busy}
@input=${(e: CustomEvent<{ value: string }>) => this.setAddCountryDraft({ ...draft, name: e.detail.value })}>
<Label>${this.msg.englishName}</Label>
<Helper>${this.msg.nameHelper}</Helper>
</groupentertext--ml-enter-text>
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${this.addCountryStatus === 'error'} .dismissible=${false} .duration=${0}>
<Message>${this.addCountryError?.message ?? this.msg.addError}</Message>
</groupnotifyuser--ml-contextual-feedback>
<grouptriggeraction--ml-button-standard
data-variant="primary"
size="md"
type="button"
.disabled=${!ready}
.loading=${busy}
@action=${() => this.addCountry().then(() => { if (this.addCountryStatus === 'success') this.setScenario('browse'); })}>
<Label>${this.msg.addCountry}</Label>
</grouptriggeraction--ml-button-standard>
${!ready ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.requiredFields}</p>` : ''}
</section>
`;
}
private renderEditPanel() {
const country = this.countryForm;
const draft = this.saveCountryChangesDraft;
const busy = this.saveCountryChangesStatus === 'loading';
const statusBusy = this.inactivateCountryStatus === 'loading' || this.reactivateCountryStatus === 'loading';
const ready = !!draft.isoCode && !!draft.name;
if (!country) {
return html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.selectionUnavailable}</p>`;
}
return html`
<section data-organism-id="countryForm" class="space-y-5">
<p class="text-sm text-[var(--text-muted,currentColor)]">${country.details.displayName}</p>
<groupentertext--ml-enter-text
.value=${draft.isoCode ?? ''}
name="edit-iso-code"
.placeholder=${this.msg.isoPlaceholder}
.maxLength=${2}
.minLength=${2}
autocomplete="off"
inputType="text"
.required=${true}
.loading=${busy}
@input=${(e: CustomEvent<{ value: string }>) => this.setSaveCountryChangesDraft({ ...draft, isoCode: e.detail.value })}>
<Label>${this.msg.isoCode}</Label>
<Helper>${this.msg.isoHelper}</Helper>
</groupentertext--ml-enter-text>
<groupentertext--ml-enter-text
.value=${draft.name ?? ''}
name="edit-english-name"
.placeholder=${this.msg.namePlaceholder}
.maxLength=${200}
autocomplete="off"
inputType="text"
.required=${true}
.loading=${busy}
@input=${(e: CustomEvent<{ value: string }>) => this.setSaveCountryChangesDraft({ ...draft, name: e.detail.value })}>
<Label>${this.msg.englishName}</Label>
<Helper>${this.msg.nameHelper}</Helper>
</groupentertext--ml-enter-text>
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${this.saveCountryChangesStatus === 'error'} .dismissible=${false} .duration=${0}>
<Message>${this.saveCountryChangesError?.message ?? this.msg.saveError}</Message>
</groupnotifyuser--ml-contextual-feedback>
<grouptriggeraction--ml-button-standard
data-variant="primary"
size="md"
type="button"
.disabled=${!ready}
.loading=${busy}
@action=${() => this.saveCountryChanges().then(() => { if (this.saveCountryChangesStatus === 'success') { this.selectCountry(null); this.setScenario('browse'); } })}>
<Label>${this.msg.saveCountry}</Label>
</grouptriggeraction--ml-button-standard>
<section data-organism-id="countryActions" class="border-t border-[var(--border-subtle,currentColor)] pt-5">
<h3 class="mb-1 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.availability}</h3>
<p class="mb-3 text-sm text-[var(--text-muted,currentColor)]">${country.status === 'active' ? this.msg.activeExplanation : this.msg.inactiveExplanation}</p>
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${this.inactivateCountryStatus === 'error' || this.reactivateCountryStatus === 'error'} .dismissible=${false} .duration=${0}>
<Message>${this.inactivateCountryError?.message ?? this.reactivateCountryError?.message ?? (country.status === 'active' ? this.msg.inactivateError : this.msg.reactivateError)}</Message>
</groupnotifyuser--ml-contextual-feedback>
<grouptriggeraction--ml-button-group
data-variant=${country.status === 'active' ? 'danger' : 'secondary'}
size="sm"
type="button"
.loading=${statusBusy}
@action=${() => {
if (country.status === 'active') {
if (window.confirm(this.msg.confirmInactivate)) this.inactivateCountry();
} else if (window.confirm(this.msg.confirmReactivate)) {
this.reactivateCountry();
}
}}>
<Label>${country.status === 'active' ? this.msg.inactivate : this.msg.reactivate}</Label>
</grouptriggeraction--ml-button-group>
</section>
</section>
`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const panelTitle = this.countryForm?.details.displayName ?? this.msg.details;
return html`
<main class="min-h-full bg-[var(--page-bg,transparent)] p-8 text-[var(--text-default,currentColor)]">
<header class="mb-6 flex items-baseline justify-between">
<h1 class="text-2xl font-semibold tracking-tight text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
</header>
<div class="grid min-h-[38rem] grid-cols-[minmax(0,1fr)_25rem] gap-6">
${this.renderList()}
<aside class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6">
<molecules--ml-scenary-102020
mode="scenary"
.value=${this.scenary || (this.selectedCountry !== null ? 'edit' : 'browse')}
.backLabel=${this.msg.details}
@change=${(e: CustomEvent<{ value: string }>) => {
if (e.target === e.currentTarget) {
const value = e.detail.value;
if (value) {
this.setScenario(value);
if (value === 'browse') this.selectCountry(null);
}
}
}}>
<Scene value="browse" title=${this.msg.details}>
<p class="text-sm leading-6 text-[var(--text-muted,currentColor)]">${this.msg.searchHelper}</p>
</Scene>
<Scene value="create" title=${this.msg.addCountryTitle} nav="back" backTo="browse">
${this.renderCreatePanel()}
</Scene>
<Scene value="edit" title=${panelTitle} nav="back" backTo="browse">
${this.renderEditPanel()}
</Scene>
</molecules--ml-scenary-102020>
</aside>
</div>
</main>
`;
}
}

