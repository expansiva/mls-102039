/// <mls fileReference="_102039_/l2/onboarding/web/mobile/page11/countries.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { OnboardingCountriesShared, type CountryStatusFilter } from '/_102039_/l2/onboarding/web/shared/countries.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_en = {
countries: 'Countries',
countryList: 'Country list',
findCountries: 'Find countries',
searchPlaceholder: 'Search by ISO code or English name',
searchHelper: 'Searches ISO codes and English names.',
allStatuses: 'All statuses',
active: 'Active',
inactive: 'Inactive',
newCountry: 'New country',
addCountry: 'Add country',
saveCountry: 'Save country',
isoCode: 'ISO code',
isoCodePlaceholder: 'US',
isoCodeHelper: 'Use a two-letter ISO 3166-1 alpha-2 code in upper case.',
englishName: 'English name',
englishNamePlaceholder: 'United States',
englishNameHelper: 'Enter the country name in English.',
countryStatus: 'Status',
nameInYourLanguage: 'Name in your language',
noCountries: 'No countries found.',
loadingCountries: 'Loading countries…',
loadMore: 'Load more',
retry: 'Try again',
listUnavailable: 'Countries could not be loaded. Try again to return to the country list.',
formProblem: 'Check the country details and try again.',
statusProblem: 'The country status could not be changed. Try again.',
inactivateCountry: 'Inactivate country',
reactivateCountry: 'Reactivate country',
inactivateConfirm: 'Inactivate this country? It will no longer be offered for new people or companies; records already using it keep it.',
reactivateConfirm: 'Reactivate this country? It will be offered for new people and companies.',
statusHelp: 'Only active countries are offered for selection.',
selectedCountry: 'Selected country',
listError: 'Country list error',
formError: 'Country details error',
actionError: 'Country status error'
};
type PageMessageType = typeof pageMessage_en;
const pageMessages: Record<string, PageMessageType> = { 'en': pageMessage_en };
/// **collab_i18n_end**
@customElement('onboarding--web--mobile--page11--countries-102039')
export class OnboardingMobilePage11CountriesPage extends OnboardingCountriesShared {
private msg: PageMessageType = pageMessage_en;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const items = this.countries?.items ?? [];
const selectedIndex = items.findIndex((country) => country.id === this.selectedCountry);
return html`
<main class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
<molecules--ml-scenary-102020
mode="scenary"
.value=${this.scenary || (this.selectedCountry !== null ? 'country' : 'list')}
.backLabel=${this.msg['countryList']}
?loading=${this.listCountriesStatus === 'loading'}
@change=${(e: Event) => {
if (e.target === e.currentTarget) {
this.setScenario('list');
this.selectCountry(null);
}
}}>
<Scene value="list" .title=${this.msg['countries']}>
<section class="mx-auto w-full max-w-xl px-4 py-5" data-organism-id="countryList">
${this.renderListError()}
<div class="space-y-3">
<groupsearchcontent--ml-search-bar
data-class="w-full"
.value=${this.searchTerm}
.error=${this.searchCountriesError?.message ?? ''}
name="country-search"
.placeholder=${this.msg['searchPlaceholder']}
.debounce=${300}
?loading=${this.searchCountriesStatus === 'loading'}
?disabled=${this.listCountriesStatus === 'loading'}
@search=${(e: CustomEvent<{ query: string }>) => this.searchCountries(e.detail.query, this.statusFilter)}
@change=${(e: CustomEvent<{ value: string | null }>) => this.searchCountries(e.detail.value ?? '', this.statusFilter)}
@clear=${() => this.searchCountries('', this.statusFilter)}>
<Label>${this.msg['findCountries']}</Label>
<Helper>${this.msg['searchHelper']}</Helper>
<Empty>${this.msg['noCountries']}</Empty>
</groupsearchcontent--ml-search-bar>
<div class="flex gap-2" aria-label=${this.msg['countryStatus']}>
${this.renderFilter(null, this.msg['allStatuses'])}
${this.renderFilter('active', this.msg['active'])}
${this.renderFilter('inactive', this.msg['inactive'])}
</div>
</div>
<div class="mt-5 flex items-center justify-between gap-3">
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['statusHelp']}</p>
<grouptriggeraction--ml-button-standard
data-variant="primary"
size="md"
@action=${() => { this.selectCountry(null); this.setScenario('country'); }}>
<Label>${this.msg['newCountry']}</Label>
</grouptriggeraction--ml-button-standard>
</div>
<groupviewtable--ml-responsive-table
class="mt-4 block"
.value=${selectedIndex >= 0 ? String(selectedIndex) : ''}
.page=${this.countries?.page ?? 1}
.pageSize=${0}
.totalItems=${0}
.error=${this.searchCountriesError?.message ?? ''}
?loading=${this.pageStatus === 'loading' || this.searchCountriesStatus === 'loading'}
@rowClick=${(e: CustomEvent<{ index: number }>) => {
const country = items[e.detail.index];
if (country) {
this.selectCountry(country.id);
this.setScenario('country');
}
}}>
<TableCaption>${this.msg['countryList']}</TableCaption>
<TableHeader>
<TableRow>
<TableHead key="country">${this.msg['nameInYourLanguage']}</TableHead>
<TableHead key="code">${this.msg['isoCode']}</TableHead>
<TableHead key="status">${this.msg['countryStatus']}</TableHead>
</TableRow>
</TableHeader>
<TableBody>
${items.map((country) => html`
<TableRow key=${country.id}>
<TableCell>
<span class=${country.status === 'inactive' ? 'text-[var(--text-muted,currentColor)]' : 'text-[var(--text-strong,currentColor)]'}>${country.details.displayName}</span>
</TableCell>
<TableCell>${country.isoCode}</TableCell>
<TableCell>
<span class=${country.status === 'active' ? 'rounded-full bg-[var(--status-success-bg,transparent)] px-2 py-1 text-xs text-[var(--status-success-text,currentColor)]' : 'rounded-full bg-[var(--status-neutral-bg,transparent)] px-2 py-1 text-xs text-[var(--status-neutral-text,currentColor)]'}>${country.status === 'active' ? this.msg['active'] : this.msg['inactive']}</span>
</TableCell>
</TableRow>
`)}
</TableBody>
<Loading>${this.msg['loadingCountries']}</Loading>
<Empty>${this.msg['noCountries']}</Empty>
</groupviewtable--ml-responsive-table>
${this.countries?.hasMore ? html`
<div class="mt-4">
<grouptriggeraction--ml-button-standard data-variant="secondary" size="md" data-class="w-full" ?loading=${this.listCountriesStatus === 'loading' || this.searchCountriesStatus === 'loading'} @action=${() => this.searchCountries(this.searchTerm, this.statusFilter, (this.countries?.page ?? 1) + 1, true)}>
<Label>${this.msg['loadMore']}</Label>
</grouptriggeraction--ml-button-standard>
</div>` : ''}
</section>
</Scene>
<Scene value="country" .title=${this.countryForm?.details.displayName ?? this.msg['newCountry']} nav="back" backTo="list">
<section class="mx-auto w-full max-w-xl px-4 py-5" data-organism-id="countryForm">
${this.countryForm ? this.renderEditForm() : this.renderAddForm()}
${this.countryForm ? this.renderActions() : ''}
</section>
</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
renderFilter(status: CountryStatusFilter | null, label: string) {
const selected = this.statusFilter === status;
return html`<button type="button" class=${selected ? 'min-h-11 rounded-full border border-[var(--selected-border,currentColor)] bg-[var(--selected-bg,transparent)] px-3 text-sm text-[var(--selected-text,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]' : 'min-h-11 rounded-full border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] px-3 text-sm text-[var(--text-default,currentColor)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]'} @click=${() => this.searchCountries(this.searchTerm, status)}>${label}</button>`;
}
renderListError() {
const error = this.listCountriesError;
return error ? html`
<groupnotifyuser--ml-contextual-feedback type="error" ?visible=${true} ?dismissible=${false}>
<Title>${this.msg['listError']}</Title>
<Message>${error.code === 'client.preconditionMissing' ? this.msg['listUnavailable'] : error.message}</Message>
<Action><button type="button" class="min-h-11 underline focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.listCountries()}>${this.msg['retry']}</button></Action>
</groupnotifyuser--ml-contextual-feedback>` : '';
}
renderAddForm() {
const draft = this.addCountryDraft;
const error = this.addCountryError?.message ?? '';
return html`
<div class="space-y-5">
<groupentertext--ml-floating-text-input .value=${draft.isoCode ?? ''} .error=${error} name="iso-code" .placeholder=${this.msg['isoCodePlaceholder']} .maxLength=${2} .minLength=${2} mask="AA" autocomplete="off" ?required=${true} ?loading=${this.addCountryStatus === 'loading'} @input=${(e: CustomEvent<{ value: string }>) => this.setAddCountryDraft({ ...draft, isoCode: e.detail.value })}>
<Label>${this.msg['isoCode']}</Label><Helper>${this.msg['isoCodeHelper']}</Helper>
</groupentertext--ml-floating-text-input>
<groupentertext--ml-floating-text-input .value=${draft.name ?? ''} .error=${error} name="english-name" .placeholder=${this.msg['englishNamePlaceholder']} .maxLength=${200} autocomplete="off" ?required=${true} ?loading=${this.addCountryStatus === 'loading'} @input=${(e: CustomEvent<{ value: string }>) => this.setAddCountryDraft({ ...draft, name: e.detail.value })}>
<Label>${this.msg['englishName']}</Label><Helper>${this.msg['englishNameHelper']}</Helper>
</groupentertext--ml-floating-text-input>
${this.addCountryError ? html`<groupnotifyuser--ml-contextual-feedback type="error" ?visible=${true} ?dismissible=${false}><Title>${this.msg['formError']}</Title><Message>${this.addCountryError.message}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}
<grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full" ?loading=${this.addCountryStatus === 'loading'} @action=${() => this.addCountry()}><Label>${this.msg['addCountry']}</Label></grouptriggeraction--ml-button-standard>
</div>`;
}
renderEditForm() {
const draft = this.saveCountryChangesDraft;
const error = this.saveCountryChangesError?.message ?? '';
return html`
<div class="space-y-5">
<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg['selectedCountry']}: ${this.countryForm?.details.displayName}</p>
<groupentertext--ml-floating-text-input .value=${draft.isoCode ?? ''} .error=${error} name="iso-code" .placeholder=${this.msg['isoCodePlaceholder']} .maxLength=${2} .minLength=${2} mask="AA" autocomplete="off" ?required=${true} ?loading=${this.saveCountryChangesStatus === 'loading'} @input=${(e: CustomEvent<{ value: string }>) => this.setSaveCountryChangesDraft({ ...draft, isoCode: e.detail.value })}>
<Label>${this.msg['isoCode']}</Label><Helper>${this.msg['isoCodeHelper']}</Helper>
</groupentertext--ml-floating-text-input>
<groupentertext--ml-floating-text-input .value=${draft.name ?? ''} .error=${error} name="english-name" .placeholder=${this.msg['englishNamePlaceholder']} .maxLength=${200} autocomplete="off" ?required=${true} ?loading=${this.saveCountryChangesStatus === 'loading'} @input=${(e: CustomEvent<{ value: string }>) => this.setSaveCountryChangesDraft({ ...draft, name: e.detail.value })}>
<Label>${this.msg['englishName']}</Label><Helper>${this.msg['englishNameHelper']}</Helper>
</groupentertext--ml-floating-text-input>
${this.saveCountryChangesError ? html`<groupnotifyuser--ml-contextual-feedback type="error" ?visible=${true} ?dismissible=${false}><Title>${this.msg['formError']}</Title><Message>${this.saveCountryChangesError.message}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}
<grouptriggeraction--ml-button-standard data-variant="primary" size="lg" data-class="w-full" ?loading=${this.saveCountryChangesStatus === 'loading'} @action=${() => this.saveCountryChanges()}><Label>${this.msg['saveCountry']}</Label></grouptriggeraction--ml-button-standard>
</div>`;
}
renderActions() {
const country = this.countryForm;
const loading = this.inactivateCountryStatus === 'loading' || this.reactivateCountryStatus === 'loading';
const error = this.inactivateCountryError ?? this.reactivateCountryError;
return html`
<section class="mt-8 border-t border-[var(--border-subtle,currentColor)] pt-5" data-organism-id="countryActions">
${error ? html`<groupnotifyuser--ml-contextual-feedback type="error" ?visible=${true} ?dismissible=${false}><Title>${this.msg['actionError']}</Title><Message>${error.message}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}
<p class="mb-3 text-sm text-[var(--text-muted,currentColor)]">${this.msg['statusHelp']}</p>
${country?.status === 'active' ? html`<grouptriggeraction--ml-button-standard data-variant="danger" size="md" data-class="w-full" ?loading=${loading} @action=${() => { if (window.confirm(`${this.msg['inactivateConfirm']} ${country.name}`)) this.inactivateCountry(); }}><Label>${this.msg['inactivateCountry']}</Label></grouptriggeraction--ml-button-standard>` : html`<grouptriggeraction--ml-button-standard data-variant="secondary" size="md" data-class="w-full" ?loading=${loading} @action=${() => { if (window.confirm(`${this.msg['reactivateConfirm']} ${country?.name ?? ''}`)) this.reactivateCountry(); }}><Label>${this.msg['reactivateCountry']}</Label></grouptriggeraction--ml-button-standard>`}
</section>`;
}
}
