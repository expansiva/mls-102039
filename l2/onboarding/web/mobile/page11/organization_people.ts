/// <mls fileReference="_102039_/l2/onboarding/web/mobile/page11/organization_people.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { OnboardingOrganization_peopleShared } from '/_102039_/l2/onboarding/web/shared/organization_people.js';
import type { PersonStatus } from '/_102039_/l2/onboarding/web/shared/organization_people.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupsearchcontent/ml-search-bar.js';
import '/_102040_/l2/molecules/groupviewcard/ml-profile-card.js';
import '/_102040_/l2/molecules/groupviewmetric/ml-metric-big-number.js';
import '/_102040_/l2/molecules/groupviewtable/ml-responsive-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_en = {
pageTitle: 'Organization people',
backToPeople: 'People',
completeAccess: 'Access complete',
pendingAccess: 'Access pending',
validConsent: 'Valid consent',
invalidConsent: 'Consent needs review',
people: 'People',
searchLabel: 'Find a person',
searchPlaceholder: 'Search name or login e-mail',
searchHelper: 'Search by name or login e-mail.',
statusLabel: 'Platform status',
allStatuses: 'All statuses',
statusActive: 'Active',
statusInactive: 'Inactive',
statusMerged: 'Merged',
statusBlocked: 'Blocked',
name: 'Name',
loginEmail: 'Login e-mail',
status: 'Status',
country: 'Country',
missingItems: 'What is still missing',
noPeople: 'No people match this search.',
loadingPeople: 'Loading people…',
peopleLoadError: 'We could not load organization people.',
retry: 'Try again',
selectPersonHint: 'Select a person to review their access.',
accessCompleteLabel: 'Access complete',
accessPendingTitle: 'Access needs attention',
accessPendingMessage: 'This person still has information or access work to complete.',
consentReviewTitle: 'Consent needs review',
consentReviewMessage: 'This person does not have valid consent for the current privacy text.',
consentValid: 'Consent valid',
consentInvalid: 'Consent is not valid',
currentPrivacyText: 'Current privacy text',
privacyVersion: 'Version',
publishedAt: 'Published',
viewPrivacyText: 'View privacy text',
updatedAt: 'Last updated',
pendingGuidance: 'Pending access guidance',
noPendingGuidance: 'No pending guidance is available.',
loadingPerson: 'Loading person…',
personLoadError: 'We could not load this person.',
organizationContextMissing: 'The organization context needed to open this directory is missing.',
reloadDirectory: 'Reload directory'
};
type PageMessageType = typeof pageMessage_en;
const pageMessages: Record<string, PageMessageType> = { 'en': pageMessage_en };
/// **collab_i18n_end**
const STATUS_KEY: Record<PersonStatus, keyof PageMessageType> = {
Active: 'statusActive',
Inactive: 'statusInactive',
Merged: 'statusMerged',
Blocked: 'statusBlocked'
};
function formatDate(value: string) {
return new Intl.DateTimeFormat(document.documentElement.lang || undefined, {
dateStyle: 'medium'
}).format(new Date(value));
}
@customElement('onboarding--web--mobile--page11--organization_people-102039')
export class OnboardingMobilePage11Organization_peoplePage extends OnboardingOrganization_peopleShared {
private msg: PageMessageType = pageMessage_en;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const people = this.people?.items ?? [];
const initialError = this.qryOrganizationPeopleOverviewError;
const personError = this.qryOrganizationPersonError;
const listError = this.qrySearchOrganizationPeopleError?.message ?? initialError?.message ?? '';
const directoryLoading = this.qryOrganizationPeopleOverviewStatus === 'loading' || this.qrySearchOrganizationPeopleStatus === 'loading';
const personLoading = this.qryOrganizationPersonStatus === 'loading';
const selectedPerson = this.person;
return html`
<main class="min-h-full bg-[var(--page-bg,transparent)] text-[var(--text-default,currentColor)]">
<molecules--ml-scenary-102020
mode="scenary"
.value=${this.scenary || (this.selectedOrganizationMember !== null ? 'person' : 'directory')}
backLabel=${this.msg.backToPeople}
@change=${(e: Event) => {
if (e.target === e.currentTarget) {
const host = e.currentTarget as HTMLElement & { value: string };
this.setScenario(host.value);
if (host.value === 'directory') this.selectOrganizationMember(null);
}
}}
>
<Scene value="directory" title=${this.msg.pageTitle}>
<div class="mx-auto flex w-full max-w-[430px] flex-col gap-5 px-4 py-5">
${initialError !== null && this.pageStatus === 'error' ? html`
<groupnotifyuser--ml-contextual-feedback
type="error"
.visible=${true}
.dismissible=${false}
>
<Title>${initialError.code === 'client.preconditionMissing' ? this.msg.organizationContextMissing : this.msg.peopleLoadError}</Title>
<Message>${initialError.message}</Message>
<Action>
<button
type="button"
class="min-h-11 rounded-md bg-[var(--button-secondary-bg,transparent)] px-3 text-sm font-semibold text-[var(--button-secondary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
@click=${() => this.qryOrganizationPeopleOverview()}
>${this.msg.reloadDirectory}</button>
</Action>
</groupnotifyuser--ml-contextual-feedback>
` : ''}
<section data-organism-id="accessHighlights" aria-label=${this.msg.pageTitle} class="grid grid-cols-2 gap-3">
<groupviewmetric--ml-metric-big-number .loading=${this.qryOrganizationPeopleOverviewStatus === 'loading'}>
<Label>${this.msg.completeAccess}</Label>
<Value>${new Intl.NumberFormat(document.documentElement.lang || undefined).format(this.highlights?.completeCount ?? 0)}</Value>
<Helper>${this.msg.validConsent}: ${new Intl.NumberFormat(document.documentElement.lang || undefined).format(this.highlights?.consentValidCount ?? 0)}</Helper>
</groupviewmetric--ml-metric-big-number>
<groupviewmetric--ml-metric-big-number .loading=${this.qryOrganizationPeopleOverviewStatus === 'loading'}>
<Label>${this.msg.pendingAccess}</Label>
<Value>${new Intl.NumberFormat(document.documentElement.lang || undefined).format(this.highlights?.pendingCount ?? 0)}</Value>
<Helper>${this.msg.invalidConsent}: ${new Intl.NumberFormat(document.documentElement.lang || undefined).format(this.highlights?.consentInvalidCount ?? 0)}</Helper>
</groupviewmetric--ml-metric-big-number>
</section>
<section data-organism-id="peopleList" class="flex flex-col gap-3" aria-busy=${directoryLoading ? 'true' : 'false'}>
<div class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-3">
<groupsearchcontent--ml-search-bar
.value=${this.searchText || null}
.error=${this.qrySearchOrganizationPeopleError?.message ?? ''}
.name=${'people-search'}
.placeholder=${this.msg.searchPlaceholder}
.debounce=${350}
.loading=${this.qrySearchOrganizationPeopleStatus === 'loading'}
.disabled=${this.qryOrganizationPeopleOverviewStatus === 'loading'}
@search=${(e: CustomEvent<{ query: string }>) => this.qrySearchOrganizationPeople(e.detail.query, this.statusFilter)}
@change=${(e: CustomEvent<{ value: string | null }>) => this.qrySearchOrganizationPeople(e.detail.value ?? '', this.statusFilter)}
@clear=${() => this.qrySearchOrganizationPeople('', this.statusFilter)}
>
<Label>${this.msg.searchLabel}</Label>
<Helper>${this.msg.searchHelper}</Helper>
<Empty>${this.msg.noPeople}</Empty>
</groupsearchcontent--ml-search-bar>
<div class="mt-3">
<label class="mb-1 block text-sm font-medium text-[var(--text-strong,currentColor)]" for="status-filter">${this.msg.statusLabel}</label>
<select
id="status-filter"
class="min-h-11 w-full rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 text-base text-[var(--text-default,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]"
.value=${this.statusFilter ?? ''}
?disabled=${directoryLoading}
@change=${(e: Event) => this.qrySearchOrganizationPeople(this.searchText, ((e.target as HTMLSelectElement).value || null) as PersonStatus | null)}
>
<option value="">${this.msg.allStatuses}</option>
<option value="Active">${this.msg.statusActive}</option>
<option value="Inactive">${this.msg.statusInactive}</option>
<option value="Merged">${this.msg.statusMerged}</option>
<option value="Blocked">${this.msg.statusBlocked}</option>
</select>
</div>
</div>
<groupviewtable--ml-responsive-table
.value=${''}
.error=${listError}
.disabled=${personLoading}
.loading=${directoryLoading}
@rowClick=${(e: CustomEvent<{ index: number }>) => {
const row = people[e.detail.index];
if (row) {
this.selectOrganizationMember(row.id);
this.setScenario('person');
}
}}
>
<TableCaption>${this.msg.people}</TableCaption>
<TableHeader>
<TableRow>
<TableHead key="name">${this.msg.name}</TableHead>
<TableHead key="email">${this.msg.loginEmail}</TableHead>
<TableHead key="status">${this.msg.status}</TableHead>
<TableHead key="missing">${this.msg.missingItems}</TableHead>
</TableRow>
</TableHeader>
<TableBody>
${people.map((row) => html`
<TableRow key=${row.id}>
<TableCell>${row.details.identification.name}</TableCell>
<TableCell>${row.details.onboarding.loginEmail}</TableCell>
<TableCell><span class="rounded-full bg-[var(--status-neutral-bg,transparent)] px-2 py-1 text-xs font-medium text-[var(--status-neutral-text,currentColor)]">${this.msg[STATUS_KEY[row.details.identification.status]]}</span></TableCell>
<TableCell>${row.details.onboarding.missingItems}</TableCell>
</TableRow>
`)}
</TableBody>
<Empty>${this.msg.noPeople}</Empty>
<Loading>${this.msg.loadingPeople}</Loading>
</groupviewtable--ml-responsive-table>
</section>
</div>
</Scene>
<Scene value="person" title=${selectedPerson?.details.identification.name ?? this.msg.selectPersonHint} nav="back" backTo="directory">
<div data-organism-id="personPendingDetail" class="mx-auto flex w-full max-w-[430px] flex-col gap-4 px-4 py-5" aria-busy=${personLoading ? 'true' : 'false'}>
${personError !== null ? html`
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
<Title>${this.msg.personLoadError}</Title>
<Message>${personError.message}</Message>
<Action><button type="button" class="min-h-11 rounded-md bg-[var(--button-secondary-bg,transparent)] px-3 font-semibold text-[var(--button-secondary-text,currentColor)]" @click=${() => this.qryOrganizationPerson(this.selectedOrganizationMember)}>${this.msg.retry}</button></Action>
</groupnotifyuser--ml-contextual-feedback>
` : ''}
<groupviewcard--ml-profile-card .loading=${personLoading}>
<CardHeader>
<CardTitle>${selectedPerson?.details.identification.name ?? this.msg.loadingPerson}</CardTitle>
<CardDescription>${selectedPerson?.details.onboarding.loginEmail ?? ''}</CardDescription>
</CardHeader>
${selectedPerson ? html`
<CardContent>
<dl class="grid grid-cols-1 gap-3 text-sm">
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.status}</dt><dd class="mt-1 font-medium text-[var(--text-strong,currentColor)]">${this.msg[STATUS_KEY[selectedPerson.details.identification.status]]}</dd></div>
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.country}</dt><dd class="mt-1 font-medium text-[var(--text-strong,currentColor)]">${selectedPerson.country.details.displayName ?? ''}</dd></div>
<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.updatedAt}</dt><dd class="mt-1 font-medium text-[var(--text-strong,currentColor)]">${formatDate(selectedPerson.details.identification.updatedAt)}</dd></div>
</dl>
</CardContent>
` : ''}
</groupviewcard--ml-profile-card>
${selectedPerson && !selectedPerson.details.onboarding.accessComplete ? html`<groupnotifyuser--ml-contextual-feedback type="warning" .visible=${true} .dismissible=${false}><Title>${this.msg.accessPendingTitle}</Title><Message>${this.msg.accessPendingMessage}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}
${selectedPerson && !selectedPerson.details.onboarding.consentValid ? html`<groupnotifyuser--ml-contextual-feedback type="warning" .visible=${true} .dismissible=${false}><Title>${this.msg.consentReviewTitle}</Title><Message>${this.msg.consentReviewMessage}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}
${selectedPerson ? html`
<groupviewtable--ml-responsive-table .value=${''}>
<TableCaption>${this.msg.pendingGuidance}</TableCaption>
<TableHeader><TableRow><TableHead key="missing">${this.msg.missingItems}</TableHead></TableRow></TableHeader>
<TableBody><TableRow key=${selectedPerson.id}><TableCell>${selectedPerson.details.onboarding.missingItems}</TableCell></TableRow></TableBody>
<Empty>${this.msg.noPendingGuidance}</Empty>
</groupviewtable--ml-responsive-table>
<section class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4">
<div class="flex items-start justify-between gap-3"><div><p class="font-semibold text-[var(--text-strong,currentColor)]">${this.msg.consentValid}</p><p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${selectedPerson.details.onboarding.consentValid ? this.msg.consentValid : this.msg.consentInvalid}</p></div></div>
${selectedPerson.currentPrivacyVersion ? html`<dl class="mt-4 grid gap-2 text-sm"><div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.privacyVersion}</dt><dd>${selectedPerson.currentPrivacyVersion.versionCode}</dd></div><div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.publishedAt}</dt><dd>${formatDate(selectedPerson.currentPrivacyVersion.publishedAt)}</dd></div></dl>` : ''}
<button type="button" class="mt-4 min-h-11 rounded-md bg-[var(--button-primary-bg,transparent)] px-4 text-sm font-semibold text-[var(--button-primary-text,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.openPrivacyText()}>${this.msg.viewPrivacyText}</button>
</section>
` : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.selectPersonHint}</p>`}
</div>
</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
